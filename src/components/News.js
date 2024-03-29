import React,{useEffect,useState,useContext} from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import articleContext from "../ArticleContext/ArticleContext";
import ArticleCategoryContext from "../ArticleCategory/ArticleCategoryContext";
import CategoryContext from "../CategoryContext/CategoryContext";
const News = (props)=>{
  const context = useContext(articleContext);
  const { articles_d, getArticles, addArticles } = context;

  const articleCategoryContext = useContext(ArticleCategoryContext);
  const {articleCategories,getArticleCategories,addArticleCategory} = articleCategoryContext;

  const categoryContext = useContext(CategoryContext);
  const {categoryies,getCategories} = categoryContext;


  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getArticles();
      await updateNews();
      document.title = `${capitalizeFirstLetter(
        props.category
      )} - NewsMonkey`;
    };
  
    fetchData();
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  const updateNews = async () => {
    try {
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
      console.log(parseData);
  
      // Fetch category ID from the database
      const category = categoryies.find(category => category.name === props.category);
      if (!category) {
        console.error(`Category ${props.category} not found in the database.`);
        return;
      }
      const categoryId = category.category_id;
  
      // Add articles to the database
      parseData.articles.forEach(async (article) => {
        const { title, description, content, author, publishedAt, source, url, urlToImage } = article;
        const addedArticle = await addArticles(title, description, content, author, publishedAt, source.id, source.name, url, urlToImage);
        if (addedArticle) {
          // Add article category
          await addArticleCategory(addedArticle.id, categoryId);
        }
      });
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };
  

  const fetchMoreData = async () => {
    try {
      setPage(page + 1);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pagesize}`;
      setLoading(true);
      let data = await fetch(url);
      let parseData = await data.json();
  
      console.log('parseData:', parseData);
      console.log('parseData.articles:', parseData.articles);
  
      // Check if parseData.articles is an array before concatenating
      if (Array.isArray(parseData.articles)) {
        setArticles([...articles, ...parseData.articles]);
        setLoading(false);
        setTotalResults(parseData.totalResults);
  
        // Add each new article to the database
        parseData.articles.forEach(async (article) => {
          const { title, description, content, author, publishedAt, source, url, urlToImage } = article;
          await addArticles(title, description, content, author, publishedAt, source.id, source.name, url, urlToImage);
        });
      } else {
        console.error('Error: parseData.articles is not an array');
        setLoading(false); // Stop loading
      }
    } catch (error) {
      console.error('Error updating news:', error);
      setLoading(false); // Stop loading
    }
  };
  
  
  

    return (
      <>
        <h1 className="text-center" style={{ margin: "30px 0",marginTop: "90px",color: "white"}}>
          NewsTracker - Top {capitalizeFirstLetter(props.category)}{" "}
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