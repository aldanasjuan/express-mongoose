const mongoose = require("mongoose")

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


/* 
 Init connects to a mongo database.
*/
async function init(connString){
    return new Promise((res,rej) => {
        mongoose.connect(connString, options).then(() => {
            console.log("mongoose connection started")
            res()
        })
        mongoose.connection.on("error", (err) => {
            rej(err)
        })
    })
}


module.exports = {
    init
}