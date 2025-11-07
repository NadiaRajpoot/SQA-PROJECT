const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

// Import routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Configuration (Fix Here)
app.use(cors({
  origin: "http://localhost:5173", // Vite React app runs on 5173
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // enable cookies/auth headers if needed
}));



// Middleware
app.use(cookieParser());
app.use(express.json());

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("✅ Database connection established...");
    app.listen(PORT, () => {
      console.log(`🚀 Server running successfully on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`❌ Error connecting to database: ${err.message}`);
  });

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
