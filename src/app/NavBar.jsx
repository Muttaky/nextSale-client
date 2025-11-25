"use client";
import useAuth from "@/AuthInfo";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  let { user, logOut } = useAuth();
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-fit p-2 shadow"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/items">Items</Link>
              </li>
              <li>
                <Link href="/cart">Cart</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-2xl text-white bg-black">
            nextSale
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/items">Items</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div>
              {" "}
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost text-red-700"
                >
                  {user.email}
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-fit p-2 shadow"
                >
                  <li>
                    <Link href="/add">Add Product</Link>
                  </li>
                  <li>
                    <Link href="/manage">Manage Product</Link>
                  </li>
                  <li>
                    <Link href="/">
                      <button onClick={() => logOut()} className="btn">
                        Log Out
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              {" "}
              <Link href="/login" className="btn">
                Login
              </Link>
              <Link href="/register" className="btn">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
