const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("MongoDb Connected Successfully")
}).catch((err) => {
    console.log("MongoDb error")
})

module.exports = mongoose