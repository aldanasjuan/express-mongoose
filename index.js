require("dotenv").config()
const express = require("express")
const router = require("./routes/index")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 7722
const db = require("./database")
const mongoose = require("mongoose")
const root = process.env.ROOT || "/"
app.use(cors())
app.use(express.json())
app.use(root, router)

async function init(){
    try{
        db.init(process.env.DB || "") // init mongo
        process.on("SIGINT", cleanup)
        app.listen(port, () => console.log(`Server listening => port: ${port} root:"${root}"`))
    }catch(error){
        console.error(error)
    }

    async function cleanup(){
        await mongoose.connection.close()
        console.log("mongoose connection closed")
        console.log("closing server")
        process.exit()
    }
}

init()