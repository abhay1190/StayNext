const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://images.pexels.com/photos/462358/pexels-photo-462358.jpeg?cs=srgb&dl=architectural-design-architecture-blue-sky-462358.jpg&fm=jpg",
        set: (v) => v === "" ? "https://images.pexels.com/photos/462358/pexels-photo-462358.jpeg?cs=srgb&dl=architectural-design-architecture-blue-sky-462358.jpg&fm=jpg" : v,
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String
    }
});


// module.exports = mongoose.model('Listing', listingSchema);
const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;

