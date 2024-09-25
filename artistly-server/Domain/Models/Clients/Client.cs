using Domain.Models.Categories;
using Domain.Models.Prices;
using Domain.Models.Reviews;
using Domain.Models.Users;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models.Clients;

public class Client
{
    [Key]
    public string ClientId { get; set; } = "";
    public string UserId { get; set; } = "";
    public string ClientName { get; set; } = "";
    public string ClientTag { get; set; } = "";

    [MaxLength(300)]
    public string Description { get; set; } = "";

    [MaxLength(1000)]
    public string EventDetails { get; set; } = "";
    public string ContactName { get; set; } = "";
    public string ContactType { get; set; } = "";
    public string ContactNumber { get; set; } = "";
    public string ContactEmail { get; set; } = "";

    public string Facebook { get; set; } = "";
    public string Instagram { get; set; } = "";
    public string Tiktok { get; set; } = "";
    public string Youtube { get; set; } = "";

    public string[] YoutubeLinks { get; set; } = [];

    public int ClientRating { get; set; } = 0;

    public string? SubcategoryId { get; set; }

    public string? MusicGenre { get; set; }

    public string Location { get; set; }

    public PromotedPlace? PromotedPlace { get; set; }

    public bool Approved { get; set; } = false;

    public ICollection<Price>? Prices { get; set; }

    public ICollection<Review>? Reviews { get; set; }

    public ICollection<RequestedReview>? RequestedReviews { get; set; }

    public ExtendedReview? ExtendedReview { get; set; }

    public Subcategory? Subcategory{ get; set; }

    public User? User { get; set; }
}

