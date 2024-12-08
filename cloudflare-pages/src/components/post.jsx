'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Post = () => {
    const [post, setPost] = useState({});
    const params = useParams();
    const id = params.id;

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await fetch(`/api/post/${id}`);
                const postResponse = await response.json();
                setPost(postResponse);
            } finally {
                setIsLoading(false);
            }
        };
        getPost();
    }, [id]);

    if(isLoading) return <div>Loading...</div>;
    if(!Object.keys(post).length) return <div>No post found</div>;
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
            <Link href="/" className="back-link">
                Go back
            </Link>
        </div>
    );
}

export default Post;