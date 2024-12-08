'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await fetch('/api/posts');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const postsResponse = await response.json();
                setPosts(postsResponse);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getPosts();
    }, []);

    if (loading) {
        return (
            <div className="posts-container">
                <h1>Loading posts...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="posts-container">
                <h1>Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    const truncateText = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="posts-container">
            <h1>Blog Posts</h1>
            <div className="grid gap-8">
                {posts.map(post => (
                    <div key={post.id} className="post-card">
                        <h2 className="post-title">
                            <Link href={`/post/${post.id}`} className="post-link">
                                {post.title}
                            </Link>
                        </h2>
                        <p>{truncateText(post.text)}</p>
                        <div className="post-meta">
                            Published on {formatDate(post.published_at)}
                        </div>
                        <div className="read-more">
                            <Link href={`/post/${post.id}`} className="read-more-link">
                                Read more →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;