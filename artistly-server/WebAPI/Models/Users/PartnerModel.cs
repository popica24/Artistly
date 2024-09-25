using Domain.Models.Users;

namespace WebAPI.Models.Users
{
    public class PartnerModel : UserModel
    {
        public PartnerModel(User user) : base(user)
        {
            FirstName = user.FirstName;
            LastName = user.LastName;  
        }
    }
}
