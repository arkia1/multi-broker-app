import { debounce } from "lodash";
import { useState, useEffect, useRef, useMemo, useContext } from "react";
import CandleStickChart from "../global/CandleStickChart";
import BINANCE_LOGO from "../../assets/binance-logo.svg";
import axiosInstance from "../../api/axios"; // Import axios instance
import SearchBar from "../dashboard/SearchBar";
import IntervalSelector from "../dashboard/TimeIntervalDropDown";
import { SelectedAssetContext } from "../../contexts/SelectedAssetContext"; // Import the context

const BinanceData = () => {
  const { selectedAsset, setSelectedAsset } = useContext(SelectedAssetContext); // Use the context
  const [assets, setAssets] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [liveData, setLiveData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState("1m");
  const ws = useRef(null);

  // Fetch available assets dynamically
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axiosInstance.get(
          "https://api.binance.com/api/v3/exchangeInfo"
        );
        const assetList = response.data.symbols.map((symbol) => symbol.symbol);
        setAssets(assetList);
        if (assetList.length > 0) setSelectedAsset(assetList[0]);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, [setSelectedAsset]);

  // Fetch historical data whenever asset or interval changes
  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await axiosInstance.get(
          `/binance/${selectedAsset}/${selectedInterval}`
        );
        setHistoricalData(response.data);
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

      const throttledOnMessage = debounce((event) => {
        try {
          const update = JSON.parse(event.data);
          setLiveData((prevData) => [...prevData, update]);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      }, 1000);

      newWs.onmessage = throttledOnMessage;

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
  const combinedData = useMemo(
    () => [...historicalData, ...liveData],
    [historicalData, liveData]
  );

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
      <h1 className="text-2xl font-bold mb-2"></h1>
      <div className=" mb-2 flex items-center space-x-4">
        <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center">
          {/* Placeholder for broker's logo */}
          <img src={BINANCE_LOGO} alt="" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{selectedAsset}</h2>
        </div>
      </div>
      <div className="mb-4 flex space-x-4">
        <SearchBar assets={assets} onSelectAsset={setSelectedAsset} />
        <IntervalSelector
          intervals={intervals}
          selectedInterval={selectedInterval}
          onSelectInterval={setSelectedInterval}
        />
      </div>
      {combinedData.length > 0 && (
        <div className="relative w-screen h-screen">
          <div className="absolute top-1/3 left-[12%] transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] max-w-full">
            <CandleStickChart chartData={combinedData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BinanceData;
