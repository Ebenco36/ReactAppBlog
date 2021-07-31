

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postComment } from "../../actions/post";
import postServices from "../../services/post.services";
import EventBus from "../../common/EventBus";
import Form from "react-validation/build/form";
import TextareaAutosize from 'react-textarea-autosize';

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

const PostComment = (props) => {

    const form = useRef();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [new_comment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    // const { message } = useSelector(state => state.message);


    const onChangeComment = (e) => {
        const new_comment = e.target.value;
        setNewComment(new_comment);
    };


    useEffect(() => {
        postServices.post(props.match.params.slug).then(
            (response) => {
                console.log(response)
                setComment(response.html);
                setComments(response.comments ? response.comments : []);
            },
            (error) => {
            const _content =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
    
                setComment(_content);
    
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
            }
        );
    }, []);

    const handlePostComment = (e) => {
        e.preventDefault();
        setLoading(true);
        form.current.validateAll();
        let comment = {
            comment: new_comment,
        }
        dispatch(postComment(comment, props.match.params.slug, 'post'))
        .then((res) => {
            console.log(res)
            window.location.reload();
        })
        .catch(() => {
                setLoading(false);
        });
    };
    const dispatch = useDispatch();

    return (

            <div class="d-flex align-items-center justify-content-center vh-10">
                <div class="container">
                    
                    <div class="row justify-content-center mb-4">
                        <div class="col-lg-8">

                            <img src="https://www.w3schools.com/bootstrap/cinqueterre.jpg" class="img-responsive" alt="Cinque Terre" width="100%" height="400"/>

                            <div class="comment-body mt-4" dangerouslySetInnerHTML={{
                                __html: comment
                            }}>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center mb-4">
                        <div class="col-lg-8">
                            <h5> {comments.length} Comment{comments.length > 1 ? 's' : ''} </h5>
                        </div>
                    </div>
                    <div class="row justify-content-center mb-4">
                        <div class="col-lg-8">
                            { comments.map((post) => (
                            <div class="comments" key={post.id}>
                                <div class="comment d-flex mb-4">
                                    <div class="flex-shrink-0">
                                        <div class="avatar avatar-sm rounded-circle">
                                            <img class="avatar-img" src="https://uifaces.co/our-content/donated/AW-rdWlG.jpg" alt=""/>
                                        </div>
                                    </div>
                                    <div class="flex-grow-1 ms-2 ms-sm-3">
                                        <div class="comment-meta d-flex align-items-baseline">
                                            <h6 class="me-2">{post.user.email}</h6>
                                            <span class="text-muted">2d</span>
                                        </div>
                                        <div class="comment-body" dangerouslySetInnerHTML={{
                                            __html: post.content
                                        }}>
                                        </div>
                                    </div>
            
                                </div>
                            </div>

                            ))}
                            <div class="col-lg-8">
                                <div class="comment-form d-flex align-items-center">
                                    <div class="flex-shrink-0">
                                        <div class="avatar avatar-sm rounded-circle">
                                        <img class="avatar-img" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200" alt=""/>
                                        </div>
                                    </div>
                                    <div class="col-md-12 flex-grow-1 ms-2 ms-sm-3">
                                        <small class="textout">{new_comment}</small>
                                        <Form onSubmit={handlePostComment} ref={form}>
                                            
                                            <TextareaAutosize
                                                className="form-control py-0 px-1 border-0 myTextarea"
                                                rows="3" placeholder="Start writing..."
                                                name="new_comment"
                                                maxRows="10"
                                                onChange={onChangeComment}
                                                validations={[required]}
                                            />

                                            <div className="form-group">
                                                <button className="badge badge-primary" disabled={loading}>
                                                {loading && (
                                                    <span className="spinner-border spinner-border-sm"></span>
                                                )}
                                                <span>Post</span>
                                                </button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

export default PostComment;
