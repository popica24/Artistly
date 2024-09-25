using Domain.Models.Clients;
using Domain.Models.Reviews;
using Domain.Models.Users;
using Domain.Responses;

namespace Domain.Contracts;

public interface IUserService
{
    Task<InternalResponse> Create(User user);
    Task<InternalResponse> Update(User user);
    Task<InternalResponse> Delete(User user);
    Task<InternalResponse> FirstOrDefault(string userId);
    Task<InternalResponse> RequestPage(Client client);
    Task<InternalResponse> RequestPartnerAccount(RequestedUser model);
    Task<InternalResponse> RequestReviewAsync(RequestedReview requestedReview);
    Task<InternalResponse> DeletePage(string userId, string pageId);
    Task<InternalResponse> GetPages(string userId);
    Task<InternalResponse> FirstOrDefaultStripe(string stripeId);
}
