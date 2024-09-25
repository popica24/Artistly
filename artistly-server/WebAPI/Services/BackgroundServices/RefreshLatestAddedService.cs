using Domain.Contracts;
using Domain.Models.Clients;
using WebAPI.Context;
using WebAPI.Services.Cache.Contract;

namespace WebAPI.Services.BackgroundServices;

public class RefreshLatestAddedService : BackgroundService
{
    private readonly IServiceScopeFactory _serviceScopeFactory;

    public RefreshLatestAddedService(IServiceScopeFactory serviceScopeFactory)
    {
        _serviceScopeFactory = serviceScopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await RefreshLatestAdded(stoppingToken);

        using PeriodicTimer timer = new(TimeSpan.FromMinutes(1));

        try
        {
            while (await timer.WaitForNextTickAsync(stoppingToken))
            {
                await RefreshLatestAdded(stoppingToken);
            }
        }
        catch (OperationCanceledException)
        {
            // Gracefully handle the cancellation
        }
    }

    private async Task RefreshLatestAdded(CancellationToken stoppingToken)
    {
        // Create a new scope to resolve scoped services
        using (var scope = _serviceScopeFactory.CreateScope())
        {
            // Resolve scoped services within the scope
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var clientService = scope.ServiceProvider.GetRequiredService<IClientService>();
            var cacheService = scope.ServiceProvider.GetRequiredService<ICacheService>();

            // Fetch the latest clients
            List<Client>? clients = await clientService.GetLatest();

            if (clients != null)
            {
                // Cache the data
                cacheService.SetData("latest-added", clients, DateTime.Now.AddDays(1));
            }
        }
    }
}
