"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import registrationImage from "../public/login.png";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // State for role
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      setError("All fields are necessary");
      return;
    }
    try {
      // Your form submission logic
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="bg-light-background shadow-lg p-8 rounded-lg md:w-1/2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="md:block md:col-span-1">
            <Image
              src={registrationImage}
              alt="Registration"
              className="w-full h-auto rounded-l-lg md:rounded-l-none md:rounded-tl-lg md:rounded-bl-lg"
            />
          </div>

          {/* Form Section */}
          <div className="md:col-span-1">
            <h1 className="text-2xl text-light-purple font-bold my-4 mx-8">Create an account</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              >
                <option value="">Select Role</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <button
                className="bg-blue-400 text-white py-2 font-bold cursor-pointer rounded-md"
                type="submit"
              >
                Register
              </button>
              {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {error}
                </div>
              )}
              <Link href="/">
                Already have an account?{" "}
                <span className="underline text-blue-600">Login</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
