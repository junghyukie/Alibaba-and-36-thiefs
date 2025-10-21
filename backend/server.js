

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
app.use("/api/auth", authRoute); // => /api/auth/login

const regis_Route = require("./routes/registerRoute");
app.use("/api/auth", regis_Route); // => /api/auth/

const forget_reset = require("./routes/forgetRoute");
app.use("/api/auth", forget_reset); // => /api/auth/

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

