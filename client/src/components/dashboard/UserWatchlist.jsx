import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SelectedAssetContext } from "../../contexts/SelectedAssetContext";

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
        const response = await axios.get(
          "http://localhost:8000/api/watchlist",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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
        const response = await axios.get(
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
      const response = await axios.post(
        "http://localhost:8000/api/watchlist",
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
      const response = await axios.delete(
        `http://localhost:8000/api/watchlist/${asset}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
    <div className="flex flex-col items-center w-full h-full p-4 bg-gray-200 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">User Watchlist</h2>
      <div className="w-full mb-4 relative">
        <input
          type="text"
          value={newAsset}
          onChange={handleInputChange}
          placeholder="Add new asset"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {filteredAssets.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredAssets.map((asset) => (
              <li
                key={asset}
                onClick={() => handleSelectAsset(asset)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {asset}
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={handleAddAsset}
          className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          Add Asset
        </button>
      </div>
      <ul className="w-full space-y-2">
        {watchlist.map((asset, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedAsset(asset)}
          >
            <span>{asset}</span>
            <button
              onClick={() => handleRemoveAsset(asset)}
              className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserWatchlist;
