import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create the context
// eslint-disable-next-line react-refresh/only-export-components
export const SelectedAssetContext = createContext();

// Create a provider component
export const SelectedAssetProvider = ({ children }) => {
  const [selectedAsset, setSelectedAsset] = useState("");

  return (
    <SelectedAssetContext.Provider value={{ selectedAsset, setSelectedAsset }}>
      {children}
    </SelectedAssetContext.Provider>
  );
};

SelectedAssetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
