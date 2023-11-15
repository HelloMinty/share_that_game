const gamePostController = require("../controllers/gameposts.controllers")
const { modelName } = require("../models/gameposts.model")

module.exports = (app) => {

    app.get("/api/gamepost", gamePostController.getAllGamePost);
    app.post("/api/gamepost", gamePostController.createNewGamePost);
    app.put("/api/gamepost/:id", gamePostController.updategamePost);
    app.get("/api/gamepost/:id", gamePostController.getOneGamePost);
    app.delete("/api/gamepost/:id", gamePostController.deleteGamePost);
}