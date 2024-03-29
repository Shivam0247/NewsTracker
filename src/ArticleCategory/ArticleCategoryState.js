import ArticleCategoryContext from "./ArticleCategoryContext";
import { useState} from "react";

const CategoryState = (props) => {
  const host = "http://localhost:8800"
  const ArticlecategoryInitial = [];
  const [articleCategories, setArticleCategories] = useState(ArticlecategoryInitial);

  // Get all Articles
  const getArticleCategories = async () => {
    try {
      const response = await fetch(`${host}/api/articlecategory/getarticlecategories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      setArticleCategories(json);
    } catch (error) {
      console.error('Error fetching Category:', error);
    }
  }
   
  const addArticleCategory = async (article_id, category_id) => {
    try {
      // API Call to add the new article category
      const response = await fetch(`${host}/api/articlecategory/addarticlecategories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ article_id, category_id })
      });
  
      const newArticleCategory = await response.json();
  
      // Update the articleCategories state by concatenating the new article category
      setArticleCategories([...articleCategories, newArticleCategory]);
    } catch (error) {
      console.error('Error adding article category:', error);
    }
  }
  

  return (
    <ArticleCategoryContext.Provider value={{articleCategories,getArticleCategories,addArticleCategory}}>
      {props.children}
    </ArticleCategoryContext.Provider>
  );
}

export default CategoryState;
