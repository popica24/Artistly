using Domain.Models.Prices;

namespace WebAPI.Models.Prices
{
    public class PriceModel
    {
        public int Ammount { get; set; }
        public string Currency { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public PriceModel()
        {

        }

        public PriceModel(Price model)
        {
            Ammount = model.PriceValue;
            Currency = model.Currency;
            Title = model.PriceTitle;
            Description = model.PriceDescription;
        }

        public Price? ToDomain(string clientId)
        {
            if (Ammount > 0 && !string.IsNullOrEmpty(Currency) && !string.IsNullOrEmpty(Title) && !string.IsNullOrEmpty(Description))
            {
                return new Price
                {
                    ClientId = clientId,
                    PriceTitle = Title,
                    PriceDescription = Description,
                    PriceValue = Ammount,
                    Currency = Currency
                };

            }
            return null;
        }
    }
}
