import PropTypes from "prop-types";

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">
          Session Expired
        </h3>
        <p className="mb-4 dark:text-gray-400">{message}</p>
        <div className="flex justify-end">
          <button
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-indigo-600 duration-300"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

CustomAlert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CustomAlert;
