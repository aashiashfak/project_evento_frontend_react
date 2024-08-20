import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Logo from "../Header/Logo";

const UserFooter = () => {
  return (
    <div className="bg-gray-200 text-white pt-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-black">
        {/* Left Section */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <Logo />
          <h2 className="text-lg font-bold mb-2 mt-4">
            Experience the best events with us.
          </h2>
          <p>
            Book your favorite events and create unforgettable memories with
            Evento.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:flex-row text-center md:text-left space-y-4 md:space-y-0 md:space-x-8">
          <div>
            <h3 className="text-lg font-bold mb-2">Explore</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-violet-500">
                  Upcoming Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-500">
                  Popular Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-500">
                  Categories
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">About Us</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-violet-500">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-500">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-500">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Support</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-violet-500">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-500">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-500">
                  Ticket Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="mt-8 flex justify-center md:justify-end space-x-4 md:mr-7 text-black">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-violet-600"
        >
          <FaFacebookF />
        </a>

        <a
          href="https://twitter.com"
          target="_blank"
          className="hover:text-violet-600"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-violet-600"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-violet-600"
        >
          <FaInstagram />
        </a>
      </div>

      {/* Bottom Section */}
      <div className="bg-violet-800 text-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p>© 2023 Evento. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-300">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFooter;
