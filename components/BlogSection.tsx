import { cache } from 'react';
import { collection, query, where, getDocs, limit, orderBy, DocumentData } from 'firebase/firestore';
import Link from 'next/link';
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { CalendarIcon, ClockIcon } from '@radix-ui/react-icons';
import { db } from '@/firebase';

interface Post {
  id: string;
  title: string;
  desc: string;
  createdAt: string;
  readtime: string;
}

// Fetching posts from Firestore
const fetchPosts = cache(async (): Promise<Post[]> => {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(
      postsRef,
      where('authorId', '==', 'omrawat23@gmail.com'),
      orderBy('createdAt', 'desc'),
      limit(3)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData;
      return {
        id: doc.id,
        title: data.title || 'Untitled',
        desc: data.desc || 'No description available.',
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toLocaleString()
          : 'Unknown date',
        readtime: data.readtime ? `${data.readtime} min read` : '4 min read',
      };
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
});

// Utility function to create a slug from a title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .trim(); // Remove trailing spaces
}

// LatestBlogSection Component
export default async function LatestBlogSection() {
  const posts = await fetchPosts();

  if (posts.length === 0) {
    return <p className="text-white">No posts found</p>;
  }

  return (
    <div className="text-white">
      <h2 className="text-md sm:text-lg font-bold mb-4">Latest blog 📝</h2>
      <ul className="space-y-4">
        {posts.map((post) => {
          const slug = createSlug(post.title);

          return (
            <li key={post.id}>
              <Link href={`/blog/${slug}`} prefetch={true} className="block">
                <div className="lowercase border border-gray-400/15 rounded-md p-3 hover:shadow-lg transition">
                  <div className="space-y-3">
                    <h3 className="text-sm lowercase font-semibold">{post.title}</h3>
                    <p className="text-xs text-muted-foreground lowercase">{post.desc}</p>
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
            </li>
          );
        })}
      </ul>
      {posts.length === 3 && (
        <div className="max-w-3xl mx-auto">
          <div className="mt-12 flex justify-center items-center">
            <Link href="/blogs" prefetch={true}>
            <button
            className="text-sm flex items-center -ml-6 px-2 py-1 rounded-md hover:bg-gray-900 transition duration-200 ease-in-out">
                <ChevronLeftIcon width={13} height={13} />
                 See all posts
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

