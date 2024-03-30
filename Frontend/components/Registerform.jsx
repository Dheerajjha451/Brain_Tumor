"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import loginImage from "../public/login.png";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
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
          <div className="md:col-span-1">
            <h1 className="text-2xl text-light-purple font-bold my-4 mx-8 text-center">Create an account</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 relative">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Full Name"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
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
              <button className="bg-light-purple text-white font-bold cursor-pointer px-6 py-2 rounded-md">
                Register
              </button>
              {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {error}
                </div>
              )}
              <Link href={"/"} passHref>
                <p className="text-sm mt-3 text-right">
                  Already have an account? <span className="underline text-blue-700">Login</span>
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
