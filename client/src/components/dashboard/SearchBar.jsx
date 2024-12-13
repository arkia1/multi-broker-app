import PropTypes, { any } from "prop-types";
import { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";

const SearchBar = ({ assets, onSelectAsset }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAssets, setFilteredAssets] = useState([]);

  // Handle search term changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce((term) => {
      if (term) {
        const filtered = assets.filter((asset) =>
          asset.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredAssets(filtered);
      } else {
        setFilteredAssets([]);
      }
    }, 300),
    [assets]
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [handleSearch, searchTerm]);

  return (
    <div className="flex-1">
      <label
        htmlFor="search-input"
        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        Search Asset:
      </label>
      <input
        id="search-input"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-2 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-200"
      />
      {filteredAssets.length > 0 && (
        <ul className="mt-2 border border-gray-300 rounded-md shadow-sm max-h-60 overflow-y-auto">
          {filteredAssets.map((asset) => (
            <li
              key={asset}
              onClick={() => {
                onSelectAsset(asset);
                setSearchTerm(asset);
                setFilteredAssets([]); // Clear suggestions after selection
              }}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {asset}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  assets: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectAsset: PropTypes.func || any.isRequired,
};

export default SearchBar;
