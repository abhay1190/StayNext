const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const path = require('path');
const MONGO_URI = process.env.MONGO_URI;
const Listing = require('./models/listing');
const methodOverride = require("method-override")

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"));

// Connect to MongoDB

main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URI);
}


// Routes
app.get('/', (req, res) => {
    res.send("Root route is working!");
});

// app.get("/testListing", async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"My New Villa",
//         description:"This is the newly built villa for rent.",
//         price:9000,
//         location:"Gurgaon",
//         country:"India"
//     });
//     // await sampleListing.save();
//     console.log("saved data");
//     res.send("Successful");
// });

// Index Route

app.get("/listings", async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

// CREATE NEW Listing ROUTE
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

// Create Route
app.post("/listings", async (req,res)=>{
    // One way to get all the variables or can say old way of getting the variables without making the changes in the ejs file or can say without making the key of the object.
    // let {title,description,image,price,location,country} = req.body;
    // console.log(`${title},${description},${image},${price},${location},${country}`);
    
    // AFTER MAKING THE CHANGES IN THE EJS FILE LIKE CREAITNG THE KEY OF THE OBJECT TO THE NAME FIELD OF THE FORM

    // let listing = req.body.listing;
    // const newListing = new Listing(listing);

    // OR

    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

// Edit Route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

// Update Route
app.put("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

// Delete Route
app.delete("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

