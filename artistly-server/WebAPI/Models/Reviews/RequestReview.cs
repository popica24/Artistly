using Domain.Models.Reviews;

namespace WebAPI.Models.Reviews;

public class RequestReview
{
    public int Rating { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }

    public RequestedReview ToDomain()
    {
        return new RequestedReview
        {
            ReviewValue = Rating,
            ReviewTitle = Title,
            ReviewBody = Body,
            DateAdded = DateTime.UtcNow.ToShortDateString(),
        };
    }
}
