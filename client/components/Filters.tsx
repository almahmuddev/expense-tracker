"use client";

import { CATEGORIES } from "@/lib/categories";

interface FilterState {
    category: string;
    startDate: string;
    endDate: string;
}

interface Props {
    filters: FilterState;
    onChange: (filters: FilterState) => void;
    onReset: () => void;
}

export default function Filters({ filters, onChange, onReset }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        onChange({ ...filters, [e.target.name]: e.target.value });
    };

    const hasActiveFilter =
        filters.category !== "All" || filters.startDate || filters.endDate;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex flex-wrap gap-3 items-end">
                {/* category filter */}
                <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                    >
                        <option value="All">All Categories</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* start date */}
                <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
                    <input
                        name="startDate"
                        type="date"
                        value={filters.startDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* end date */}
                <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
                    <input
                        name="endDate"
                        type="date"
                        value={filters.endDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* only shows when filter active */}
                {hasActiveFilter && (
                    <button
                        onClick={onReset}
                        className="px-4 py-2 text-sm text-gray-500 hover:text-red-500 border border-gray-200 rounded-lg hover:border-red-200 transition"
                    >
                        Clear filters
                    </button>
                )}
            </div>
        </div>
    );
}