using Domain.Responses;

namespace Domain.Contracts;

public interface IAdminService
{
    Task<InternalResponse> ApprovePageAsync(string pageId);
    Task<InternalResponse> ApprovePartnerAccountAsync(string partnerId);
    Task<InternalResponse> ApproveReviewAsync(int reviewId);
    Task<InternalResponse> DeletePageAsync(string clientId);
    Task<InternalResponse> DeleteReviewAsync(int reviewId);
    Task<InternalResponse> DenyPageAsync(string pageId);
    Task<InternalResponse> DenyPartnerAccountAsync(string partnerId);
    Task<InternalResponse> DenyReviewAsync(int reviewId);
    Task<InternalResponse> GetFreeUsersPaginatedAsync(int pageIndex);
    Task<InternalResponse> GetPageRequestsAsync(int pageIndex);
    Task<InternalResponse> GetPagesPaginatedAsync(int pageIndex);
    Task<InternalResponse> GetPartnerRequestsPaginatedAsync(int pageIndex);
    Task<InternalResponse> GetPartnersPaginatedAsync(int pageIndex);
    Task<InternalResponse> GetReviewRequestsPaginatedAsync(int pageIndex);
    Task<InternalResponse> GetReviewsPaginatedAsync(int pageIndex);
    Task<InternalResponse> PromoteAsync(string clientId, PromotedPlace place);
    Task<InternalResponse> RemovePromoteAsync(string clientId);
}
