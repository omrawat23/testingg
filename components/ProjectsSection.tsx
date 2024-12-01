import Image from "next/image"
import Link from "next/link"
import { PROJECTS } from '@/constants'

export default function ProjectsSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-lg font-medium">projects 📁</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <Link 
            key={project.name} 
            href={project.url} 
            className="group flex flex-col h-full"
          >
            <div className="border border-gray-800 rounded-lg overflow-hidden flex flex-col h-full transition-colors hover:border-gray-700">
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
                <h3 className="text-[15px] font-medium text-gray-200 mb-2">{project.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed flex-grow">{project.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

