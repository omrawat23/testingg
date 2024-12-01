import { Timestamp } from "firebase/firestore";

export type BlogPost = {
    slug: any;
    readtime: ReactNode
    id: string
    title: string
    desc: string
    content: string
    createdAt: Timestamp
    imageUrl: string
    authorId: string
    authorName: string
    authorPhotoURL?: string
    tags?: string[]
    views?: number
    readTime: number
    authorImage: string
    
  }
  

