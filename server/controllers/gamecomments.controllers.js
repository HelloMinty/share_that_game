const GameComments = require("../models/gamecomments.model");

const createNewGameComment = (req, res) => {
    GameComments.create(req.body)
    .then(newGameComment => {
        res.json(newGameComment)
    })
    .catch((err) => {
        res.status(400).json(err)
    })
}
const getAllGameComments = (req, res) => {
    GameComments.find()
    .then(allGameComments => {
        res.json(allGameComments)
    })
    .catch((err) => {
        res.status(400).json(err)
    })
}
const getOneGameComment = (req, res) => {
    GameComments.findById({_id: req.params.id})
    .then(oneGameComment => {
        res.json(oneGameComment)
    })
    .catch((err) => {
        res.status(400).json(err)
    })
}
const updateGameComment = (req, res) => {
    GameComments. updateOne({_id: req.params.id}, req.body, {
        new: true,
        runValidators: true,
    })
    .then(updatedGameComment => {
        res.json(updatedGameComment)
    })
    .catch((err) => {
        res.status(400).json(err)
    })
}
const deleteGameComment = (req, res) => {
    GameComments.deleteOne({_id: req.params.id})
    .then(deletedGameComment => {
        res.json(deletedGameComment)
    })
    .catch((err) => {
        res.status(400).json(err)
    })
}

module.exports = {
    createNewGameComment,
    getAllGameComments,
    getOneGameComment,
    updateGameComment,
    deleteGameComment
}
