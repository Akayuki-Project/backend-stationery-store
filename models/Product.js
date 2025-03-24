const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, " Name is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is requred"],
        },
        thumbnail: {
            type: String,
            required: true,
        },
        cloudinaryId: {
            type: String
        }
});

module.exports = mongoose.model("Product", userSchema);