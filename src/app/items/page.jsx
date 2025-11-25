"use client";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

const SEARCH_DELAY_MS = 300;
const MIN_LOAD_TIME_MS = 500;
const BASE_URL = "https://next-sale-server.vercel.app/items";

const Page = () => {
  // State for initial data loading
  const [appsData, setAppsData] = useState([]); // The full, unfiltered list of crops
  const [filApps, setFilApps] = useState([]); // The list currently being displayed (filtered)
  const [initialLoading, setInitialLoading] = useState(true); // Tracks the first data fetch

  // State for search term and searching indicator
  const [term, setTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchStartTime, setSearchStartTime] = useState(null);

  // 1. Effect for Initial Data Fetch (Runs once on mount)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error("Failed to fetch initial data.");

        const data = await res.json();
        setAppsData(data);
        setFilApps(data);
      } catch (error) {
        console.error("Initial data fetch error:", error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // 2. Effect for Debounced Searching (Runs when 'term' or 'appsData' changes)
  useEffect(() => {
    // If the initial data hasn't loaded yet, or the term is empty, just reset/wait.
    if (initialLoading) return;

    if (term === "") {
      setFilApps(appsData);
      setIsSearching(false);
      return;
    }

    // 1. Show the loading indicator immediately when typing starts
    setIsSearching(true);
    setSearchStartTime(Date.now());

    // 2. Set up the debounce timer
    const debounceTimer = setTimeout(() => {
      // --- Actual Search Operation ---
      const newFilApps = appsData.filter((app) =>
        app.title.toLowerCase().includes(term.toLowerCase())
      );

      // 3. Calculate time elapsed and determine if we need to wait (min load time simulation)
      const elapsedTime = Date.now() - searchStartTime;
      const remainingTime = MIN_LOAD_TIME_MS - elapsedTime;

      if (remainingTime > 0) {
        // Wait for the minimum load time to pass
        setTimeout(() => {
          setFilApps(newFilApps);
          setIsSearching(false);
        }, remainingTime);
      } else {
        // If it already took longer than the minimum time, set results immediately
        setFilApps(newFilApps);
        setIsSearching(false);
      }
    }, SEARCH_DELAY_MS); // Wait 300ms after last keystroke (debounce)

    // Cleanup: Clear the debounce timer if the component unmounts or term changes
    return () => clearTimeout(debounceTimer);
  }, [term, appsData, initialLoading]);

  // DaisyUI Loading Indicator Component
  const SearchLoader = (
    <div className="flex justify-center items-center h-48">
      <span className="loading loading-ring loading-lg text-green-600"></span>
    </div>
  );

  // Show initial loading screen
  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-dots loading-lg text-green-600"></span>
        <p className="ml-3 text-lg text-gray-600">Fetching all items...</p>
      </div>
    );
  }

  return (
    <div className="p-5 min-h-screen bg-gray-50">
      <div className="text-center py-10 bg-white shadow-md rounded-xl mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          All Items Marketplace
        </h1>
        <p className="text-gray-500 mt-2">
          Explore all Items posted by users and available for purchase.
        </p>
      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-between items-center px-4 max-w-7xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 md:mb-0">
          ({filApps.length}) Items Found
        </h3>
        <div className="w-full md:w-auto flex justify-center">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm w-full max-w-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search item names..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="ml-2 focus:outline-none w-full"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6">
        {isSearching ? (
          SearchLoader
        ) : filApps.length === 0 && term !== "" ? (
          // Only show "No App Found" if search term is not empty
          <div className="text-center py-20 bg-white rounded-xl shadow-md mt-6">
            <h2 className="text-2xl font-semibold text-gray-600">
              ❌ No Items Found for "{term}"
            </h2>
            <p className="text-gray-500 mt-2">
              Try adjusting your search term or check the full list.
            </p>
          </div>
        ) : (
          // Display the results grid
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-5">
            {filApps.map((app) => (
              // Ensure Link component is correctly used for navigation
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
                  <h2 className="card-title text-xl text-green-700">
                    {app.title}
                  </h2>
                  <h2 className="card-title text-md text-gray-700">
                    {app.short}
                  </h2>
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
        )}
      </div>
    </div>
  );
};

export default Page;
