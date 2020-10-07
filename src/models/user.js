const mongoose = require ("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    userName: String,
    email: String,
    token: String
});

module.exports = mongoose.model('User', UserSchema);