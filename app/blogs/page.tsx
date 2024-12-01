'use client'

import { useEffect, useState } from 'react';
import MaxWidthWrapper from "@/components/MaxWidth";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ClockIcon,
} from "@radix-ui/react-icons";
import { Link } from "next-view-transitions";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  readtime: string;
}

const BlogsPage = () => {
    const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, where('authorId', '==', 'omrawat23@gmail.com'));
        const querySnapshot = await getDocs(q);

        const postData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            description: data.description || data.desc,
            createdAt: data.createdAt?.toDate 
              ? data.createdAt.toDate().toISOString().split('T')[0] 
              : 'Unknown date',
            readtime: data.readtime ? `${data.readtime} min read` : '4 min read'
          };
        });
        

        // Sort posts by createdAt date
        const sortedPosts = postData.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setPosts(sortedPosts);
      } catch (err) {
        setError('Failed to fetch blog posts');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Create slug from title
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  if (loading) {
    return (
      <MaxWidthWrapper maxWidth="sm">
        <div className="my-32 sm:my-52">
          <p>Loading blog posts...</p>
        </div>
      </MaxWidthWrapper>
    );
  }

  if (error) {
    return (
      <MaxWidthWrapper maxWidth="sm">
        <div className="my-32 sm:my-52">
          <p className="text-red-500">{error}</p>
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper maxWidth="sm">
      <div className="my-32 sm:my-52">
        <button 
        onClick={() => router.back()} 
        className="text-xs flex items-center -ml-1">
          <ChevronLeftIcon width={13} height={13} />
          back
        </button>
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
  );
};

export default BlogsPage;