namespace WebAPI.Services.Admin.Models.Users;

public class PartnerModel
{
    public string ClientId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public bool NewsletterActive { get; set; }
    public string PhoneNumber { get; set; }
    public string Status { get; set; }
    public string Categories { get; set; }
    public string[] Pages { get; set; }
}
