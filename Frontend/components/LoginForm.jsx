"use client"
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Image component
import loginImage from "../public/login.png"; // Import login image
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid"; // Import icons for show/hide password

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage show/hide password
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="bg-light-background shadow-lg p-8 rounded-lg md:w-1/2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block md:col-span-1">
            <Image
              src={loginImage}
              alt="Login"
              className="w-full h-auto rounded-l-lg md:rounded-l-none md:rounded-tl-lg md:rounded-bl-lg"
            />
          </div>
          {/* Form Section */}
          <div className="md:col-span-1">
            <h1 className="text-2xl text-light-purple font-bold my-4 mx-8 text-center">Welcome back!</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"} // Show/hide password based on showPassword state
                  placeholder="Password"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)} // Toggle showPassword state
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <button className="bg-light-purple text-white font-bold cursor-pointer px-6 py-2 rounded-md">
                Login
              </button>
              {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {error}
                </div>
              )}

              <Link className="text-sm mt-3 text-right" href={"/register"}>
                Don't have an account? <span className="underline text-blue-700">Register</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
