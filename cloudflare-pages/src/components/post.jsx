import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Post = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const getPost = async () => {
            const response = await fetch(`/api/post/${id}`);
            const postResponse = await response.json();
            setPost(postResponse);
        };
        getPost();
    }, [id]);

    if(!Object.keys(post).length) return <div/>;
    return (
        <div className="post-detail">
            <h1>{post.title}</h1>
            <div className="post-content">
                <div className="published-text">
                    Published on {post.published_at}
                </div>
                <div className="post-text">
                    {post.text}
                </div>
            </div>
            <Link to="/" className="back-link">
                Go back
            </Link>
        </div>
    );
}

export default Post;