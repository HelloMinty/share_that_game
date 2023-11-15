const mongoose = require("mongoose")

const GamePostSchema = ({

    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: [3, "Title must be at least 3 characters"],
        maxLength: [20, "Title must be below 20 characters"]
    },
    genre: {
        type: String,
        required: [true, "Genre is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [10, "Description must be 10 characters or longer"],
        maxLength: [255, "Description must be less than 255 characters"]
    },
    postedBy: {
        type: String
    },
    comments: {
        type: String
    }
})

module.exports = mongoose.model("GamePost", GamePostSchema);