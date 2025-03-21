const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
var bodyParser = require('body-parser');

app.use(cors());
app.use(express.json()); // Allows JSON data to be sent from frontend

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
  }));

// parse application/json
app.use(bodyParser.json())

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
  medicineName: String,
  drawerID: Number,
  symptomID: Number,
});

const DataModel = mongoose.model("Data", DataSchema);
// Save Data to Database
app.post('/api/add-medicine', async (req, res) => {

  var medicineName = req.body.medicineName,
  drawerID = req.body.drawerID,
  symptomID = req.body.symptomID
  ;

  const id = Math.floor(Math.random() * 100000); // Generate unique ID
  const newData = new DataModel({ id, medicineName, drawerID, symptomID });
  try {
    await newData.save();
    //res.json({ message: "Data saved successfully!" });
    res.redirect("http://localhost:5173/add-medicine");
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