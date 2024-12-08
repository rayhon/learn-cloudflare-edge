'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch('/api/posts');
            const postsResponse = await response.json();
            setPosts(postsResponse);
        };
        getPosts();
    }, []);

    return (
        <div className="posts-container">
            <h1>Posts</h1>
            {posts.map(post => (
                <div key={post.id} className="post-card">
                    <h2 className="post-title">
                        <Link href={`/post/${post.id}`} className="post-link">
                            {post.title}
                        </Link>
                    </h2>
                    <p>{post.text.substring(0, 100)}...</p>
                </div>
            ))}
        </div>
    );
}

export default Posts;