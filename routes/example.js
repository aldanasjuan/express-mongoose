
const express = require('express')
const router = express.Router()
const auth = require("../auth")

// /example/
router.get("/", async (req, res) => {
    res.send("example GET")
})

//this a protected route.
// the isAuthorized function checks for a jwt and saves the payload in res.claims

// /example/create
router.post("/create", auth.isAuthorized, async (req, res) => {
    console.log("user email:", res?.claims?.email)
    res.send("example POST")
})

// /example/edit
router.put("/edit", async (req, res) => {
    res.send("example PUT")
})

// /example/delete
router.delete("/delete", async (req, res) => {
    res.send("example DELETE")
})
module.exports = router
