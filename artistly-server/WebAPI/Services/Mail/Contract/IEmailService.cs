using Domain.Responses;

namespace WebAPI.Services.Mail.Contract;

public interface IEmailService
{
    InternalResponse SendMail(string title, string toAddress, string htmlBody);

    InternalResponse ReceiveMail(string title, string fromAddress, string htmlBody, string toAddress);
}
