export const onRequestGet = async (context) => {
    try {
        // Log environment info
        const envInfo = {
            bindings: Object.keys(context.env),
            hasQAPosts: !!context.env.QA_POSTS,
            environment: context.env.ENVIRONMENT || 'unknown',
            isPreview: process.env.NODE_ENV !== 'production',
            isDev: process.env.NODE_ENV === 'development',
        };
        console.log('Environment:', envInfo);

        // Try to list all keys first
        const keys = await context.env.QA_POSTS.list();
        console.log('Available keys:', keys.keys.map(k => k.name));

        // Try to get the data
        const data = await context.env.QA_POSTS.get('post_data', { type: 'json' });
        console.log('Retrieved data:', data);

        if (!data) {
            return Response.json({
                error: 'No posts found',
                debug: {
                    ...envInfo,
                    availableKeys: keys.keys.map(k => k.name)
                }
            }, { status: 404 });
        }

        return Response.json(data);
    } catch (error) {
        console.error('Error:', error);
        return Response.json({
            error: error.message,
            stack: error.stack,
            debug: {
                bindings: Object.keys(context.env),
                hasQAPosts: !!context.env.QA_POSTS
            }
        }, { status: 500 });
    }
};

export const onRequestPost = async (context) => {
    try {
        // Get the posts data from the request body
        const posts = await context.request.json();
        
        // Validate the posts data
        if (!Array.isArray(posts)) {
            return Response.json({ error: 'Posts must be an array' }, { status: 400 });
        }

        // Write the posts to KV
        await context.env.QA_POSTS.put('post_data', JSON.stringify(posts));

        // Verify the write by reading back
        const verifyData = await context.env.QA_POSTS.get('post_data', { type: 'json' });
        if (!verifyData) {
            throw new Error('Failed to verify data write');
        }

        return Response.json({
            message: 'Posts updated successfully',
            data: verifyData
        });
    } catch (error) {
        console.error('Error:', error);
        return Response.json({
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
};

export const onRequestOptions = () => {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
};
