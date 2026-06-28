"use client";

import { useState, useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Expense, ExpenseFormData } from "@/types/expense";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "@/lib/api";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import SpendingChart from "@/components/SpendingChart";
import StatsBar from "@/components/StatsBar";
import Filters from "@/components/Filters";

const defaultFilters = { category: "All", startDate: "", endDate: "" };

export default function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [filters, setFilters] = useState(defaultFilters);
  const [loading, setLoading] = useState(true);

  // Fetch expenses whenever filters change
  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getExpenses(filters);
      setExpenses(data);
    } catch {
      toast.error("Couldn't load expenses. Check your connection.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleAdd = async (formData: ExpenseFormData) => {
    await createExpense(formData);
    toast.success("Expense added!");
    fetchExpenses();
  };

  const handleUpdate = async (formData: ExpenseFormData) => {
    if (!editingExpense) return;
    await updateExpense(editingExpense._id, formData);
    toast.success("Expense updated!");
    setEditingExpense(null);
    fetchExpenses();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this expense?")) return;
    await deleteExpense(id);
    toast.success("Expense removed.");
    fetchExpenses();
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💸</span>
            <h1 className="text-xl font-bold text-gray-800">ExpenseTracker</h1>
          </div>
          <span className="text-xs text-gray-400 hidden sm:block">
            Keep track of where your money goes
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* stats row */}
        <StatsBar expenses={expenses} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* left column — form + chart */}
          <div className="space-y-6">
            <ExpenseForm
              onSubmit={editingExpense ? handleUpdate : handleAdd}
              editingExpense={editingExpense}
              onCancelEdit={() => setEditingExpense(null)}
            />
            <SpendingChart expenses={expenses} />
          </div>

          {/* right column — filters + list */}
          <div className="lg:col-span-2 space-y-4">
            <Filters
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters(defaultFilters)}
            />

            {loading ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400 text-sm">
                Loading your expenses...
              </div>
            ) : (
              <ExpenseList
                expenses={expenses}
                onEdit={setEditingExpense}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}