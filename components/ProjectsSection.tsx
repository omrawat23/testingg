import Image from "next/image"
import Link from "next/link"
import { PROJECTS } from '@/constants'

export default function ProjectsSection() {
  return (
    <section className="space-y-4 overflow-hidden">
      <h2 className="text-md sm:text-lg font-bold text-white">projects 📁</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {PROJECTS.map((project) => (
          <Link 
            key={project.name} 
            href={project.url} 
            className="group flex flex-col h-full"
          >
            <div className="border border-gray-800 rounded-lg overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-gray-600">
              <div className="relative aspect-video">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h1 className="text-sm lowercase mb-2">{project.name}</h1>
                <p className="text-xs text-muted-foreground lowercase">{project.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}