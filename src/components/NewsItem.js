import React from "react";

const NewsItem = (props)=> {
    let { title, description, imageUrl, url, date, author,source,Badge} = props;
    return (
      <div>
        <div className="card">

          <div style={{display:"flex",position:"absolute",justifyContent:"flex-end",right:"0",top:"-7px"}}>
          <span className={`badge rounded-pill bg-${Badge}`} >
            {source}
          </span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem