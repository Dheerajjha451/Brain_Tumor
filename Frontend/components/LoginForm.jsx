"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loginImage from "../public/login.png";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
  
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (response.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace('dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="bg-light-background shadow-lg p-8 rounded-lg md:w-1/2 grid md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className="md:block ">
          <div className="w-full h-auto md:rounded-l-lg md:rounded-l-none md:rounded-tl-lg md:rounded-bl-lg overflow-hidden">
            <Image 
              src={loginImage} 
              alt="Login" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="md:col-span-1">
          <h1 className="text-2xl font-bold mb-4 mx-8 text-light-purple">Welcome Back!</h1>
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
            <button className="bg-light-purple text-white py-2 font-bold cursor-pointer rounded-md">
              Login
            </button>
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
        <span className="text-black mx-2">Don't have an account?</span>
<span className="text-blue-500 cursor-pointer mx-2" onClick={() => router.push('/register')}>
  Register
</span>

          </form>
        </div>
      </div>
    </div>
  );
}
