import posts from './data';

export const onRequestGet = async (context) => {
    const id = context.params.id;
    if (!id) {
        return Response.json({ error: 'No id provided' }, { status: 44 });
    }
    const post = posts.find(post => post.id === Number(id));
    if (!post) {
        return Response.json({ error: 'Post not found' }, { status: 404 });
    }
    return Response.json(post);
}
