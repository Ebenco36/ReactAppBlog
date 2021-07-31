

import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';

import { postBlog } from "../../actions/post";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const PostBlog = (props) => {
  const form = useRef();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publish, setPublish] = useState("");
  const [loading, setLoading] = useState(false);

  // const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  
  const dispatch = useDispatch();

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const onChangeContent = (e) => {
    const content = e.target.value;
    setContent(content);
  };

  const onChangePublish = (e) => {
    const publish = e.target.value;
    setPublish(publish);
  };

  const handlePost = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();
    let postObj = {
        title: title, 
        content: content,
        publish: publish
    }
    dispatch(postBlog(postObj)).then((res) => {
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
          <div className="col-md-12">
      <div className="card card-container">
        

        <Form onSubmit={handlePost} ref={form}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Input
              type="text"
              className="form-control"
              name="title"
              value={title}
              onChange={onChangeTitle}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="publish">Publish</label>
            <Input
              type="date"
              className="form-control"
              name="publish"
              value={publish}
              onChange={onChangePublish}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Body</label>
            <Textarea
                className="form-control"
                name="content"
                value={content}
                onChange={onChangeContent}
                validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Post</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
      
    </div>
  );
};

export default PostBlog;
