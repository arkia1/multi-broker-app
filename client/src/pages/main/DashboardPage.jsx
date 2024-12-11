import { useState, useEffect, useContext } from "react";
import MainLayout from "../../layouts/MainLayout";
import BinanceData from "../../components/brokers/BinanceData";
import { SelectedAssetContext } from "../../contexts/SelectedAssetContext"; // Import the context
import axios from "axios";

const DashboardPage = () => {
  const [selectedBroker, setSelectedBroker] = useState("binance");
  const { selectedAsset } = useContext(SelectedAssetContext); // Get selectedAsset from context
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    const fetchRelatedNews = async () => {
      try {
        console.log(`Fetching news for asset: ${selectedAsset}`);
        const assets = selectedAsset.match(/.{1,3}/g); // Split the selectedAsset into individual cryptocurrencies
        console.log("Assets to fetch news for:", assets);

        const newsPromises = assets.map((asset) =>
          axios.get(`http://localhost:8000/api/news/${asset}`, {
            headers: {
              Accept: "application/json",
            },
          })
        );

        const newsResponses = await Promise.all(newsPromises);
        const combinedNews = newsResponses.flatMap((response) => response.data);

        console.log("Combined news:", combinedNews);
        setRelatedNews(combinedNews);
      } catch (error) {
        console.error("Error fetching related news:", error);
        setRelatedNews([]); // Ensure relatedNews is an array in case of error
      }
    };

    if (selectedAsset) {
      fetchRelatedNews();
    }
  }, [selectedAsset]);

  return (
    <MainLayout>
      <div className="relative flex flex-col justify-center space-x-2">
        <div className="my-2 ml-4">
          <label
            htmlFor="broker-select"
            className="block text-sm font-medium text-gray-700"
          >
            Select your broker:
          </label>
          <select
            id="broker-select"
            className="mt-1 block w-44 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedBroker}
            onChange={(e) => setSelectedBroker(e.target.value)}
          >
            <option value="binance">Binance</option>
            <option value="oanda">Oanda</option>
          </select>
        </div>
        <div className="">
          <BinanceData />
        </div>
        <div className="absolute grid md:grid-cols-3 bottom-1 gap-2 right-20">
          <div className="flex flex-col flex-1 justify-center items-center rounded-md bg-red-400 w-[30vw] h-[40vh]">
            User watchlist
          </div>
          <div className="flex flex-col flex-1 justify-center items-center rounded-md bg-gray-200 w-[30vw] h-[40vh] overflow-y-auto">
            <h2 className="text-lg font-semibold my-2">
              <span className="font-semibold mr-2">{selectedAsset}</span>
              <span>News</span>
            </h2>
            <ul className="flex flex-col justify-center items-center space-y-4 overflow-y-scroll">
              {relatedNews.map((newsItem, index) => (
                <li
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md w-[90%]"
                >
                  <h3 className="text-md font-bold">{newsItem.title}</h3>
                  <p className="text-sm text-gray-600">
                    {newsItem.description}
                  </p>
                  <div className="text-xs text-gray-500 mt-2">
                    <span>{newsItem.source.name}</span> |{" "}
                    <span>
                      {new Date(newsItem.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
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
