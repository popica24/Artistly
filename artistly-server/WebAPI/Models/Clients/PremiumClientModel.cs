using Domain.Models.Clients;
using WebAPI.Models.Prices;

namespace WebAPI.Models.Clients
{
    public class PremiumClientModel : FreeClientModel
    {
        public IEnumerable<PriceModel> Prices { get; set; }
        public string ContactName { get; set; }
        public string ContactType { get; set; }
        public string ContactNumber { get; set; }
        public string ContactEmail { get; set; }

        public PremiumClientModel(Client client) : base(client)
        {
            Prices = client.Prices.Select(x=>new PriceModel(x)).ToList();
            ContactName = client.ContactName;
            ContactType = client.ContactType;
            ContactNumber = client.ContactNumber;
            ContactEmail = client.ContactEmail;
        }
    }
}
