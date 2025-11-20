"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  List,
  PlusCircle,
  Wallet,
  User,
  CreditCard,
  Filter,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const Transactions = () => {
  const pathname = usePathname();
  const [filterType, setFilterType] = useState("All");

  const sidebarItems = [
    { label: "Home", icon: Home, path: "/dashboard" },
    { label: "Transactions", icon: List, path: "/dashboard/transaction" },
    { label: "Add", icon: PlusCircle, path: "/dashboard/add" },
    { label: "Budgets", icon: Wallet, path: "/dashboard/budgets" },
    { label: "Accounts", icon: CreditCard, path: "/dashboard/accounts" },
    { label: "Profile", icon: User, path: "/dashboard/profile" },
  ];

  const transactions = [
    { id: 1, category: "Food", account: "Main Bank", note: "Grocery shopping", date: "October 8, 2025", amount: -45.5 },
    { id: 2, category: "Shopping", account: "Main Bank", note: "New shoes", date: "October 7, 2025", amount: -120 },
    { id: 3, category: "Salary", account: "Main Bank", note: "Monthly salary", date: "October 5, 2025", amount: 3500 },
  ];

  const filteredTransactions =
    filterType === "All"
      ? transactions
      : filterType === "Income"
      ? transactions.filter((t) => t.amount > 0)
      : transactions.filter((t) => t.amount < 0);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ---------------- DESKTOP SIDEBAR ---------------- */}
      <aside className="hidden md:flex w-64 bg-white shadow-md p-4 flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="flex items-center mb-8">
            <img src="/logo.avif" alt="Logo" className="w-12 h-12 mr-2" />
            <h1 className="text-lg font-semibold">Budget Tracker</h1>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                href={item.path}
                className={`flex items-center p-2 rounded-lg ${
                  pathname === item.path
                    ? "bg-gray-200 text-black"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon size={18} className="mr-2" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sign Out */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/Auth";
          }}
          className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <LogOut size={18} className="mr-2" /> Sign Out
        </button>
      </aside>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex-1 p-8 overflow-y-auto md:mt-0">
        <h2 className="text-2xl font-semibold mb-6">Transactions</h2>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-3 text-gray-700 font-medium">
            <Filter size={16} />
            Filters
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 mb-4 overflow-x-auto">
            {["All", "Income", "Expense"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filterType === type
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Dropdowns */}
          <div className="flex gap-3">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>All Categories</option>
              <option>Food</option>
              <option>Shopping</option>
              <option>Salary</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>All Accounts</option>
              <option>Main Bank</option>
              <option>Savings</option>
            </select>
          </div>
        </div>

        {/* Transaction List */}
        <div className="space-y-4">
          {filteredTransactions.map((t) => (
            <div key={t.id} className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-xs text-gray-500 mb-2">{t.date}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full mr-3 ${
                      t.amount > 0 ? "bg-green-400" : "bg-red-400"
                    }`}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-800">{t.category}</p>
                    <p className="text-xs text-gray-500">{t.account}</p>
                    <p className="text-xs text-gray-400">{t.note}</p>
                  </div>
                </div>
                <p
                  className={`font-semibold ${
                    t.amount > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {t.amount > 0 ? "+" : "-"}${Math.abs(t.amount).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ---------------- MOBILE BOTTOM NAV ---------------- */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 flex justify-around p-2 shadow-md">
        {sidebarItems.map((item) => (
          <Link
            key={item.label}
            href={item.path}
            className={`flex flex-col items-center text-xs ${
              pathname === item.path ? "text-gray-900" : "text-gray-500"
            }`}
          >
            <item.icon size={24} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Transactions;
