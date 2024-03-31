import React, {useState,useContext} from 'react'
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "../css/Signup.css"
import UserContext from '../UserContext/UserContext';
const Signup = (props) => {
    const [credentials, setCredentials] = useState({username:"",email: "", password: ""}) 
    // let history = useHistory();
    const context = useContext(UserContext);
    const {users,getUsers,addUser} = context;
    const navigate = useNavigate(); // Use useNavigate hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await addUser(credentials.username, credentials.email, credentials.password);
        setCredentials({username: "", email: "", password: ""});
        console.log(user);
        if (!user.errors || user.errors.length === 0) {
            navigate("/login"); // Navigate to the login page if there are no errors
          }
      }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="signup">
        <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form>
        <h3>Signup Here</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Username" id="username" name='username' onChange={onChange} value={credentials.username} required/>

        <label htmlFor="username">Email</label>
        <input type="email" placeholder="Email" id="Email" name='email' onChange={onChange} value={credentials.email} required/>


        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" name='password' onChange={onChange} value={credentials.password} required/>

        <button onClick={handleSubmit}>Sign Up</button>
        {/* <div className="social">
          <div className="go"><i className="fab fa-google"></i>  Google</div>
          <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
        </div> */}
    </form>
    </div>
    )
}

export default Signup