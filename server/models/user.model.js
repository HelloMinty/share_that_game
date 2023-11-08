const mongoose = require ('mongoose')
const bcrypt = require ('bcrypt')
const { isEmail } = require ('validator')

const UserSchema = new mongoose.Schema({
    firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [2, "First name must be 2 characters or longer"]
    },
    lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [2, "First name must be 2 characters or longer"]
    },
    email: {
    type: String,
    required: [true, "Email is required"]
    },
    password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be 8 characters or longer"]
    }
}, 
{timestamps: true}
);

UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords do not match, try again');
    }
    next();
    });

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
        this.password = hash;
        next();
        });
    });


module.exports = mongoose.model("User", UserSchema)