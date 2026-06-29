const express = require("express")
const { deleteUser, getAllUser } = require("../controllers/user")
const router = express.Router()

// DELETING USER
// We need an ID to delete

router.delete("/:id", deleteUser)

// GET ALL USER
// We dont need ID to get user

router.get("/", getAllUser)


module.exports = router