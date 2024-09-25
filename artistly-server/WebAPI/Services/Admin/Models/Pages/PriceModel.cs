using Domain.Models.Prices;

namespace WebAPI.Services.Admin.Models.Pages;

public class PriceModel
{
    public string Price { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }

    public PriceModel(Price price)
    {
        Price = price.PriceValue + " " + price.Currency;
        Title = price.PriceTitle;
        Description = price.PriceDescription;   
    }
}
