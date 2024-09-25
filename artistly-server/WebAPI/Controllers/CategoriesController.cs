using Domain.Contracts;
using Domain.Models.Categories;
using Domain.Responses;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebAPI.Models.Categories;
using WebAPI.Services.Cache.Contract;

namespace WebAPI.Controllers;

[ApiController]
[EnableCors("WebPolicy")]
[Route("api/[controller]")]
public class CategoriesController(ICategoryService categoryService, ICacheService cacheService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAsync()
    {
        var cachedCategories = cacheService.GetData<IEnumerable<Category>>("categories");

        if(cachedCategories != null && cachedCategories.Any())
        {
            return Ok(cachedCategories);
        }

        var dbResponse = await categoryService.Get();

        if(dbResponse == null || dbResponse.StatusCode != ResponseCode.OK || dbResponse.Data is not List<Category> categories)
        {
            return BadRequest(dbResponse);
        }
        cacheService.SetData("categories",categories,DateTimeOffset.UtcNow.AddDays(7));

        return Ok(categories);
    }

    [HttpPost("category")]
    public async Task<IActionResult> PostCategoryAsync([FromBody]PostCategoryModel model)
    {
        var domain = model.ToDomain();

        var dbResponse = await categoryService.AddCategory(domain);

        if (dbResponse.StatusCode != ResponseCode.OK)
        {
            return BadRequest(dbResponse);
        }

        return Ok(dbResponse);
    }

    [HttpPost("subcategory")]
    public async Task<IActionResult> PostSubcategoryAsync([FromQuery]string categoryId, [FromBody]PostSubcategoryModel model)
    {
        var domain = model.ToDomain(categoryId);

        var dbResponse = await categoryService.AddSubcategory(categoryId,domain);

        if (dbResponse.StatusCode != ResponseCode.OK)
        {
            return BadRequest(dbResponse);
        }

        return Ok(dbResponse);
    }
}
