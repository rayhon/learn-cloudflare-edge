'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Post = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await fetch(`/api/post/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error('Error fetching post:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getPost();
    }, [id]);

    if (loading) {
        return (
            <div className="post-detail">
                <h1>Loading post...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="post-detail">
                <h1>Error</h1>
                <p>{error}</p>
                <Link href="/" className="back-link">
                    ← Back to posts
                </Link>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="post-detail">
                <h1>Post not found</h1>
                <p>The post you're looking for doesn't exist.</p>
                <Link href="/" className="back-link">
                    ← Back to posts
                </Link>
            </div>
        );
    }

    return (
        <div className="post-detail">
            <article>
                <h1>{post.title}</h1>
                <div className="post-content">
                    <p className="published-text">
                        Published on {new Date(post.published_at).toLocaleDateString()}
                    </p>
                    <p className="post-text">{post.text}</p>
                </div>
                <Link href="/" className="back-link">
                    ← Back to posts
                </Link>
            </article>
        </div>
    );
};

export default Post;