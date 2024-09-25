using Domain.Models.Clients;

namespace WebAPI.Models.Clients;

public class ClientCard
{
    public string ClientHandle { get; set; }
    public string ClientTag { get; set; }
    public string ClientName { get; set; }
    public string ClientDescription { get; set; }
    public int ClientRating { get; set; }
    public string Facebook { get; set; }
    public string Instagram { get; set; }
    public string Youtube { get; set; }
    public string Tiktok { get; set; }

    public ClientCard(Client client)
    {
        ClientHandle = client.ClientId;
        ClientTag = client.ClientTag;
        ClientName = client.ClientName;
        ClientDescription = client.Description;
        Facebook = client.Facebook;
        Instagram = client.Instagram;
        Youtube = client.Youtube;
        Tiktok = client.Tiktok;
        ClientRating = client.ClientRating;
    }
}
