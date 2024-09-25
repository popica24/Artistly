using Domain.Models.Clients;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models.Reviews;

public class ExtendedReview
{
    [Key]
    public int ExtendedReviewId{ get; set; }
    public string ClientId { get; set; } = "";
    public int OneStar { get; set; } = 0;
    public int TwoStar { get; set; } = 0;
    public int ThreeStar { get; set; } = 0;
    public int FourStar { get; set; } = 0;
    public int FiveStar { get; set; } = 0;

    public Client? Client{ get; set; }

    public ExtendedReview()
    {
        
    }

    public ExtendedReview(string clientId)
    {
        ClientId = clientId;
        OneStar = 0; TwoStar = 0;ThreeStar = 0;FourStar = 0;FiveStar = 0;
    }
}
