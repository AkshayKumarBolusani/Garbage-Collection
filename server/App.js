const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, GarbageCollection, Driver, Complaint, WorkReport } = require('./mongo');

const app = express();
const PORT = process.env.PORT || 8001;
const JWT_SECRET = "your_jwt_secret_key";

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ success: true, message: "User created successfully" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Garbage Collection routes
app.post("/submit-garbage-collection", async (req, res) => {
  const { name, location, phone, garbageType, date } = req.body;
  const newCollection = new GarbageCollection({ name, location, phone, garbageType, date });
  await newCollection.save();
  res.status(201).json({ success: true, message: "Garbage collection data submitted successfully" });
});

app.get('/garbage-history', async (req, res) => {
  try {
    const history = await GarbageCollection.find({}).sort({ date: -1 });
    res.json({ history });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch history.' });
  }
});

// Driver routes
app.post("/add-driver", async (req, res) => {
  try {
    const { name, phone, licenseNumber, vehicleNumber, experience } = req.body;
    const newDriver = new Driver({ name, phone, licenseNumber, vehicleNumber, experience });
    await newDriver.save();
    res.status(201).json({ success: true, message: "Driver added successfully" });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: "License number already exists" });
    } else {
      res.status(500).json({ message: "Failed to add driver" });
    }
  }
});

app.get("/view-drivers", async (req, res) => {
  try {
    const drivers = await Driver.find({}).sort({ joinDate: -1 });
    res.json({ drivers });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch drivers" });
  }
});

app.put("/update-driver/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const driver = await Driver.findByIdAndUpdate(id, updateData, { new: true });
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.json({ success: true, driver });
  } catch (err) {
    res.status(500).json({ message: "Failed to update driver" });
  }
});

app.delete("/delete-driver/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findByIdAndDelete(id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.json({ success: true, message: "Driver deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete driver" });
  }
});

// Complaint routes
app.post("/add-complaint", async (req, res) => {
  try {
    const { name, phone, location, complaintType, description } = req.body;
    const newComplaint = new Complaint({ name, phone, location, complaintType, description });
    await newComplaint.save();
    res.status(201).json({ success: true, message: "Complaint submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit complaint" });
  }
});

app.get("/view-complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find({}).sort({ date: -1 });
    res.json({ complaints });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
});

app.put("/update-complaint/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.json({ success: true, complaint });
  } catch (err) {
    res.status(500).json({ message: "Failed to update complaint" });
  }
});

// Work Report routes
app.post("/add-work-report", async (req, res) => {
  try {
    const { driverName, date, collectionsCompleted, totalDistance, fuelUsed, issues, notes } = req.body;
    const newWorkReport = new WorkReport({ 
      driverName, 
      date, 
      collectionsCompleted, 
      totalDistance, 
      fuelUsed, 
      issues, 
      notes 
    });
    await newWorkReport.save();
    res.status(201).json({ success: true, message: "Work report added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add work report" });
  }
});

app.get("/view-work-reports", async (req, res) => {
  try {
    const workReports = await WorkReport.find({}).sort({ date: -1 });
    res.json({ workReports });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch work reports" });
  }
});

app.put("/update-work-report/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const workReport = await WorkReport.findByIdAndUpdate(id, updateData, { new: true });
    if (!workReport) {
      return res.status(404).json({ message: "Work report not found" });
    }
    res.json({ success: true, workReport });
  } catch (err) {
    res.status(500).json({ message: "Failed to update work report" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
