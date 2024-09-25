using Domain.Models.Clients;

namespace WebAPI.Models.Clients
{
    public class PageCard
    {
        public string ClientName { get; set; }
        public string ClientTag { get; set; }
        public bool Listed { get; set; }
        public string ClientHandle { get; set; }

        public PageCard()
        {
            
        }

        public PageCard(Client client)
        {
            ClientName = client.ClientName;
            ClientTag = client.ClientTag;
            Listed = client.Approved;
            ClientHandle = client.ClientId;
        }
    }
}
