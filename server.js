require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./server/config/database");
const authRoutes = require("./server/routes/auth");
const noteRoutes = require("./server/routes/notes");

const app = express();

// Use CORS_ORIGIN instead of FRONTEND_URL for clarity
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(express.json());
app.use(cors({ 
  credentials: true, 
  origin: CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());

connectDB();

app.use("/auth", authRoutes);
app.use("/note", noteRoutes);

// Add a simple root route for API health check
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});