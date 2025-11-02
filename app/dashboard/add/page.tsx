"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, List, PlusCircle, PieChart, CreditCard, User } from "lucide-react";

export default function AddTransactionPage() {
  const pathname = usePathname();
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const [note, setNote] = useState("");

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
    { name: "Home", icon: <Home size={18} />, path: "/dashboard" },
    { name: "Transactions", icon: <List size={18} />, path: "/dashboard/transaction" },
    { name: "Add", icon: <PlusCircle size={18} />, path: "/dashboard/add" },
    { name: "Budgets", icon: <PieChart size={18} />, path: "/dashboard/budgets" },
    { name: "Accounts", icon: <CreditCard size={18} />, path: "/dashboard/accounts" },
    { name: "Profile", icon: <User size={18} />, path: "/dashboard/profile" },
  ];

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

        <div className="p-4 border-t flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
              AJ
            </div>
            <div>
              <p className="text-sm font-medium">Alex Johnson</p>
              <p className="text-xs text-gray-500">alex.johnson@example.com</p>
            </div>
          </div>
          <button className="text-sm text-gray-500 hover:text-black">⏻</button>
        </div>
      </aside>

      {/* Main Content */}
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
    </div>
  );
}
