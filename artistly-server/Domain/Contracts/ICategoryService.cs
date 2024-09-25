using Domain.Models.Categories;
using Domain.Responses;

namespace Domain.Contracts;

public interface ICategoryService
{
    Task<InternalResponse> AddCategory(Category category);
    Task<InternalResponse> AddSubcategory(string categoryId, Subcategory subcategory);
    Task<InternalResponse> Get();
}
