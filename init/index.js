const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URI = "mongodb://localhost:27017/staynexa"


// Connect to MongoDB

main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URI);
}


const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj,owner: "6aaa82f1bdcc74b52c9feb1c"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();

