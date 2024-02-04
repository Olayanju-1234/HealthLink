const { Schema } = require('mongoose');

const chatSchema = new Schema({
    content : {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seen : {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Chat = model('Chat', chatSchema);

module.exports = Chat;

