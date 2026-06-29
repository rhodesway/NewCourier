// IMPORT PARCEL MODEL
const Parcel = require("../models/Parcel")

// CREATE A PARCEL
 const createParcel = async (req, res) =>{
    // Adding to db
    try {
        const newParcels = Parcel(req.body)
        const parcel = newParcels.save()
        res.status(201).json(parcel)
    } catch (error) {
        res.status(500).json(error)
    }
}

// GET ALL PARCEL
 const getAllParcel = async (req, res) =>{

    try {
        // Fetch parcel
        const parcels = await Parcel.find().sort({createdAt:-1})
        res.status(200).json(parcels)
    } catch (error) {
        res.status(500).json(error)
    }
}

//UPDATING PARCEL
 const updateParcel = async (req, res)=>{
    // Getting from db
    try {
        const parcel = await Parcel.findById(req.params.id)
        res.status(201).json(parcel)
    } catch (error) {
         res.status(500).json(error)
    }
}

// GET ONE PARCEL
 const getOneParcel = async (req,res) => {

    try {
        const parcel = await Parcel.findById(req.params.id)
        res.status(200).json(parcel)
    } catch (error) {
        res.status(500).json(error)
    }
}

// GET USER'S PARCEL
 const getUserParcel = async (req, res) => {
    try {
        const parcels = await Parcel.find({senderemail:req.body})
        res.status(200).json(parcels)
    } catch (error) {
        res.status(500).json(error)
    }
}

// DELETE PARCEL
 const deleteParcel = async (req, res)=>{
    try {
        await Parcel.findByIdAndDelete(req.params.id)
        res.status(201).json("Parcel has been deleted successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {createParcel, getAllParcel, getOneParcel, updateParcel, deleteParcel, getUserParcel}