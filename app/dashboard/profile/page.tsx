"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  List,
  PlusCircle,
  PieChart,
  CreditCard,
  User,
  Bell,
  Moon,
  Globe,
  Lock,
  Info,
} from "lucide-react";
import { useAppContext } from "../../Context/AppContext";
import { useState } from "react";

export default function ProfilePage() {
  const pathname = usePathname();
  const { user, setUser, logout, token } = useAppContext();

  const [editMode, setEditMode] = useState(false);

  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currency, setCurrency] = useState(user?.currency || "USD - US Dollar");

  const sidebarItems = [
    { name: "Home", icon: Home, path: "/dashboard" },
    { name: "Transactions", icon: List, path: "/dashboard/transaction" },
    { name: "Add", icon: PlusCircle, path: "/dashboard/add" },
    { name: "Budgets", icon: PieChart, path: "/dashboard/budgets" },
    { name: "Accounts", icon: CreditCard, path: "/dashboard/accounts" },
    { name: "Profile", icon: User, path: "/dashboard/profile" },
  ];

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Please Sign In</p>
      </div>
    );
  }

  const version = user.version || "v1.0.0";

  // ------------------ UPDATE PROFILE TO BACKEND ------------------
  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          email,
          currency,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Failed to update profile");
        return;
      }

      
      setUser(data.user);

      setEditMode(false);
      alert("Profile updated successfully!");

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white shadow-md p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-8">
            <div className="bg-white text-white rounded-xl p-2 mr-2">
              <img src="/logo.avif" alt="Logo" className="w-12 h-12" />
            </div>
            <h1 className="text-lg font-semibold">Budget Tracker</h1>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center w-full p-2 rounded-lg ${
                    pathname === item.path
                      ? "bg-gray-200 text-black"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={18} className="mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-semibold mb-6">Profile</h1>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 shadow mb-6 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold mb-3">
            {name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-lg font-medium">{name}</h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-2xl p-6 shadow mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-700">
              Account Information
            </h3>

            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="text-sm text-gray-500 hover:text-black"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleUpdate}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Save
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Name FIELD */}
            <div>
              <label className="text-xs text-gray-500 flex items-center gap-2">
                <User size={14} /> Name
              </label>
              <input
                type="text"
                disabled={!editMode}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full mt-1 p-2 rounded-lg border text-sm ${
                  editMode ? "bg-white" : "bg-gray-50 text-gray-700"
                }`}
              />
            </div>

            {/* Email FIELD */}
            <div>
              <label className="text-xs text-gray-500 flex items-center gap-2">
                📧 Email
              </label>
              <input
                type="email"
                disabled={!editMode}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full mt-1 p-2 rounded-lg border text-sm ${
                  editMode ? "bg-white" : "bg-gray-50 text-gray-700"
                }`}
              />
            </div>

            {/* Currency FIELD */}
            <div>
              <label className="text-xs text-gray-500 flex items-center gap-2">
                💲 Currency
              </label>
              <select
                disabled={!editMode}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={`w-full mt-1 p-2 rounded-lg border text-sm ${
                  editMode ? "bg-white" : "bg-gray-50 text-gray-700"
                }`}
              >
                <option>USD - US Dollar</option>
                <option>PHP - Philippine Peso</option>
                <option>EUR - Euro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl p-6 shadow mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Settings</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Bell size={16} /> Notifications
                </p>
                <p className="text-xs text-gray-500">Receive budget alerts</p>
              </div>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Moon size={16} /> Dark Mode
                </p>
                <p className="text-xs text-gray-500">Toggle dark theme</p>
              </div>
              <input type="checkbox" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Globe size={16} /> Language
                </p>
                <p className="text-xs text-gray-500">{user.language || "English"}</p>
              </div>
              <button className="text-sm text-gray-500 hover:text-black">Change</button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl p-6 shadow mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Security</h3>
          <button className="flex items-center gap-2 w-full text-left text-sm text-gray-700 hover:text-black">
            <Lock size={16} /> Change Password
          </button>
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">About</h3>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <Info size={16} />
            <div>
              <p>Budget Tracker App {version}</p>
              <p className="text-xs text-gray-500">
                Manage your finances with ease
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:text-red-600 flex items-center justify-center gap-1 mx-auto"
          >
            ↳ Sign Out
          </button>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 flex justify-around p-2 shadow-md">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`flex flex-col items-center text-xs ${
              pathname === item.path ? "text-gray-900" : "text-gray-500"
            }`}
          >
            <item.icon size={24} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
