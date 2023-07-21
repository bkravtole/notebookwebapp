import React, { useState } from "react";
import NoteContx from "./NoteContx";

const NoteState = (props) => {

const Host = "http://localhost:5000"

    const notesInitial =[]
             
const [notes, setNotes] = useState(notesInitial)


//  get a note

const getNote = async()=>{
  const response =await fetch(`${Host}/api/notes/fetchallnotes` , {
   method : "GET",
   headers : {
     "Content-Type": "application/json",
     "auth-token" : localStorage.getItem("token")
 },

})
const json = await response.json()
console.log(json)
setNotes(json)
};

//  add Notes
const addNote=async(title , description , tag)=> {

  const response =await fetch(`${Host}/api/notes/addnotes`, {
    method : "POST",
    headers : {
      "Content-Type": "application/json",
     "auth-token" : localStorage.getItem("token")
  },
body : JSON.stringify({title , description ,tag})

})

const note = await response.json();
    setNotes(notes.concat(note))

 
}



// delete notes

const deleteNote= async(id)=> {

  const response =await fetch(`${Host}/api/notes/deletenote/${id}` , {
    method : "DELETE",
    headers : {
      "Content-Type": "application/json",
      "auth-token" : localStorage.getItem("token")
  },


})
  
const newnotes = notes.filter((note)=>{return  note._id !==id})
setNotes(newnotes)
const json= response.json()
console.log(json)
}


// edit notes

const editNote=async(id, title , description, tag)=> {

  const response =await fetch(`${Host}/api/notes/updatenote/${id}` , {
    method : "PUT",
    headers : {
      "Content-Type": "application/json",
      "auth-token" : localStorage.getItem("token")
  },
body : JSON.stringify({title , description ,tag})

})
const json=  await response.json()
console.log(json)


let newnotess = JSON.parse(JSON.stringify(notes))

  for (let i=0; i<newnotess.length; i++){
    const element = newnotess[i];
    if(element._id === id){ 
      newnotess[i].title = title;
      newnotess[i].description = description;
      newnotess[i].tag = tag;
      break;
    }
   
  }
  setNotes(newnotess);
}


    return (
        <NoteContx.Provider  value = {{notes , addNote ,deleteNote,editNote , getNote}}>
            {props.children}
        </NoteContx.Provider>
    )   
}


export default NoteState;