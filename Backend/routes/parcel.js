const express = require("express")
const { createParcel, getAllParcel, updateParcel, getOneParcel, getUserParcel, deleteParcel } = require("../controllers/parcel")
const router = express.Router()

// ADD A PARCEL
router.post("/", createParcel)

// GET ALL PARCEL
router.get("/", getAllParcel)

// UPDATE PARCEL
router.put("/:id", updateParcel)

// GET ONE PARCEL
router.get("/find/:id", getOneParcel)

// GET USERS PARCEL
router.post("/me", getUserParcel)

// DELETE PARCEL
router.delete("/:id", deleteParcel)

module.exports = router