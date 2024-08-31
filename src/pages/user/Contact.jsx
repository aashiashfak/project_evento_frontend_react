import React from "react";
import Header from "../../components/Header/Header";
import {FaPhoneAlt, FaEnvelope, FaMapMarkerAlt} from "react-icons/fa";

const Contact = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

        {/* Contact Information Section */}
        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-full md:w-1/3 p-4 bg-white shadow-lg rounded-lg text-center flex flex-col items-center justify-center">
            <div>
              <FaPhoneAlt className="text-4xl text-violet-700 mb-4" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Call Us</h2>
              <p>+91 1234 567 890</p>
            </div>
          </div>

          <div className="w-full md:w-1/3 p-4 bg-white shadow-lg rounded-lg text-center flex flex-col items-center justify-center">
            <div>
              <FaEnvelope className="text-4xl text-violet-700 mb-4" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Email Us</h2>
              <p>support@evento.com</p>
            </div>
          </div>

          <div className="w-full md:w-1/3 p-4 bg-white shadow-lg rounded-lg text-center flex flex-col items-center justify-center">
            <div>
              <FaMapMarkerAlt className="text-4xl text-violet-700 mb-4" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Visit Us</h2>
              <p>123 Event Venue Road, City, Country</p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Send Us a Message
          </h2>
          <form className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-700"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-700"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="message"
              >
                Your Message
              </label>
              <textarea
                id="message"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-700"
                rows="4"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-violet-700 text-white px-6 py-2 rounded-lg hover:bg-violet-900 transition duration-200"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
