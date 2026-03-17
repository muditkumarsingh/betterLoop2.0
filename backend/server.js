const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const planRoutes = require("./routes/planRoutes");
const logRoutes = require("./routes/logRoutes");
const statsRoutes = require("./routes/statsRoutes");
const chatRoutes = require("./routes/chatRoutes");
const riskRoutes = require("./routes/riskRoutes");
const recoveryRoutes = require("./routes/recoveryRoutes");

const app = express();

connectDB();

// middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/plan", planRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/risk", riskRoutes);
app.use("/api/recovery", recoveryRoutes);
app.use("/api/user", recoveryRoutes);

// test route
app.get("/", (req, res) => {
    res.send("BetterLoop API is running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});