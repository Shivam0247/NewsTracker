import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import ArticleState from "./ArticleContext/ArticleState";
import CategoryState from "./CategoryContext/CategoryState";
import ArticleCategoryState from "./ArticleCategory/ArticleCategoryState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserState from "./UserContext/UserState";
import FavNews from "./components/FavNews";
import FavNewsState from "./FavNewsContext/FavNewsState";
const App = () => {
  const pageSize = 30;
  const apikey = "df5a4b80cf5b4d1395a5093a37c8e5ca";

  const [progress, setProgress] = useState(0);

  return (
    <BrowserRouter>
      <UserState>
        <ArticleState>
          <CategoryState>
            <ArticleCategoryState>
              <FavNewsState>
              <div>
                <Navbar />
                <LoadingBar color="#f11946" progress={progress} height={3} />
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <News
                        setProgress={setProgress}
                        key="home"
                        pagesize={pageSize}
                        apikey={apikey}
                        country={"in"}
                        category={"General"}
                        Badge={"danger"}
                      />
                    }
                  ></Route>

                  <Route
                    exact
                    path="/Business"
                    element={
                      <News
                        setProgress={setProgress}
                        key="Business"
                        pagesize={pageSize}
                        apikey={apikey}
                        country={"in"}
                        category={"Business"}
                        Badge={"danger"}
                      />
                    }
                  ></Route>
                  <Route
                    exact
                    path="/Entertainment"
                    element={
                      <News
                        setProgress={setProgress}
                        key="Entertainment"
                        pagesize={pageSize}
                        apikey={apikey}
                        country={"in"}
                        category={"Entertainment"}
                        Badge={"danger"}
                      />
                    }
                  ></Route>
                  <Route
                    exact
                    path="/General"
                    element={
                      <News
                        setProgress={setProgress}
                        key="General"
                        pagesize={pageSize}
                        apikey={apikey}
                        country={"in"}
                        category={"General"}
                        Badge={"danger"}
                      />
                    }
                  ></Route>
                  <Route
                    exact
                    path="/Health"
                    element={
                      <News
                        setProgress={setProgress}
                        key="Health"
                        pagesize={pageSize}
                        apikey={apikey}
                        country={"in"}
                        category={"Health"}
                        Badge={"danger"}
                      />
                    }
                  ></Route>
                  <Route
                    exact
                    path="/Science"
                    element={
                      <News
                        setProgress={setProgress}
                        key="Science"
                        pagesize={pageSize}
                        apikey={apikey}
                        country={"in"}
                        category={"Science"}
                        Badge={"danger"}
                      />
                    }
                  ></Route>
                  <Route
                    exact
                    path="/Sports"
                    element={
                      <News
                        setProgress={setProgress}
                        key="Sports"
                        pagesize={pageSize}
                        apikey={apikey}
                        country={"in"}
                        category={"Sports"}
                        Badge={"danger"}
                      />
                    }
                  ></Route>
                  <Route
                    exact
                    path="/Technology"
                    element={
                      <News
                        setProgress={setProgress}
                        key="Technology"
                        pagesize={pageSize}
                        apikey={apikey}
                        country={"in"}
                        category={"Technology"}
                        Badge={"danger"}
                      />
                    }
                  ></Route>
                  <Route exact path="/FavNews" element={<FavNews />}></Route>

                  <Route exact path="/login" element={<Login />}></Route>

                  <Route exact path="/signup" element={<Signup />}></Route>
                </Routes>
              </div>
              </FavNewsState>
            </ArticleCategoryState>
          </CategoryState>
        </ArticleState>
      </UserState>
    </BrowserRouter>
  );
};

export default App;
