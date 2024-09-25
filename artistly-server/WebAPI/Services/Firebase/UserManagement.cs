using Domain;
using Domain.Responses;
using FirebaseAdmin.Auth;

namespace WebAPI.Services.Firebase;

public class UserManagement : IUserManagement
{
    public bool CheckPrivilege(FirebaseToken decoded, Privilege privilege)
    {
        try
        {
            if (decoded.Claims.TryGetValue("privilege", out object privilegeClaim))
            {
                if (privilegeClaim is long privilegeValue)
                {
                    Privilege decodedePrivilege = (Privilege)privilegeValue;
                    return decodedePrivilege == privilege;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
        catch (FirebaseAuthException ex)
        {
            return false;
        }
        catch (ArgumentException ex)
        {
            return false;
        }
    }

    public async Task<InternalResponse> SetPrivilege(string clientId, Privilege privilege)
    {
        try
        {
            var claims = new Dictionary<string, object>
            {
                { "privilege", (int)privilege }
            };

            await FirebaseAuth.DefaultInstance.SetCustomUserClaimsAsync(clientId, claims);

            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Claims set",
                Message = $"Privilege {claims} set for the user with the id {clientId}"
            };
        }
        catch (FirebaseAuthException ex)
        {
            return new InternalResponse { StatusCode = ResponseCode.InternalServerError, Title = ex.AuthErrorCode.ToString(), Data = ex.Message };
        }
        catch (ArgumentException ex)
        {
            return new InternalResponse { StatusCode = ResponseCode.InternalServerError, Title = "ArgumentException", Data = ex.Message };
        }
    }

    public async Task<InternalResponse> CreateUserAsync(UserRecordArgs userRecordArgs)
    {
        try
        {
            var response = await FirebaseAuth.DefaultInstance.CreateUserAsync(userRecordArgs);

            return new InternalResponse
            {
                StatusCode = ResponseCode.Created,
                Title = "User created",
                Data = response,
                Message = $"User with the credentials {userRecordArgs} created !"
            };
        }
        catch (FirebaseAuthException ex)
        {
            if (ex.AuthErrorCode == AuthErrorCode.EmailAlreadyExists)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.Conflict,
                    Title = "Email already registered",
                    Message = $"User with the email {userRecordArgs.Email} already exists"
                };
            }
            return new InternalResponse
            {
                StatusCode = ResponseCode.InternalServerError,
                Title = "Unexpected Error",
                Message = $"Failed to create user with the credentials ${userRecordArgs}"
            };
        }
    }

    public async Task<InternalResponse> GetUserAsync(string uId)
    {
        try
        {
            UserRecord userRecord = await FirebaseAuth.DefaultInstance.GetUserAsync(uId);

            return new InternalResponse
            {
                StatusCode = ResponseCode.Found,
                Title = "User found !",
                Message = $"A user with the id {uId} was found in the FirebaseAuth",
                Data = userRecord,
            };
        }
        catch (FirebaseAuthException ex)
        {
            if (ex.AuthErrorCode == AuthErrorCode.UserNotFound)
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = "User was not found !",
                    Message = $"User with the {uId} was not found"
                };

            return new InternalResponse
            {
                StatusCode = ResponseCode.InternalServerError,
                Title = "Unexpected Error",
                Message = $"Failed to retrieve user with the id ${uId}"
            };
        }
    }

    public async Task<InternalResponse> SetCustomClaim(FirebaseToken decoded, Dictionary<string, object> customClaims)
    {
        try
        {
            await FirebaseAuth.DefaultInstance.SetCustomUserClaimsAsync(decoded.Uid, customClaims);

            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Claims set",
                Message = $"Claims {customClaims} set for the user with the id {decoded.Uid}"
            };
        }
        catch (FirebaseAuthException ex)
        {
            return new InternalResponse { StatusCode = ResponseCode.InternalServerError, Title = ex.AuthErrorCode.ToString(), Data = ex.Message };
        }
        catch (ArgumentException ex)
        {
            return new InternalResponse { StatusCode = ResponseCode.InternalServerError, Title = "ArgumentException", Data = ex.Message };
        }
    }
}
