export type Category = "Food" | "Transport" | "Shopping" | "Health" | "Entertainment" | "Others";

export interface Expense {
    _id: string;
    title: string;
    amount: number;
    category: Category;
    date: string;
    createdAt: string;
    updatedAt: string;
}

export interface ExpenseFormData {
    title: string;
    amount: number;
    category: Category;
    date: string;
}