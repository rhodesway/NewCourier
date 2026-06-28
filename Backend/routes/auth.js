const express = require("express")
const router = express.Router()
const CrytoJs = require("crypto-js")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const dotenv = require("dotenv")

dotenv.config()

// REGISTRATION
router.post("/register", async (res, res) => {
    const newUser = User({
        fullname: req.body.fullname,
        email: req.body.email,
        age: req.body.age,
        country: req.body.country,
        address: req.body.address,
        //  Create hashed poassword
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS
        ).toString()
    })

    try {
        const user = await newUser.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

// LOGIN
router.post("/login", async (res, res) => {
    // First findimg user in db
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json("You are not registered")
        }

        // Decrypt or hashed found user password 
        const hashedPassword = CrytoJs.AES.decrypt(
            user.password,
            process.env.PASS
        )

        // GETTING ORIGINAL PASS
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        // COMPARING PASS SENT TO PASS IN DB
        if (originalPassword !== req.body.password) {
            return res.status(500).json("Wrong Password")
        }
        // LOGGING IN PROCESS. BEST EXTRACT 
        const { password, ...info } = user._doc //Mongo 

        // CREATE ACCESS TOKEN
        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.jwt_SEC,
            { expiresIn: "10d" }
        )

        // SENDING ACCESSTOKEN TO FRONTEND USER
        res.status(200).json({ ...info, accessToken })

    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router