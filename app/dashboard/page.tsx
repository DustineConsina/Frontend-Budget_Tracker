"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CreditCard,
  PlusCircle,
  Wallet,
  User,
  LogOut,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const pathname = usePathname();

  const sidebarItems = [
    { label: "Home", icon: Home, path: "/dashboard" },
    { label: "Transactions", icon: CreditCard, path: "/dashboard/transaction" },
    { label: "Add", icon: PlusCircle, path: "/dashboard/add" },
    { label: "Budgets", icon: Wallet, path: "/dashboard/budgets" },
    { label: "Accounts", icon: CreditCard, path: "/dashboard/accounts" },
    { label: "Profile", icon: User, path: "/dashboard/profile" },
  ];

  const transactions = [
    { id: 1, name: "Food", date: "10/8/2025", amount: -45.5 },
    { id: 2, name: "Salary", date: "10/5/2025", amount: 3500 },
    { id: 3, name: "Shopping", date: "10/7/2025", amount: -120 },
    { id: 4, name: "Entertainment", date: "10/4/2025", amount: -85 },
    { id: 5, name: "Food", date: "10/3/2025", amount: -28.5 },
  ];

  const categoryData = [
    { name: "Food", value: 74 },
    { name: "Books", value: 65 },
    { name: "Shopping", value: 120 },
    { name: "Entertainment", value: 85 },
    { name: "Utilities", value: 150 },
  ];

  const COLORS = ["#FF6B6B", "#6B5BFF", "#FFC154", "#8E44AD", "#00C49F"];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-8">
            <div className="bg-black text-white rounded-xl p-2 mr-2">
              <CreditCard size={22} />
            </div>
            <h1 className="text-lg font-semibold">Budget Tracker</h1>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                href={item.path}
                className={`flex items-center w-full p-2 rounded-lg ${
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

        <button className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <LogOut size={18} className="mr-2" /> Sign Out
        </button>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6">Home</h2>

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl p-6 shadow-lg">
            <h3 className="flex items-center text-sm font-medium mb-2">
              <CreditCard size={16} className="mr-2" /> Total Balance
            </h3>
            <p className="text-4xl font-bold mb-6">$18,540.50</p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-300">Income</p>
                <p className="text-lg">$3,500.00</p>
              </div>
              <div>
                <p className="text-gray-300">Expenses</p>
                <p className="text-lg">$494.00</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-md">
            <h4 className="font-semibold mb-4">Spending</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  outerRadius={70}
                  fill="#8884d8"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h4 className="font-semibold mb-4">Budget Overview</h4>
            {categoryData.map((cat) => (
              <div key={cat.name} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>{cat.name}</span>
                  <span>${cat.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-black h-2 rounded-full"
                    style={{ width: `${(cat.value / 500) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h4 className="font-semibold mb-4">Category Breakdown</h4>
            <ul className="space-y-2 text-sm">
              {categoryData.map((cat, index) => (
                <li
                  key={cat.name}
                  className="flex justify-between items-center"
                >
                  <span className="flex items-center">
                    <span
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index] }}
                    ></span>
                    {cat.name}
                  </span>
                  <span>${cat.value.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
          <h4 className="font-semibold mb-4">Recent Transactions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
              >
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.date}</p>
                </div>
                <p
                  className={`font-semibold ${
                    t.amount > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {t.amount > 0 ? "+" : ""}
                  ${t.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
