import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import BinanceData from "../../components/brokers/BinanceData";
import Modal from "../../components/global/Modal";
import Watchlist from "../../components/dashboard/UserWatchlist";
import AssetNews from "../../components/dashboard/AssetNews";

const DashboardPage = () => {
  const [selectedBroker, setSelectedBroker] = useState("binance");
  const [showModal, setShowModal] = useState(false);
  const [selectedArticleUrl, setSelectedArticleUrl] = useState("");

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedArticleUrl("");
  };

  const handleVisitSource = () => {
    window.open(selectedArticleUrl, "_blank");
    handleModalClose();
  };

  return (
    <MainLayout>
      <div className="relative flex flex-col justify-center space-x-2">
        <div className="my-2 ml-4">
          <label
            htmlFor="broker-select"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Select your broker:
          </label>
          <select
            id="broker-select"
            className="mt-1 block w-44 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-900 dark:text-gray-200"
            value={selectedBroker}
            onChange={(e) => setSelectedBroker(e.target.value)}
          >
            <option value="binance">Binance</option>
            <option value="oanda">Oanda ( coming soon! )</option>
          </select>
        </div>
        <div className="w-full md:mb-28">
          <BinanceData />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 md:mt- lg:mt-4">
          <div className="flex flex-col justify-center items-center rounded-md bg-gray-200 dark:bg-gray-800 w-[70%] h-[40vh] lg:ml-[25%]">
            <Watchlist />
          </div>
          <div className="flex flex-col justify-center items-center rounded-md bg-gray-200 dark:bg-gray-800 w-[70%] h-[40vh] ">
            <AssetNews />
          </div>
          {/* <div className="flex flex-col justify-center items-center rounded-md bg-gray-200 dark:bg-gray-800 w-full h-[40vh]">
            Open orders, order history, etc.
          </div> */}
        </div>
      </div>

      {showModal && (
        <Modal
          title="Visit Article Source"
          content="Do you want to visit the article source?"
          onClose={handleModalClose}
          onConfirm={handleVisitSource}
          confirmText="Visit"
          cancelText="Cancel"
        />
      )}
    </MainLayout>
  );
};

export default DashboardPage;
