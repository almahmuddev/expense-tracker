const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide an expense title"],
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        amount: {
            type: Number,
            required: [true, "Please enter the amount spent"],
            min: [0, "Amount cannot be a negative value"],
        },
        category: {
            type: String,
            required: [true, "Please select a category"],
            enum: {
                values: ["Food", "Transport", "Shopping", "Health", "Entertainment", "Utilities", "Others"],
                message: "{VALUE} is not a valid category",
            },
        },
        date: {
            type: Date,
            required: [true, "Please specify the date of the expense"],
            default: Date.now,
        },
        notes: {
            type: String,
            trim: true,
            maxlength: [500, "Notes cannot exceed 500 characters"],
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Expense", expenseSchema);