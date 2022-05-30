const express = require('express')
const router = express.Router()
const health = require("./health-check")
const users = require("./users")

/*
    Import all your routers here
*/
const example = require("./example")

router.use("/", health)
router.use("/users", users)
router.use("/example", example)

module.exports = router