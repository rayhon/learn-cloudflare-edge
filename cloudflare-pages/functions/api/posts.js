export const onRequestGet = async (context) => {
    try {
        // Log environment info
        const envInfo = {
            bindings: Object.keys(context.env),
            hasTestPosts: !!context.env.TEST_QA_POSTS_DEV,
            testPostsType: typeof context.env.TEST_QA_POSTS_DEV,
            testPostsMethods: Object.keys(context.env.TEST_QA_POSTS_DEV || {}),
            environment: context.env.ENVIRONMENT || 'unknown',
            isPreview: context.env.CF_PAGES_BRANCH !== 'main',
            branch: context.env.CF_PAGES_BRANCH || 'unknown'
        };
        console.log('Environment:', JSON.stringify(envInfo, null, 2));

        // Try to list all keys first
        console.log('Attempting to list keys...');
        try {
            const keys = await context.env.TEST_QA_POSTS_DEV.list();
            console.log('Keys operation successful:', keys);
            console.log('Available keys:', JSON.stringify(keys.keys.map(k => k.name), null, 2));
        } catch (listError) {
            console.error('Error listing keys:', listError);
        }

        // Try to get the data
        console.log('Attempting to get post_data...');
        try {
            const rawData = await context.env.TEST_QA_POSTS_DEV.get('post_data');
            console.log('Raw data received:', rawData);
            const data = rawData ? JSON.parse(rawData) : null;
            console.log('Parsed data:', JSON.stringify(data, null, 2));

            if (!data) {
                return Response.json({
                    error: 'No posts found',
                    debug: envInfo
                }, { status: 404 });
            }

            return Response.json(data);
        } catch (getError) {
            console.error('Error getting data:', getError);
            throw getError;
        }
    } catch (error) {
        console.error('Error:', error);
        return Response.json({
            error: error.message,
            stack: error.stack,
            debug: {
                bindings: Object.keys(context.env),
                hasTestPosts: !!context.env.TEST_QA_POSTS_DEV,
                testPostsType: typeof context.env.TEST_QA_POSTS_DEV,
                testPostsMethods: Object.keys(context.env.TEST_QA_POSTS_DEV || {})
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

        console.log('Attempting to write posts:', posts);
        // Write the posts to KV
        try {
            await context.env.TEST_QA_POSTS_DEV.put('post_data', JSON.stringify(posts));
            console.log('Write successful');
        } catch (putError) {
            console.error('Error writing data:', putError);
            throw putError;
        }

        // Verify the write by reading back
        console.log('Verifying write...');
        try {
            const verifyData = await context.env.TEST_QA_POSTS_DEV.get('post_data', { type: 'json' });
            console.log('Verification data:', verifyData);
            if (!verifyData) {
                throw new Error('Failed to verify data write');
            }

            return Response.json({
                message: 'Posts updated successfully',
                data: verifyData
            });
        } catch (verifyError) {
            console.error('Error verifying write:', verifyError);
            throw verifyError;
        }
    } catch (error) {
        console.error('Top level error in POST:', error);
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
