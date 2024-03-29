import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import "../css/Login.css"
const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    // let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            // history.push("/");

        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="login">
        <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form>
        <h3>Login Here</h3>

        <label htmlFor="username">Email</label>
        <input type="email" placeholder="Email" id="username" required/>

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" required/>

        <button>Log In</button>
        {/* <div className="social">
          <div className="go"><i className="fab fa-google"></i>  Google</div>
          <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
        </div> */}
    </form>
    </div>
    )
}

export default Login