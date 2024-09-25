using Newtonsoft.Json;

namespace Domain.Models.Categories;

public class Subcategory
{
    public string? SubcategoryId { get; set; } = "";

    public string? SubcategoryName { get; set; } = "";

    [JsonIgnore]
    public string? CategoryId { get; set; } = "";

    [JsonIgnore]
    public Category? Category { get; set; }
}

