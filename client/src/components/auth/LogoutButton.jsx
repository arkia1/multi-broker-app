import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const LogoutButton = ({ className }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    //remove the jwt token from local storage
    localStorage.removeItem("access_token");

    //redirect to login page
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className={className}>
      Logout
    </button>
  );
};

LogoutButton.propTypes = {
  className: PropTypes.string,
};

export default LogoutButton;
