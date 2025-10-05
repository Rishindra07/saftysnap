
const mongoose = require("mongoose");
const User = require("../models/user");

const detectionSchema = new mongoose.Schema({
    label: String,
    bbox: [Number],
    confidence: Number,
})

const imageSchema = new mongoose.Schema(
    {
        filename : String,
        fileUrl : String,
        detections:[detectionSchema],
        detections_hash:String,
        userId:
        {
            type:mongoose.Schema.Types.ObjectId,
             ref:"User",
        },
    },
        {timestamps:true}
);

module.exports = mongoose.model("Image",imageSchema);
