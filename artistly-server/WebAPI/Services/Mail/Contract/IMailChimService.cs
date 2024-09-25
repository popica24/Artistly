using Domain.Responses;

namespace WebAPI.Services.Mail.Contract
{
    public interface IMailChimService
    {
        Task<bool> Unsubscrube(string emailAddress);
        Task<bool> Subscribe(string emailAddress);
        Task<bool> CheckEnrollStatus(string email);
        Task<bool> CreateNewUser(string emailAddress, string firstName, string lastName);
    }
}
