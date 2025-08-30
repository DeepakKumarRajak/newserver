const express = require("express");
const connectDB = require("./db");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

// ✅ Connect DB before handling requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use("/api", userRoutes);


module.exports = app;
