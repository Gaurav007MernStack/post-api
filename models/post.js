const mongoose = require("mongoose");

const post = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    authorInformation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'

    }
},
    { timestamps: true }
)


module.exports = mongoose.model('post', post)