"use client";

import NavBar from "./NavBar";
import Footer from "./Footer";
import AuthProvider from "@/AuthProvider";
import { ToastContainer } from "react-toastify";

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <ToastContainer />

      {children}
    </AuthProvider>
  );
}
