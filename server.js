require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./server/config/database");
const authRoutes = require("./server/routes/auth");
const noteRoutes = require("./server/routes/notes");

const app = express();

// Update this to your computer's IP address
const FRONTEND_URL = process.env.FRONTEND_URL || "http://192.168.227.33:3000";

app.use(express.json());
app.use(cors({ 
  credentials: true, 
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());

connectDB();

app.use("/auth", authRoutes);
app.use("/note", noteRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});