import { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    // Get the KV namespace from Cloudflare context
    const ctx = getRequestContext()
    const postKV = ctx.env.QA_POSTS

    // Add more detailed logging
    console.log('KV Namespace:', postKV)
    
    const posts = await postKV.get("post_data", { type: "json" })
    console.log('Retrieved posts:', posts)
    
    if (!posts) {
      return Response.json({ error: 'No posts found' }, { status: 404 })
    }

    return Response.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    // Type cast error to Error type or handle it more safely
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return Response.json({ error: 'Internal server error', details: errorMessage }, { status: 500 })
  }
}