import React, { useState, useContext } from "react";
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
  Badge
}) => {
  const context = useContext(FavNewsContext);
  const { addFavNews } = context;

  const [isStarClicked, setIsStarClicked] = useState(false);
  const navigate = useNavigate();

  const handleStarClick = async () => {
    const checkLogin = localStorage.getItem("token");
    if (checkLogin) {
      setIsStarClicked(!isStarClicked);
      // Add the news item to favorites
      const favN = await addFavNews({
        title: typeof title === 'string' ? title : (typeof title === 'object' ? title.title : ''), // Ensure title is a string
        description,
        content,
        author,
        published_at,
        source_id: sourceId,
        source_name: sourceName,
        url,
        image_url: imageUrl
      });
  
      console.log(favN);
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
              className={isStarClicked ? "fi fi-sr-star" : "fi fi-rr-star"}
              style={{
                display: "flex",
                margin: "7px 7px",
                cursor: "pointer",
                color: isStarClicked ? "gold" : "inherit",
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
