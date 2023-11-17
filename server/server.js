const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const socket = require("socket.io");

require ('dotenv').config()
require('./config/mongoose.config');   

app.use(cookieParser());
app.use(express.json());                           
app.use(express.urlencoded({ extended: true }));   
app.use(cors({
    credentials:true, 
    origin:'http://localhost:5173'
}));

const userRoutes = require("./routes/user.routes");
userRoutes(app);
require('./routes/gameposts.routes')(app);
require('./routes/gamecomments.routes')(app);

const server = app.listen(8000, () => {
    console.log("Listening at Port 8000")
})

const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT"],
        allowedHeaders: ["*"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log("socket is working, socket id:", socket.id)
    socket.on("message", (data) => {
        console.log("Chat is working", data)
        io.emit("client_messages", data);
    })
})
