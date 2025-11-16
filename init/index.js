const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj)=>({...obj, owner:"691982da710b79a31d075a46"}));
  await Listing.insertMany(initData.data);
  console.log("Database Initialized with Sample Data");
};

main()
  .then(() => initDB())
  .catch((err) => console.log("Error connecting to MongoDB:", err));
