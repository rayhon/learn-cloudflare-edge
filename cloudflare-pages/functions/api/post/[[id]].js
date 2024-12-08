export const onRequestGet = async (context) => {
    const id = context.params.id;
    if (!id) {
        return Response.json({ error: 'No id provided' }, { status: 400 });
    }

    try {
        const postsJson = await context.env.QA_POSTS.get('post_data');
        if (!postsJson) {
            return Response.json({ error: 'No posts found' }, { status: 404 });
        }

        const posts = JSON.parse(postsJson);
        const post = posts.find(post => post.id === Number(id));
        
        if (!post) {
            return Response.json({ error: 'Post not found' }, { status: 404 });
        }
        
        return Response.json(post);
    } catch (error) {
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
};

export const onRequestOptions = async () => {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
};
