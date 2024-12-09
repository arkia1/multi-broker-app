import { useState, useEffect, useRef } from "react";
import CandleStickChart from "../global/CandleStickChart";

const BinanceData = () => {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [historicalData, setHistoricalData] = useState([]);
  const [liveData, setLiveData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState("1m");
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

  // Fetch historical data whenever asset or interval changes
  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/binance/${selectedAsset}/${selectedInterval}`
        );
        const result = await response.json();
        setHistoricalData(result);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    if (selectedAsset) {
      fetchHistoricalData();
    }
  }, [selectedAsset, selectedInterval]);

  // Handle WebSocket setup and live updates
  useEffect(() => {
    if (ws.current) {
      ws.current.close();
    }

    if (selectedAsset) {
      const newWs = new WebSocket(
        `ws://localhost:8000/ws/${selectedAsset.toLowerCase()}/${selectedInterval.toLowerCase()}`
      );

      newWs.onmessage = (event) => {
        try {
          const update = JSON.parse(event.data);
          setLiveData((prevData) => [...prevData, update]);
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
  }, [selectedAsset, selectedInterval]);

  // Combine historical data with live updates
  const combinedData = [...historicalData, ...liveData];

  const intervals = [
    "1s",
    "1m",
    "3m",
    "5m",
    "15m",
    "30m",
    "1h",
    "2h",
    "4h",
    "6h",
    "8h",
    "12h",
    "1d",
    "3d",
    "1w",
    "1M",
  ];

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
        <select
          id="interval-select"
          value={selectedInterval}
          onChange={(e) => setSelectedInterval(e.target.value)}
          className="mt-2 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          {intervals.map((interval) => (
            <option key={interval} value={interval}>
              {interval}
            </option>
          ))}
        </select>
      </div>
      {combinedData.length > 0 && (
        <div className="mt-4">
          <CandleStickChart chartData={combinedData} />
        </div>
      )}
    </div>
  );
};

export default BinanceData;
