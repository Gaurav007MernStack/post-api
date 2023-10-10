const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        // unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // address: {
    //     type: String
    // },
    // contact: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // tokenGenerate: {
    //     type: String,
    //     default: ''
    // }
},
    { timestamps: true }
)


user.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = undefined;
    }
    next()
})

module.exports = mongoose.model('user', user)

