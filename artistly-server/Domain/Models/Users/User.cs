using Domain.Models.Clients;
using Domain.Models.Reviews;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models.Users;

public class User
{
    [Key]
    public string UserId { get; set; } = "";
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string PhoneNumber { get; set; } = "";
    public bool FreeViewUsed { get; set; } = false;
    public Privilege Privilege { get; set; } = Privilege.User;
    public ICollection<Client>? ClientsManaged { get; set; }
    public string Status { get; set; } = "";
    public string Categories { get; set; } = "";
    public ICollection<RequestedReview>? RequestedReviews { get; set; }
}

