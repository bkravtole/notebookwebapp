

import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContx from '../Context/notes/NoteContx'
import Noteitems from './Noteitems'
import AddNotes from './AddNotes'
import { useNavigate } from 'react-router-dom'

const FtcNotes = (props) => {
  let navigate = useNavigate()
  const context = useContext(NoteContx)
  const { notes, getNote, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNote()
    } else {
      navigate("/login")
    }

    // eslint-disable-next-line
  }, [])
  const ref = useRef(null)
  const refclose = useRef(null)
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }

  const onchg = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const clickhdl = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refclose.current.click()
    props.showAlert("updated succesfully", "success")


  }

  return (
    <>
      <AddNotes showAlert={props.showAlert} />


      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">


              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchg} minLength={5} required />

                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onchg} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Description</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onchg} />
                </div>



              </form>

            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={clickhdl} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h3>Youe Notes</h3>
        {notes.map((note, index) => {
          return <Noteitems key={index} updateNote={updateNote} note={note} showAlert={props.showAlert} />
        })}

      </div>
    </>

  )
}

export default FtcNotes
