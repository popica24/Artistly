using Domain.Models.Clients;
using WebAPI.Models.Reviews;

namespace WebAPI.Models.Clients
{
    public class FreeClientModel
    {
        public string ClientName { get; set; }
        public string ClientTag { get; set; }
        public string ClientDescription { get; set; }
        public int ClientRating { get; set; }
        public string Facebook { get; set; }
        public string Youtube { get; set; }
        public string Tiktok { get; set; }
        public string Instagram { get; set; }
        public string[] YoutubeLinks { get; set; }
        public string EventDetails { get; set; }
        public string Location { get; set; }
        public ExtendedReviewsModel ExtendedReviews { get; set; }
        public IEnumerable<MinifiedReview> MinifiedReviews { get; set; }

        public FreeClientModel(Client client)
        {
            ClientName = client.ClientName;
            ClientTag = client.ClientTag;
            ClientDescription = client.Description;
            ClientRating = client.ClientRating;
            Facebook = client.Facebook;
            Youtube = client.Youtube;
            Tiktok = client.Tiktok;
            Instagram = client.Instagram;
            YoutubeLinks = client.YoutubeLinks.Where(link => !string.IsNullOrEmpty(link)).ToArray();
            EventDetails = client.EventDetails;
            Location = client.Location.ToString();
            ExtendedReviews = client.ExtendedReview != null ? new ExtendedReviewsModel(client.ExtendedReview) : new ExtendedReviewsModel();
            MinifiedReviews = (client.Reviews != null && client.Reviews.Count != 0) ? client.Reviews.Select(review => new MinifiedReview(review)) : [];
        }
    }
}
