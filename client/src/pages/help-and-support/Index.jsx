import { useState } from "react";
import axios from "axios";
import MainLayout from "../../layouts/MainLayout";

const HelpForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("");

  // Replace with your Web3Forms endpoint
  const WEB3FORMS_API_ENDPOINT = "https://api.web3forms.com/submit";

  // Replace with your Web3Forms API key
  const API_KEY = import.meta.env.VITE_WEB3FORMS_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("message", message);
    formData.append("name", name);
    formData.append("subject", subject);
    formData.append("apikey", API_KEY); // Web3Forms API Key

    try {
      // Make POST request to Web3Forms endpoint
      const response = await axios.post(WEB3FORMS_API_ENDPOINT, formData);
      if (response.data.success) {
        setStatus("Message sent successfully!");
        setEmail("");
        setMessage("");
        setName("");
        setSubject("");
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("Error sending message.");
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-14">
        <h2 className="text-3xl font-semibold text-center mb-6 text-indigo-600">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="email-labels">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="email-input"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="email-labels">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-input"
              placeholder="Your email"
            />
          </div>

          <div>
            <label htmlFor="subject" className="email-labels">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="email-input"
              placeholder="Message subject"
            />
          </div>

          <div>
            <label htmlFor="message" className="email-labels">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="email-input"
              placeholder="Your message"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300 ease-in-out"
          >
            Send Message
          </button>
        </form>

        {status && (
          <p
            className={`mt-4 text-center text-sm ${
              status.includes("success") ? "text-green-500" : "text-red-500"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </MainLayout>
  );
};

export default HelpForm;
