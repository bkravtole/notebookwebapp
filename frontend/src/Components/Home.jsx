import React from 'react'
// import { useNavigate } from 'react-router-dom'
import FtcNotes from './FtcNotes'



const Home = (props) => {
  // const navigate = useNavigate()
  // if(!localStorage.getItem("token")){
  // navigate("/login")
  // }
  
const {showAlert} =props
  return (
    <div>
     
      <FtcNotes  showAlert ={showAlert}/>
    </div>
  )
}

export default Home
