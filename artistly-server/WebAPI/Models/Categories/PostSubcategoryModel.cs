using Domain.Models.Categories;
using WebAPI.Utils;

namespace WebAPI.Models.Categories;

public class PostSubcategoryModel
{
    public string SubcategoryName { get; set; }

    public Subcategory ToDomain(string categoryId)
    {
        return new Subcategory
        {
            SubcategoryId = NameProcessor.IdHandle(SubcategoryName),
            SubcategoryName = SubcategoryName,
            CategoryId = categoryId
        };
    }
}
