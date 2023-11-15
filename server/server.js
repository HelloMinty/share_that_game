const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const socket = require("socket.io");

require ('dotenv').config();
require('./config/mongoose.config');   

app.use(cookieParser());
app.use(express.json());                           
app.use(express.urlencoded({ extended: true }));   
app.use(cors());

const userRoutes = require("./routes/user.routes");
userRoutes(app);
require('./routes/gameposts.routes')(app);
require('./routes/gamecomments.routes')(app);

const server = app.listen(8000, () => {
    console.log("Listening at Port 8000")
});

const io = socket(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});


io.on("connection", socket => {
    console.log('socket id: ' + socket.id);
    
    socket.on("event_from_client", data => {
        // send a message with "data" to ALL clients EXCEPT for the one that emitted the
    	//     "event_from_client" event
        io.emit("event_to_all_clients", data);
    });
});
