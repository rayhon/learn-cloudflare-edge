import getPostsData from './post/data';

export const onRequestGet = async () => {
    console.log('API called: /api/posts at', new Date().toISOString());
    const posts = getPostsData();
    console.log('Posts data:', posts);
    return Response.json(posts);
};
