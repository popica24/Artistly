using Domain.Models.Reviews;

namespace WebAPI.Models.Clients
{
    public class ExtendedReviewsModel
    {
        public int OneStar { get; set; }
        public int TwoStar { get; set; }
        public int ThreeStar { get; set; }
        public int FourStar { get; set; }
        public int FiveStar { get; set; }

        public ExtendedReviewsModel()
        {
            OneStar = 0;
            TwoStar = 0;
            ThreeStar = 0;
            FourStar = 0;
            FiveStar = 0;
        }

        public ExtendedReviewsModel(ExtendedReview model)
        {
            OneStar = model.OneStar;
            TwoStar = model.TwoStar;
            ThreeStar = model.ThreeStar;
            FourStar = model.FourStar;
            FiveStar = model.FiveStar;
        }
    }
}
