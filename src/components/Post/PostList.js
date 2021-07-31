

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deletePost } from "../../actions/post";
import postServices from "../../services/post.services";
import EventBus from "../../common/EventBus";
import { Link } from "react-router-dom";

const PostList = (props) => {
  const form = useRef();

  useEffect(() => {
    postServices.posts().then(
        (response) => {
            console.log(response)
          setContent(response);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
  
          setContent(_content);
  
          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
      );
  }, []);

  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

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


  return (<div > 
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
                    <li><a href="#">{post.slug}</a></li>
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
    );
};

export default PostList;
