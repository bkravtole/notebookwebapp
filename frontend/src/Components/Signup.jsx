import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

  const [credential, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const navigate = useNavigate()
  const formSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password } = credential
    const response = await fetch(`http://127.0.0.1:5000/api/auth/creatuser
` , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name })
    })
    const json = await response.json()
    console.log(json)
    if(json.success){
      localStorage.setItem("token",json.authtoken)
      navigate("/")   
      props.showAlert("Account Created successfully" , "success")  
        }
      else{ 
        props.showAlert("invalid credentials" , "danger")
      }
  }

  const onchg = (e) => {
    setCredentials({ ...credential, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <form onSubmit={formSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onchg} aria-describedby="emailHelp" required />

        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email'minLength={12} onChange={onchg} aria-describedby="emailHelp" required/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onchg} name="password" minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label> 
          <input type="password" className="form-control" id="cpassword" onChange={onchg} name="cpassword"minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
