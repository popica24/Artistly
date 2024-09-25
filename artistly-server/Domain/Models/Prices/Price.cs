using Domain.Models.Clients;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models.Prices;

public class Price
{
    [Key]
    public int PriceId { get; set; }
    public string? ClientId { get; set; }
    public string PriceTitle { get; set; } = "";
    public string PriceDescription { get; set; } = "";
    public int PriceValue { get; set; } = 0;
    public string Currency { get; set; } = Currencies.RON;

    public Client? Client { get; set; }
}
