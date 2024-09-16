import LegoImageConverter from "@/components/LegoImageConverter";

const Home = () => {
  return (
    <div
      className="p-9 h-screen bg-no-repeat"
      style={{
        background: 'url("/images/green-logo-bg.png")',
        backgroundPosition: "center",
        backgroundSize: "contain",
        // backgroundRepeat: "no-repeat",
      }}
    >
      <title>Legofy</title>
      <div className="h-full w-full  p-8">
        <h1 className="text-white text-center text-4xl font-bold">Legofy</h1>

        <div className="flex justify-center">
          <LegoImageConverter />
        </div>
      </div>
    </div>
  );
};

export default Home;
