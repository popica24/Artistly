using Domain.Models.Categories;
using WebAPI.Utils;

namespace WebAPI.Models.Categories;

public class PostCategoryModel
{
    public string CategoryName { get; set; }

    public Category ToDomain()
    {
        return new Category
        {
            CategoryName = CategoryName,
            CategoryId = NameProcessor.IdHandle(CategoryName)
        };
    }
}
