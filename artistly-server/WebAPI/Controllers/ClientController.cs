using Domain;
using Domain.Contracts;
using Domain.Models;
using Domain.Models.Clients;
using Domain.Responses;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.Clients;
using WebAPI.Services.Cache.Contract;
using WebAPI.Services.Firebase;
using WebAPI.Services.Pagination;

namespace WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ClientController(IClientService _clientService, ICacheService cacheService) : ControllerBase
{
    [Authorize]
    [HttpGet("{clientId}")]
    public async Task<IActionResult> GetResultAsync(string clientId)
    {
        var dbResponse = await _clientService.FirstOrDefault(clientId);

        if (dbResponse == null || dbResponse.StatusCode != ResponseCode.Found || dbResponse.Data is not Client client)
        {
            return BadRequest(dbResponse);
        }
        PremiumClientModel result = new(client);

        return Ok(result);
    }

    [Authorize]
    [HttpPost("available/{clientId}")]
    public async Task<bool> IsUsernameAvailable(string clientId)
    {
        if (string.IsNullOrEmpty(clientId))
        {
            return false;
        }

        var available = await _clientService.UsernameAvailable(clientId);

        return available;
    }

    [AllowAnonymous]
    [HttpPost("filter")]
    public async Task<IActionResult> FilterPaginatedAsync([FromBody] ClientFilterModel filter, [FromQuery] int pageIndex = 1)
    {
        if (filter == null)
        {
            return BadRequest("Filter cannot be null");
        }

        var domain = filter.ToDomain();

        var dbResponse = await _clientService.Filter(domain, pageIndex);

        if (dbResponse.StatusCode != ResponseCode.OK || dbResponse.Data is not PaginatedList<Client> data)
        {
            return BadRequest(dbResponse.StatusCode);
        }

        var page = data.Select(client => new ClientCard(client));

        return Ok(page);
    }

    [AllowAnonymous]
    [HttpGet("locations")]
    public IActionResult GetLocations()
    {
        cacheService.GetData<IEnumerable<string>>("locations");
        var list = Enum.GetValues(typeof(Locations))
               .Cast<Locations>()
               .Select(e => e.ToString().Replace("_", " "))
               .ToArray();
        cacheService.SetData("locations", list, DateTimeOffset.UtcNow.AddDays(7));
        return Ok(list);
    }

    [AllowAnonymous]
    [HttpGet("genres")]
    public IActionResult GetGenres()
    {
        cacheService.GetData<IEnumerable<string>>("genres");
        var list = Enum.GetValues(typeof(Genres))
               .Cast<Genres>()
               .Select(e => e.ToString().Replace("_", " "))
               .ToArray();
        cacheService.SetData("genres", list, DateTimeOffset.UtcNow.AddDays(7));
        return Ok(list);
    }

    [AllowAnonymous]
    [HttpGet("search")]
    public async Task<IActionResult> SearchClientsAsync([FromQuery] string name)
    {
        var dbResponse = await _clientService.Search(name);

        if (dbResponse.StatusCode != ResponseCode.Found || dbResponse.Data is not List<Client> data)
        {
            return BadRequest(dbResponse.StatusCode);
        }
        var clients = data.Select(client => new ClientCard(client));

        return Ok(clients);
    }

    [AllowAnonymous]
    [HttpGet("latest-added")]
    public IActionResult GetLatestAsync()
    {
        var data = cacheService.GetData<List<Client>>("latest-added");

        var clients = data.Select(client => new ClientCard(client));

        return Ok(clients);
    }

    [AllowAnonymous]
    [HttpGet("top")]
    public async Task<IActionResult> GetTopClients()
    {
        var dbResponse = await _clientService.GetTopClients();

        if (dbResponse.StatusCode != ResponseCode.OK || dbResponse.Data is not List<Client> data)
        {
            return BadRequest(dbResponse.StatusCode);
        }

        var clients = new List<ClientCard>();

        foreach (var client in data)
        {
            clients.Add(new ClientCard(client));
        }

        return Ok(clients);
    }

    [HttpGet("wishlist")]
    public async Task<IActionResult> GetWishlistAsync()
    {
        var idToken = HttpContext.Request.Headers.Authorization.ToString().Replace("Bearer ", "");

        FirebaseToken decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);

