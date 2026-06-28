"use client";

import { Expense } from "@/types/expense";
import CategoryBadge from "./CategoryBadge";

interface Props {
    expenses: Expense[];
    onEdit: (expense: Expense) => void;
    onDelete: (id: string) => void;
}

export default function ExpenseList({ expenses, onEdit, onDelete }: Props) {
    if (expenses.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <p className="text-4xl mb-3">🧾</p>
                <p className="text-gray-500 text-sm">No expenses yet. Add your first one!</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Mobile: card layout, Desktop: table layout */}

            {/* Table — hidden on small screens */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="text-left px-6 py-4 text-gray-500 font-medium">Title</th>
                            <th className="text-left px-6 py-4 text-gray-500 font-medium">Category</th>
                            <th className="text-left px-6 py-4 text-gray-500 font-medium">Date</th>
                            <th className="text-right px-6 py-4 text-gray-500 font-medium">Amount</th>
                            <th className="text-right px-6 py-4 text-gray-500 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {expenses.map((expense) => (
                            <tr key={expense._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <p className="font-medium text-gray-800">{expense.title}</p>
                                    {expense.notes && (
                                        <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[200px]">
                                            {expense.notes}
                                        </p>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <CategoryBadge category={expense.category} />
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {new Date(expense.date).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </td>
                                <td className="px-6 py-4 text-right font-semibold text-gray-800">
                                    ৳{expense.amount.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(expense)}
                                            className="px-3 py-1.5 text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition font-medium"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(expense._id)}
                                            className="px-3 py-1.5 text-xs bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition font-medium"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cards — shown only on mobile */}
            <div className="md:hidden divide-y divide-gray-100">
                {expenses.map((expense) => (
                    <div key={expense._id} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="font-medium text-gray-800">{expense.title}</p>
                                {expense.notes && (
                                    <p className="text-xs text-gray-400 mt-0.5">{expense.notes}</p>
                                )}
                            </div>
                            <span className="font-semibold text-gray-800 ml-3">
                                ৳{expense.amount.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center gap-2">
                                <CategoryBadge category={expense.category} />
                                <span className="text-xs text-gray-400">
                                    {new Date(expense.date).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onEdit(expense)}
                                    className="px-3 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-lg font-medium"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(expense._id)}
                                    className="px-3 py-1 text-xs bg-red-50 text-red-500 rounded-lg font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}