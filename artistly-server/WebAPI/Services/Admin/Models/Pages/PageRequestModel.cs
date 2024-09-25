using WebAPI.Services.Admin.Models.Users;

namespace WebAPI.Services.Admin.Models.Pages;

public class PageRequestModel : PartnerModel
{
    public string Name { get; set; }
    public string PageCategories { get; set; }
    public string Description { get; set; }
    public string EventDetails { get; set; }
    public ICollection<PriceModel> Prices { get; set; }
    public string ContactName { get; set; }
    public string ContactNumber { get; set; }
    public string ContactEmail { get; set; }
    public string Location { get; set; }
}
