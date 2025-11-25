import React from "react";
import Link from "next/link";

const AboutUsSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* About Us Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            🌟 About Our Marketplace
          </h2>
          <p className="text-xl text-gray-500 mt-3">
            Connecting communities, one trade at a time.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Mission & Vision */}
          <div>
            <h3 className="text-3xl font-bold text-blue-600 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              To provide a **safe, transparent, and user-friendly platform**
              where local buyers and sellers can connect directly to trade goods
              and services. We aim to empower individuals to make extra income
              by selling their used items and to help buyers find the best deals
              in their neighborhood.
            </p>

            <h3 className="text-3xl font-bold text-blue-600 mb-4">
              What We Offer
            </h3>
            <ul className="space-y-4 text-gray-700 text-lg list-disc pl-5">
              <li>
                **Vast Categories:** Thousands of listings from cars and
                electronics to jobs and property.
              </li>
              <li>
                **Local Focus:** Tools to easily filter and find items available
                right where you live.
              </li>
              <li>
                **Direct Communication:** Buyers and sellers talk directly,
                eliminating middlemen and unnecessary fees.
              </li>
            </ul>
          </div>

          {/* Right Column: Image or Statistics */}
          <div className="hidden md:block">
            {/* Replace this placeholder with a relevant image (e.g., people shaking hands over a deal, or a diverse set of products) */}

            <div className="bg-gray-100 p-8 rounded-lg shadow-inner mt-6">
              <h4 className="text-2xl font-bold text-gray-800 mb-3">
                Quick Facts & Impact
              </h4>
              <div className="flex justify-between text-center">
                <div>
                  <p className="text-4xl font-extrabold text-red-600">50K+</p>
                  <p className="text-gray-600">Active Listings</p>
                </div>
                <div>
                  <p className="text-4xl font-extrabold text-red-600">1M+</p>
                  <p className="text-gray-600">Users Served</p>
                </div>
                <div>
                  <p className="text-4xl font-extrabold text-red-600">24/7</p>
                  <p className="text-gray-600">Support Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center pt-16 border-t border-gray-200 mt-16">
          <p className="text-xl text-gray-700 mb-6">
            Ready to find your next great deal or sell your item today?
          </p>
          <Link
            href="/items"
            className="btn btn-primary btn-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            Start Browsing Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
