import ArticleContext from "./ArticleContext";
import { useState } from "react";

const ArticleState = (props) => {
  const host = "http://localhost:8800"
  const articlessInitial = []
  const [articles_d, setArticles_d] = useState(articlessInitial)

  // Get all Articles
  const getArticles = async () => {
    // API Call 
    const response = await fetch(`${host}/api/newsarticle/getarticle`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json() 
    setArticles_d(json)
  }

  // Add a Article
  const addArticles = async (title, description, content, author, published_at, source_id, source_name, url, image_url) => {
    // API Call 
    const response = await fetch(`${host}/api/newsarticle/addarticle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, content, author, published_at, source_id, source_name, url, image_url })
    });
  
    // Check if the response is successful
    if (response.ok) {
      // Retrieve the newly added article from the response
      const newArticle = await response.json();
      
      // Update the articles state with the new article
      setArticles_d([...articles_d, newArticle]);
    } else {
      // Handle error response
      console.error('Failed to add article');
    }
  }
  
  return (
    <ArticleContext.Provider value={{articles_d,getArticles,addArticles}}>
      {props.children}
    </ArticleContext.Provider>
  )

}
export default ArticleState;