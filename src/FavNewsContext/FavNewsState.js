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
          "auth-token": localStorage.getItem("token")
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
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({
            title: title.title,
            description: title.description,
            content: title.content,
            author: title.author,
            published_at: published_at,
            source_id: title.source_id,
            source_name: title.source_name,
            url:title.url,
            image_url: title.image_url 
        }),        
      });
      console.log("sajjsnm",title);
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
