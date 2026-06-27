import axios from "axios";
import { Expense, ExpenseFormData } from "@/types/expense";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

export const getExpenses = async (params?: {
    category?: string;
    startDate?: string;
    endDate?: string;
}): Promise<Expense[]> => {
    const { data } = await api.get("/expenses", { params });
    return data.data;
};

export const createExpense = async (expense: ExpenseFormData): Promise<Expense> => {
    const { data } = await api.post("/expenses", expense);
    return data.data;
};

export const updateExpense = async (id: string, expense: ExpenseFormData): Promise<Expense> => {
    const { data } = await api.put(`/expenses/${id}`, expense);
    return data.data;
};

export const deleteExpense = async (id: string): Promise<void> => {
    await api.delete(`/expenses/${id}`);
};