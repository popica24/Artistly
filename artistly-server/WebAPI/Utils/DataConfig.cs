using Domain.Contracts;
using WebAPI.Services.Admin.Repository;
using WebAPI.Services.Cache.Contract;
using WebAPI.Services.Cache.Repository;
using WebAPI.Services.Categories.Repository;
using WebAPI.Services.Clients.Repository;
using WebAPI.Services.Firebase;
using WebAPI.Services.Mail.Contract;
using WebAPI.Services.Mail.Service;
using WebAPI.Services.Users.Repository;

namespace WebAPI.Utils;

public static class DataConfig
{
    public static void ApplyServices(this IServiceCollection services)
    {
        services.AddTransient<IUserManagement, UserManagement>();
        services.AddTransient<IUserService, UserService>();
        services.AddTransient<IClientService, ClientService>();
        services.AddTransient<ICategoryService, CategoryService>();
        services.AddTransient<IAdminService, AdminService>();
        services.AddTransient<IEmailService,EmailService>();
        services.AddTransient<IMailChimService, MailChimpService>();
        services.AddTransient<ICacheService, CacheService>();
    }
}
