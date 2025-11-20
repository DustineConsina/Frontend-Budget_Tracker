"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, List, PlusCircle, PieChart, CreditCard, User, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";

type CategoryBudget = {
  name: string;
  used: number;
  limit: number;
};

export default function BudgetsPage() {
  const pathname = usePathname();

  
  const [categoryBudgets, setCategoryBudgets] = useState<CategoryBudget[]>([]);
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const { user, logout } = useAppContext(); 

  useEffect(() => {
    setTotalBudget(0);
    setTotalSpent(0);

    setCategoryBudgets([
      { name: "Books", used: 0, limit: 100 },
      { name: "Utilities", used: 0, limit: 250 },
    ]);
  }, []);

  const percentUsed = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const sidebarItems = [
    { name: "Home", icon: Home, path: "/dashboard" },
    { name: "Transactions", icon: List, path: "/dashboard/transaction" },
    { name: "Add", icon: PlusCircle, path: "/dashboard/add" },
    { name: "Budgets", icon: PieChart, path: "/dashboard/budgets" },
    { name: "Accounts", icon: CreditCard, path: "/dashboard/accounts" },
    { name: "Profile", icon: User, path: "/dashboard/profile" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ---------------- DESKTOP SIDEBAR ---------------- */}
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

        <div className="p-4 border-t flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
            </div>
          </div>
          <button
            className="text-sm text-gray-500 hover:text-black text-left"
            onClick={logout} 
          >
            ⏻ Sign Out
          </button>
        </div>
      </aside>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-semibold mb-6">Budgets</h1>

        {/* Total Monthly Budget */}
        <div className="bg-white rounded-2xl p-6 shadow mb-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-sm text-gray-500">Total Monthly Budget</h2>
              <p className="text-2xl font-semibold">${totalBudget.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Spent</p>
              <p className="text-green-600 font-medium">${totalSpent.toFixed(2)}</p>
            </div>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
            <div
              className="h-2 bg-black rounded-full"
              style={{ width: `${Math.min(100, Math.max(0, percentUsed))}%` }}
            />
          </div>

          <p className="text-xs text-gray-500">{percentUsed.toFixed(1)}% of budget used</p>

          <button className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
            ↗ Set Budget
          </button>
        </div>

        {/* Category Budgets */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-gray-600">Category Budgets</h2>

          {categoryBudgets.map((cat) => {
            const percent = cat.limit > 0 ? (cat.used / cat.limit) * 100 : 0;
            const remaining = cat.limit - cat.used;

            return (
              <div key={cat.name} className="bg-white p-5 rounded-2xl shadow">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                      {cat.name[0] ?? "?"}
                    </div>
                    <p className="font-medium">{cat.name}</p>
                  </div>
                  <button className="text-gray-500 hover:text-black" aria-label={`Edit ${cat.name}`}>
                    <Edit size={16} />
                  </button>
                </div>

                <p className="text-sm text-gray-500 mb-1">
                  ${cat.used.toFixed(2)} / ${cat.limit.toFixed(2)}
                </p>

                <div className="w-full h-2 bg-gray-200 rounded-full mb-1">
                  <div
                    className="h-2 bg-black rounded-full"
                    style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">{percent.toFixed(1)}% used</span>
                  <span className="text-green-600 font-medium">${remaining.toFixed(2)} left</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ---------------- MOBILE BOTTOM NAV ---------------- */}
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
