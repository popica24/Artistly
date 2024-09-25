import { useEffect, useState } from "react";
import MobileLogo from "./MobileLogo";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { imageDb } from "../../../utils/firebase";
import Skeleton from "react-loading-skeleton";

const PromotingBanner = () => {
  const [banners, setBanners] = useState<string[]>();

  useEffect(() => {
    const bannersRef = ref(imageDb, "banners");
    listAll(bannersRef)
      .then((banners) => {
        const promises = banners.items.map((banner) =>
          getDownloadURL(ref(imageDb, banner.fullPath))
        );
        Promise.all(promises)
          .then((bannersUrls) => setBanners(bannersUrls))
          .catch((error) => {
            console.error("Error fetching banner URLs:", error);
          });
      })
      .catch((error) => {
        console.error("Error listing banners:", error);
      });
  }, []);
  return (
    <>
      <div className="fixed left-0 top-14 z-10">
        <MobileLogo />
      </div>
      <section className="relative">
        {banners ? (
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
          >
            {banners.map((banner) => (
              <div>
                <figure
                  style={{
                    backgroundPosition: "center",
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.3)",
                    backgroundImage: `url(${banner})`,
                  }}
                  className="w-full h-[500px] tablet:h-[300px] bg-cover rounded-[3.8125rem] tablet:rounded-none z-10"
                ></figure>
              </div>
            ))}
          </Carousel>
        ) : (
          <Skeleton
            className="w-full h-[500px] tablet:h-[300px] bg-cover rounded-[3.8125rem] tablet:rounded-none z-10"
            style={{
              borderRadius: "3.8125rem",
            }}
          />
        )}
      </section>
    </>
  );
};

export default PromotingBanner;
