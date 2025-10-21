const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Route test
app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

// Import routes
const authRoute = require("./routes/authRoute");
app.use("/api/auth", authRoute); // => /api/auth/login, /api/auth/register, /api/auth/forgot-password, /api/auth/reset-password

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
