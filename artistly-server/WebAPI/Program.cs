using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Context;
using WebAPI.Services.BackgroundServices;
using WebAPI.Utils;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRouting(options => options.LowercaseUrls = true);
builder.Services.AddHealthChecks();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.ApplyServices();
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddHostedService<RefreshLatestAddedService>();

builder.Services.AddCors(opts =>
{
    opts.AddPolicy("WebPolicy", policy =>
    {
        var domain = Environment.GetEnvironmentVariable("DOMAIN");
        var adminDomain = Environment.GetEnvironmentVariable("ADMIN_DOMAIN");

        policy.WithOrigins(domain, adminDomain).AllowAnyMethod().AllowAnyHeader();
    });
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(opt =>
{
    opt.Authority = Environment.GetEnvironmentVariable("JWT_VALID_ISSUER")!;
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = Environment.GetEnvironmentVariable("JWT_VALID_ISSUER")!,
        ValidAudience = Environment.GetEnvironmentVariable("JWT_VALID_AUDIENCE")!
    };
});

builder.Services.AddAuthorizationBuilder()
    .AddPolicy("AdminPolicy", policy => policy.RequireClaim("privilege", "999"));

FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile("artistly-f46e4-firebase-adminsdk-b83ks-87d75650bf.json")
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    DbSeeder.SeedData(services);
}


app.MapHealthChecks("/health");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("WebPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
