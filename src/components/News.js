import React,{useEffect,useState,useContext} from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import articleContext from "../ArticleContext/ArticleContext";

const News = (props)=>{
  const context = useContext(articleContext);
  const { articles_d,getArticles,addArticles} = context;

  const[articles,setArticles]= useState([]);
  const[loading,setLoading]= useState(false);
  const[page,setPage]= useState(1);
  const[totalResults,setTotalResults]= useState(0);
  

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

    

  const updateNews= async()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pagesize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let parseData = await data.json();
    props.setProgress(70);
    setArticles(parseData.articles);
    setLoading(false);
    setTotalResults(parseData.totalResults);
    props.setProgress(100);

    parseData.articles.forEach(async (article) => {
      const { title, description, content, author, publishedAt, source, url, urlToImage } = article;
      await addArticles(title, description, content, author, publishedAt, source.id, source.name, url, urlToImage);
    });
    
    console.log(parseData);
  }

  useEffect(() => {
    updateNews();
    document.title = `${capitalizeFirstLetter(
      props.category
    )} - NewsMonkey`;

    // eslint-disable-next-line
  }, []);



  // const handlePrevious =async()=>{
  //   await setPage(page-1);
  //   updateNews();
  // }

  // const handleNext = async()=>{
  //   // if((page + 1) > Math.ceil(totalResults/props.pagesize)){

  //   // }
  //   // else{
  //     await setPage(page+1);
  //     updateNews();
  // // }
  // }

  const fetchMoreData = async () => {
    setPage(page+1);
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apikey}&page=${
    page + 1
    }&pageSize=${props.pagesize}`;
    setLoading(true);
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setLoading(false);
    setTotalResults(parseData.totalResults);
  };

    return (
      <>
        <h1 className="text-center" style={{ margin: "30px 0",marginTop: "90px",color: "white"}}>
          NewsMonkey - Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h1>
        {/* {loading && <Loading/>} */}

        <InfiniteScroll
          style={{overflow:"hidden"}}
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length <= totalResults}
          loader={loading && <Loading />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element, index) => {
                return (
                  <div className="col-md-4 my-3" key={index}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      date={element.publishedAt}
                      author={element.author}
                      source={element.source.name}
                      Badge={props.Badge}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://www.hindustantimes.com/ht-img/img/2024/01/07/1600x900/The-IMD-has-issued-rain-and-thunderstorm-alerts-fo_1704628367847.jpg"
                      }
                      url={element.url}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between mt-5">
          <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevious}> &larr; Previous</button>
          <button type="button" disabled={(page + 1) > Math.ceil(totalResults/props.pagesize)} className="btn btn-dark" onClick={handleNext}>Next &rarr;</button>
        </div>     */}
      </>
    );
}

News.defaultProps = {
  country: "in",
  pagesize: 20,
  apikey: "df5a4b80cf5b4d1395a5093a37c8e5ca",
  category: "general",
  Badge: "danger",
};

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  apikey: PropTypes.string,
  category: PropTypes.string,
  Badge: PropTypes.string,
};

export default News