import FavNewsContext from "./FavNewsContext";
import { useState, useEffect } from "react";
const FavNewsState = (props) => {
  const host = "http://localhost:8800";
  const FavNewsInitial = [];
  const [favNews, setFavNews] = useState(FavNewsInitial);
  // Get all Articles
  const getFavNews = async () => {
    try {
      const response = await fetch(`${host}/api/favnews/getfavnews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjE0fSwiaWF0IjoxNzExODgwNzYzfQ.1PVg2pR6X9ga7RbztQ-jCPqwU0xprcK8BbnCMv0ApWo"
        },
      });
      const json = await response.json();
      setFavNews(json);
    } catch (error) {
      console.error("Error fetching FavNews:", error);
    }
  };

  // Add an Article
  const addFavNews = async ( title, description,content,author,published_at,source_id,source_name,url,image_url ) => {
    try {
      const response = await fetch(`${host}/api/favnews/addfavnews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjE0fSwiaWF0IjoxNzExODgwNzYzfQ.1PVg2pR6X9ga7RbztQ-jCPqwU0xprcK8BbnCMv0ApWo"
        },
        body: JSON.stringify({
            title: title,
            description: description,
            content: content,
            author: author,
            published_at: published_at,
            source_id: source_id,
            source_name: source_name,
            url: url,
            image_url: image_url 
        }),        
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding FavNews:", error);
      return null;
    }
  };

  
  return (
    <FavNewsContext.Provider value={{favNews,getFavNews,addFavNews}}>
      {props.children}
    </FavNewsContext.Provider>
  );
};

export default FavNewsState;
