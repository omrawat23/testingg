import Image from "next/image"
import Link from "next/link"
import dynamic from 'next/dynamic'
import { Github, Mail, Twitter, Youtube,FileUser } from 'lucide-react'
import { PROFILE, SOCIAL_LINKS, CURRENT_PROJECTS, PROJECTS} from '@/constants'
import MaxWidthWrapper from '@/components/MaxWidth'
import Particles from "@/components/ui/particles"

// Dynamically import components that are not needed on initial load
const DynamicProjectsSection = dynamic(() => import('@/components/ProjectsSection'))
const DynamicLatestBlogSection = dynamic(() => import('@/components/BlogSection'))

const SocialIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'FileUser':
      return <FileUser className="w-4 h-4 sm:w-5 sm:h-5" />
    case 'Github':
      return <Github className="w-4 h-4 sm:w-5 sm:h-5" />
    case 'Twitter':
      return <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
    case 'Mail':
      return <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
    default:
      return null
  }
}

export default function Home() {

  return (
    <MaxWidthWrapper maxWidth="md">
      <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">

        <div className="max-w-4xl w-full space-y-6 sm:space-y-8">
          {/* Profile Section */}
          <section className="w-full p-4 sm:p-6 border border-gray-800 rounded-lg overflow-hidden relative">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center sm:items-start gap-4">
          <div className="relative group">
            {/* Breathing effect with blue glow */}
            <div className="absolute -inset-1 bg-blue-500/30 rounded-full animate-breathe-glow"></div>
            
            {/* Profile Image with breathing animation */}
            <Image
              src={PROFILE.image}
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full z-10 relative animate-breathe transition-all duration-900 ease-in-out"
              loading="eager"
              priority
            />
          </div>
          
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-xl font-bold">{PROFILE.name}</h1>
            <p className="text-sm lowercase text-gray-400">{PROFILE.title}</p>
          </div>
        </div>
        
        <div className="flex flex-row space-x-4">
          {SOCIAL_LINKS.map((link) => (
            <Link 
            key={link.name} 
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300 mt-4"
          >
            <SocialIcon name={link.icon} />
          </Link>
          ))}
        </div>
      </div>
      
      <div className="mt-4 space-y-2 text-sm text-gray-400 text-center sm:text-left">
        <p>
          I also write technical blogs sharing insights from my projects
          check them out <Link href="/blogs" className="underline hover:text-white">here</Link>.
        </p>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="rounded-full bg-green-400 h-[8px] w-[8px] animate-ping"></div>
            <div className="absolute top-0 left-0 rounded-full bg-green-400 h-[8px] w-[8px] opacity-75"></div>
          </div>
          
          <p className="text-xs lowercase text-muted-foreground">
            Actively seeking full-time front-end dev roles.
          </p>
        </div>
      </div>
    </section>

          {/* Currently Cooking Section */}
          <section className="space-y-4 overflow-hidden">
            <h2 className="text-md sm:text-lg font-bold text-white">experience 👨‍🍳</h2>
            <div className="space-y-4">
              {CURRENT_PROJECTS.map((project) => (
                <div 
                  key={project.name} 
                  className="bg- p-4 rounded-lg border border-gray-800 transition-all duration-300 hover:border-gray-600"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h1 className="text-sm lowercase">{project.role}</h1>
                      <p className="text-xs text-muted-foreground lowercase">
                        {project.name} • {project.location}
                      </p>
                    </div>
                    <span className="text-[0.70em] rounded-md w-fit flex items-center gap-1.5">{project.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground lowercase">{project.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Services Section */}
          {/* <section className="space-y-4">
            <h2 className="text-md sm:text-lg font-semibold">services 🛠️</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICES.map((service) => (
                <div key={service.title} className="p-4 border border-gray-800 rounded-lg">
                  <h3 className="text-base sm:text-md font-medium">{service.title}</h3>
                  <p className="text-sm text-gray-400">{service.description}</p>
                </div>
              ))}
            </div>
          </section> */}

          {/* Projects Section */}
          <DynamicProjectsSection />

          {/* Latest Blog Section */}
          <DynamicLatestBlogSection />
          
        </div>
        <Particles
        className="absolute inset-0 min-h-screen"
        quantity={100}
        ease={80}
        refresh
      />
      </main>
     
    </MaxWidthWrapper>
  )
}

