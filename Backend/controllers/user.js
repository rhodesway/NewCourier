
// GETTING USER SCHEMA
const User = require("../models/User")

// DELETING LOGIC
const deleteUser = async (req,res) =>{
    // Getting unqiue user from DB ( ID )
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(201).json("The user has been deleted succesully")
    } catch {
        res.status(500).json(error)
    }
}

// GET ALL USER
 const getAllUser = async (req,res) =>{
    try {
        // getting latest user
        const users = await User.find.sort({createdAt:-1})
        res.status(200).json(users)
    } catch {
        res.status(500).json(error)
    }
}

module.exports = {
    deleteUser,
    getAllUser
}