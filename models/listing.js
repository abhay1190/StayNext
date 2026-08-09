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
        default: "https://www.bing.com/images/search?view=detailV2&ccid=9vQ3p0%2bB&id=4295E6AD0466800D72A127E74CDA465A4E39E0F0&thid=OIP.9vQ3p0-Bda09o7FJfVPpLgHaHa&mediaurl=https%3a%2f%2fgetdrawings.com%2ffree-icon-bw%2fwindows-default-icons-11.png&exph=512&expw=512&q=home+default+image&mode=overlay&FORM=IQFRBA&ck=80D3BB5B162FD5E755F9CE2BA39AE2F0&selectedIndex=0&idpp=serp",
        set: (v) => v === "" ? "https://www.bing.com/images/search?view=detailV2&ccid=9vQ3p0%2bB&id=4295E6AD0466800D72A127E74CDA465A4E39E0F0&thid=OIP.9vQ3p0-Bda09o7FJfVPpLgHaHa&mediaurl=https%3a%2f%2fgetdrawings.com%2ffree-icon-bw%2fwindows-default-icons-11.png&exph=512&expw=512&q=home+default+image&mode=overlay&FORM=IQFRBA&ck=80D3BB5B162FD5E755F9CE2BA39AE2F0&selectedIndex=0&idpp=serp" : v,
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

