using Domain.Models.Users;

namespace WebAPI.Models.Users;  

public class RequestUserModel
{
    public string UserId { get; set; } = "";
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string PhoneNumber { get; set; } = "";
    public string Status { get; set; } = "";
    public string Category { get; set; } = "";
    public string Subcategory { get; set; } = "";
    public string? Genre { get; set; }

    public RequestedUser ToDomain ()
    {
        return new RequestedUser
        {
            DateAdded = DateTime.UtcNow.ToShortDateString() + " " + DateTime.UtcNow.ToShortTimeString(),
            UserId = UserId,
            FirstName = FirstName,
            LastName = LastName,
            PhoneNumber = PhoneNumber,
            Status = Status,
            Category = Category,
            Subcategory = Subcategory,
            Genre = Genre
        };
    }
}
