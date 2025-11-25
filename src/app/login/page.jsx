"use client";
import useAuth from "@/AuthInfo";
import { useRouter } from "next/navigation";

import React from "react";
import { useForm } from "react-hook-form";
const setAuthCookie = () => {
  const expirationDays = 7; // expires in 7 days
  const date = new Date();
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  document.cookie = `is_authenticated=true; path=/; expires=${date.toUTCString()}; SameSite=Lax`;
};
const page = () => {
  let router = useRouter();
  let { loginUser, loginGoogle } = useAuth();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let handleGoogle = () => {
    loginGoogle()
      .then((result) => {
        console.log(result.user);
        setAuthCookie();
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let handleRegister = (data) => {
    console.log(data);
    loginUser(data.email, data.password)
      .then((result) => {
        setAuthCookie();
        console.log(result.user);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input
                    {...register("email", { required: true, minLength: 6 })}
                    type="email"
                    className="input"
                    placeholder="Email"
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-500">Email is required</p>
                  )}
                  <label className="label">Password</label>
                  <input
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    })}
                    type="password"
                    className="input"
                    placeholder="Password"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-500">password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-500">
                      minimum 6 character is required
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-500">
                      password must have one uppercase , one lowercase ,one
                      number and one special character
                    </p>
                  )}
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button className="btn btn-neutral mt-4">Login</button>
                  <button
                    onClick={handleGoogle}
                    className="btn bg-white text-black border-[#e5e5e5]"
                  >
                    <svg
                      aria-label="Google logo"
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <path d="m0 0H512V512H0" fill="#fff"></path>
                        <path
                          fill="#34a853"
                          d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                        ></path>
                        <path
                          fill="#4285f4"
                          d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                        ></path>
                        <path
                          fill="#fbbc02"
                          d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                        ></path>
                        <path
                          fill="#ea4335"
                          d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                        ></path>
                      </g>
                    </svg>
                    Login with Google
                  </button>
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
