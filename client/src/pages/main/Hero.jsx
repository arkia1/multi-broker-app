import HERO_IMAGE from "../../assets/hero.webp";

const HeroPage = () => {
  return (
    <section className="relative bg-gradient-to-b from-indigo-600 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center h-screen text-white">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Text Section */}
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Empower Your Trading Experience
            </h1>
            <p className="text-lg mb-6">
              Manage multiple broker accounts in one place. Access trading data,
              analyze real-time charts, and make informed decisions with ease.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-200">
                Get Started
              </button>
              <button className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700">
                Learn More
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <img
              src={HERO_IMAGE}
              alt="Trading Dashboard Concept"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPage;
