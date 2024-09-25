using Microsoft.EntityFrameworkCore;

namespace WebAPI.Services.Pagination;

public class PaginatedList<T>: List<T>
{
    public int PageIndex { get; set; }
    
    public int TotalPages { get; set; }

    public bool HasPreviousPage => PageIndex > 1;

    public bool HasNextPage => PageIndex < TotalPages;

    public PaginatedList(List<T> items, int count, int pageIndex)
    {
        PageIndex = pageIndex;
        TotalPages = (int)Math.Ceiling(count / (double)10);
        AddRange(items);
    }

    public static async Task<PaginatedList<T>> CreateAsync (IQueryable<T> source, int pageIndex)
    {
        int count = await source.CountAsync();
        List<T> items = await source.Skip((pageIndex - 1) * 10).Take(10).ToListAsync();
        return new PaginatedList<T>(items, pageIndex, 10);
    }
}
