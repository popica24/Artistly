using Domain.Models.Clients;
using Domain.Models.Users;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Models.Clients;
using WebAPI.Models.Prices;
using WebAPI.Models.Users;

namespace WebAPI.Services.Users.Validator;

public static class Validator
{
    public static bool HandleDomain(User user)
    {
        return user != null && !string.IsNullOrEmpty(user.UserId);
    }

    public static bool HandleRequest(UserModel user)
    {
        return user != null && !string.IsNullOrEmpty(user.FirstName) && !string.IsNullOrEmpty(user.LastName);
    }

    public static bool HandleClientDomain(Client? client)
    {
        return client != null &&
            !string.IsNullOrEmpty(client.UserId) &&
            !string.IsNullOrEmpty(client.ClientName) &&
            !string.IsNullOrEmpty(client.ClientTag) &&
            !string.IsNullOrEmpty(client.ClientId) &&
            !string.IsNullOrEmpty(client.EventDetails) &&
            !string.IsNullOrEmpty(client.SubcategoryId);
    }

    public static bool HandleClientRequest(ClientRequest client)
    {
        var clientResponse = client != null &&
            !string.IsNullOrEmpty(client.Category) &&
            !string.IsNullOrEmpty(client.Subcategory) &&
            !string.IsNullOrEmpty(client.Name) &&
            !string.IsNullOrEmpty(client.Description);
        var pricesResponse = client.Prices.Any() && HandlePriceRequest(client.Prices);


        return clientResponse && pricesResponse;
    }

    private static bool HandlePriceRequest(IEnumerable<PriceModel> prices)
    {
        foreach (var price in prices)
        {
            if (!string.IsNullOrEmpty(price.Title) && !string.IsNullOrEmpty(price.Description) && !string.IsNullOrEmpty(price.Currency) && price.Ammount <= 0)
                return false;
        }
        return true;
    }
}
