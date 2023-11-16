const User = require ('../models/user.model')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const SECRET = process.env.SECRET_KEY
const UserInfo = require("../models/user.model")


module.exports = {
    registerUser: async (req, res) =>{
        try{
            const potentialUser = await User.findOne({email:req.body.email})
            if (potentialUser){
                res.status(400).json({message:'This email already exists, please log in'})
                console.log(res )
            }
            else{
                const newUser = await User.create(req.body)
                const userToken = jwt.sign({_id: newUser._id, email:newUser.email}, SECRET, {expiresIn: '2h'})
                console.log(userToken );
                res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge:2 * 60 * 60 *1000}).json(newUser)
            }
        }
        catch(err){
            console.log(err);
            res.status(400).json({error: err})
        }
},
    loginUser: async(req, res) => {
        try{ console.log("start of try")
            const user = await User.findOne({ email: req.body.email })
            if(user) {console.log("start of if user block 1", user) 
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                if (passwordsMatch){ console.log("start of if passwordmatch block 2")
                    const userToken = jwt.sign({_id: user._id, email:user.email}, SECRET ,
                    {expiresIn: '2h'})    
                    res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge:2 * 60 * 60 *1000}).json(user)
                    }
                else{ console.log("end of if else block2")
                    res.status(400).json({message:'Invalid Email/Password'})
                }
            }
            else{ console.log("end of first if else block1")
                res.status(400).json({message:'Invalid Email/Password'})
            } 
        }
        catch(err){  console.log("end of try block inside of catch")
            res.status(400).json({error:err})
        }
    },
    logoutUser: (req, res) => {
        res.clearCookie('userToken').json({ message: 'User is logged out' });
    },
    getAllUsers: (req, res) => {
        UserInfo.find()
        .then(allUsers => {
            res.json(allUsers)
        })
        .catch((err)=> {
            res.status(400).json(err)
        })
    },
    getOneUser: (req, res) => {
        UserInfo.findOne({_id: req.params.id})
        .then(oneUser => {
            res.json(oneUser)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },
    editOneUser: (req, res) => {
        UserInfo.updateOne({_id: req.params.id}, req.body,{
            new: true,
            runValidators: true,
        })
        .then(updatedUser =>{
            res.json(updatedUser)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
    
}
