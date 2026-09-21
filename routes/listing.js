const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const upload = multer({dest:"/uploads"});
const listingController = require("../controllers/listing.js");


router.route("/")
    // index route
    .get(wrapAsync(listingController.index))
    // create route
    // .post(validateListing, isLoggedIn, wrapAsync(listingController.createListing))
    .post(upload.single("listing[image]"),(req,res)=>{
        res.send(req.file);
    })

// CREATE NEW Listing ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
    // show route
    .get(wrapAsync(listingController.showListings))
    // update route
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))
    // delete route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing))

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
