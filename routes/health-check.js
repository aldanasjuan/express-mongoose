const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.send("api is online")
})
module.exports = router