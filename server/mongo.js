const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb+srv://akshaykumarbolusani:admin@cluster0.x0n6s.mongodb.net/garbagecollection?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema and Model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

// Garbage Collection Schema and Model
const garbageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  garbageType: {
    type: String,
    required: true,
    enum: ["Plastic", "Organic", "Electronic"],
  },
  date: {
    type: Date,
    required: true,
  },
});

const GarbageCollection = mongoose.model("GarbageCollection", garbageSchema);

// Driver Schema and Model
const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
});

const Driver = mongoose.model("Driver", driverSchema);

// Complaint Schema and Model
const complaintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  complaintType: {
    type: String,
    required: true,
    enum: ["Missed Pickup", "Late Pickup", "Damaged Bin", "Driver Behavior", "Other"],
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Complaint = mongoose.model("Complaint", complaintSchema);

// Work Report Schema and Model
const workReportSchema = new mongoose.Schema({
  driverName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  collectionsCompleted: {
    type: Number,
    required: true,
  },
  totalDistance: {
    type: Number,
    required: true,
  },
  fuelUsed: {
    type: Number,
    required: true,
  },
  issues: {
    type: String,
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Completed", "In Progress", "Delayed"],
    default: "Completed",
  },
});

const WorkReport = mongoose.model("WorkReport", workReportSchema);

module.exports = { User, GarbageCollection, Driver, Complaint, WorkReport };
