"use client";
import axios from 'axios';
import { useState } from 'react';
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { LoaderIcon } from '../../../../public/icons/LoaderIcon';
import toast from 'react-hot-toast';

 

function Page() {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const [authUser, setAuthUser] = useState({ name: "", email: "", password: ""})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
      
    try {
      const response = await api.post("/register", {
        name: authUser.name,
        email: authUser.email,
        password: authUser.password,
      });

      console.log(response.data);
      toast.success("Account created successfully!");

      router.push("/login");
    } catch (error) {
        if(axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message ?? "Registration failed",
          )
        } else {
          toast.error("Something went wrong. Please try again.");
        }
    } finally {
      setisLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#EFECE6] text-[#2C332E] font-sans flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-275 bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-170">
        
        {/* Left Side: Branding / Visual Highlight */}
        <div className="md:col-span-5 bg-[#E2DFD8] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background decorative shapes */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#506D5B]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#506D5B]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Logo Header */}
          <div className="flex items-center gap-3 z-10">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md">
              <svg width="200" height="200" viewBox="0 0 199 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="199" height="200" fill="url(#paint0_linear_28_28888)"/>
                <path d="M47 100C47 127.614 47 140 47 150C74.6142 150 97 127.614 97 100C97 72.3858 74.6142 50 47 50C47 70 47 72.3858 47 100Z" fill="#EAE9E3"/>
                <path d="M152 100C152 127.614 152 140 152 150C124.386 150 102 127.614 102 100C102 72.3858 124.386 50 152 50C152 70 152 72.3858 152 100Z" fill="#EAE9E3"/>
                <defs>
                  <linearGradient id="paint0_linear_28_28888" x1="99.5" y1="0" x2="99.5" y2="200" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#2A2A2C"/>
                  <stop offset="1" stop-color="#1F2122"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="font-semibold text-xl text-[#2C332E] tracking-tight">DMFlow.</span>
          </div>

          {/* Feature Badge Preview */}
          <div className="my-8 z-10">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/50 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-1 bg-[#506D5B]/15 text-[#506D5B] font-semibold text-xs rounded-lg">
                  +2.45%
                </span>
                <span className="text-xs font-semibold text-gray-500">Real-time Sync</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {"Keep you safe! Update your security password & monitor your wallet seamlessly."}
              </p>
            </div>

            <h2 className="text-2xl font-bold text-[#2C332E] tracking-tight leading-snug">
              Turn Instagram DMs into conversations that convert.
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Automate replies, engage your audience, and manage your Instagram conversations without repetitive manual work.
            </p>
          </div>

          {/* Security badge */}
          <div className="text-xs text-gray-500 z-10 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#506D5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Bank-grade Security Guaranteed
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#2C332E] tracking-tight">Create account</h1>
              <p className="text-sm text-gray-500 mt-1">Get started with your free account today.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Input */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={authUser.name}
                  onChange={(e) => setAuthUser((prev) => ({...prev, name: e.target.value}))}
                  placeholder="Carlic Bolomboy"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#F8F7F4] border border-gray-200 text-[#2C332E] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#506D5B] focus:bg-white transition-all text-sm"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 tracking-wider mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={authUser.email}
                  onChange={(e) => setAuthUser((prev) => ({...prev, email: e.target.value}))}
                  placeholder="carlic@gmail.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#F8F7F4] border border-gray-200 text-[#2C332E] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#506D5B] focus:bg-white transition-all text-sm"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 tracking-wider mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  value={authUser.password}
                  onChange={(e) => setAuthUser((prev) => ({...prev, password: e.target.value}))}
                  placeholder="Must be at least 8 characters"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#F8F7F4] border border-gray-200 text-[#2C332E] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#506D5B] focus:bg-white transition-all text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#506D5B] hover:bg-[#3d5446] text-white font-semibold text-sm transition-all shadow-sm active:scale-[0.99] mt-3"
              >
                {
                  isLoading ?
                    <LoaderIcon /> :
                    "Create Account"
                }
              </button>
            </form>

            {/* Social Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-400 font-medium">Or register with</span>
              </div>
            </div>

            {/* Google Signup Button */}
            <button
              type="button"
              className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium flex items-center justify-center gap-3 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Google Account
            </button>

            {/* Switch to Login */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <a href="/login" className="font-semibold text-[#506D5B] hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Page
