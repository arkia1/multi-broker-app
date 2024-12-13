import PropTypes from "prop-types";

const Modal = ({
  title,
  content,
  onClose,
  onConfirm,
  confirmText,
  cancelText,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">
          {title}
        </h3>
        <p className="mb-4 dark:text-gray-400">{content}</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className="bg-indigo-600 text-gray-100 py-2 px-6 rounded-lg hover:text-indigo-600 duration-300 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-indigo-600"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

Modal.defaultProps = {
  confirmText: "Confirm",
  cancelText: "Cancel",
};

export default Modal;
