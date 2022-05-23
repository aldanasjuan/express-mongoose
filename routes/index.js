const express = require('express')
const router = express.Router()
const health = require("./health-check")
const users = require("./users")

router.use("/", health)
router.use("/users", users)

module.exports = router