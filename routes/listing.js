const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const Listing = require('../models/listing');
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const indexController = require("../controllers/listing.js");

// Index Route

router.get("/", wrapAsync(indexController.index));

// CREATE NEW Listing ROUTE
router.get("/new", isLoggedIn, indexController.renderNewForm );

// Show Route
router.get("/:id", wrapAsync(indexController.showListings));

// Create Route
router.post("/", validateListing, isLoggedIn, wrapAsync(indexController.createListing));


// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(indexController.renderEditForm));

// Update Route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(indexController.updateListing));

// Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(indexController.destroyListing));

module.exports = router;
