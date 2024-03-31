import UserContext from "./UserContext";
import { useState,useEffect} from "react";
const UserState = (props) => {
  const host = "http://localhost:8800"
  const usersInitial = [];
  const [users, setUsers] = useState(usersInitial);
  // Get all Articles
  const getUsers = async () => {
    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      setUsers(json);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  // Add an Article
  const addUser = async (username,email,password) => {
    try {
      // Make API call to add article
      const response = await fetch(`${host}/api/auth/adduser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,email,password
        }),
      });
      const data = await response.json();
      if (data.success){
        // Save the auth token and redirect
        localStorage.setItem('token', data.authtoken); 
    }
      return data; 
    } catch (error) {
      console.error('Error adding user:', error);
      return null; 
    }
  };
  
    
  return (
    <UserContext.Provider value={{users,getUsers,addUser}}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
