const GamePosts = require ("../models/gameposts.model")

const createNewGamePost = (req, res) => {
    GamePosts.create(req.body)
    .then(newGamePost => {
        res.json(newGamePost)
    })
    .catch((err) => {
        res.status(400).json(err)
    })
}
const getAllGamePost = (req, res ) => {
    GamePosts.find()
    .then(allGamePosts => {
        res.json(allGamePosts)
    })
    .catch(err=> {
        res.status(400).json(err)
    })
}
const getOneGamePost = (req, res) => {
    GamePosts.findById({_id: req.params.id})
    .then(oneGamePost => {
        res.json(oneGamePost)
    })
    .catch(err => {
        res.status(400).json(err)
    })
}
const updategamePost = (req, res) => {
    GamePosts.updateOne({_id: req.params.id}, req.body, {
        new: true,
        runValidators: true,
    })
    .then(updatedGamePost =>{
        res.json(updatedGamePost)
    })
    .catch(err => {
        res.status(400).json(err)
    })
}
const deleteGamePost = (req, res) => {
    GamePosts.deleteOne({_id: req.params.id})
    .then(deletedGamePost => {
        res.json(deletedGamePost)
    })
    .catch(err=> {
        res.status(400).json(err)
    })
}



module.exports = {
    createNewGamePost,
    getAllGamePost,
    getOneGamePost,
    updategamePost,
    deleteGamePost
}