"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, List, PlusCircle, PieChart, CreditCard, User, LogOut } from "lucide-react";
import { useAppContext } from "../../Context/AppContext";

export default function AddTransactionPage() {
  const pathname = usePathname();
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const [note, setNote] = useState("");
  const { user, logout } = useAppContext();

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const transaction = { type, amount, date, category, account, note };
    console.log("Transaction Added:", transaction);
    alert("✅ Transaction added (frontend only)");
    setAmount("");
    setDate("");
    setCategory("");
    setAccount("");
    setNote("");
    setType("Expense");
  };

  const quickAmounts = [10, 20, 50, 100, 200, 500];
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
      <main className="flex-1 p-8 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl font-semibold mb-6">Add</h1>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Add New Transaction</h2>

            {/* Type Toggle */}
            <div className="flex bg-gray-100 rounded-full p-1 mb-4 w-64 mx-auto">
              <button
                onClick={() => setType("Expense")}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                  type === "Expense" ? "bg-white shadow" : "text-gray-500"
                }`}
              >
                Expense
              </button>
              <button
                onClick={() => setType("Income")}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                  type === "Income" ? "bg-white shadow" : "text-gray-500"
                }`}
              >
                Income
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-4">
              {/* Amount */}
              <div>
                <label className="block text-sm font-medium mb-1">Amount *</label>
                <input
                  type="number"
                  placeholder="$ 0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Quick Amounts */}
              <div className="flex flex-wrap gap-2 justify-center">
                {quickAmounts.map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => setAmount(String(amt))}
                    className="px-4 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium mb-1">Date *</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Food">Food</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Transport">Transport</option>
                  <option value="Bills">Bills</option>
                  <option value="Salary">Salary</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Account */}
              <div>
                <label className="block text-sm font-medium mb-1">Account *</label>
                <select
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select account</option>
                  <option value="Main Bank">Main Bank</option>
                  <option value="Cash">Cash</option>
                  <option value="Savings">Savings</option>
                </select>
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-medium mb-1">Note (Optional)</label>
                <textarea
                  placeholder="Add a note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition font-medium"
              >
                Add Transaction
              </button>
            </form>
          </div>
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
