using Domain;
using Domain.Contracts;
using Domain.Models.Clients;
using Domain.Models.Prices;
using Domain.Models.Reviews;
using Domain.Models.Users;
using Domain.Responses;
using Microsoft.EntityFrameworkCore;
using WebAPI.Context;
using WebAPI.Services.Pagination;

namespace WebAPI.Services.Admin.Repository;

public class AdminService(ApplicationDbContext _context) : IAdminService
{
    public async Task<InternalResponse> ApprovePageAsync(string clientId)
    {
        try
        {
            var client = await _context.Client.Include(page => page.Prices).FirstOrDefaultAsync(page => page.ClientId == clientId);

            if (client == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = "Requested client could not be found !",
                    Message = $"Client with the id {clientId} could not be found"
                };
            }
            if (client.Prices == null || client.Prices.Count == 0)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.BadRequest,
                    Title = "Requested client doesn't have prices added !",
                    Message = $"Client with the id {client} doesn't have any prices added"
                };

            }

            client.Approved = true;

            _context.ExtendedReview.Add(new ExtendedReview(client.ClientId));

            await _context.SaveChangesAsync();

            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Requested client approved !",
                Message = $"Client with the id {clientId} was added succesfuly !"
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);

        }
    }

    public async Task<InternalResponse> ApprovePartnerAccountAsync(string partnerId)
    {
        try
        {
            var request = await _context.RequestedUser.FirstOrDefaultAsync(user => user.UserId == partnerId);

            var user = await _context.User.FirstOrDefaultAsync(user => user.UserId == partnerId);

            if (user == null || request == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = "Requested user could not be found !",
                    Message = $"User with the id {partnerId} could not be found"
                };
            }

            user.Privilege = PromoteRole(user.Privilege);

            user.Status = request.Status;

            user.PhoneNumber = request.PhoneNumber;

            user.Categories = !string.IsNullOrEmpty(request.Genre) ? request.Category + " - " + request.Subcategory + " - " + request.Genre : request.Category + " - " + request.Subcategory;

            _context.RequestedUser.Remove(request);

            await _context.SaveChangesAsync();

            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Requested user approved !",
                Message = $"User with the id {partnerId} was approved succesfuly !",
                Data = user
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> ApproveReviewAsync(int reviewId)
    {
        try
        {
            var reviewRequest = await _context.RequestedReview.Include(review => review.Client).FirstOrDefaultAsync(review => review.ReviewId == reviewId);
            if (reviewRequest == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = "Requested review could not be found !",
                    Message = $"Review with the id {reviewId} could not be found"
                };
            }

            var review = new Review(reviewRequest);

            _context.Review.Add(review);

            _context.RequestedReview.Remove(reviewRequest);

            var newClientRating = await AddReviewRatingToExtendedReview(review.ClientId, review.ReviewValue);

            if (review.Client == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.UnprocessableEntity,
                    Title = "Specified client for the review could not be found !",
                    Message = $"Specified client for the review could not be found !"
                };
            }

            if (newClientRating > 0)
            {
                review.Client.ClientRating = newClientRating;

                await _context.SaveChangesAsync();

                return new InternalResponse
                {
                    StatusCode = ResponseCode.OK,
                    Title = "Requested review approved !",
                    Message = $"Review with the id {reviewId} was approved succesfuly !"
                };
            }

            return new InternalResponse
            {
                StatusCode = ResponseCode.InternalServerError,
                Title = "Review could not be added",
                Message = $"Review with the id {reviewId} could not be added for the client with the id {review.ClientId}"
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> DeletePageAsync(string clientId)
    {
        try
        {
            var page = await _context.Client.Include(page => page.Prices).FirstOrDefaultAsync(page => page.ClientId == clientId);
            if (page == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = "Requested client could not be deleted !",
                    Message = $"Page with the id {clientId} could not be found"
                };
            }

            _context.Client.Remove(page);
            await _context.SaveChangesAsync();

            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Requested client deleted !",
                Message = $"Page with the id {clientId} was deleted !"
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> DeleteReviewAsync(int reviewId)
    {
        try
        {
            var review = await _context.Review.Include(review => review.Client).FirstOrDefaultAsync(review => review.ReviewId == reviewId);

            if (review == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = "Requested review could not be denied !",
                    Message = $"Review with the id {reviewId} could not be found"
                };
            }

            _context.Review.Remove(review);

            var ExtendedReviewModified = await RemoveReviewRatingFromExtendedReview(review.ClientId, review.ReviewValue);

            if (review.Client == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.UnprocessableEntity,
                    Title = "Specified client for the review could not be found !",
                    Message = $"Specified client for the reviewid {reviewId} could not be found !"
                };
            }

            if (ExtendedReviewModified > 0)
            {
                review.Client.ClientRating = ExtendedReviewModified;

                await _context.SaveChangesAsync();

                return new InternalResponse
                {
                    StatusCode = ResponseCode.OK,
                    Title = "Requested review deleted !",
                    Message = $"Review with the id {reviewId} was deleted succesfuly !"
                };
            }
            return new InternalResponse
            {
                StatusCode = ResponseCode.BadRequest,
                Title = "Requested review could not be deleted !",
                Message = $"Review with the id {reviewId} could not be deleted !"
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> DenyPageAsync(string pageId)
    {
        try
        {
            var client = await _context.Client.Include(request => request.Prices).FirstOrDefaultAsync(request => request.ClientId == pageId);
            if (client == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = "Requested page could not be denied !",
                    Message = $"Page request with the id {pageId} could not be found"
                };
            }

            _context.Client.Remove(client);

            await _context.SaveChangesAsync();
            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Requested client denied !",
                Message = $"Page with the id {pageId} was denied !"
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> DenyPartnerAccountAsync(string partnerId)
    {
        try
        {
            var pageRequest = await _context.RequestedUser.FirstOrDefaultAsync(request => request.UserId == partnerId);
            if (pageRequest == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = "Requested user could not be denied !",
                    Message = $"User request with the id {partnerId} could not be found"
                };
            }

            _context.RequestedUser.Remove(pageRequest);
            await _context.SaveChangesAsync();

            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Requested user denied !",
                Message = $"User with the id {partnerId} was denied !"
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> DenyReviewAsync(int reviewId)
    {
        try
        {
            var reviewRequest = await _context.RequestedReview.FirstOrDefaultAsync(request => request.ReviewId == reviewId);
            if (reviewRequest == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = "Requested review could not be denied !",
                    Message = $"Review request with the id {reviewId} could not be found"
                };
            }

            _context.RequestedReview.Remove(reviewRequest);
            await _context.SaveChangesAsync();

            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Requested review denied !",
                Message = $"Review with the id {reviewId} was denied !"
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    private static Privilege PromoteRole(Privilege privilege)
    {
        if (privilege == Privilege.User)
        {
            return Privilege.Client;
        }
        return Privilege.User;

    }

    public async Task<InternalResponse> GetFreeUsersPaginatedAsync(int pageIndex)
    {
        try
        {
            var page = await PaginatedList<User>.CreateAsync(_context.User.Where(user => user.Privilege == Privilege.User || user.Privilege == Privilege.Client), pageIndex);
            if (page == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = "Requested page could not be populated !",
                    Message = $"Free user page with the index {pageIndex} could not be populated"
                };
            }
            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Page created",
                Message = $"Page with the index {pageIndex} created",
                Data = page
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> GetPageRequestsAsync(int pageIndex)
    {
        try
        {
            var items = _context.Client.Include(req => req.Prices).Include(req => req.User).Where(req => !req.Approved);
            
            var page = await PaginatedList<Client>.CreateAsync(items, pageIndex);
            if (page == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = "Requested page could not be populated !",
                    Message = $"Requested clients page with the index {pageIndex} could not be populated"
                };
            }
            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Page created",
                Message = $"Page with the index {pageIndex} created",
                Data = page
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> GetPagesPaginatedAsync(int pageIndex)
    {
        try
        {
            var page = await PaginatedList<Client>.CreateAsync(_context.Client.Include(client => client.User).Where(client => client.Approved), pageIndex);

            if (page == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = "Requested page could not be populated !",
                    Message = $"Clients page with the index {pageIndex} could not be populated"
                };
            }
            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Page created",
                Message = $"Page with the index {pageIndex} created",
                Data = page
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> GetPartnerRequestsPaginatedAsync(int pageIndex)
    {
        try
        {
            var page = await PaginatedList<RequestedUser>.CreateAsync(_context.RequestedUser, pageIndex);
            if (page == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = "Requested page could not be populated !",
                    Message = $"Requested pages page with the index {pageIndex} could not be populated"
                };
            }
            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Page created",
                Message = $"Page with the index {pageIndex} created",
                Data = page
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> GetPartnersPaginatedAsync(int pageIndex)
    {
        try
        {
            var page = await PaginatedList<User>.CreateAsync(_context.User.Where(user => user.Privilege == Privilege.Client).Include(user => user.ClientsManaged), pageIndex);
            if (page == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = "Requested page could not be populated !",
                    Message = $"Requested pages page with the index {pageIndex} could not be populated"
                };
            }
            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Page created",
                Message = $"Page with the index {pageIndex} created",
                Data = page
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }
    public async Task<InternalResponse> GetReviewRequestsPaginatedAsync(int pageIndex)
    {
        try
        {
            var page = await PaginatedList<RequestedReview>.CreateAsync(_context.RequestedReview.Include(req => req.Client).Include(req => req.User), pageIndex);
            if (page == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = "Requested page could not be populated !",
                    Message = $"Requested pages page with the index {pageIndex} could not be populated"
                };
            }
            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Page created",
                Message = $"Page with the index {pageIndex} created",
                Data = page
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> GetReviewsPaginatedAsync(int pageIndex)
    {
        try
        {
            var page = await PaginatedList<Review>.CreateAsync(_context.Review.Include(r => r.User).Include(r => r.Client), pageIndex);
            if (page == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = "Requested page could not be populated !",
                    Message = $"Requested pages page with the index {pageIndex} could not be populated"
                };
            }
            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Page created",
                Message = $"Page with the index {pageIndex} created",
                Data = page
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> PromoteAsync(string clientId, PromotedPlace place)
    {
        try
        {
            var newClient = await _context.Client.FirstOrDefaultAsync(client => client.ClientId == clientId);

            if (newClient == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = $"Client with the {clientId} could not be found"
                };
            }

            var oldClient = await _context.Client.FirstOrDefaultAsync(client => client.PromotedPlace == place);

            if (oldClient != null)
            {
                oldClient.PromotedPlace = PromotedPlace.Ordinary;
            }

            newClient.PromotedPlace = place;

            await _context.SaveChangesAsync();

            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = $"Client with the {clientId} was promoted to {(int)place} place"
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> RemovePromoteAsync(string clientId)
    {
        try
        {
            var client = await _context.Client.FirstOrDefaultAsync(client => client.ClientId == clientId);

            if (client == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = $"Client with the {clientId} could not be found"
                };
            }
            client.PromotedPlace = null;

            await _context.SaveChangesAsync();

            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = $"Client with the {clientId} was descended"

            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    private async Task<int> AddReviewRatingToExtendedReview(string clientId, int reviewValue)
    {
        var extendedReview = await _context.ExtendedReview.FirstOrDefaultAsync(extendedReview => extendedReview.ClientId == clientId);

        if (extendedReview != null)
        {
            switch (reviewValue)
            {
                case 1:
                    extendedReview.OneStar += 1;
                    break;
                case 2:
                    extendedReview.TwoStar += 1;
                    break;
                case 3:
                    extendedReview.ThreeStar += 1;
                    break;
                case 4:
                    extendedReview.FourStar += 1;
                    break;
                case 5:
                    extendedReview.FiveStar += 1;
                    break;
                default: return 0;
            }
            return (extendedReview.OneStar + extendedReview.TwoStar * 2 + extendedReview.ThreeStar * 3 + extendedReview.FourStar * 4 + extendedReview.FiveStar * 5) / (extendedReview.OneStar + extendedReview.TwoStar + extendedReview.ThreeStar + extendedReview.FourStar + extendedReview.FiveStar);

        }
        return 0;
    }
    private async Task<int> RemoveReviewRatingFromExtendedReview(string clientId, int reviewValue)
    {
        var extendedReview = await _context.ExtendedReview.FirstOrDefaultAsync(extendedReview => extendedReview.ClientId == clientId);

        if (extendedReview != null)
        {
            switch (reviewValue)
            {
                case 1:
                    extendedReview.OneStar -= 1;
                    break;
                case 2:
                    extendedReview.TwoStar -= 1;
                    break;
                case 3:
                    extendedReview.ThreeStar -= 1;
                    break;
                case 4:
                    extendedReview.FourStar -= 1;
                    break;
                case 5:
                    extendedReview.FiveStar -= 1;
                    break;
                default: return 0;
            }
            int rowsAffected = await _context.SaveChangesAsync();

            var newRating = (extendedReview.OneStar + extendedReview.TwoStar * 2 + extendedReview.ThreeStar * 3 + extendedReview.FourStar * 4 + extendedReview.FiveStar * 5) / (extendedReview.OneStar + extendedReview.TwoStar + extendedReview.ThreeStar + extendedReview.FourStar + extendedReview.FiveStar);

            if (rowsAffected == 1) return newRating;
        }
        return 0;
    }
}
