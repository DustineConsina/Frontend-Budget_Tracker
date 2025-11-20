"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAppContext } from "../Context/AppContext";

export default function AuthPage() {
  const router = useRouter();
  const { setUser, setToken } = useAppContext();
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isSignIn && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      if (isSignIn) {
        const response = await axios.post("http://localhost:8000/api/login", {
          email: formData.email,
          password: formData.password,
        });

        // Update context
        setUser(response.data.user);
        setToken(response.data.token);

        // Save in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);

        router.push("/dashboard");
      } else {
        // Sign Up
        const response = await axios.post("http://localhost:8000/api/register", {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        });

        console.log("Registration success:", response.data);
        setIsSignIn(true);
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 422 && err.response.data.errors) {
          const messages = Object.values(err.response.data.errors).flat().join(" ");
          setError(messages);
        } else if (err.response.status === 401) {
          setError("Invalid email or password");
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Something went wrong");
        }
      } else {
        setError("Network error or server is down");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center border border-blue-300 rounded-md p-6 shadow-sm bg-white">
          <div className="flex justify-center mb-3">
            <div className="bg-gray rounded-xl p-3 flex items-center justify-center">
              <img src="/wallet.logo.webp" alt="Budget Tracker Logo" className="w-25 h-15" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold">Budget Tracker</h1>
          <p className="text-gray-500 text-sm">
            {isSignIn
              ? "Manage your finances with ease"
              : "Start managing your finances today"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white shadow-md rounded-md p-6 space-y-4 border">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isSignIn && (
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            )}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {!isSignIn && (
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Please wait..." : isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          {isSignIn ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsSignIn(false)}
                className="text-black font-medium hover:underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsSignIn(true)}
                className="text-black font-medium hover:underline"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
