// backend/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimiter = require("./middleware/rateLimiter");
const imagesRoute = require("./routes/images");
const authRoute = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimiter);
// In backend app.js
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoute);
app.use("/api/images", imagesRoute);

app.use((req, res) => res.status(404).json({ error: { code: "NOT_FOUND", message: "Endpoint not found" } }));

module.exports = app;
