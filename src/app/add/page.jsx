"use client";

import useAuth from "@/AuthInfo";
import { toast } from "react-toastify";

const page = () => {
  let date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  let { user } = useAuth();
  const handleAddItems = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const short = e.target.short.value;
    const full = e.target.full.value;
    const price = e.target.price.value;
    const quantity = e.target.quantity.value;
    const location = e.target.location.value;
    const image = e.target.image.value;
    const ownerEmail = user.email;
    const newItem = {
      title,
      short,
      full,
      price,
      quantity,
      date,
      location,
      image,
      ownerEmail,
    };

    fetch("https://next-sale-server.vercel.app/items", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after post item", data);
        if (data.insertedId) {
          toast("item added successfully");
          e.target.reset();
        }
      });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col ">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Add Items</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleAddItems}>
                <fieldset className="fieldset">
                  <label className="label">title</label>
                  <input
                    name="title"
                    type="text"
                    className="input"
                    placeholder="Title"
                  />
                  <label className="label">shortDescription</label>
                  <input
                    name="short"
                    type="text"
                    className="input"
                    placeholder="shortDescription"
                  />
                  <label className="label">fullDescription</label>
                  <input
                    name="full"
                    type="text"
                    className="input"
                    placeholder="fullDescription"
                  />
                  <label className="label">Price</label>
                  <input
                    name="price"
                    type="number"
                    className="input"
                    placeholder="Price"
                  />
                  <label className="label">Quantity</label>
                  <input
                    name="quantity"
                    type="number"
                    className="input"
                    placeholder="Quantity"
                  />
                  <label className="label">Location</label>
                  <input
                    name="location"
                    type="text"
                    className="input"
                    placeholder="Location"
                  />
                  <label className="label">Image</label>
                  <input
                    name="image"
                    type="text"
                    className="input"
                    placeholder="Image URL"
                  />
                  <button className="btn btn-neutral mt-4">Submit</button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
