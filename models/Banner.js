const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  discount: { 
    type: Number, 
    required: true 
    },
  description1: { 
    type: String, 
    required: true 
    },
  description2: { 
    type: String, 
    required: true 
    },
  thumbnail: { 
    type: String, 
    required: true 
    },
  cloudinaryId: { 
    type: String, 
    required: true 
    },
});

module.exports = mongoose.model("Banner", bannerSchema);
