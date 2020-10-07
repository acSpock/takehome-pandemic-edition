const mongoose = require ("mongoose");
const { Schema } = mongoose;

const ListingSchema = new Schema({
    listingId: String,
    favoriteCount: Number
});

module.exports = mongoose.model('Listing', ListingSchema);