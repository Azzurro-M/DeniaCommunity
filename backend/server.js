const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");
const colors = require("colors");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/event", require("./routes/eventRoutes.js"));

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});
