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
  const addArticles = async (title, description, content, author, publishedAt, sourceId, sourceName, url, urlToImage) => {
    try {
      // Make API call to add article
      const response = await fetch(`${host}/api/newsarticle/addarticle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          content,
          author,
          publishedAt,
          sourceId,
          sourceName,
          url,
          urlToImage
        }),
      });
      const data = await response.json();
      console.log("Added Article:", data); // Log added article data
      return data; // Return added article
    } catch (error) {
      console.error('Error adding article:', error);
      return null; // Return null in case of error
    }
  };
  
    
  return (
    <ArticleContext.Provider value={{ articles_d, getArticles, addArticles }}>
      {props.children}
    </ArticleContext.Provider>
  );
}

export default ArticleState;
