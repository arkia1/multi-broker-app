import PropTypes from "prop-types";
import Navigation from "../components/global/Navigation";

const MainLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Navigation />
      {children}
    </div>
  );
};
MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
