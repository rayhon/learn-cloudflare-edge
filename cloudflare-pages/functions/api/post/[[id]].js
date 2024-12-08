import getPostsData from './data';

export const onRequestGet = async (context) => {
    const id = context.params.id;
    if (!id) {
        return Response.json({ error: 'No id provided' }, { status: 400 });
    }
    const posts = getPostsData();
    const post = posts.find(post => post.id === Number(id));
    if (!post) {
        return Response.json({ error: 'Post not found' }, { status: 404 });
    }
    return Response.json(post);
};
