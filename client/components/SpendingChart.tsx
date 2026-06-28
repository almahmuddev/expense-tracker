"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Expense } from "@/types/expense";
import { CATEGORY_CHART_COLORS } from "@/lib/categories";

interface Props {
    expenses: Expense[];
}

export default function SpendingChart({ expenses }: Props) {
    // Group expenses by category 
    const chartData = Object.entries(
        expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {} as Record<string, number>)
    ).map(([name, value]) => ({ name, value }));

    if (chartData.length === 0) return null;

    const tooltipFormatter = (value: unknown) => {
        const amount = typeof value === "number" ? value : 0;
        return [`৳${amount.toLocaleString()}`, "Spent"];
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">📊 Spending by Category</h2>
            <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={95}
                        paddingAngle={3}
                        dataKey="value"
                    >
                        {chartData.map((entry) => (
                            <Cell
                                key={entry.name}
                                fill={CATEGORY_CHART_COLORS[entry.name] || "#6b7280"}
                            />
                        ))}
                    </Pie>
                    <Tooltip formatter={tooltipFormatter} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}