import { useState, useEffect, useContext } from "react";
import axiosInstance from "../../api/axios"; // Use the Axios instance with interceptor
import { SelectedAssetContext } from "../../contexts/SelectedAssetContext";
import { FaTrash } from "react-icons/fa";

const UserWatchlist = () => {
  const { setSelectedAsset } = useContext(SelectedAssetContext);
  const [watchlist, setWatchlist] = useState([]);
  const [newAsset, setNewAsset] = useState("");
  const [assetList, setAssetList] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axiosInstance.get("/watchlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWatchlist(response.data.assets);
      } catch (error) {
        console.error(
          "Error fetching watchlist:",
          error.response?.data || error.message
        );
      }
    };

    const fetchAssets = async () => {
      try {
        const response = await axiosInstance.get(
          "https://api.binance.com/api/v3/exchangeInfo"
        );
        const assetList = response.data.symbols.map((symbol) => symbol.symbol);
        setAssetList(assetList);
      } catch (error) {
        console.error(
          "Error fetching assets:",
          error.response?.data || error.message
        );
      }
    };

    fetchWatchlist();
    fetchAssets();
  }, []);

  const handleAddAsset = async () => {
    if (!newAsset) {
      setError("Asset cannot be empty");
      return;
    }
    if (!assetList.includes(newAsset)) {
      setError("Invalid asset");
      return;
    }
    setError("");
    try {
      const token = localStorage.getItem("access_token");
      const response = await axiosInstance.post(
        "/watchlist",
        { asset: newAsset },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWatchlist(response.data.assets);
      setNewAsset("");
      setFilteredAssets([]);
    } catch (error) {
      console.error(
        "Error adding asset to watchlist:",
        error.response?.data || error.message
      );
    }
  };

  const handleRemoveAsset = async (asset) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axiosInstance.delete(`/watchlist/${asset}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWatchlist(response.data.assets);
    } catch (error) {
      console.error(
        "Error removing asset from watchlist:",
        error.response?.data || error.message
      );
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewAsset(value);
    if (value) {
      const filtered = assetList.filter((asset) =>
        asset.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredAssets(filtered);
    } else {
      setFilteredAssets([]);
    }
  };

  const handleSelectAsset = (asset) => {
    setNewAsset(asset);
    setFilteredAssets([]);
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-4 bg-gray-200 dark:bg-gray-800 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4 dark:text-gray-200">
        User Watchlist
      </h2>
      <div className="w-full mb-4 relative">
        <input
          type="text"
          value={newAsset}
          onChange={handleInputChange}
          placeholder="Add new asset"
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {filteredAssets.length > 0 && (
          <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredAssets.map((asset) => (
              <li
                key={asset}
                onClick={() => handleSelectAsset(asset)}
                className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {asset}
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={handleAddAsset}
          className="mt-2 w-1/4 bg-indigo-600 text-white py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-indigo-600 duration-300"
        >
          Add Asset
        </button>
      </div>
      <ul className="w-full space-y-2 max-h-80 overflow-y-auto bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-md">
        {watchlist.map((asset, index) => (
          <li
            key={index}
            className="bg-white dark:bg-gray-700 flex justify-between items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
            onClick={() => setSelectedAsset(asset)}
          >
            <span className="dark:text-gray-200">{asset}</span>
            <button
              onClick={() => handleRemoveAsset(asset)}
              className="text-indigo-600 py-1 px-2 rounded-md hover:bg-indigo-600 hover:text-gray-100 duration-300"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserWatchlist;
