import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Eye } from 'lucide-react';
import { BlogPost } from "@/types/types";
import Image from "next/image";
import incrementViewCount from "@/components/ViewCount";
import { marked } from "marked";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DOMPurify from 'isomorphic-dompurify';
import BlogContent from "./BlogContent";

type Props = {
  params: { slug: string }
}

export default async function BlogPosts({ params }: Props) {
  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("slug", "==", params.slug));
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return (
        <div className="max-w-3xl mx-auto mt-8 p-4">
          <p className="text-center text-red-500">No such post found!</p>
        </div>
      );
    }

    const docSnap = querySnapshot.docs[0];
    const postId = docSnap.id;
    const post = docSnap.data() as BlogPost;


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
                  <p className="text-sm text-muted-foreground">
                    {post.readtime ? `${post.readtime} min read` : '6 min read'}
                  </p>
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

          <BlogContent htmlContent={post.content} />

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

