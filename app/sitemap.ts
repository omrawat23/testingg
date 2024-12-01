import { MetadataRoute } from 'next'
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { PROJECTS } from '@/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://omrawat.xyz'

  // Get all blog posts
  const postsRef = collection(db, 'posts')
  const postsSnapshot = await getDocs(postsRef)
  const blogPosts = postsSnapshot.docs.map(doc => {
    const data = doc.data()
    return {
      url: `${baseUrl}/blog/${data.slug}`,
      lastModified: new Date(data.createdAt.toDate()),
    }
  })

  // Create sitemap entries for static pages
  const routes = ['', '/projects', '/blogs'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))

  // Add project pages
  const projectPages = PROJECTS.map(project => ({
    url: `${baseUrl}/projects/${createSlug(project.name)}`,
    lastModified: new Date(),
  }))

  return [...routes, ...projectPages, ...blogPosts]
}

function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

