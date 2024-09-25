using Domain.Models.Reviews;

namespace WebAPI.Models.Reviews
{
    public class MinifiedReview
    {
        public string Name { get; set; }
        public string DateAdded { get; set; }
        public string Title { get; set; }
        public string Review { get; set; }
        public int Rating { get; set; }

        public MinifiedReview()
        {

        }

        public MinifiedReview(Review model)
        {
            Name = model.User.FirstName + " " + model.User.LastName;
            DateAdded = model.DateAdded;
            Title = model.ReviewTitle;
            Review = model.ReviewBody;
            Rating = model.ReviewValue;
        }
    }
}
