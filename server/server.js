const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')

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

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})