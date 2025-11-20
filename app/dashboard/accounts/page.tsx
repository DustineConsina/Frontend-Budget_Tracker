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
  Edit,
} from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";

export default function AccountsPage() {
  const pathname = usePathname();
  const { user, logout } = useAppContext(); 

  const sidebarItems = [
    { name: "Home", icon: Home, path: "/dashboard" },
    { name: "Transactions", icon: List, path: "/dashboard/transaction" },
    { name: "Add", icon: PlusCircle, path: "/dashboard/add" },
    { name: "Budgets", icon: PieChart, path: "/dashboard/budgets" },
    { name: "Accounts", icon: CreditCard, path: "/dashboard/accounts" },
    { name: "Profile", icon: User, path: "/dashboard/profile" },
  ];

 
  const [accounts, setAccounts] = useState([
    { name: "Main Bank", type: "Bank", balance: 0.0 },
    { name: "Savings", type: "Bank", balance: 0.0 },
    { name: "Cash Wallet", type: "Cash", balance: 320.0 },
  ]);

  const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newAccName, setNewAccName] = useState("");
  const [newAccType, setNewAccType] = useState("Bank");
  const [newAccBalance, setNewAccBalance] = useState("");

  const handleAddAccount = () => {
    if (!newAccName || !newAccBalance) return;

    const newAccount = {
      name: newAccName,
      type: newAccType,
      balance: parseFloat(newAccBalance),
    };

    setAccounts([...accounts, newAccount]);
    setShowModal(false);
    setNewAccName("");
    setNewAccType("Bank");
    setNewAccBalance("");
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

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-semibold mb-6">Accounts</h1>

        {/* Total Balance */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-2xl p-6 shadow mb-4">
          <p className="text-sm text-gray-300">Total Balance</p>
          <p className="text-3xl font-semibold">${totalBalance.toFixed(2)}</p>
          <p className="text-xs text-gray-400 mt-1">{accounts.length} accounts</p>
        </div>

        {/* Add Account Button */}
        <button
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition mb-6"
          onClick={() => setShowModal(true)}
        >
          + Add Account
        </button>

        {/* Accounts List */}
        <div className="space-y-4">
          {accounts.map((acc, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <CreditCard size={18} className="text-gray-700" />
                </div>

                <div>
                  <p className="font-medium">{acc.name}</p>
                  <p className="text-sm text-gray-500">{acc.type}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-medium">${acc.balance.toFixed(2)}</p>
                <button className="text-gray-500 hover:text-black">
                  <Edit size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Add Account Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Add Account</h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Account Name"
                value={newAccName}
                onChange={(e) => setNewAccName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />

              <select
                value={newAccType}
                onChange={(e) => setNewAccType(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="Bank">Bank</option>
                <option value="Cash">Cash</option>
              </select>

              <input
                type="number"
                placeholder="Initial Balance"
                value={newAccBalance}
                onChange={(e) => setNewAccBalance(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                className="px-4 py-2 text-sm text-gray-600 hover:text-black"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                onClick={handleAddAccount}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

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
