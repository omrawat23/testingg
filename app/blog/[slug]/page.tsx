import React from "react";
import { collection, getDocs,query,where,doc } from "firebase/firestore";
import { db } from "@/firebase";
import "@/app/prosemirror.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Eye } from 'lucide-react';
import { BlogPost } from "@/types/types";
import Image from "next/image";
import incrementViewCount from "@/components/ViewCount";
import { marked } from "marked";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PROFILE } from '@/constants';
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string }
}

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const slug = params.slug;

//   const docRef = doc(db, "posts", slug);
//   const docSnap = await getDoc(docRef);
//   const post = docSnap.exists() ? docSnap.data() as BlogPost : null;

//   const previousImages = (await parent).openGraph?.images || []

//   return {
//     title: post?.title ? `${post.title} | ${PROFILE.name} Blog` : `${PROFILE.name} Blog`,
//     description: post?.desc || `Read the latest articles on ${PROFILE.name}'s blog.`,
//     authors: [{ name: PROFILE.name }],
//     openGraph: {
//       title: post?.title || `${PROFILE.name} Blog`,
//       description: post?.desc || `Explore the latest insights from ${PROFILE.name}.`,
//       type: "article",
//       publishedTime: post?.createdAt?.toDate().toISOString(),
//       authors: [PROFILE.name],
//       images: post?.imageUrl ? [post.imageUrl, ...previousImages] : previousImages,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: post?.title || `${PROFILE.name} Blog`,
//       description: post?.desc || `Discover the latest content from ${PROFILE.name}.`,
//       images: post?.imageUrl ? [post.imageUrl] : [],
//     },
//   }
// }

export default async function BlogPosts({ params }: Props) {
  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("slug", "==", params.slug));
    
    // Execute the query
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return (
        <div className="max-w-3xl mx-auto mt-8 p-4">
          <p className="text-center text-red-500">No such post found!</p>
        </div>
      );
    }

    // Get the first matching document
    const docSnap = querySnapshot.docs[0];
    const postId = docSnap.id; // This is the actual document ID
    const post = docSnap.data() as BlogPost;

    const htmlContent = marked(post.content);

    // Increment the view count using the correct document ID
    incrementViewCount(postId);

    return (
      <>
        <div className="max-w-3xl mx-auto">
          <div className="mt-8 flex justify-start">
            <Link href="/">
              <Button aria-label="Back to home page">Back</Button>
            </Link>
          </div>
        </div>

        <article className="max-w-3xl mx-auto mt-8 p-4">
          <header>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{post.desc}</p>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <time dateTime={post.createdAt.toDate().toISOString()} className="text-sm text-muted-foreground">
                  {post.createdAt.toDate().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground">6 min read</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground">{post.views} views</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={post.authorImage} alt={post.authorName} />
                  <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{post.authorName}</p>
              </div>
            </div>
          </header>

          {post.imageUrl && (
            <figure>
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={1200}
                height={630}
                className="w-full h-auto rounded-lg shadow-md mb-8"
                priority
              />
              <figcaption className="sr-only">{post.title}</figcaption>
            </figure>
          )}

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <footer className="mt-12 flex justify-center items-center">
            <Link href="/blogs">
              <Button aria-label="See all blog posts">See all posts</Button>
            </Link>
          </footer>
        </article>
      </>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return (
      <div className="max-w-3xl mx-auto mt-8 p-4">
        <p className="text-center text-red-500">Error loading post</p>
      </div>
    );
  }
}

