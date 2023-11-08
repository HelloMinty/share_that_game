const mongoose = require("mongoose");

const GameCommentsSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, "Comment is required."],
        minLength: [10, "Comment must be at least 10 characters."],
        maxLength: [255, "Comment must be less than 255 characters."]
    },
    like: {
        type: Boolean,
        required: [true, "Like or Dislike is required."],
    }
}, {timestamps: true})

module.exports = mongoose.model("GameComments", GameCommentsSchema);
