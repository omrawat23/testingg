import { cache } from 'react'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/firebase';
import MaxWidthWrapper from "@/components/MaxWidth"
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons"
import Link from 'next/link'
import BackButton from './BackButton'

interface Post {
  id: string
  title: string
  description: string
  createdAt: string
  readtime: string
}

const getPosts = cache(async (): Promise<Post[]> => {
  const postsRef = collection(db, 'posts')
  const q = query(
    postsRef, 
    where('authorId', '==', 'omrawat23@gmail.com'),
    orderBy('createdAt', 'desc')
  )
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      title: data.title,
      description: data.description || data.desc,
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString().split('T')[0]
        : 'Unknown date',
      readtime: data.readtime ? `${data.readtime} min read` : '4 min read',
    }
  })
})

const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

export const revalidate = 120; 

export default async function BlogsPage() {
  const posts = await getPosts()

  return (
    <MaxWidthWrapper maxWidth="sm">
      <div className="my-32 sm:my-52">
        <BackButton />
        <div className="mt-6">
          <h1 className="text-muted-foreground text-sm lowercase">
            I occasionally write technical articles to share details about what
            I&apos;ve implemented and how I&apos;ve done it.
          </h1>

          <hr className="my-6" />

          {posts.length === 0 ? (
            <p className="text-muted-foreground">No blog posts found.</p>
          ) : (
            posts.map((post) => (
              <Link
                prefetch={true}
                key={post.id}
                href={`/blog/${createSlug(post.title)}`}
                className="block mb-3"
              >
                <div className="lowercase border border-gray-400/15 rounded-md p-3">
                  <div className="space-y-3">
                    <h1 className="text-sm lowercase">{post.title}</h1>
                    <p className="text-xs text-muted-foreground lowercase">
                      {post.description}
                    </p>
                  </div>
                  <div className="mt-3 text-muted-foreground flex gap-6 items-center">
                    <p className="text-[0.70em] rounded-md w-fit flex items-center gap-1.5">
                      <CalendarIcon width={13} height={13} />
                      {post.createdAt}
                    </p>
                    <p className="text-[0.70em] rounded-md w-fit flex items-center gap-1.5">
                      <ClockIcon width={13} height={13} />
                      {post.readtime}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  )
}