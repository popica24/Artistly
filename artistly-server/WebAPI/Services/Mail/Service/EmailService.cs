using Domain.Responses;
using MimeKit;
using MailKit.Net.Smtp;

using WebAPI.Services.Mail.Contract;

namespace WebAPI.Services.Mail.Service;

public class EmailService() : IEmailService
{
    public InternalResponse ReceiveMail(string title, string fromAddress, string htmlBody, string toAddress)
    {
        var message = new MimeMessage();
        message.To.Add(new MailboxAddress("Artistly", toAddress));
        message.From.Add(new MailboxAddress(fromAddress, "mail@artistly.ro"));
        message.Subject = title;
        message.Body = new TextPart("html") { Text = htmlBody };

        using var smtp = new SmtpClient();
        smtp.Connect("mail.artistly.ro", 465, true);
        smtp.Authenticate("mail@artistly.ro", "}-A08e?m&V8D");
        smtp.Send(message);
        smtp.Disconnect(true);

        return new InternalResponse
        {
            StatusCode = ResponseCode.OK,
        };
    }

    public InternalResponse SendMail(string title, string toAddress, string htmlBody)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Artistly", "no-reply@artistly.ro"));
        message.To.Add(new MailboxAddress("", toAddress));
        message.Subject = title;
        message.Body = new TextPart("html") { Text = htmlBody };

        using var smtp = new SmtpClient();
        smtp.Connect("mail.artistly.ro", 465, true);
        smtp.Authenticate("no-reply@artistly.ro", ".djbfjFreRk%");
        smtp.Send(message);
        smtp.Disconnect(true);

        return new InternalResponse
        {
            StatusCode = ResponseCode.OK,
        };
    }
}
