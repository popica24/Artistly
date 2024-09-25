using Domain.Models.Clients;

namespace WebAPI.Models.Clients;

public class ClientFilterModel
{
    public string Name { get; set; } = string.Empty;

    public string[] Genres { get; set; } = [];

    public string[] Location { get; set; } = [];

    public string? Rating { get; set; }

    public string Subcategory { get; set; } = string.Empty;

    public ClientFilter ToDomain()
    {
        bool parsed = int.TryParse(Rating, out int minRating);
        if (!parsed)
        {
            minRating = 0;
        }
        return new ClientFilter
        {
            Name = Name,
            Service = Genres,
            Location = Location,
            MinRating = minRating,
            SubcategoryId = Subcategory,
        };
    }
}