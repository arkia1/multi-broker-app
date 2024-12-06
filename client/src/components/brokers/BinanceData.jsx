import { useState, useEffect } from "react";

const BinanceData = () => {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [data, setData] = useState(null);
  const [ws, setWs] = useState(null);

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
    if (ws) {
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setData(message);
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
      };

      return () => {
        ws.close(); // Cleanup WebSocket on component unmount or reconnect
      };
    }
  }, [ws]);

  const connectWebSocket = () => {
    if (ws) {
      ws.close(); // Close any existing WebSocket connection
    }

    const newWs = new WebSocket(
      `wss://stream.binance.com:9443/ws/${selectedAsset.toLowerCase()}@ticker`
    );
    newWs.onopen = () => {
      console.log(`Connected to WebSocket for ${selectedAsset}`);
    };
    setWs(newWs);
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

      <h2 className="text-xl font-semibold mb-2">Real-time Data</h2>
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
  );
};

export default BinanceData;
