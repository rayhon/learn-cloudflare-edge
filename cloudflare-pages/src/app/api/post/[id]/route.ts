import { NextRequest } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

interface Post {
  id: number;
  title: string;
  text: string;
  published_at: string;
}

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return Response.json({ error: 'No id provided' }, { status: 400 });
  }

  try {
    const ctx = getRequestContext();
    const postKV = ctx.env.QA_POSTS;

    const postsJson = await postKV.get('post_data', { type: "json" }) as Post[];
    if (!postsJson) {
      return Response.json({ error: 'No posts found' }, { status: 404 });
    }

    const post = postsJson.find((post: Post) => post.id === Number(id));
    
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return Response.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return Response.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}
