import LegoImageConverter from "@/components/LegoImageConverter";

const Home = () => {
  return (
    <div
      className="h-screen bg-no-repeat relative"
      style={{
        background: 'url("/images/logo-bg.png")',
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    >
      <title>Legofy | Turn your images into Lego artwork</title>
      <LegoImageConverter />

      <div className="flex items-end absolute z-100 bottom-1 left-1">
        <img src="/images/lego-favicon.png" className="h-28 inline" />
        <img
          src="/images/launched-on-spotlight.svg"
          className="inline bg-black p-2 h-auto mb-10 -ml-1 rounded-md"
        />
      </div>
    </div>
  );
};

export default Home;
