import CategoryContext from "./CategoryContext";
import { useState} from "react";

const CategoryState = (props) => {
  const host = "http://localhost:8800"
  const categoryInitial = [];
  const [categories, setCategories] = useState(categoryInitial);

  
  // Get all Articles
  const getCategories = async () => {
    try {
      const response = await fetch(`${host}/api/category/getcategory`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      setCategories(json);
    } catch (error) {
      console.error('Error fetching Category:', error);
    }
  }
   
  return (
    <CategoryContext.Provider value={{categories,getCategories}}>
      {props.children}
    </CategoryContext.Provider>
  );
}

export default CategoryState;
