using MailChimp.Net.Models;
using Newtonsoft.Json;

namespace WebAPI.Services.Mail.Models
{
    public class SubscriberExtended : Subscriber
    {
        [JsonProperty("last_changed")]
        public DateTime LastChanged { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }
    }
}
