import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import "../css/Signup.css"
const Signup = (props) => {
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
        <div className="signup">
        <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    <form>
        <h3>Signup Here</h3>

        <label for="username">Username</label>
        <input type="text" placeholder="Username" id="username" required/>

        <label for="username">Email</label>
        <input type="email" placeholder="Email" id="Email" required/>


        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password" required/>

        <button>Sign Up</button>
        {/* <div class="social">
          <div class="go"><i class="fab fa-google"></i>  Google</div>
          <div class="fb"><i class="fab fa-facebook"></i>  Facebook</div>
        </div> */}
    </form>
    </div>
    )
}

export default Signup