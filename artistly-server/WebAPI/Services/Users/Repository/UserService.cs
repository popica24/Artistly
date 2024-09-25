using Domain.Contracts;
using Domain.Models.Clients;
using Domain.Models.Reviews;
using Domain.Models.Users;
using Domain.Responses;
using Microsoft.EntityFrameworkCore;
using WebAPI.Context;

namespace WebAPI.Services.Users.Repository;

public class UserService(ApplicationDbContext _context) : IUserService
{
    public async Task<InternalResponse> Create(User user)
    {

        if (!Validator.Validator.HandleDomain(user))
            return new InternalResponse
            {
                StatusCode = ResponseCode.BadRequest,
                Title = "Invalid format",
                Message = "The user format is invalid either null"
            };

        try
        {
            _context.User.Add(user);

            await _context.SaveChangesAsync();

            return new InternalResponse
            {
                StatusCode = ResponseCode.Created,
                Title = "Succes !",
                Message = "User succesfuly inserted in the database !"
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse
            {
                StatusCode = ResponseCode.InternalServerError,
                Message = ex.Message,
                Title = ex.Source,
                Data = ex.Data
            };
        }
    }

    public Task<InternalResponse> Delete(User user)
    {
        throw new NotImplementedException();
    }

    public async Task<InternalResponse> DeletePage(string userId, string pageId)
    {
        try
        {
            var client = await _context.Client.Include(c => c.Prices).Include(c => c.Reviews).Include(c => c.RequestedReviews).FirstOrDefaultAsync(c => c.ClientId == pageId && c.UserId == userId);

            if (client == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.Forbidden,
                    Title = "You are not authorized to delete this page"
                };
            }

            _context.Client.Remove(client);

            //await _context.SaveChangesAsync();

            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Client deleted successfuly !",
                Message = $"Client with the id {pageId} was deleted successfuly!"
            };

        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> FirstOrDefault(string userId)
    {
        if (string.IsNullOrEmpty(userId))
        {
            return new InternalResponse
            {
                StatusCode = ResponseCode.BadRequest,
                Title = "User id cannot be null"
            };
        }
        User? user = await _context.User.FirstOrDefaultAsync(u => u.UserId == userId);

        if (user == null)
        {
            return new InternalResponse
            {
                StatusCode = ResponseCode.NotFound,
                Title = $"User with the id {userId} could not be found"
            };
        }

        return new InternalResponse
        {
            StatusCode = ResponseCode.Found,
            Data = user,
            Title = $"User with the id {userId} found !",
        };
    }

    public async Task<InternalResponse> FirstOrDefaultStripe(string stripeId)
    {
        if (string.IsNullOrEmpty(stripeId))
        {
            return new InternalResponse
            {
                StatusCode = ResponseCode.BadRequest,
                Title = "User id cannot be null"
            };
        }
        User? user = await _context.User.FirstOrDefaultAsync(u => u.UserId == stripeId);

        if (user == null)
        {
            return new InternalResponse
            {
                StatusCode = ResponseCode.NotFound,
                Title = $"User with the id {stripeId} could not be found"
            };
        }

        return new InternalResponse
        {
            StatusCode = ResponseCode.Found,
            Data = user,
            Title = $"User with the id {stripeId} found !",
        };
    }

    public async Task<InternalResponse> GetPages(string userId)
    {
        try
        {
            if (string.IsNullOrEmpty(userId))
            {
                return new InternalResponse { StatusCode = ResponseCode.BadRequest, Title = "User id cannot be null", Message = "User id cannot be null" };
            }
            var user = await _context.User.Include(user => user.ClientsManaged).FirstOrDefaultAsync(user => user.UserId == userId);

            if (user != null && (user.Privilege == Domain.Privilege.Client))
            {
                return new InternalResponse() { StatusCode = ResponseCode.OK, Data = user.ClientsManaged, Title = "Pages found", Message = $"Pages found for user with the id {userId}" };
            }
            return new InternalResponse { StatusCode = ResponseCode.Unauthorized, Title = "User not found or privilege is not authorized", Message = "User not found or privilege is not authorized" };

        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> RequestPage(Client client)
    {
        try
        {
            _context.Client.Add(client);

            await _context.SaveChangesAsync();

            return new InternalResponse
            {
                StatusCode = ResponseCode.Created,
                Title = "Succes !",
                Message = "Page requested successfuly "
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> RequestPartnerAccount(RequestedUser model)
    {
        if (model == null)
            return new InternalResponse
            {
                StatusCode = ResponseCode.BadRequest,
                Title = "Model cannot be null !",
                Message = "Model is null"
            };
        try
        {
            User? user = await _context.User.FirstOrDefaultAsync(u => u.UserId == model.UserId);

            if (user == null)
                return new InternalResponse
                {
                    StatusCode = ResponseCode.BadRequest,
                    Title = "User is null",
                    Message = $"User cannot be retrieved from database for {model.UserId}"
                };

            _context.RequestedUser.Add(model);
            await _context.SaveChangesAsync();

            return new InternalResponse
            {
                StatusCode = ResponseCode.Created,
                Title = "Succes !",
                Message = "Client requested successfuly "
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> RequestReviewAsync(RequestedReview requestedReview)
    {
        try
        {
            if (requestedReview == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.BadRequest,
                    Title = "Request cannot be null",
                    Message = "Requested review is null"
                };
            }

            bool UserAlreadySubmittedReview = await _context.Review.Where(review => review.UserId == requestedReview.UserId && review.ClientId == requestedReview.ClientId).AnyAsync();

            if (UserAlreadySubmittedReview)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.Conflict,
                    Title = "User already submitted a review"
                };
            }

            var extendedReview = await _context.ExtendedReview.FirstOrDefaultAsync(extendedReview => extendedReview.ClientId == requestedReview.ClientId);

            _context.RequestedReview.Add(requestedReview);

            await _context.SaveChangesAsync();

            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Review requested succesfuly",
                Message = "Review requested succesfuly"
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> Update(User user)
    {
        var dbUser = await _context.User.FirstOrDefaultAsync(_user => _user.UserId == user.UserId);

        if (dbUser != null)
        {


            if (!string.IsNullOrEmpty(user.FirstName))
            {
                dbUser.FirstName = user.FirstName;
            }

            if (!string.IsNullOrEmpty(user.LastName))
            {
                dbUser.LastName = user.LastName;
            }

            await _context.SaveChangesAsync();

            return new InternalResponse { StatusCode = ResponseCode.OK, Message = "User updated successfully." };

        }

        return new InternalResponse { StatusCode = ResponseCode.NotFound, Message = "User not found." };
    }
}
