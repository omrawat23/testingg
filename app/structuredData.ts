import { PROFILE, PROJECTS } from '@/constants'

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: PROFILE.title,
    url: "https://www.omrawat.xyz",
    sameAs: [
      // "https://youtube.com/omrawat",
      "https://github.com/omrawat23",
      "https://twitter.com/omraw29",
    ]
  }
}

// export function generateBlogPostSchema() {
//   return {
//     "@context": "https://schema.org",
//     "@type": "BlogPosting",
//     headline: LATEST_BLOG.title,
//     description: LATEST_BLOG.description,
//     datePublished: LATEST_BLOG.date,
//     author: {
//       "@type": "Person",
//       name: PROFILE.name
//     }
//   }
// }

export function generateProjectSchema() {
  return PROJECTS.map(project => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    author: {
      "@type": "Person",
      name: PROFILE.name
    }
  }))
}

