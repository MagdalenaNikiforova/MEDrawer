const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Allows JSON data to be sent from frontend

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/reactDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Define Schema
const DataSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  input1: String,
  input2: String,
  input3: String,
});

const DataModel = mongoose.model("Data", DataSchema);

// Save Data to Database
app.post("/add", async (req, res) => {
  const { input1, input2, input3 } = req.body;
  const id = Math.floor(Math.random() * 100000); // Generate unique ID

  const newData = new DataModel({ id, input1, input2, input3 });
  try {
    await newData.save();
    res.json({ message: "Data saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch Data from Database
app.get("/data", async (req, res) => {
  const data = await DataModel.find();
  res.json(data);
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
