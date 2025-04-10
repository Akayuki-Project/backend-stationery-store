const express = require("express");
const serverless = require("serverless-http");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.js"); // ubah path ke "../"

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
const userRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoutes");
const fileRoutes = require("./routes/FileRoutes");
const authRoutes = require("./routes/AuthRoutes");
const transactionRoutes = require("./routes/TransactionRoutes");
const bannerRoutes = require("./routes/BannerRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/banners", bannerRoutes);

// jangan pakai app.listen

module.exports = serverless(app);
