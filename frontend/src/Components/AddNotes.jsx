import React,{useContext, useState} from 'react'
import NoteContx from '../Context/notes/NoteContx'
const AddNotes = (props) => {
    const context = useContext(NoteContx)
    const { addNote } = context
const [note ,setNote] = useState({title : "" , description : "" , tag : "" })


const clickhdl = (e)=>{
e.preventDefault()
addNote(note.title, note.description, note.tag)
setNote({title : "" , description : "" , tag : ""})
props.showAlert(" Note Added succesfully" , "success") 
}

const onchg = (e)=>{
    setNote({...note , [e.target.name]: e.target.value })
}

    return (
        <div>
            <div className="container my-3">
                <h3>Add a Note</h3>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">title</label>
                        <input type="text" className="form-control" id="title" name ="title" aria-describedby="emailHelp"onChange={onchg} value={note.title} minLength={5} required />
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onchg} value={note.description} minLength={5} required  />
                    </div>
                   
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" value={note.tag} name='tag' onChange={onchg} />
                    </div>
                   
                  
                    <button disabled={note.title.length <5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={clickhdl}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNotes
