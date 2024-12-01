import { Metadata } from "next"

export const siteMetadata: Metadata = {
  title: "Om Rawat  | Full Stack Engineer",
  description: "Om Rawat is a Full Stack Engineer specializing in web development, React, and Next.js. Explore projects, services, and latest blog posts.",
  icons: [
    {
      url: "/omi.png",
      href: "/omi.png",
    },
  ],
  keywords: ["Full Stack Engineer", "YouTuber", "Web Development", "React", "Next.js"],
  authors: [{ name: "Om Rawat" }],
  openGraph: {
    title: "Om Rawat | Full Stack Engineer",
    description: "Explore the portfolio of Om Rawat, a Full Stack Engineer specializing in web development.",
    url: "https://www.omrawat.xyz",
    siteName: "Om Rawat Portfolio",
    images: [
      {
        url: "https://www.omrawat.xyz/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Rawat | Full Stack Engineer",
    description: "Explore the portfolio of Om Rawat, a Full Stack Engineer specializing in web development.",
    images: ["https://www.omrawat.xyz/twitter-image.jpg"],
    creator: "@omraw29",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

