const Expense = require("../models/Expense");

// get all expenses
const getExpenses = async (req, res) => {
    try {
        const { category, startDate, endDate } = req.query;
        const filter = {};

        if (category && category !== "All") {
            filter.category = category;
        }

        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);
        }

        const expenses = await Expense.find(filter).sort({ date: -1 });
        res.status(200).json({ success: true, count: expenses.length, data: expenses });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch expenses. Please try again.", error: error.message });

    }
};

// post create expense
const createExpense = async (req, res) => {
    try {
        const expense = await Expense.create(req.body);
        res.status(201).json({ success: true, message: "Expense recorded successfully", data: expense });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message || "Could not save expense. Please check your data." });
    }
};

// put update expense
const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!expense) {
            return res.status(404).json({ success: false, message: "We couldn't find that expense log" });
        }
        res.status(200).json({ success: true, message: "Expense updated successfully", data: expense });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message || "Failed to update expense." });
    }
};

// delete expense
const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).json({ success: false, message: "We couldn't find that expense log" });
        }
        res.status(200).json({ success: true, message: "Expense record deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong while trying to remove the record." });
    }
};

module.exports = { getExpenses, createExpense, updateExpense, deleteExpense };