using Domain.Models.Users;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models.Users;

public class UserModel
{
    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    public bool NewsletterEnabled { get; set; }

    public UserModel()
    {

    }

    public User ToDomain(string id = "")
    {
        return new User
        {
            UserId = id,
            FirstName = FirstName,
            LastName = LastName
        };
    }

    public UserModel(User user)
    {
        FirstName = user.FirstName;
        LastName = user.LastName;
    }
}
