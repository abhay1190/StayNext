const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const path = require('path');
const MONGO_URI = process.env.MONGO_URI;
// Middleware
app.use("view engine", "ejs");
app.use("views", path.join(__dirname, "views"));

// Connect to MongoDB

main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URI);
}


// Routes
app.get('/', (req, res) => {
    res.send("Root route is working!");
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

