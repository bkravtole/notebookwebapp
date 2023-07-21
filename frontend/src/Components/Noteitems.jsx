import React,{useContext} from 'react'
import NoteContx from '../Context/notes/NoteContx'


const Noteitems = (props) => {
    const context = useContext(NoteContx)
    const { deleteNote } = context

    const { note ,updateNote } = props;
    return (
        <div className='col-md-4'>
            <div className="card my-2 " >
              
                    <div className="card-body">
                        <div className='d-flex align-items-center'>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash-can mx-2" style={{cursor: "pointer"}} onClick={()=>{deleteNote(note._id);   props.showAlert("Deleted succesfully" , "danger") } }></i>   
                        <i className="fa-solid fa-pen-to-square mx-2"style={{cursor: "pointer"}} onClick={()=>{updateNote(note)}}></i>
                        </div>
                        <p className="card-text">{note.description}</p>
                    
                        
                      
                    </div>
            </div>
        </div>
    )
}

export default Noteitems
