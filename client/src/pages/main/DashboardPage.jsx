import MainLayout from "../../layouts/MainLayout";
import BinanceData from "../../components/brokers/BinanceData";

const DashboardPage = () => {
  return (
    <MainLayout>
      <div className="relative flex flex-col justify-center space-x-2">
        <div className="my-2 ml-2">
          <label
            htmlFor="broker-select"
            className="block text-sm font-medium text-gray-700"
          >
            Select your broker:
          </label>
          <select
            id="broker-select"
            className="mt-1 block w-44 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option>Binance</option>
            <option>Oanda</option>
          </select>
        </div>
        <div className="">
          <BinanceData />
        </div>
        <div className="absolute grid md:grid-cols-3 bottom-1 gap-2 right-20">
          <div className="flex flex-col flex-1 justify-center items-center rounded-md bg-red-400 w-[30vw] h-[40vh]">
            User watchlist
          </div>
          <div className="flex flex-col flex-1 justify-center items-center rounded-md bg-red-400 w-[30vw] h-[40vh]">
            Related news
          </div>
          <div className="flex flex-col flex-1 justify-center items-center rounded-md bg-red-400 w-[30vw] h-[40vh]">
            Open orders, order history, etc.
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
