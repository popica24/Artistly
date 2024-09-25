using Domain;
using Domain.Contracts;
using Domain.Models.Clients;
using Domain.Models.Reviews;
using Domain.Responses;
using Microsoft.EntityFrameworkCore;
using WebAPI.Context;
using WebAPI.Services.Pagination;

namespace WebAPI.Services.Clients.Repository;

public class ClientService(ApplicationDbContext _context) : IClientService
{
    public async Task<InternalResponse> Filter(ClientFilter filter, int pageIndex)
    {
        if (filter == null)
            return new InternalResponse { StatusCode = ResponseCode.BadRequest, Title = "Filter cannot be null" };

        if (!_context.Subcategory.Any(x => x.SubcategoryId == filter.SubcategoryId))
        {
            return new InternalResponse { StatusCode = ResponseCode.NotFound, Title = "Client does not belong to this category" };
        }

        var query = _context.Client.AsQueryable();

        query = query.Where(x => x.Approved);

        if (!string.IsNullOrEmpty(filter.SubcategoryId))
            query = query.Where(x => x.SubcategoryId.ToLower().Equals(filter.SubcategoryId.ToLower()));

        if (!string.IsNullOrEmpty(filter.Name))
            query = query.Where(x => x.ClientName.StartsWith(filter.Name, StringComparison.CurrentCultureIgnoreCase));

        if (filter.Service != null && filter.Service.Length != 0)
            query = query.Where(x => filter.Service.Any(service =>
                x.ClientTag == service));

        if (filter.Location != null && filter.Location.Length != 0)
            query = query.Where(x => filter.Location.Any(location =>
                x.Location == location.Replace(" ", "_")));


        if (filter.MinRating.HasValue)
            query = query.Where(x => x.ClientRating >= filter.MinRating);

        var page = await PaginatedList<Client>.CreateAsync(query, pageIndex);

        return new InternalResponse
        {
            StatusCode = ResponseCode.OK,
            Data = page
        };
    }

    public async Task<InternalResponse> FirstOrDefault(string clientId)
    {
        if (string.IsNullOrEmpty(clientId))
        {
            return new InternalResponse
            {
                StatusCode = ResponseCode.BadRequest,
                Title = "Client id cannot be null",
                Message = "Client id cannot be null"
            };
        }

        Client? client = await _context.Client.Include(c => c.Prices).Include(c => c.ExtendedReview).FirstOrDefaultAsync(c => c.ClientId == clientId);

        if (client == null)
        {
            return new InternalResponse
            {
                StatusCode = ResponseCode.NotFound,
                Title = $"User with the id {clientId} could not be found"
            };
        }

        if (!client.Approved)
        {
            return new InternalResponse
            {
                StatusCode = ResponseCode.Unauthorized,
                Title = $"You do not have access to {client.ClientName}"
            };
        }

        ICollection<Review> reviews = await _context.Review.Include(u => u.User).Where(r => r.ClientId == clientId).ToListAsync();

        client.Reviews = reviews;

        return new InternalResponse
        {
            StatusCode = ResponseCode.Found,
            Data = client,
            Title = $"User with the id {clientId} found !",
        };
    }

    public async Task<List<Client>?> GetLatest()
    {
        try
        {
            return await _context.Client.Where(client => client.Approved).Take(6).ToListAsync();

        }
        catch (Exception ex)
        {
            return null;
        }
    }

    public async Task<InternalResponse> GetTopClients()
    {
        try
        {

            Client? firstClient = await _context.Client.FirstOrDefaultAsync(client => client.PromotedPlace == PromotedPlace.Primary);
            Client? secondClient = await _context.Client.FirstOrDefaultAsync(client => client.PromotedPlace == PromotedPlace.Secondary);
            Client? thirdClient = await _context.Client.FirstOrDefaultAsync(client => client.PromotedPlace == PromotedPlace.Tertiary);

            var clientList = new List<Client>();
            if (firstClient != null)
            {
                clientList.Add(firstClient);
            }
            if (secondClient != null)
            {
                clientList.Add(secondClient);
            }
            if (thirdClient != null)
            {
                clientList.Add(thirdClient);
            }

            return new InternalResponse { Data = clientList, StatusCode = ResponseCode.OK };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> Search(string name)
    {
        if (string.IsNullOrEmpty(name))
        {
            return new InternalResponse
            {
                StatusCode = ResponseCode.NoContent
            };
        }
        try
        {
            var result = await _context.Client.Where(client => client.ClientName.ToLower().StartsWith(name.Trim().ToLower()) && client.Approved).ToListAsync();

            return new InternalResponse
            {
                Data = result,
                StatusCode = ResponseCode.Found,
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<bool> UsernameAvailable(string handler)
    {
        return await _context.Client.AnyAsync(client => !client.ClientId.Equals(handler));
    }
}
