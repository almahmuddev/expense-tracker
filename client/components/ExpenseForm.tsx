// all icon which are pingPrefetchScheduler, copied from online sources 

"use client";

import { useState, useEffect } from "react";
import { Expense, ExpenseFormData, Category } from "@/types/expense";
import { CATEGORIES } from "@/lib/categories";

interface Props {
    onSubmit: (data: ExpenseFormData) => Promise<void>;
    editingExpense?: Expense | null;
    onCancelEdit?: () => void;
}

const emptyForm: ExpenseFormData = {
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    notes: "",
};

export default function ExpenseForm({ onSubmit, editingExpense, onCancelEdit }: Props) {
    const [form, setForm] = useState<ExpenseFormData>(emptyForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // When an expense is passed in for editing, pre-fill the form
    useEffect(() => {
        if (editingExpense) {
            setForm({
                title: editingExpense.title,
                amount: editingExpense.amount,
                category: editingExpense.category,
                date: editingExpense.date.split("T")[0],
                notes: editingExpense.notes || "",
            });
        } else {
            setForm(emptyForm);
        }
    }, [editingExpense]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setError("");
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation before hitting the server
        if (!form.title.trim()) return setError("Please give this expense a title.");
        if (!form.amount || Number(form.amount) <= 0) return setError("Amount should be more than 0.");
        if (!form.date) return setError("Please pick a date.");

        setLoading(true);
        try {
            await onSubmit({ ...form, amount: Number(form.amount) });
            setForm(emptyForm);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const isEditing = !!editingExpense;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6" >
            <h2 className="text-lg font-semibold text-gray-800 mb-5" >
                {isEditing ? "✏️ Edit Expense" : "➕ Add New Expense"}
            </h2>

            {
                error && (
                    <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg" >
                        {error}
                    </div>
                )
            }

            <form onSubmit={handleSubmit} className="space-y-4" >
                {/* Title */}
                < div >
                    <label className="block text-sm font-medium text-gray-700 mb-1" >
                        Title
                    </label>
                    < input
                        name="title"
                        type="text"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="e.g. Grocery run, Uber to office..."
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    />
                </div>

                {/* Amount + Category side by side */}
                <div className="grid grid-cols-2 gap-4" >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" >
                            Amount(৳)
                        </label>
                        < input
                            name="amount"
                            type="number"
                            value={form.amount}
                            onChange={handleChange}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                    </div>

                    < div >
                        <label className="block text-sm font-medium text-gray-700 mb-1" >
                            Category
                        </label>
                        < select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white"
                        >
                            {
                                CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat} >
                                        {cat}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" >
                        Date
                    </label>
                    < input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    />
                </div>

                {/* Notes (optional) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" >
                        Notes{" "}
                        <span className="text-gray-400 font-normal" > (optional) </span>
                    </label>
                    < textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Any extra details about this expense..."
                        rows={2}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-1" >
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg text-sm transition"
                    >
                        {loading ? "Saving..." : isEditing ? "Save Changes" : "Add Expense"}
                    </button>

                    {
                        isEditing && (
                            <button
                                type="button"
                                onClick={onCancelEdit}
                                className="px-5 py-2.5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-sm transition"
                            >
                                Cancel
                            </button>
                        )
                    }
                </div>
            </form>
        </div>
    );
}