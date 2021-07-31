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


    return (
      <div className="container">
          <div className="row pt-5">
            <div className="col-12 col-lg-6 offset-lg-3">
              <h1 className="text-center">Total Blog Post: {count}</h1>
            </div>
          </div>
          <div className="row pt-5">
          <div > 
          {content.map((post) => (
            <div class="blog-container" key={post.id} className={`post_`+post.id}>
    
                  <div class="blog-header">
                  <div class="blog-cover">
                      <div class="blog-author">
                      <h3>{post.title}</h3>
                      </div>
                  </div>
                  </div>
              
                  <div class="blog-body">
                  <div class="blog-title">
                      <h1>
                      <Link
                          to={"/postDetails/" + post.slug}
                      >
                          {post.title}
                      </Link>
                      </h1>
                  </div>
                  <div class="blog-summary">
                      <p>
                      {post.content}    
                      </p>
                  </div>
                  <div class="blog-tags">
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
                  
                  <div class="blog-footer">
                  <ul>
                      <li class="published-date">2 days ago</li>
                      <li class="comments"><a href="#"><span class="numero">4</span></a></li>
                      <li class="shares"><a href="#"><span class="numero">1</span></a></li>
                  </ul>
                  </div>
                  <Link
                      to={"/postEdit/" + post.slug}
                      className="badge badge-warning"
                  >
                  Edit
                </Link>

                <button class="badge badge-warning" onClick={handleDetetePost(post.slug)}
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
