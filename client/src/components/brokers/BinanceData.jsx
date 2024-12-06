import { useState, useEffect, useRef } from "react";

const BinanceData = () => {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [data, setData] = useState(null);
  const ws = useRef(null);

  // Fetch available assets dynamically
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch(
          "https://api.binance.com/api/v3/exchangeInfo"
        );
        const result = await response.json();
        const assetList = result.symbols.map((symbol) => symbol.symbol);
        setAssets(assetList);
        if (assetList.length > 0) setSelectedAsset(assetList[0]);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, []);

  // Handle WebSocket setup and cleanup
  useEffect(() => {
    if (ws.current) {
      ws.current.close();
    }

    if (selectedAsset) {
      const newWs = new WebSocket(
        `ws://localhost:8000/ws/${selectedAsset.toLowerCase()}`
      );
      newWs.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setData(data);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      newWs.onopen = () => {
        console.log(`Connected to WebSocket for ${selectedAsset}`);
      };

      newWs.onclose = () => {
        console.log("WebSocket disconnected");
      };

      ws.current = newWs;
    }

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [selectedAsset]);

  const connectWebSocket = () => {
    if (ws.current) {
      ws.current.close();
    }

    const newWs = new WebSocket(
      `ws://localhost:8000/ws/${selectedAsset.toLowerCase()}`
    );
    newWs.onopen = () => {
      console.log(`Connected to WebSocket for ${selectedAsset}`);
    };
    ws.current = newWs;
  };

  return (
    <div className="p-4 max-w-lg mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">Binance Real-time Market Data</h1>
      <div className="mb-4">
        <label
          htmlFor="asset-select"
          className="block text-sm font-medium text-gray-700"
        >
          Choose an Asset:
        </label>
        <select
          id="asset-select"
          value={selectedAsset}
          onChange={(e) => setSelectedAsset(e.target.value)}
          className="mt-2 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          {assets.map((asset) => (
            <option key={asset} value={asset}>
              {asset}
            </option>
          ))}
        </select>
        <button
          onClick={connectWebSocket}
          className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Connect
        </button>
      </div>
      {data && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">
            Market Data for {selectedAsset}
          </h2>
          <div className="border border-gray-300 p-4 rounded-md bg-gray-50">
            {data ? (
              <pre className="text-sm text-gray-800">
                {JSON.stringify(data, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-500">No data yet...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BinanceData;
