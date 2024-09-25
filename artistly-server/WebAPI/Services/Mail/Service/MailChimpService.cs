using MailChimp.Net;
using MailChimp.Net.Interfaces;
using MailChimp.Net.Models;
using WebAPI.Services.Mail.Contract;

namespace WebAPI.Services.Mail.Service;

public class MailChimpService : IMailChimService
{
    private const string ApiKey = "dc1d225d6325071256b8d6c36e842a7b-us13";
    private const string ListId = "8240e1b849";

    private readonly IMailChimpManager mailChimpManager;
    public MailChimpService()
    {
        mailChimpManager = new MailChimpManager(ApiKey);
    }


    public async Task<bool> Subscribe(string emailAddress)
    {
        try
        {
            var member = await mailChimpManager.Members.GetAsync(ListId, emailAddress);

            member.Status = Status.Subscribed;

            await mailChimpManager.Members.AddOrUpdateAsync(ListId, member);

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public async Task<bool> CheckEnrollStatus(string email)
    {
        try
        {
            return (await mailChimpManager.Members.GetAsync(ListId, email)).Status == Status.Subscribed;

        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public async Task<bool> CreateNewUser(string emailAddress, string firstName, string lastName)
    {
        try
        {
            var newMember = new Member
            {
                EmailAddress = emailAddress,
                StatusIfNew = Status.Unsubscribed
            };

            newMember.MergeFields.Add("FNAME", firstName);
            newMember.MergeFields.Add("LNAME", lastName);

            await mailChimpManager.Members.AddOrUpdateAsync(ListId, newMember);

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public async Task<bool> Unsubscrube(string emailAddress)
    {
        try
        {
            if (await mailChimpManager.Members.ExistsAsync(ListId, emailAddress))
            {
                var member = await mailChimpManager.Members.GetAsync(ListId, emailAddress);


                member.Status = Status.Unsubscribed;

                await mailChimpManager.Members.AddOrUpdateAsync(ListId, member);
            }

            return true;

        }
        catch (Exception ex)
        {
            return false;
        }
    }
}
