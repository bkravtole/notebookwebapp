const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JMT_SECRET = "bhaveshravto$le"
const fetchdata = require("../middleware/fetchdata")

router.post('/creatuser', [

   body("name", "enter valid name ").isLength({ min: 3 }),
   body("email", "enter valid email").isEmail(),
   body("password", "enter valid password").isLength({ min: 6 })

], async (req, res) => {
   let success = false;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ success ,errors: errors.array() });
   }

   try {

      let user = await User.findOne({ email: req.body.email });

      if (user) {
         return res.status(400).json({ success , error: "email already in use" })
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password , salt)


       user = await User.create({

         name: req.body.name,
         email: req.body.email,
         password:secPass,
      })
      const data = {
         user: {
            id: user.id
         }
      }
      const authtoken = jwt.sign(data, JMT_SECRET)
success = true
      res.json( {success ,authtoken} )
   }
   catch (error) {
      console.error(error.message)
      res.status(400).send("some error occurred");
   }


})
router.post('/login', [


   body("email", " enter valid email").isEmail(),
   body("password", "password not empty").exists(),

], async (req, res) => {
   
   let success = false;
   // if there are any error 
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   const { email, password } = req.body

   try {
      let user =  await User.findOne({email})
      if (!user) {
         success = false;  
         return res.status(400).json({ error: "User not found" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {
         success = false; 
         return res.status(400).json({ error: "password mismatch" });
      }
      const data = {
         user: {
            id: user.id
         }
      }
      const authtoken = jwt.sign(data, JMT_SECRET)
success = true;
      res.json({success , authtoken })
   } 
      catch (error) {
         console.error(error.message)
         res.status(500).send("internal server error occurred");
   }
})




router.post('/getuser', fetchdata, async (req, res) => {
   
   try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.json(user)
   } catch (error) {
      console.error(error.message)
      res.status(500).send("internal server error occurred");
   }
})


module.exports = router 