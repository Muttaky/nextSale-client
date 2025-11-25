"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// Assuming you have the standard Next.js Tailwind setup with DaisyUI (based on btn, card classes)
const Home = () => {
  const [appsData, setAppsData] = useState([]);

  useEffect(() => {
    // 💡 IMPORTANT: Update this URL to your actual backend API endpoint
    const fetchInitialData = async () => {
      try {
        const res = await fetch("https://next-sale-server.vercel.app/items");
        if (!res.ok) throw new Error("Failed to fetch initial data.");

        const data = await res.json();
        setAppsData(data);
      } catch (error) {
        console.error("Initial data fetch error:", error);
      }
    };
    fetchInitialData();
  }, []);

  // Use a more generic name like 'items' instead of 'crop'
  const items = appsData;
  // Get the last 6 items to display as 'Latest Listings'
  const latestListings = items.slice(-6);

  console.log(latestListings);

  return (
    <div>
      <div className="bg-blue-600 text-white py-24 md:py-32">
        <div className="max-w-6xl mx-auto text-center px-6">
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
            Find Everything You Need. Sell Anything You Don't.
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-10 font-light opacity-90">
            The largest local marketplace for cars, electronics, property, and
            services.
          </p>

          {/* Primary CTA */}
          <div className="flex justify-center space-x-4">
            <Link
              href="/add"
              className="btn btn-warning btn-lg text-white text-lg font-bold shadow-2xl hover:bg-yellow-500 hover:scale-[1.02] transition duration-300 transform"
            >
              Post Your Free Ad Now 🚀
            </Link>
            {/* Optional Secondary CTA */}
          </div>
        </div>
      </div>
      {/* --- START: Hero Carousel Placeholder (Replaced existing section) --- */}
      {/* This is a common pattern for marketplaces like Bikroy for main categories/featured ads */}
      <div className="flex w-full justify-center gap-2 py-2">
        <a href="#item1" className="btn btn-xs btn-primary">
          Cars 🚗
        </a>
        <a href="#item2" className="btn btn-xs btn-secondary">
          Electronics 📱
        </a>
        <a href="#item3" className="btn btn-xs btn-accent">
          Properties 🏠
        </a>
        <a href="#item4" className="btn btn-xs btn-info">
          Jobs 💼
        </a>
      </div>
      {/* --- END: Hero Carousel Placeholder --- */}

      {/* --- START: LATEST LISTINGS SECTION (Updated Headings & Styling) --- */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-extrabold text-gray-800">
          🔥 Latest Listings Near You
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          Discover recently posted products and services.
        </p>
      </div>

      {/* Item Grid */}
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-5 max-w-7xl mx-auto">
        {latestListings.map((app) => (
          // Adjusted card styling for a general marketplace feel
          <div
            key={app._id}
            className="card bg-white w-full max-w-sm pt-5 shadow-lg mx-auto rounded-xl transition duration-300 hover:shadow-2xl hover:scale-[1.01]"
          >
            <figure className="px-5 h-40 overflow-hidden">
              {/* Placeholder image logic */}
              <img
                src={app.image}
                alt={app.name}
                className="rounded-lg object-cover w-full h-full"
              />
            </figure>
            <div className="card-body p-5">
              <h2 className="card-title text-xl text-green-700">{app.title}</h2>
              <h2 className="card-title text-md text-gray-700">{app.short}</h2>
              <h2 className="card-title text-xl text-red-700">
                Price :{app.price}TK
              </h2>
              <p className="text-gray-500 text-sm mb-3">
                Location: {app.location}
              </p>
              <div className="card-actions">
                {/* Use standard anchor tag or adjust Link usage based on your router setup */}
                <a
                  href={`/items/${app._id}`}
                  className="btn btn-active bg-blue-600 text-white border-none hover:bg-blue-700 rounded-full shadow-md"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-10">
        <button className="btn btn-lg btn-outline btn-primary">
          <Link href="/items">Browse All Categories</Link>
        </button>
      </div>
      {/* --- END: LATEST LISTINGS SECTION --- */}

      {/* --- START: HOW IT WORKS SECTION (Updated for Marketplace flow) --- */}
      <div className="py-16 bg-gray-50">
        <div className="text-center py-10">
          <h1 className="text-4xl font-bold text-gray-800">
            🤝 How Our Marketplace Works
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Connecting buyers and sellers easily in 3 simple steps.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-xl border-t-4 border-yellow-500">
            <div className="text-5xl mb-4 text-yellow-500">1️⃣</div>

            <h3 className="text-xl font-bold mb-2 text-gray-800">
              Post or Search
            </h3>

            <p className="text-gray-600">
              Sellers can quickly list an item (product/service), and buyers can
              browse thousands of ads by category or location.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-xl border-t-4 border-blue-500">
            <div className="text-5xl mb-4 text-blue-500">2️⃣</div>

            <h3 className="text-xl font-bold mb-2 text-gray-800">
              Contact the Advertiser
            </h3>

            <p className="text-gray-600">
              Use the provided contact information (phone, chat, email) to
              discuss details, price, and meetup logistics directly.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-xl border-t-4 border-green-500">
            <div className="text-5xl mb-4 text-green-500">3️⃣</div>

            <h3 className="text-xl font-bold mb-2 text-gray-800">
              Meet & Trade Safely
            </h3>

            <p className="text-gray-600">
              Finalize the transaction in person at a safe, public location.
              Inspect the item before making a purchase.
            </p>
          </div>
        </div>
      </div>
      {/* --- END: HOW IT WORKS SECTION --- */}

      {/* --- START: CUSTOMER TESTIMONIALS (Minimal Text Updates) --- */}
      <div className="bg-base-200 py-16">
        <div className="text-center py-10">
          <h1 className="text-4xl font-bold text-gray-800">
            ⭐ What Our Users Say
          </h1>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {/* Testimonial 1: Seller */}
          <div className="card w-full bg-white shadow-xl">
            <div className="card-body items-center text-center">
              <div className="avatar mb-3">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="/p1.png" alt="Seller" />
                </div>
              </div>

              <blockquote className="italic text-gray-700">
                "MarketLink has connected me directly with serious buyers. I
                sold my old motorbike within a week! A fantastic platform for
                local sales."
              </blockquote>

              <p className="font-bold mt-3">- Rashid Khan, Seller</p>
            </div>
          </div>

          {/* Testimonial 2: Business/Trader */}
          <div className="card w-full bg-white shadow-xl">
            <div className="card-body items-center text-center">
              <div className="avatar mb-3">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="/p2.png" alt="Trader" />
                </div>
              </div>
              <blockquote className="italic text-gray-700">
                "We use this platform regularly to source second-hand machinery
                for our workshop. It's reliable and has a wide variety of
                industrial goods listed."
              </blockquote>
              <p className="font-bold mt-3">
                - Farzana Begum, Small Business Owner
              </p>
            </div>
          </div>

          {/* Testimonial 3: Buyer */}
          <div className="card w-full bg-white shadow-xl">
            <div className="card-body items-center text-center">
              <div className="avatar mb-3">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="/p3.png" alt="Consumer" />
                </div>
              </div>

              <blockquote className="italic text-gray-700">
                "Found a great apartment for rent without any agency fees! The
                contact process was smooth and the ad details were very
                accurate."
              </blockquote>

              <p className="font-bold mt-3">- Joynal Abedin, Home Seeker</p>
            </div>
          </div>
        </div>
      </div>
      {/* --- END: CUSTOMER TESTIMONIALS --- */}

      {/* --- START: CALL TO ACTION (Updated with Marketplace focus) --- */}
      <div className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Start Buying and Selling Today!
          </h1>

          <p className="text-xl mb-8">
            Join the largest local classifieds platform to find amazing deals or
            sell your items quickly.
          </p>

          <div className="space-x-4">
            <Link
              href="/items"
              className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-blue-600"
            >
              Browse All Listings
            </Link>
          </div>
        </div>
      </div>
      {/* --- END: CALL TO ACTION --- */}
    </div>
  );
};

export default Home;
