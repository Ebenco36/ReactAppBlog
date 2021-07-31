import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [count, setCount] = useState("");
  const [content, setContent] = useState("");
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setCount(response.data.count);
        setContent(response.data.results);
        setNext(response.data.next);
        setPrevious(response.data.previous);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">Total Blog Post: {count}</h1>
          </div>
        </div>
        <div className="row pt-5">
          {/* <div className="col-12 col-lg-6 offset-lg-3">
            {content.map((article) => {
              return (
                <div className="card my-3">
                  <div className="card-header">
                    {article.title}
                  </div>
                  <div className="card-body">
                    {article.content}
                  </div>
                  <div className="card-footer">
                    <i>{article.user}
                      <p className="float-right">
                        {new Date(article.publish).toLocaleDateString()}
                      </p>
                    </i>
                  </div>
                </div>
              )
            })} */}
          {/* </div> */}
        </div>
      </div>
  );
};

export default Home;
