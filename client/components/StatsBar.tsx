import { Expense } from "@/types/expense";

interface Props {
    expenses: Expense[];
}

export default function StatsBar({ expenses }: Props) {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const highest = expenses.length ? Math.max(...expenses.map((e) => e.amount)) : 0;
    const average = expenses.length ? total / expenses.length : 0;

    const stat = (label: string, value: string) => (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stat("Total Spent", `৳${total.toLocaleString()}`)}
            {stat("Transactions", `${expenses.length}`)}
            {stat("Avg per Expense", `৳${Math.round(average).toLocaleString()}`)}
        </div>
    );
}