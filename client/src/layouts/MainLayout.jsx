import PropTypes from "prop-types";
import Navigation from "../components/global/Navigation";

const MainLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen overflow-x-hidden flex flex-col dark:bg-gray-700">
      <Navigation />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* About Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p className="text-sm">
              We are a multi-broker platform providing seamless trading
              experiences across various financial markets.
            </p>
          </div>
          {/* Links Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href="/about" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="/services" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          {/* Social Media Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
          {/* Contact Section */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm">
              Email: support@multibroker.com
              <br />
              Phone: +1 (123) 456-7890
              <br />
              Address: 1234 Market St, Suite 100, San Francisco, CA 94103
            </p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 Multi-Broker App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
