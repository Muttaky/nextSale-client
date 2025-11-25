"use client";
import useAuth from "@/AuthInfo";
import Link from "next/link";
import React, { useEffect, useCallback, useState } from "react";

const BASE_URL = "https://next-sale-server.vercel.app/items";

const Page = () => {
  const { user, loading: authLoading } = useAuth();
  const [myCrops, setMyCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Data Fetching and State Management
  const fetchMyCrops = useCallback(async () => {
    // Wait until the user object is resolved by the mock auth
    if (!user?.email) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);

      // Fetch all and filter client-side as per original implementation
      const res = await fetch(BASE_URL);

      if (!res.ok) throw new Error("Failed to fetch data.");
      const allData = await res.json();

      // Filter data client-side after fetching
      const filteredCrops = allData.filter(
        (item) => item.ownerEmail === user.email
      );
      setMyCrops(filteredCrops);
    } catch (error) {
      console.error("Fetch error:", error);
      // Ensure 'toast' is imported or mocked if not available
      // toast.error("Failed to load your posted crops.");
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    if (user?.email && !authLoading) {
      fetchMyCrops();
    }
  }, [user, authLoading, fetchMyCrops]);

  // Function to show the modal (for cleaner code)
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

  // Function to handle form submission for editing
  const handleEdit = async (e, crop) => {
    e.preventDefault();

    // Collecting form data from inputs
    const updatedData = {
      title: e.target.title.value,
      short: e.target.short.value,
      full: e.target.full.value,
      price: parseFloat(e.target.price.value),
      quantity: parseInt(e.target.quantity.value, 10),
      location: e.target.location.value,
      image: e.target.image.value,
    };

    try {
      let response = await fetch(`${BASE_URL}/${crop._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      let data = await response.json();

      if (response.ok && data.modifiedCount) {
        // Update state directly instead of window.location.reload()
        setMyCrops((prevCrops) =>
          prevCrops.map((c) =>
            c._id === crop._id
              ? {
                  ...c,
                  ...updatedData,
                  // Syncing display fields with form fields
                  name: updatedData.title,
                  description: updatedData.short,
                  type: updatedData.full,
                }
              : c
          )
        );

        document.getElementById(`edit_modal_${crop._id}`).close();
        // toast.success("Item updated successfully!"); // Re-enable if toast works
      } else {
        throw new Error(data.message || "Failed to update item.");
      }
    } catch (error) {
      // toast.error("Failed to update crop."); // Re-enable if toast works
      console.error(error);
    }
  };

  // Function to handle deletion
  const handleDelete = async (crop) => {
    const modalId = `delete_modal_${crop._id}`;

    try {
      // toast.info(`Deleting ${crop.name || crop.title}...`); // Re-enable if toast works
      let response = await fetch(`${BASE_URL}/${crop._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok && data.deletedCount === 1) {
        // Update state directly instead of window.location.reload()
        setMyCrops((prevCrops) => prevCrops.filter((c) => c._id !== crop._id));

        document.getElementById(modalId).close();
        // toast.success(`${crop.name || crop.title} deleted successfully!`); // Re-enable if toast works
      } else {
        throw new Error(data.message || "Deletion failed. Try again.");
      }
    } catch (error) {
      // toast.error("An error occurred during deletion."); // Re-enable if toast works
      console.error(error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <span className="loading loading-dots loading-lg text-green-600"></span>
        <p className="ml-3 text-lg text-gray-600">
          Loading your posted Items...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50 font-inter">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        📝 My Posted Items ({myCrops.length})
      </h1>

      {myCrops.length === 0 ? (
        <div className="alert alert-info shadow-lg max-w-xl mx-auto bg-blue-50 text-blue-700 border-l-4 border-blue-500 rounded-lg p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>
            You have not posted any items yet. Start sharing your harvest!
          </span>
        </div>
      ) : (
        <div className="space-y-6 max-w-5xl mx-auto">
          {myCrops.map((crop) => (
            <div
              key={crop._id}
              className="flex flex-col md:flex-row items-start bg-white shadow-xl p-6 rounded-xl border border-green-100 transition duration-300 hover:shadow-2xl hover:border-green-300"
            >
              <figure className="w-full md:w-32 h-32 bg-green-50 rounded-lg mr-0 md:mr-6 mb-4 md:mb-0 flex-shrink-0 overflow-hidden">
                {crop.image ? (
                  <img
                    src={crop.image}
                    alt={crop.title || crop.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-green-700 font-bold text-sm">
                    No Image
                  </div>
                )}
              </figure>
              <div className="flex-grow w-full md:w-auto text-left">
                <h3 className="text-2xl font-bold text-green-700 mb-1">
                  {crop.title}
                </h3>

                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {crop.short}
                </p>

                <div className="flex flex-wrap gap-2 text-sm font-medium">
                  <span className="badge badge-success bg-green-100 text-green-700 p-3 rounded-full">
                    💰 Price: {crop.price} TK
                  </span>

                  <span className="badge badge-info bg-blue-100 text-blue-700 p-3 rounded-full">
                    📦 Stock: {crop.quantity}
                  </span>

                  <span className="badge badge-neutral bg-gray-200 text-gray-700 p-3 rounded-full">
                    📍 {crop.location}
                  </span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0 flex space-x-2 w-full md:w-auto justify-end">
                <Link href={`/items/${crop._id}`}>
                  {" "}
                  <button className="btn btn-sm btn-outline btn-info border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200">
                    View
                  </button>
                </Link>
                <button
                  className="btn btn-sm btn-outline btn-info border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200"
                  onClick={() => showModal(`edit_modal_${crop._id}`)}
                >
                  Edit
                </button>
                <dialog
                  id={`edit_modal_${crop._id}`}
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box p-6 bg-white rounded-lg shadow-2xl">
                    <form onSubmit={(e) => handleEdit(e, crop)}>
                      <div className="p-0">
                        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                          Edit {crop.name || crop.title}
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Title Input */}
                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text font-semibold">
                                Title (Name)
                              </span>
                            </div>
                            <input
                              name="title"
                              type="text"
                              className="input input-bordered w-full rounded-lg"
                              defaultValue={crop.title || crop.name}
                              required
                            />
                          </label>

                          {/* Short Description Input */}
                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text font-semibold">
                                Short Details (Description)
                              </span>
                            </div>
                            <input
                              name="short"
                              type="text"
                              className="input input-bordered w-full rounded-lg"
                              defaultValue={crop.short || crop.description}
                              required
                            />
                          </label>

                          {/* Full Description / Type Input */}
                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text font-semibold">
                                Type/Full Description
                              </span>
                            </div>
                            <input
                              name="full"
                              type="text"
                              className="input input-bordered w-full rounded-lg"
                              defaultValue={crop.full || crop.type}
                              required
                            />
                          </label>

                          {/* Price Input */}
                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text font-semibold">
                                Price (TK)
                              </span>
                            </div>
                            <input
                              name="price"
                              type="number"
                              step="0.01"
                              className="input input-bordered w-full rounded-lg"
                              defaultValue={crop.price}
                              required
                            />
                          </label>

                          {/* Quantity Input */}
                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text font-semibold">
                                Quantity
                              </span>
                            </div>
                            <input
                              name="quantity"
                              type="number"
                              className="input input-bordered w-full rounded-lg"
                              defaultValue={crop.quantity}
                              required
                            />
                          </label>

                          {/* Location Input */}
                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text font-semibold">
                                Location
                              </span>
                            </div>
                            <input
                              name="location"
                              type="text"
                              className="input input-bordered w-full rounded-lg"
                              defaultValue={crop.location}
                              required
                            />
                          </label>

                          {/* Image URL Input */}
                          <label className="form-control w-full sm:col-span-2">
                            <div className="label">
                              <span className="label-text font-semibold">
                                Image URL
                              </span>
                            </div>
                            <input
                              name="image"
                              type="text"
                              className="input input-bordered w-full rounded-lg"
                              defaultValue={crop.image}
                            />
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-neutral mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white border-none rounded-lg"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>

                    <div className="modal-action mt-4">
                      <form method="dialog">
                        <button className="btn btn-sm btn-ghost rounded-lg">
                          Close
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>

                <button
                  className="btn btn-sm btn-outline btn-error border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-200"
                  onClick={() => showModal(`delete_modal_${crop._id}`)}
                >
                  Delete
                </button>

                <dialog
                  id={`delete_modal_${crop._id}`}
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box text-center bg-white rounded-lg shadow-2xl p-8">
                    <h3 className="font-bold text-2xl text-red-600 mb-4">
                      Confirm Deletion
                    </h3>

                    <p className="py-4 text-gray-700">
                      Are you sure you want to permanently delete
                      <span className="font-bold text-lg text-red-700 block mt-1">
                        {crop.name || crop.title}
                      </span>
                      ? This action cannot be undone.
                    </p>

                    <div className="flex justify-center space-x-4 mt-4">
                      <button
                        onClick={() => handleDelete(crop)}
                        className="btn btn-sm btn-error bg-red-600 hover:bg-red-700 text-white border-none rounded-lg"
                      >
                        Yes, Delete
                      </button>

                      <form method="dialog">
                        <button className="btn btn-sm btn-ghost rounded-lg">
                          Cancel
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