        string cacheKey = decoded.Uid + "_wishlist";

        var cachedWishlist = cacheService.GetData<IEnumerable<string>>(cacheKey);

        if (cachedWishlist == null)
        {
            return Ok(new List<ClientCard>());
        }

        List<ClientCard> clients = [];

        foreach (var clientId in cachedWishlist)
        {
            try
            {
                var dbResponse = await _clientService.FirstOrDefault(clientId);
                if (dbResponse.StatusCode == ResponseCode.Found && dbResponse.Data is Client client)
                    clients.Add(new ClientCard(client));
            }
            catch
            {
                continue;
            }
        }

        return Ok(clients);
    }

    [Authorize]
    [HttpPost("wishlist/{clientId}")]
    public async Task<IActionResult> PostToWishlistAsync(string clientId)
    {
        var idToken = HttpContext.Request.Headers.Authorization.ToString().Replace("Bearer ", "");

        FirebaseToken decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);

        string cacheKey = decoded.Uid + "_wishlist";

        var cachedWishlist = cacheService.GetData<IEnumerable<string>>(cacheKey);

        if (cachedWishlist == null)
        {
            cacheService.SetData(cacheKey, new List<string> { clientId }, DateTimeOffset.Now.AddDays(7));
            return Ok();
        }
        if (!cachedWishlist.Any())
        {
            cacheService.SetData(cacheKey, new List<string> { clientId }, DateTimeOffset.Now.AddDays(7));
            return Ok();
        }
        if (cachedWishlist.Any())
        {
            var newWishlist = cachedWishlist.ToList();
            newWishlist.Add(clientId);
            cacheService.SetData(cacheKey, newWishlist, DateTimeOffset.Now.AddDays(7));
            return Ok();
        }
        return BadRequest();
    }

    [Authorize]
    [HttpDelete("wishlist/{clientId}")]
    public async Task<IActionResult> DeleteFromWishlist(string clientId)
    {
        var idToken = HttpContext.Request.Headers.Authorization.ToString().Replace("Bearer ", "");

        FirebaseToken decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);

        string cacheKey = decoded.Uid + "_wishlist";

        var cachedWishlist = cacheService.GetData<IEnumerable<string>>(cacheKey);

        if (cachedWishlist == null)
        {
            return BadRequest();
        }
        if (cachedWishlist.Any())
        {
            var newWishlist = cachedWishlist.ToList();
            newWishlist.Remove(clientId);
            cacheService.SetData(cacheKey, newWishlist, DateTimeOffset.Now.AddDays(7));
            return Ok();
        }
        return BadRequest();
    }

    [Authorize]
    [HttpGet("wishlist/share")]
    public async Task<IActionResult> ShareWishlist()
    {
        var idToken = HttpContext.Request.Headers.Authorization.ToString().Replace("Bearer ", "");

        FirebaseToken decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);

        string cacheKey = decoded.Uid + "_wishlist";

        var cachedWishlist = cacheService.GetData<IEnumerable<string>>(cacheKey);

        if (cachedWishlist == null)
        {
            return BadRequest();
        }
        if (cachedWishlist.Any())
        {
            return Ok(Environment.GetEnvironmentVariable("DOMAIN") + "/wishlist?share=" + cacheKey);
        }
        return NoContent();
    }

    [AllowAnonymous]
    [HttpGet("wishlist/shared/{tokenId}")]
    public async Task<IActionResult> ShareWishlist(string tokenId)
    {
        var cachedWishlist = cacheService.GetData<IEnumerable<string>>(tokenId);

        if (cachedWishlist == null)
        {
            return Ok(new List<ClientCard>());
        }

        List<ClientCard> clients = [];

        foreach (var clientId in cachedWishlist)
        {
            try
            {
                var dbResponse = await _clientService.FirstOrDefault(clientId);
                if (dbResponse.StatusCode == ResponseCode.Found && dbResponse.Data is Client client)
                    clients.Add(new ClientCard(client));
            }
            catch
            {
                continue;
            }
        }

        return Ok(clients);
    }
}
