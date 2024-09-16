import LegoImageConverter from "@/components/LegoImageConverter";

const Home = () => {
  return (
    <div
      className="h-screen bg-no-repeat relative"
      style={{
        background: 'url("/images/logo-bg.webp")',
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    >
      <title>LegoPix | Turn your images into Lego artwork</title>
      <LegoImageConverter />

      <a
        href="https://peerlist.io/yogini/project/legopix"
        className="flex items-end absolute z-100 bottom-1 left-1"
      >
        <img src="/images/lego-favicon.png" className="h-28 inline" />
        <img
          src="/images/launched-on-spotlight.svg"
          className="inline bg-black p-2 h-auto mb-10 -ml-1 rounded-md"
        />
      </a>

      <div className="absolute bottom-1 left-[29%] text-gray-500 text-xs">
        Disclaimer: This project is powered by love for the Lego and is not
        affiliated with or endorsed by Lego in any way!
      </div>
    </div>
  );
};

export default Home;
