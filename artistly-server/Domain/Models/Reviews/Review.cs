using Domain.Models.Clients;
using Domain.Models.Users;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models.Reviews;

public class Review
{
    public Review(RequestedReview reviewRequest)
    {
        ReviewId = reviewRequest.ReviewId;
        ClientId  = reviewRequest.ClientId; 
        DateAdded = reviewRequest.DateAdded;
        ReviewTitle = reviewRequest.ReviewTitle;
        ReviewBody = reviewRequest.ReviewBody;
        ReviewValue = reviewRequest.ReviewValue;
        UserId = reviewRequest.UserId;
        Client = reviewRequest.Client;
    }

    public Review()
    {
        
    }

    [Key]
    public int ReviewId { get; set; }
    public string ClientId { get; set; }
    public string UserId { get; set; }
    public string DateAdded
    {
        get; set;
    }
    public string ReviewTitle
    {
        get; set;
    }
    public string ReviewBody
    {
        get; set;
    }
    public int ReviewValue { get; set; } = 0;

    public Client? Client { get; set; }

    public User? User { get; set; }
    public RequestedReview ReviewRequest { get; }
}
