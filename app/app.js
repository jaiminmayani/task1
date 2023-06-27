const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("../config/db");
const employeeRoutes = require("../routes/employee.routes");

connectDB();
var app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("App works properly!");
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//api routes
app.use('/api/employee', employeeRoutes)

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
