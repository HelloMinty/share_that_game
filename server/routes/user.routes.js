const UserController = require('../controllers/user.controllers'); 


module.exports = (app) => {
    app.get('/api/getallusers', UserController.getAllUsers);
    app.post('/api/registerUser', UserController.registerUser);
    app.post('/api/loginUser', UserController.loginUser);
    app.post('/api/logoutUser',  UserController.logoutUser);
    app.get('/api/getoneuser/:id', UserController.getOneUser);
}