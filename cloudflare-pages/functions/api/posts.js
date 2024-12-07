import posts from './post/data';

export const onRequestGet = async () => {
    return Response.json(posts);
};
