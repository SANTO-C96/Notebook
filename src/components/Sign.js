import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'

const Sign = (props) => {
    const [credentials, setCredentials] = useState({name:"", email:"",password:"", cpassword:""});
    const navigate = useNavigate(); 
    const handleSubmit = async(e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //save the auth token and redirect

            localStorage.setItem('token', json.authtoken);
            navigate("/");
            alert("Account creadted Successfully", "success")
        }
        else{
            alert("Invalid Crendentials", "danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div>
    <Navbar/> 
    <h2 mx-4>Create an account to use iNotebook</h2>
   <form onSubmit={handleSubmit} className='my-3'>
  <div className="mb-3 mx-3">
    <label htmlFor="name" className="form-label">Enter Your Name</label>
    <input type="text" className="form-control" id="name" name='name' onChange={onChange}   aria-describedby="name"/>
  </div>

  <div className="mb-3 mx-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3 mx-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required/>
  </div>

  <div className="mb-3 mx-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5}required />
  </div>
  <button type="submit" className="btn btn-primary mx-3">Submit</button>
</form>
        
    </div>
  )
}

export default Sign