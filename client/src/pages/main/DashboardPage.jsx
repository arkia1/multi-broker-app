// src/pages/DashboardPage.js
import { useState } from "react";
import SearchBar from "../../components/dashboard/SearchBar";
import MainLayout from "../../layouts/MainLayout";
import BinanceData from "../../components/brokers/BinanceData";

const DashboardPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement the search logic to filter assets or trades based on the query.
  };

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center">
        <SearchBar onSearch={handleSearch} />
        <div className="">
          <BinanceData />
        </div>
        {/* Display search results or other charts */}
        <div className="search-results">
          {/* Display search results here */}
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
