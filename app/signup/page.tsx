"use client";

import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center border border-blue-300 rounded-md p-6 shadow-sm bg-white">
          <div className="flex justify-center mb-3">
            <div className="bg-black text-white rounded-xl p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2m4-5h-8m0 0l2.5-2.5M13 12.5l2.5 2.5"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-semibold">Budget Tracker</h1>
          <p className="text-gray-500 text-sm">
            Start managing your finances today
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-md rounded-md p-6 space-y-4 border">
          <div>
            <h2 className="text-sm font-medium text-gray-800">Create Account</h2>
            <p className="text-gray-500 text-sm">
              Sign up to get started with your budget tracking
            </p>
          </div>

          <form className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="••••••"
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                Must be at least 6 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••"
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800 transition"
            >
              Sign Up
            </button>

            {/* Terms */}
            <p className="text-[11px] text-gray-400 text-center">
              By signing up, you agree to our{" "}
              <span className="underline cursor-pointer">Terms of Service</span> and{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>.
            </p>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/signin" className="text-black font-medium hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
