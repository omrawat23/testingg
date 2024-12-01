'use client'

import { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import Link from 'next/link'
import { Button } from './ui/button'

interface Post {
  id: string
  title: string
  desc: string
  createdAt: string
}

let LATEST_BLOG: {
  title: string
  description: string
  date: string
  slug: string
} | null = null

export default function LatestBlogSection() {
  const [posts, setPosts] = useState<Post[]>([])
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postsRef = collection(db, 'posts')
        const q = query(postsRef, where('authorId', '==', 'omrawat23@gmail.com'))
        const querySnapshot = await getDocs(q)

        const postData = querySnapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            title: data.title,
            desc: data.desc,
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate().toLocaleString()
              : 'Unknown date',
          }
        })

        // Sort posts by createdAt (assuming it's a valid date string)
        const sortedPosts = postData.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )

        setPosts(sortedPosts)
        setVisiblePosts(sortedPosts.slice(0, 3))

        // Set LATEST_BLOG with the most recent post
        if (sortedPosts.length > 0) {
          const latestPost = sortedPosts[0]
          LATEST_BLOG = {
            title: latestPost.title,
            description: latestPost.desc,
            date: latestPost.createdAt,
            slug: latestPost.id,
          }
        }
      } catch (err) {
        setError('Failed to fetch posts')
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleSeeAllPosts = () => {
    setVisiblePosts(posts)
  }

  if (loading) {
    return <div>Loading posts...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="p-4">
      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-4">Latest blog 📝</h2>
          <ul className="space-y-4">
            {visiblePosts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.id}`} className="block">
                  <article className="p-4 border border-gray-800 rounded-lg">
                    <h3 className="font-medium">{post.title}</h3>
                    <p className="text-gray-400 text-sm">{post.desc}</p>
                    <time className="text-sm text-gray-500">{post.createdAt}</time>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
          {posts.length > visiblePosts.length && (
            <div className="max-w-3xl mx-auto">
              <div className="mt-12 flex justify-center items-center">
                <Button onClick={handleSeeAllPosts}>See all posts</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { LATEST_BLOG }
