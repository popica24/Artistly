namespace WebAPI.Services.Admin.Models.Reviews;

public class ReviewModel
{
    public int? ReqId { get; set; }
    public string FirstName { get; set; }
    public string ClientHandle { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string ClientTag { get; set; }
    public string ClientName { get; set; }
    public string ReviewTitle { get; set; }
    public string ReviewBody { get; set; }
    public int Rating { get; set; }
}
