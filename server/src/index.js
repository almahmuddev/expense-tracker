const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");

dotenv.config();
connectDB();

const app = express();

// app.use(cors());

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://expense-tracker-khaki-three-58.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));



app.use(express.json());

// routes --
app.use("/api/expenses", expenseRoutes);

// health check ---
app.get("/", (req, res) => {
    res.json({ message: "Expense Tracker API running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});