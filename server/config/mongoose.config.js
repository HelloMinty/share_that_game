const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/share_that_game_db")
    .then(() => console.log("Established a connection to Share That Game Database!"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));