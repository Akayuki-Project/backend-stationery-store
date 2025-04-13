const express = require("express");
const serverless = require("serverless-http");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

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

// ✅ Tambahkan ini:
app.get("/", (req, res) => {
  res.send("API is running! 🎉");
});

// Export handler untuk Vercel
module.exports = app;
module.exports.handler = serverless(app);

// Jalankan lokal hanya jika TIDAK di serverless (misalnya Vercel)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));
}