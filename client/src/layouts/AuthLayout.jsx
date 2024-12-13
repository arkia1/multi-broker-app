import PropTypes from "prop-types";

const AuthLayout = ({ children, title }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-700">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {/* Optional Title and Description */}
        {title && (
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {title}
          </h2>
        )}

        {/* Render the children (e.g., a form) */}
        {children}
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default AuthLayout;
