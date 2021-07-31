

  import React, { useState, useRef, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";

  import Form from "react-validation/build/form";
  import Input from 'react-validation/build/input';
  import Textarea from 'react-validation/build/textarea';
  import EventBus from "../../common/EventBus";
  import postServices from "../../services/post.services";
  import { postUpdate } from "../../actions/post";
  import { Redirect } from 'react-router-dom';
  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const EditPost = (props) => {
    const form = useRef();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [publish, setPublish] = useState("");
    const [loading, setLoading] = useState(false);

    // const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    
    useEffect(() => {
      postServices.post(props.match.params.slug).then(
          (response) => {
              console.log(response)
            setTitle(response.title);
            setPublish(response.publish);
            setContent(response.content);
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

    const handlePostEdit = (e) => {
      e.preventDefault();

      setLoading(true);

      form.current.validateAll();
      let postObj = {
          title: title, 
          content: content,
          publish: publish
      }
      dispatch(postUpdate(postObj, props.match.params.slug)).then((res) => {
              console.log(res)
          //   props.history.push("/profile");
      })
      .catch(() => {
          setLoading(false);
      });
    };

    return (
      <div className="container">
            <div className="col-md-12">
        <div className="card card-container">
          

          <Form onSubmit={handlePostEdit} ref={form}>
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

  export default EditPost;
