"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/constants";
import { useRef, useState } from "react";

export default function ProjectsSection() {
  return (
    <div className="max-w-[700px] my-[2rem] w-full">
      <div className="flex flex-col items-start justify-center w-full mb-4 gap-2">
        <h1 className="text-md sm:text-lg font-bold">projects 📁</h1>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.name}
            title={project.name}
            description={project.description}
            image={project.image}
            url={project.url}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ title, description, image, url }: { title: string; description: string; image: string; url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setMousePosition({ x, y });
    }
  }

  return (
    <Link href={url}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.03 }}
        className="relative w-full rounded-2xl border border-zinc-900 hover:cursor-pointer overflow-hidden"
      >
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 z-0 transition-opacity duration-300 ease-in-out"
          style={{
            background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2), transparent 80%)`,
            opacity: isHovered ? 1 : 0,
            pointerEvents: "none",
          }}
        />
        {/* Card content */}
        <div className="relative z-10 p-3">
          {/* Image container */}
          <div className="relative w-full aspect-[16/9] rounded overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover object-center"
            />
          </div>
          {/* Text content */}
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-sm text-gray-300">{title}</p>
            <p className="text-xs text-gray-400 line-clamp-2">{description}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
