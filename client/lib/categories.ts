// Each category gets a color + emoji so they're instantly recognizable
export const CATEGORIES = [
    "Food",
    "Transport",
    "Shopping",
    "Health",
    "Entertainment",
    "Utilities",
    "Others",
] as const;

export const CATEGORY_STYLES: Record
string,
    { bg: string; text: string; border: string; emoji: string }
    > = {
    Food: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200", emoji: "🍔" },
    Transport: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200", emoji: "🚌" },
    Shopping: { bg: "bg-pink-100", text: "text-pink-700", border: "border-pink-200", emoji: "🛍️" },
    Health: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200", emoji: "💊" },
    Entertainment: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200", emoji: "🎬" },
    Utilities: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200", emoji: "💡" },
    Others: { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200", emoji: "📦" },
};

// combine colors for the pie chart
export const CATEGORY_CHART_COLORS: Record<string, string> = {
    Food: "#f97316",
    Transport: "#3b82f6",
    Shopping: "#ec4899",
    Health: "#22c55e",
    Entertainment: "#a855f7",
    Utilities: "#eab308",
    Others: "#6b7280",
};