using Domain;
using Domain.Responses;
using FirebaseAdmin.Auth;

namespace WebAPI.Services.Firebase;

public interface IUserManagement
{
    Task<InternalResponse> GetUserAsync(string uId);
    Task<InternalResponse> CreateUserAsync(UserRecordArgs userRecord);
    bool CheckPrivilege(FirebaseToken token, Privilege privilege);
    Task<InternalResponse> SetPrivilege(string clientId, Privilege privilege);
    Task<InternalResponse> SetCustomClaim(FirebaseToken token, Dictionary<string, object> customClaims);
}
