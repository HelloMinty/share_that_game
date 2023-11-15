const gameCommentsController = require("../controllers/gamecomments.controllers");

module.exports = app => {
    app.get("/api/gamecomments", gameCommentsController.getAllGameComments);
    app.post("/api/gamecomments", gameCommentsController.createNewGameComment);
    app.get("/api/gamecomment/:id", gameCommentsController.getOneGameComment);
    app.put("/api/gamecomments/:id", gameCommentsController.updateGameComment);
    app.delete("/api/gamecomments/:id", gameCommentsController.deleteGameComment);
}
