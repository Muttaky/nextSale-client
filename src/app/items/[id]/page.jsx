"use client";
import useAuth from "@/AuthInfo";
import Link from "next/link";
import React, { useState, useEffect, use } from "react";
import { toast } from "react-toastify";

const BASE_URL = "https://next-sale-server.vercel.app/items";
const CART_URL = "https://next-sale-server.vercel.app/cart/";

// The component must accept 'params' prop from the Next.js App Router
const Crop = ({ params }) => {
  const { user } = useAuth();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Added missing quantity state

  // The fix: Unwrap the entire 'params' object first
  const resolvedParams = use(params);
  const cropId = resolvedParams.id;

  // 1. Data Fetching Effect
  useEffect(() => {
    // Only proceed if the cropId is available
    if (!cropId) return;

    const fetchItem = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/${cropId}`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch crop details (Status: ${response.status})`
          );
        }

        const data = await response.json();
        setCrop(data);
      } catch (e) {
        console.error("Error fetching crop:", e);
        setError(
          "Could not load crop details. Please check the backend connection."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [cropId]); // Dependency array includes cropId

  const isOwner = user?.email === crop?.ownerEmail;

  // Function to handle showing the modal (using standard DOM access)
  const showModal = (id) => {
    const modal = document.getElementById(id);
    if (modal && typeof modal.showModal === "function") {
      modal.showModal();
    } else if (modal) {
      modal.open = true;
    } else {
      console.error(`Modal with ID ${id} not found.`);
    }
  };

  const handleCartSubmit = async (e) => {
    // Prevent default form submission if this was attached to a form
    if (e && e.preventDefault) e.preventDefault();

    if (!user?.email) {
      toast.error("You must be logged in to add items to the cart.");
      return;
    }

    // Simple validation
    if (quantity <= 0 || quantity > crop.quantity) {
      toast.error(`Invalid quantity. Must be between 1 and ${crop.quantity}`);
      return;
    }

    const newCart = {
      buyerEmail: user.email,
      ownerEmail: crop.ownerEmail, // Use the fetched crop's owner email
      itemId: crop._id,
      title: crop.title,
      quantity: quantity, // Include quantity
      price: crop.price,
      totalPrice: crop.price * quantity, // Calculate total price for cart item
      image: crop.image,
    };

    try {
      const response = await fetch(CART_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newCart),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          `${quantity} units of ${
            crop.name || crop.title
          } added to cart successfully!`
        );
        // Close modal/reset quantity if needed
        setQuantity(1);
        document.getElementById(`cart_modal`).close();
      } else {
        // Check for specific error messages from the backend
        throw new Error(data.message || "Failed to add item to cart.");
      }
    } catch (e) {
      toast.error(`Error adding to cart: ${e.message}`);
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <span className="loading loading-dots loading-lg text-green-600"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50">
        <div className="alert alert-error shadow-lg max-w-lg mx-auto bg-white rounded-xl p-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-red-700 font-semibold">{error}</span>
        </div>
      </div>
    );
  }

  if (!crop || (!crop.name && !crop.title)) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-yellow-50">
        <div className="alert alert-warning shadow-lg max-w-lg mx-auto bg-white rounded-xl p-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-yellow-700 font-semibold">
            Crop not found or data is incomplete.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 min-h-screen bg-gray-50 font-inter">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="hero p-8 lg:p-16">
          <div className="hero-content flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            <figure className="lg:w-1/2 w-full max-w-md">
              <img
                src={
                  crop.image ||
                  `https://placehold.co/600x400/9ACD32/ffffff?text=${
                    crop.name || crop.title
                  }`
                }
                className="w-full h-auto rounded-xl shadow-xl object-cover"
                alt={crop.name || crop.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/600x400/9ACD32/ffffff?text=${
                    crop.name || crop.title
                  }`;
                }}
              />
            </figure>

            <div className="lg:w-1/2 w-full text-left">
              <h1 className="text-5xl font-extrabold text-green-700 mb-4">
                {crop.name || crop.title}
              </h1>

              <p className="py-6 text-lg text-gray-700">{crop.full}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 p-3 rounded-lg shadow-md border-l-4 border-green-500">
                  <p className="text-xs text-gray-500 font-medium">
                    💰 Price / Unit
                  </p>
                  <p className="text-xl font-bold text-green-800 mt-1">
                    {crop.price} TK
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg shadow-md border-l-4 border-blue-500">
                  <p className="text-xs text-gray-500 font-medium">
                    📦 Available Stock
                  </p>
                  <p className="text-xl font-bold text-blue-800 mt-1">
                    {crop.quantity} {crop.unit || "units"}
                  </p>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg shadow-md border-l-4 border-yellow-500">
                  <p className="text-xs text-gray-500 font-medium">
                    🌱 upload Date
                  </p>
                  <p className="text-xl font-bold text-yellow-800 mt-1">
                    {crop.date}
                  </p>
                </div>

                <div className="bg-red-50 p-3 rounded-lg shadow-md border-l-4 border-red-500">
                  <p className="text-xs text-gray-500 font-medium">
                    📍 Location
                  </p>
                  <p className="text-xl font-bold text-red-800 mt-1">
                    {crop.location}
                  </p>
                </div>
              </div>
              <div className="text-center py-10">
                <button className="btn btn-lg btn-outline btn-primary">
                  <Link href="/items">Back to All Items</Link>
                </button>
              </div>
              <hr className="my-6 border-gray-200" />

              {isOwner ? (
                // Owner Section: Show a message to the owner
                <div className="alert alert-info bg-blue-100 text-blue-800 border-none rounded-lg p-4 shadow-md">
                  You are the owner of this item.
                </div>
              ) : (
                // Buyer Section: Add to Cart button
                <button
                  className="btn btn-lg bg-green-600 hover:bg-green-700 text-white border-none rounded-full shadow-lg transition duration-200 w-full sm:w-auto"
                  onClick={() => showModal("cart_modal")}
                  disabled={crop.quantity === 0}
                >
                  {crop.quantity > 0 ? "🛒 Add to Cart" : "Out of Stock"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Add to Cart Confirmation/Quantity Selection */}
      <dialog id="cart_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white p-6 rounded-xl shadow-2xl">
          <h3 className="font-bold text-2xl text-green-700 mb-4">
            Add {crop?.name || crop?.title} to Cart
          </h3>

          <form onSubmit={handleCartSubmit}>
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text font-semibold">
                  Quantity (Max: {crop?.quantity || 0} units)
                </span>
              </label>
              <input
                type="number"
                min="1"
                max={crop?.quantity || 1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="input input-bordered w-full rounded-lg text-lg"
                required
              />
            </div>

            <div className="text-xl font-bold text-gray-800 mb-6">
              Total Price:{" "}
              <span className="text-green-600">
                {(crop?.price * quantity).toFixed(2)} TK
              </span>
            </div>

            <div className="modal-action flex justify-between">
              <button
                type="submit"
                className="btn bg-green-600 hover:bg-green-700 text-white border-none rounded-lg"
                disabled={
                  quantity <= 0 ||
                  quantity > crop.quantity ||
                  crop.quantity === 0
                }
              >
                Confirm Add to Cart
              </button>

              {/* Close button using form method="dialog" */}
              <button
                type="button"
                onClick={() => document.getElementById("cart_modal").close()}
                className="btn btn-ghost rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Crop;
