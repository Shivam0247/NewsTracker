import ArticleContext from "./ArticleContext";
import { useState,useEffect} from "react";

const ArticleState = (props) => {
  const host = "http://localhost:8800"
  const articlesInitial = [];
  const [articles_d, setArticles_d] = useState(articlesInitial);

  // Get all Articles
  const getArticles = async () => {
    try {
      const response = await fetch(`${host}/api/newsarticle/getarticle`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      setArticles_d(json);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  // Add an Article
  // Add an Article
const addArticles = async (title, description, content, author, published_at, source_id, source_name, url, image_url) => {
    try {
      // Fetch the latest articles
      await getArticles();
  
      // Check if an article with the same title already exists
      const existingArticle = articles_d.find(article => article.title === title);
      if (existingArticle) {
        console.log("Article with the same title already exists. You can't enter.");
        return; // Exit function if article with the same title exists
      }
  
      // If article with the same title does not exist, proceed to add the new article
      const response = await fetch(`${host}/api/newsarticle/addarticle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, content, author, published_at, source_id, source_name, url, image_url })
      });
  
      if (response.ok) {
        // Retrieve the newly added article from the response
        const newArticle = await response.json();
        // Update the articles state with the new article
        setArticles_d([...articles_d, newArticle]);
      } else {
        console.error('Failed to add article');
      }
    } catch (error) {
      console.error('Error adding article:', error);
    }
  }
    
  return (
    <ArticleContext.Provider value={{ articles_d, getArticles, addArticles }}>
      {props.children}
    </ArticleContext.Provider>
  );
}

export default ArticleState;
