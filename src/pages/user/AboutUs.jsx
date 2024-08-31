import React from "react";
import Header from "../../components/Header/Header";

const AboutUs = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>

        {/* About Us Content */}
        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-full md:w-2/3 p-4 bg-white shadow-lg rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed">
              We are Evento, a leading platform dedicated to making event
              booking and hosting easier than ever. Whether you're looking to
              book an exciting event or host one as a vendor, our platform
              provides a seamless experience tailored to your needs. With our
              user-friendly interface and wide range of events, we aim to
              connect people with unforgettable experiences.
            </p>
          </div>

          <div className="w-full md:w-2/3 p-4 bg-white shadow-lg rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-4">What We Offer</h2>
            <p className="text-gray-600 leading-relaxed">
              For users, we offer a wide variety of events to choose
              from—whether you're looking for adventure, relaxation, or cultural
              experiences, Evento has it all. For vendors, we provide a powerful
              platform to showcase and manage your events, giving you the tools
              to succeed and reach a larger audience.
            </p>
          </div>

          <div className="w-full md:w-2/3 p-4 bg-white shadow-lg rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to bridge the gap between event enthusiasts and
              hosts, making it easy for users to find and book events and for
              vendors to manage and promote their events. We strive to create an
              ecosystem where every event is a success, bringing joy to both
              attendees and hosts.
            </p>
          </div>

          <div className="w-full md:w-2/3 p-4 bg-white shadow-lg rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Why Choose Evento?</h2>
            <p className="text-gray-600 leading-relaxed">
              Evento is your one-stop solution for all event-related needs. With
              our cutting-edge technology, secure payment options, and dedicated
              support, we ensure that both users and vendors have a hassle-free
              experience. Whether you're attending or hosting, Evento is here to
              make your event memorable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
