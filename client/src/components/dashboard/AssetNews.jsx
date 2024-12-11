import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SelectedAssetContext } from "../../contexts/SelectedAssetContext";
import NewsCard from "./NewsCard";
import Modal from "../global/Modal";

const AssetNews = () => {
  const { selectedAsset } = useContext(SelectedAssetContext);
  const [relatedNews, setRelatedNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedArticleUrl, setSelectedArticleUrl] = useState("");

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

  const handleArticleClick = (url) => {
    setSelectedArticleUrl(url);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedArticleUrl("");
  };

  const handleVisitSource = () => {
    window.open(selectedArticleUrl, "_blank");
    handleModalClose();
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center rounded-md bg-gray-200 w-[30vw] h-[40vh] overflow-y-auto hide-scrollbar">
      <h2 className="text-lg font-semibold my-2">
        <span className="font-semibold mr-2">{selectedAsset}</span>
        <span>News</span>
      </h2>
      <ul className="flex flex-col justify-center items-center space-y-4 overflow-y-scroll w-full px-4 pt-12 pb-4">
        {relatedNews.map((newsItem, index) => (
          <NewsCard
            key={index}
            newsItem={newsItem}
            onClick={handleArticleClick}
          />
        ))}
      </ul>

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
    </div>
  );
};

export default AssetNews;
