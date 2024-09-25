using System.ComponentModel.DataAnnotations;

namespace Domain.Models.Users;

public class RequestedUser
{
    [Key]
    public string UserId { get; set; } = "";
    public string DateAdded { get; set; } = DateTime.UtcNow.ToShortDateString() + " " + DateTime.UtcNow.ToShortTimeString();
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string PhoneNumber { get; set; } = "";
    public string Status { get; set; } = "";
    public string Category { get; set; } = "";
    public string Subcategory { get; set; } = "";
    public string? Genre { get; set; }
}
