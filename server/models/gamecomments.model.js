const mongoose = require("mongoose");

const GameCommentsSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, "Comment is required."],
        // minLength: [10, "Comment must be at least 10 characters."],
        // maxLength: [255, "Comment must be less than 255 characters."]
    },
    postedBy: {
        type: String,
    }
}, {timestamps: true})

module.exports = mongoose.model("GameComments", GameCommentsSchema);
