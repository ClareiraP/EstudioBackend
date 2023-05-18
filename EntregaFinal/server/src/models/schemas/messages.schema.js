const { Schema } = require('mongoose');


const MessageSchema = new Schema({
    user_id: {  user_id: { type: String, require: true }},
    timestamp: {type: Date, default: new Date()},
    email: { type: String, required: true },
    message: { type: String, required: true }
})

module.exports = MessageSchema;