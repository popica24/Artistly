namespace Domain.Models.Categories;

public class Category
{
    public string? CategoryId { get; set; } = "";
    public string? CategoryName { get; set; } = "";
    public ICollection<Subcategory>? Subcategories { get; set; }
}

