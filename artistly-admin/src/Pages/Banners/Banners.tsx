import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { imageDb } from "../../Utils/firebase";
import { toast } from "react-toastify";
import { BiPlus, BiTrash, BiUpload } from "react-icons/bi";

const Banners = () => {
  const [bannerOne, setBannerOne] = useState<string>();
  const [bannerTwo, setBannerTwo] = useState<string>();
  const [bannerThree, setBannerThree] = useState<string>();
  const [bannerFour, setBannerFour] = useState<string>();

  const [adOne, setAdOne] = useState<string>();

  const [tallAd, setTallAd] = useState<string>();
  const [shortAd, setShortAd] = useState<string>();

  const fetchBanners = () => {
    const bannerOneRef = ref(imageDb, "banners/1.jpg");
    const bannerTwoRef = ref(imageDb, "banners/2.jpg");
    const bannerThreeRef = ref(imageDb, "banners/3.jpg");
    const bannerFourRef = ref(imageDb, "banners/4.jpg");

    getDownloadURL(bannerOneRef).then((result) => setBannerOne(result));
    getDownloadURL(bannerTwoRef).then((result) => setBannerTwo(result));
    getDownloadURL(bannerThreeRef).then((result) => setBannerThree(result));
    getDownloadURL(bannerFourRef).then((result) => setBannerFour(result));
  };

  const fetchAds = () => {
    const adOneRef = ref(imageDb, "banners/cataloguead/HorizontalAd.jpg");

    const tallAdRef = ref(imageDb, "banners/cataloguead/BigAd.jpg");
    const shortAdRef = ref(imageDb, "banners/cataloguead/SmallAd.jpg");

    getDownloadURL(adOneRef).then((result) => setAdOne(result));
    getDownloadURL(tallAdRef).then((result) => setTallAd(result));
    getDownloadURL(shortAdRef).then((result) => setShortAd(result));
  };

  useEffect(() => {
    fetchBanners();
    fetchAds();
  }, []);

  return (
    <div className="flex flex-col justify-center mx-24">
      <div className="w-full">
        <div
          className="bg-[#354F52] text-white
          col-span-1 text-center py-2"
        >
          Bannere
        </div>
      </div>
      <div className="grid grid-cols-2 place-content-center mt-4">
        <div className="col-span-1">
          <div className="flex flex-col items-center justify-center">
            <Banner url={bannerOne} fetchBanners={fetchBanners} index={1} />
            <Banner url={bannerTwo} fetchBanners={fetchBanners} index={2} />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col items-center justify-center">
            <Banner url={bannerThree} fetchBanners={fetchBanners} index={3} />
            <Banner url={bannerFour} fetchBanners={fetchBanners} index={4} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <HorizontalAd url={adOne} index={1} fetchBanners={fetchAds} />
        </div>
        <div className="col-span-1">
          <div className="flex flex-col items-center justify-center">
            <TallAd url={tallAd} index={1} fetchBanners={fetchAds} />
            <ShortAd url={shortAd} index={1} fetchBanners={fetchAds} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banners;

type BannerProps = {
  url?: string;
  index: number;
  fetchBanners: () => void;
};

const Banner = (props: BannerProps) => {
  const [banner, setBanner] = useState<Blob>();

  const [hover, setHover] = useState(false);

  const deleteBanner = async () => {
    const bannerRef = ref(
      imageDb,
      "banners/" + props.index.toString() + ".jpg"
    );
    await deleteObject(bannerRef);
    toast.success("Banner sters");
    props.fetchBanners();
  };
  const uploadBanner = async () => {
    if (banner) {
      const bannerRef = ref(
        imageDb,
        "banners/" + props.index.toString() + ".jpg"
      );
      await uploadBytes(bannerRef, banner);
      toast.success("Banner incarcat");
      props.fetchBanners();
      setBanner(undefined);
    }
  };
  return props.url ? (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-[600px] relative bg-no-repeat bg-center bg-cover aspect-video rounded-[3.8125rem] my-4"
      style={{
        backgroundImage: `url(${props.url})`,
      }}
    >
      {hover && (
        <div className="absolute inset-0 bg-black/50 rounded-[3.8125rem]">
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
            {props.url && (
              <BiTrash
                className="cursor-pointer"
                color="white"
                size={40}
                onClick={deleteBanner}
              />
            )}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-[600px] bg-no-repeat bg-cover bg-center relative aspect-video rounded-[3.8125rem] my-4"
      style={{
        background: banner ? `url(${URL.createObjectURL(banner)})` : "#C4C4C4",
      }}
    >
      {hover && (
        <div className="absolute inset-0 bg-black/50 rounded-[3.8125rem]">
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
            <div className="flex flex-row items-center justify-center z-10">
              <span>
                {banner ? (
                  <div className="flex flex-row items-center">
                    <BiUpload
                      className="cursor-pointer m-4"
                      color="white"
                      size={40}
                      onClick={uploadBanner}
                    />
                    <BiTrash
                      className="cursor-pointer m-4"
                      color="white"
                      size={40}
                      onClick={() => setBanner(undefined)}
                    />
                  </div>
                ) : (
                  <>
                    <label htmlFor={`upload-banner-${props.index}`}>
                      <BiPlus
                        className="cursor-pointer m-4"
                        color="white"
                        size={40}
                      />
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      id={`upload-banner-${props.index}`}
                      onChange={(e) => setBanner(e.target.files![0])}
                    />
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const HorizontalAd = (props: BannerProps) => {
  const [banner, setBanner] = useState<Blob>();

  const [hover, setHover] = useState(false);

  const deleteBanner = async () => {
    const bannerRef = ref(imageDb, "banners/cataloguead/HorizontalAd.jpg");
    await deleteObject(bannerRef);
    toast.success("Reclama stearsa");
    props.fetchBanners();
  };
  const uploadBanner = async () => {
    if (banner) {
      const bannerRef = ref(imageDb, "banners/cataloguead/HorizontalAd.jpg");
      await uploadBytes(bannerRef, banner);
      toast.success("Banner incarcat");
      props.fetchBanners();
      setBanner(undefined);
    }
  };
  return props.url ? (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-full h-[250px] relative bg-center bg-no-repeat bg-cover rounded-[3.8125rem] my-4"
      style={{
        backgroundImage: `url(${props.url})`,
      }}
    >
      {hover && (
        <div className="absolute inset-0 bg-black/50 rounded-[3.8125rem]">
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
            {props.url && (
              <BiTrash
                className="cursor-pointer"
                color="white"
                size={40}
                onClick={deleteBanner}
              />
            )}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-full bg-center bg-no-repeat bg-cover relative h-[250px] rounded-[3.8125rem] my-4"
      style={{
        background: banner ? `url(${URL.createObjectURL(banner)})` : "#C4C4C4",
      }}
    >
      {hover && (
        <div className="absolute inset-0 bg-black/50 rounded-[3.8125rem]">
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
            <div className="flex flex-row items-center justify-center z-10">
              <span>
                {banner ? (
                  <div className="flex flex-row items-center">
                    <BiUpload
                      className="cursor-pointer m-4"
                      color="white"
                      size={40}
                      onClick={uploadBanner}
                    />
                    <BiTrash
                      className="cursor-pointer m-4"
                      color="white"
                      size={40}
                      onClick={() => setBanner(undefined)}
                    />
                  </div>
                ) : (
                  <>
                    <label htmlFor={`upload-banner-${props.index}`}>
                      <BiPlus
                        className="cursor-pointer m-4"
                        color="white"
                        size={40}
                      />
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      id={`upload-banner-${props.index}`}
                      onChange={(e) => setBanner(e.target.files![0])}
                    />
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TallAd = (props: BannerProps) => {
  const [banner, setBanner] = useState<Blob>();

  const [hover, setHover] = useState(false);

  const deleteBanner = async () => {
    const bannerRef = ref(imageDb, "banners/tallAd.jpg");
    await deleteObject(bannerRef);
    toast.success("Reclama stearsa");
    props.fetchBanners();
  };
  const uploadBanner = async () => {
    if (banner) {
      const bannerRef = ref(imageDb, "banners/tallAd.jpg");
      await uploadBytes(bannerRef, banner);
      toast.success("Banner incarcat");
      props.fetchBanners();
      setBanner(undefined);
    }
  };
  return props.url ? (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-[200px] h-[392px] relative bg-center bg-no-repeat bg-cover my-4"
      style={{
        backgroundImage: `url(${props.url})`,
      }}
    >
      {hover && (
        <div className="absolute inset-0 bg-black/50 ">
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
            {props.url && (
              <BiTrash
                className="cursor-pointer"
                color="white"
                size={40}
                onClick={deleteBanner}
              />
            )}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-[200px] h-[392px] bg-center bg-no-repeat bg-cover relative my-4"
      style={{
        background: banner ? `url(${URL.createObjectURL(banner)})` : "#C4C4C4",
      }}
    >
      {hover && (
        <div className="absolute inset-0 bg-black/50">
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
            <div className="flex flex-row items-center justify-center z-10">
              <span>
                {banner ? (
                  <div className="flex flex-row items-center">
                    <BiUpload
                      className="cursor-pointer m-4"
                      color="white"
                      size={40}
                      onClick={uploadBanner}
                    />
                    <BiTrash
                      className="cursor-pointer m-4"
                      color="white"
                      size={40}
                      onClick={() => setBanner(undefined)}
                    />
                  </div>
                ) : (
                  <>
                    <label htmlFor={`upload-banner-${props.index}`}>
                      <BiPlus
                        className="cursor-pointer m-4"
                        color="white"
                        size={40}
                      />
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      id={`upload-banner-${props.index}`}
                      onChange={(e) => setBanner(e.target.files![0])}
                    />
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ShortAd = (props: BannerProps) => {
  const [banner, setBanner] = useState<Blob>();

  const [hover, setHover] = useState(false);

  const deleteBanner = async () => {
    const bannerRef = ref(imageDb, "banners/shortAd.jpg");
    await deleteObject(bannerRef);
    toast.success("Reclama stearsa");
    props.fetchBanners();
  };
  const uploadBanner = async () => {
    if (banner) {
      const bannerRef = ref(
        imageDb,
        "banners/ad" + props.index.toString() + ".jpg"
      );
      await uploadBytes(bannerRef, banner);
      toast.success("Banner incarcat");
      props.fetchBanners();
      setBanner(undefined);
    }
  };
  return props.url ? (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-[200px] h-[100px] relative bg-center bg-no-repeat bg-cover my-4"
      style={{
        backgroundImage: `url(${props.url})`,
      }}
    >
      {hover && (
        <div className="absolute inset-0 bg-black/50">
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
            {props.url && (
              <BiTrash
                className="cursor-pointer"
                color="white"
                size={40}
                onClick={deleteBanner}
              />
            )}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="bg-center bg-no-repeat bg-cover relative w-[200px] h-[100px] my-4"
      style={{
        background: banner ? `url(${URL.createObjectURL(banner)})` : "#C4C4C4",
      }}
    >
      {hover && (
        <div className="absolute inset-0 bg-black/50">
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
            <div className="flex flex-row items-center justify-center z-10">
              <span>
                {banner ? (
                  <div className="flex flex-row items-center">
                    <BiUpload
                      className="cursor-pointer m-4"
                      color="white"
                      size={40}
                      onClick={uploadBanner}
                    />
                    <BiTrash
                      className="cursor-pointer m-4"
                      color="white"
                      size={40}
                      onClick={() => setBanner(undefined)}
                    />
                  </div>
                ) : (
                  <>
                    <label htmlFor={`upload-banner-${props.index}`}>
                      <BiPlus
                        className="cursor-pointer m-4"
                        color="white"
                        size={40}
                      />
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      id={`upload-banner-${props.index}`}
                      onChange={(e) => setBanner(e.target.files![0])}
                    />
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
