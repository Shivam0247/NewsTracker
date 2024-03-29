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
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/articlecategory/addarticlecategories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({article_id, category_id})
    });

    const articleCategories = await response.json();
    setArticleCategories(articleCategories.concat(articleCategories))
  }

  return (
    <ArticleCategoryContext.Provider value={{articleCategories,getArticleCategories,addArticleCategory}}>
      {props.children}
    </ArticleCategoryContext.Provider>
  );
}

export default CategoryState;
