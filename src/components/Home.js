      import React, { useState, useEffect } from "react";
      import { useDispatch } from "react-redux";
      import UserService from "../services/user.service";
      import { Link } from "react-router-dom";
      import { deletePost } from "../actions/post";



      const Home = () => {
        const [count, setCount] = useState("");
        const [content, setContent] = useState([]);
        const [loading, setLoading] = useState(false);
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

        const dispatch = useDispatch();

        const handleDetetePost = (slug) => (e) => {
          e.preventDefault();

          setLoading(true);

          dispatch(deletePost(slug)).then((res) => {
                  console.log(res)
              //   props.history.push("/profile");
              //   window.location.reload();
          })
          .catch(() => {
              setLoading(false);
          });
        };

        const dateConvert = (date) =>{
          let d = new Date(date);
          return d;
        } 

        return (
          <div className="ms">
              <div className="row ">
                <div className="col-12 ">
                  <h1 className="text-center">Total Blog Post: {count}</h1>
                </div>
              </div>
              <div >
              <div > 
              {content.map((post) => (
                  <div className="blog-container" key={post.id} >
                    <div className="blog-header">
                      <div className="blog-cover">
                          <div className="blog-author">
                          <h3>{post.title}</h3>
                          </div>
                      </div>
                      </div>
                  
                      <div className="blog-body">
                      <div className="blog-title">
                          <h1>
                          <Link
                              to={"/postDetails/" + post.slug}
                          >
                              {post.title}
                          </Link>
                          </h1>
                      </div>
                      <div className="blog-summary">
                          <p>
                          {post.content}    
                          </p>
                      </div>
                      <div className="blog-tags">
                          <ul>
                            <li>
                              <Link
                                  to={"/postDetails/" + post.slug}
                              >
                              {post.slug}

                              </Link>
                            
                            </li>
                          </ul>
                      </div>
                      </div>
                      
                      <div className="blog-footer">
                      <ul>
                          <li className="published-date">{dateConvert(post.publish).toDateString()}</li>
                          <li className="comments"><a href="#"><span className="numero">4</span></a></li>
                          <li className="shares"><a href="#"><span className="numero">1</span></a></li>
                      </ul>
                      </div>
                      <Link
                          to={"/postEdit/" + post.slug}
                          className="badge badge-warning"
                      >
                      Edit
                    </Link>

                    <button className="badge badge-warning" onClick={handleDetetePost(post.slug)}
                      >
                      Delete
                    </button>
                  </div>
              ))}
              </div>
              </div>
            </div>
        );
      };

      export default Home;
