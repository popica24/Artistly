using Domain.Models.Clients;
using Domain.Responses;

namespace Domain.Contracts;

public interface IClientService
{
    Task<InternalResponse> FirstOrDefault(string clientId);
    Task<InternalResponse> Filter(ClientFilter filter, int pageIndex);
    Task<List<Client>>? GetLatest();
    Task<InternalResponse> Search(string name);
    Task<InternalResponse> GetTopClients();
    Task<bool> UsernameAvailable(string handler);
}
