import React, { useState  } from 'react'
import {useNavigate} from "react-router-dom"
const Login = (props) => {
  // const  history = useHistory()
  const [credential , setCredentials] = useState({email :"" , password :""})
const navigate = useNavigate()
const formSubmit = async(e) =>{
e.preventDefault()

const response =await fetch(`http://127.0.0.1:5000/api/auth/login` , {
  method : "POST",
  headers : {
    "Content-Type": "application/json",
    
},
body : JSON.stringify({email : credential.email , password : credential.password })

})
const json= await response.json()
console.log(json)

if(json.success){
localStorage.setItem("token",json.authtoken);
props.showAlert("login successfully" , "success")  
navigate("/")
 
  }
 
else{ 
  props.showAlert("invalid credentials" , "danger")
}
}

const onchg = (e)=>{
  setCredentials({...credential , [e.target.name]: e.target.value })
}

  return (
    <div>
      <form onSubmit={formSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={credential.email} onChange={onchg} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={credential.password} onChange={onchg} />
        </div>

        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login
