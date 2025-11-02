"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, List, PlusCircle, PieChart, CreditCard, User, Edit } from "lucide-react";

export default function BudgetsPage() {
  const pathname = usePathname();
  const sidebarItems = [
    { name: "Home", icon: <Home size={18} />, path: "/dashboard" },
    { name: "Transactions", icon: <List size={18} />, path: "/dashboard/transactions" },
    { name: "Add", icon: <PlusCircle size={18} />, path: "/dashboard/add" },
    { name: "Budgets", icon: <PieChart size={18} />, path: "/dashboard/budgets" },
    { name: "Accounts", icon: <CreditCard size={18} />, path: "/dashboard/accounts" },
    { name: "Profile", icon: <User size={18} />, path: "/dashboard/profile" },
  ];

  const categoryBudgets = [
    { name: "Books", used: 65, limit: 100 },
    { name: "Utilities", used: 150, limit: 250 },
  ];

  const totalBudget = 1900;
  const totalSpent = 494;
  const percentUsed = (totalSpent / totalBudget) * 100;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div>
          <div className="p-6 flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg"></div>
            <h1 className="text-lg font-semibold">Budget Tracker</h1>
          </div>
          <nav className="px-3">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg mb-1 ${
                  pathname === item.path
                    ? "bg-gray-100 text-black font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
              AJ
            </div>
            <div>
              <p className="text-sm font-medium">Alex Johnson</p>
              <p className="text-xs text-gray-500">alex.johnson@example.com</p>
            </div>
          </div>
          <button className="text-sm text-gray-500 hover:text-black text-left">⏻ Sign Out</button>
        </div>
      </aside>

      {/* Main Content */}
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
              style={{ width: `${percentUsed}%` }}
            ></div>
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
            const percent = (cat.used / cat.limit) * 100;
            const remaining = cat.limit - cat.used;

            return (
              <div key={cat.name} className="bg-white p-5 rounded-2xl shadow">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        cat.name === "Books" ? "bg-teal-100 text-teal-600" : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {cat.name[0]}
                    </div>
                    <p className="font-medium">{cat.name}</p>
                  </div>
                  <button className="text-gray-500 hover:text-black">
                    <Edit size={16} />
                  </button>
                </div>

                <p className="text-sm text-gray-500 mb-1">
                  ${cat.used.toFixed(2)} / ${cat.limit.toFixed(2)}
                </p>
                <div className="w-full h-2 bg-gray-200 rounded-full mb-1">
                  <div
                    className="h-2 bg-black rounded-full"
                    style={{ width: `${percent}%` }}
                  ></div>
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
    </div>
  );
}
