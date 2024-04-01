import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavNewsContext from "../FavNewsContext/FavNewsContext";

const NewsItem = ({
  title,
  description,
  content,
  author,
  published_at,
  sourceId,
  sourceName,
  imageUrl,
  url,
  Badge,
  favClick
}) => {
  const context = useContext(FavNewsContext);
  const { favNews, getFavNews, addFavNews, deleteFavNews } = context;
  const navigate = useNavigate();
  
  const [isStarClicked, setIsStarClicked] = useState(false);

  useEffect(() => {
    getFavNews();
  }, []);
  
  useEffect(() => {
    if (Array.isArray(favNews)) {
      const isStarClickedInitial = favNews.some(news => news.title === title);
      setIsStarClicked(isStarClickedInitial);
    }
  }, [favNews, title]);
  
  const handleStarClick = async () => {
    window.location.reload();
    const checkLogin = localStorage.getItem("token");
    if (checkLogin) {
      if (isStarClicked) {
        // If already favorited, find the news item in the favorite news state
        const favNewsItem = favNews.find(news => news.title === title);
        if (favNewsItem) {
          // If found, pass its ID to deleteFavNews function
          await deleteFavNews(favNewsItem.id);
          setIsStarClicked(false);
        }
      } else {
        // If not favorited, add it to favorites
        const favN = await addFavNews({
          title: title,
          description,
          content,
          author,
          published_at,
          source_id: sourceId,
          source_name: sourceName,
          url,
          image_url: imageUrl,
        });
        setIsStarClicked(true);
      }
    } else {
      navigate("/login");
    }
  };
  
  return (
    <div>
      <div className="card bg-dark">
        <div
          style={{
            display: "flex",
            position: "absolute",
            justifyContent: "flex-end",
            right: "0",
            top: "-7px",
          }}
        >
          <span className={`badge rounded-pill bg-${Badge}`}>{sourceName}</span>
        </div>
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body" style={{ color: "white" }}>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(published_at).toGMTString()}
            </small>
          </p>
          <div className="favourite" style={{ display: "flex" }}>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>

            <i
              className={isStarClicked || favClick ? "fi fi-sr-star" : "fi fi-rr-star"}
              style={{
                display: "flex",
                margin: "7px 7px",
                cursor: "pointer",
                color: isStarClicked || favClick ? "gold" : "inherit",
              }}
              onClick={handleStarClick}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
