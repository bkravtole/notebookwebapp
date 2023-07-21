const express = require('express')
const router = express.Router();
const Note = require("../models/Notes");
const fetchdata = require('../middleware/fetchdata');
const { body, validationResult } = require('express-validator');
// const mongoose = require('mongoose'); 
// const { Schema } = mongoose;


// route 1 Get all notes

router.get('/fetchallnotes',fetchdata , async(req, res)=> {
    try {
        const notes = await Note.find({user : req.user.id})
res.json(notes)
    } catch (error) {
        console.error(error.message)
         res.status(500).send("internal server error occurred");
    }


  
})

//  add notes route 2

router.post('/addnotes',fetchdata , [

    body("title", "enter valid title ").isLength({ min: 3 }),
    body("description", "enter valid description").isLength({ min: 6 })
 
],async(req, res)=> {

try {
const{title , description , tag} = req.body;
const errors = validationResult(req);
if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
}
 const note = new Note({
    title , description ,tag , user : req.user.id
})
const saveNote = await note.save()
res.json(saveNote);

} catch (error) {
    console.error(error.message)
         res.status(500).send("internal server error occurred");
}
})




// router 3 updates the note

router.put('/updatenote/:id',fetchdata ,async(req, res)=> {
    const {title , description, tag} = req.body;
    // create a new note
    try {
        
    
    const newNote = {};

    if(title){ newNote.title = title};
    if(description){ newNote.description = description};
    if(tag){ newNote.tag = tag};
    

//  find the note to be updated and update it
    let note = await Note.findById(req.params.id)
    if(!note){ return res.status(404).send("not found"); }

    if(note.user.toString() !== req.user.id){
        return res.status(404).send("not found");
    }

    note = await Note.findByIdAndUpdate(req.params.id , {$set : newNote} , {new : true})
    res.json(note)
} catch (error) {
    console.error(error.message)
    res.status(500).send("internal server error occurred");
}
})



// router 4 delete notes

router.delete('/deletenote/:id',fetchdata ,async(req, res)=> {

   
   
try {
    

//  find the note to be updated and update it
    let note = await Note.findById(req.params.id)
    if(!note){ return res.status(404).send("not found"); }

//  alllow user to delete only own notes

    if(note.user.toString() !== req.user.id){
        return res.status(404).send("not found");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"sucsess": " note is deleted successfully", note: note})
} catch (error) {
    console.error(error.message)
    res.status(500).send("internal server error occurred");
}
})

module.exports = router