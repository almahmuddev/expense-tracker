
export type Category =
  | "Food"
  | "Transport"
  | "Shopping"
  | "Health"
  | "Entertainment"
  | "Utilities"
  | "Others";

export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: Category;
  date: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseFormData {
  title: string;
  amount: number | string; 
  category: Category;
  date: string;
  notes?: string;
}