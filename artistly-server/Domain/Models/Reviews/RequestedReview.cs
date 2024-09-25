using Domain.Models.Clients;
using Domain.Models.Users;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models.Reviews;

public class RequestedReview
{
    [Key]
    public int ReviewId { get; set; }
    public string ClientId { get; set; }
    public string UserId { get; set; }
    public string DateAdded
    {
        get; set;
    }
    public required string ReviewTitle
    {
        get; set;
    }
    public required string ReviewBody
    {
        get; set;
    }
    public int ReviewValue { get; set; } = 0;

    public Client? Client { get; set; }

    public User? User { get; set; }
    public string DateRequested { get; set; } = DateTime.UtcNow.ToShortDateString() + " " + DateTime.UtcNow.ToShortTimeString();
}
