const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const envConfig = require('../../env.config')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    timestamp: {
        type: Date,
        default: new Date()
    },
    fullName: {
        type: String,
        required: [true, 'Please enter your full name']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: [true, 'Email already exists'],
    },
    password: {
        type: String,
        required: [true],
        minlength: [6]
    },
    phone: {
        type: String,
        required: [true, 'Please enter a phone number']
    },
    cartId: { type: String },
    admin: { type: Boolean, default: false }
})


UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword 
    next()
})

UserSchema.methods.matchPasswords = async function(enteredPassword, hashedPassword) {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  };

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id, email: this.email, admin: this.admin }, envConfig.JWT_SECRET, {
        expiresIn: envConfig.JWT_EXPIRE
    })

}
module.exports = UserSchema;