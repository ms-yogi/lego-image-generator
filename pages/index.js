import LegoImageConverter from "@/components/LegoImageConverter";
import { trackEvent } from "@/utils/analytics";
import { useState } from "react";

const Home = () => {
  const [isImageSet, setIsImageSet] = useState(false);

  return (
    <div
      className={`md:h-screen relative ${
        isImageSet ? "min-h-screen md:min-h-max md:pb-0 pb-20" : ""
      }`}
      style={{
        background: 'url("/images/logo-bg.webp")',
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    >
      <title>LegoPix | Turn your images into Lego artwork</title>
      <LegoImageConverter setIsImageSet={setIsImageSet} />

      <a
        href="https://peerlist.io/yogini/project/legopix"
        className="flex items-end absolute z-100 bottom-1 md:left-1 left-[30%]"
        onClick={() =>
          trackEvent("footer_spotlight", {
            event_category: "User Interaction",
            event_label: "Footer Spotlight Button",
            value: 1,
          })
        }
      >
        <img src="/images/lego-favicon.png" className="h-28 md:inline hidden" />
        <img
          src="/images/launched-on-spotlight.svg"
          className={`${
            isImageSet ? `md:inline hidden` : ""
          } bg-black p-2 h-auto mb-10 -ml-1 rounded-md`}
        />
      </a>

      <div className="hidden md:block md:absolute bottom-1 md:left-[29%] text-gray-500 text-xs text-center">
        Disclaimer: This project is powered by love for the Lego and is not
        affiliated with or endorsed by Lego in any way!
      </div>
    </div>
  );
};

export default Home;
