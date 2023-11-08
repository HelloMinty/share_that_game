const express = require('express');
const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser')
require ('dotenv').config()
require('./config/mongoose.config');   
require('./routes/gameposts.routes')(app);

app.use(express.json());                           
app.use(express.urlencoded({ extended: true }));   
const userRoutes = require("./routes/user.routes");
userRoutes(app);

app.use(cors());
app.use(cookieParser());
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})