import React, { useContext, useEffect } from "react";
import NewsItem from "./NewsItem";
import FavNewsContext from "../FavNewsContext/FavNewsContext";

function FavNews(props) {
  const context = useContext(FavNewsContext);
  const { favNews, getFavNews } = context;

  useEffect(() => {
    getFavNews();
  }, [getFavNews]);

  return (
    <div>
      <h1
        className="text-center"
        style={{ margin: "30px 0", marginTop: "90px", color: "white" }}
      >
        NewsTracker - Favourite News
      </h1>
      <div className="container">
        <div className="row">
          {favNews.map((element, index) => (
            <div className="col-md-4 my-3" key={index}>
              <NewsItem
                title={element.title ? element.title : ""}
                published_at={element.published_at}
                author={element.author}
                sourceName={element.source_name ? element.source_name : "Anonymous"} 
                sourceId={element.source_id ? element.source_id : ""}
                Badge="danger"
                description={element.description ? element.description : ""}
                imageUrl={
                  element.image_url
                    ? element.image_url
                    : "https://www.hindustantimes.com/ht-img/img/2024/01/07/1600x900/The-IMD-has-issued-rain-and-thunderstorm-alerts-fo_1704628367847.jpg"
                }
                url={element.url}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FavNews;
