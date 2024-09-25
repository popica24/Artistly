namespace Domain.Models.Clients;

public class ClientFilter
{
    public string Name { get; set; } = string.Empty;

    public string[] Service { get; set; } = [];

    public string[] Location { get; set; } = [];

    public int? MinRating { get; set; }

    public string SubcategoryId { get; set; } = string.Empty;
}
