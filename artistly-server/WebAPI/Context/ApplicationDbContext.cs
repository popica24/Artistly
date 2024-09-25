using Domain;
using Domain.Models.Categories;
using Domain.Models.Clients;
using Domain.Models.Prices;
using Domain.Models.Reviews;
using Domain.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Context;

public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Client> Client { get; set; }
    public DbSet<User> User { get; set; }
    public DbSet<RequestedUser> RequestedUser { get; set; }

    public DbSet<Review> Review { get; set; }

    public DbSet<RequestedReview> RequestedReview { get; set; }

    public DbSet<ExtendedReview> ExtendedReview { get; set; }

    public DbSet<Category> Category { get; set; }
    public DbSet<Subcategory> Subcategory { get; set; }

    public DbSet<Price> Price { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasMany(cu => cu.ClientsManaged)
            .WithOne(cu => cu.User)
            .HasForeignKey(cu => cu.UserId);

        modelBuilder.Entity<User>()
            .HasMany(cu => cu.RequestedReviews)
            .WithOne(cu => cu.User)
            .HasForeignKey(cu => cu.UserId);

        modelBuilder.Entity<Client>()
            .HasMany(cp => cp.Prices)
            .WithOne(cp => cp.Client)
            .HasForeignKey(cp => cp.ClientId);

        modelBuilder.Entity<Client>()
            .HasMany(cr => cr.Reviews)
            .WithOne(cr => cr.Client)
            .HasForeignKey(cr => cr.ClientId);

        modelBuilder.Entity<Client>()
            .HasOne(r => r.ExtendedReview)
            .WithOne(r => r.Client)
            .HasForeignKey<ExtendedReview>(r => r.ClientId);

        modelBuilder.Entity<Client>()
           .Property(t => t.PromotedPlace)
           .HasConversion(
               v => v.ToString(),
               v => (PromotedPlace)Enum.Parse(typeof(PromotedPlace), v)
               );

        modelBuilder.Entity<Category>()
            .HasMany(cs => cs.Subcategories)
            .WithOne(cs => cs.Category)
            .HasForeignKey(cs => cs.CategoryId);

        modelBuilder.Entity<Review>()
            .HasKey(uc => new
            {
                uc.UserId,
                uc.ClientId
            });

        modelBuilder.Entity<RequestedReview>()
            .HasOne(rR => rR.Client)
            .WithMany(c => c.RequestedReviews)
            .HasForeignKey(rR => rR.ClientId);

    }
}
