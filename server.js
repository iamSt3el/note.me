const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./server/config/database");
const authRoutes = require("./server/routes/auth");
const noteRoutes = require("./server/routes/notes");

const app = express();

// In production, the frontend URL will be the Render URL
const FRONTEND_URL = process.env.NODE_ENV === 'production' 
  ? process.env.RENDER_EXTERNAL_URL  // Render provides this
  : process.env.FRONTEND_URL || "http://localhost:3000";

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

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'server/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'server/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});