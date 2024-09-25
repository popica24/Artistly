using Domain.Contracts;
using Domain.Models.Categories;
using Domain.Responses;
using Microsoft.EntityFrameworkCore;
using WebAPI.Context;

namespace WebAPI.Services.Categories.Repository;

public class CategoryService(ApplicationDbContext _context) : ICategoryService
{
    public async Task<InternalResponse> AddCategory(Category category)
    {
        if(category == null)
        {
            return new InternalResponse
            {
                StatusCode = ResponseCode.BadRequest,
                Title = "Category body could not be null",
                Message = "Category body is null"
            };
        }

        try
        {
            _context.Category.Add(category);
            await _context.SaveChangesAsync();

            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Category added succesfuly !",
                Message = "Category was added succesfuly"
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> AddSubcategory(string categoryId, Subcategory subcategory)
    {
        if (subcategory == null)
        {
            return new InternalResponse
            {
                StatusCode = ResponseCode.BadRequest,
                Title = "Subcategory body is null",
                Message = "Subcategory body cannot be null"
            };
        }

        if (string.IsNullOrEmpty(categoryId))
        {
            return new InternalResponse
            {
                StatusCode = ResponseCode.BadRequest,
                Title = "Category id is null",
                Message = "Category id is null"
            };
        }

        try
        {
            var category = await _context.Category.Include(category => category.Subcategories).FirstOrDefaultAsync(category => category.CategoryId == categoryId);
            if (category == null || category.Subcategories == null)
            {
                return new InternalResponse
                {
                    StatusCode = ResponseCode.NotFound,
                    Title = "Category could not be found or subcategories could not be loaded",
                    Message = "Category could not be found or subcategories could not be loaded"
                };
            }
            category.Subcategories.Add(subcategory);
            await _context.SaveChangesAsync();

            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Title = "Subcategory added succesfuly !",
                Message = "Subcategory was added succesfuly"
            };
        }
        catch (Exception ex)
        {
            return new InternalResponse(ex);
        }
    }

    public async Task<InternalResponse> Get()
    {
        try
        {
            var categories = await _context.Category.Include(category => category.Subcategories).ToListAsync();

            var order = new List<string> { "muzica", "foto-video", "locatii", "cofetarii", "diverse" };

            var subcategoryOrder = new List<string> { "solisti", "orchestre", "banduri", "dj" };

            categories = categories.OrderBy(c => order.IndexOf(c.CategoryId)).ToList();

            var musicSubcategory = categories.First(c => c.CategoryId == "muzica");

            musicSubcategory.Subcategories = [.. musicSubcategory.Subcategories.OrderBy(m => subcategoryOrder.IndexOf(m.SubcategoryId))];

            return new InternalResponse
            {
                StatusCode = ResponseCode.OK,
                Data = categories,
                Title = "Categories retrieved succesfully",
                Message = "Categories retrieved succesfully"
            };
        }
        catch(Exception ex)
        {
            return new InternalResponse(ex);
        }
    }
}
