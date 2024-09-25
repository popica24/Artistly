using Domain;
using Domain.Models.Clients;
using WebAPI.Models.Prices;
using WebAPI.Services.Clients.Utils;

namespace WebAPI.Models.Clients
{
    public class ClientRequest
    {
        public required string Category { get; set; }

        public required string Subcategory { get; set; }

        public string? Genre { get; set; }

        public required string Name { get; set; }

        public required string Description { get; set; }

        public string Handler { get; set; }

        public string? Facebook { get; set; }

        public string? Instagram { get; set; }

        public string? Tiktok { get; set; }

        public string? Youtube { get; set; }

        public string EventDetails { get; set; } = "";

        public string ContactType { get; set; }

        public string Location { get; set; }

        public string ContactName { get; set; }

        public string ContactNumber { get; set; }

        public string ContactEmail { get; set; }

        public string[] YoutubeLinks { get; set; } = [];

        public required IEnumerable<PriceModel> Prices { get; set; }

        public Client? ToDomain(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return null;
            }

            return new Client
            {
                UserId = userId,
                ClientId = Handler,
                ClientName = Name,
                ClientTag = TagCreator.Create(Subcategory),
                SubcategoryId = Subcategory,
                MusicGenre = Genre,
                Description = Description,
                Facebook = Facebook,
                Instagram = Instagram,
                Tiktok = Tiktok,
                Youtube = Youtube,
                EventDetails = EventDetails,
                ContactType = ContactType,
                ContactName = ContactName,
                ContactNumber = ContactNumber,
                ContactEmail = ContactEmail,
                YoutubeLinks = YoutubeLinks,
                Location = Location,
                Approved = false,
                Prices = Prices
                .Where(p => p != null) // Filter out null values
                .Select(p => p.ToDomain(Handler))
                .ToList()
            };
        }
    }
}
