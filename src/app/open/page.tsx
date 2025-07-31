import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, GitFork, Star } from "lucide-react"

const projects = [
  {
    id: 3,
    name: "Algorand SDK",
    description: "Official Algorand SDK for multiple programming languages",
    stars: 1200,
    forks: 340,
    language: "TypeScript",
    tags: ["SDK", "Development"],
  },
  {
    id: 2,
    name: "AlgoPy",
    description: "Python SDK for Algorand blockchain",
    stars: 850,
    forks: 215,
    language: "Python",
    tags: ["SDK", "Python"],
  },
  {
    id: 1,
    name: "Algorand Explorer",
    description: "Open source blockchain explorer",
    stars: 650,
    forks: 120,
    language: "TypeScript",
    tags: ["Explorer", "Web"],
  },
  // Add more projects as needed...
]

export default function OpenSourcePage() {
  const [query, setQuery] = useState("")
  const [languageFilter, setLanguageFilter] = useState("all")
  const [sortFilter, setSortFilter] = useState("recent")

  // Filter projects by search and language
  let filteredProjects = projects.filter((project) => {
    const matchesQuery =
      project.name.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase())

    const matchesLanguage = languageFilter === "all" || project.language.toLowerCase() === languageFilter

    return matchesQuery && matchesLanguage
  })

  // Sort filtered projects
  filteredProjects.sort((a, b) => {
    if (sortFilter === "stars") {
      return b.stars - a.stars
    } else if (sortFilter === "forks") {
      return b.forks - a.forks
    } else if (sortFilter === "recent") {
      return b.id - a.id // assuming higher id = more recent
    }
    return 0
  })

  return (
    <main className="min-h-screen animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Open Source Projects</h1>
          <Button className="bg-white text-black hover:bg-white/90">
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Button>
        </div>

        <div className="glass-effect rounded-lg p-4 mb-8">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects..."
                className="pl-10 bg-transparent border-white/20 text-white"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Select onValueChange={(value) => setLanguageFilter(value)} value={languageFilter}>
              <SelectTrigger className="w-[180px] bg-transparent text-white border-white/20">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSortFilter(value)} value={sortFilter}>
              <SelectTrigger className="w-[180px] bg-transparent text-white border-white/20">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stars">Most Stars</SelectItem>
                <SelectItem value="forks">Most Forks</SelectItem>
                <SelectItem value="recent">Recently Added</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Card key={project.id} className="glass-effect p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex gap-3">
                      <span className="text-sm text-gray-400">{project.language}</span>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Star className="h-4 w-4" />
                        <span>{project.stars}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <GitFork className="h-4 w-4" />
                        <span>{project.forks}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className=" border-white/20">
                    View Project
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-white opacity-60 text-center py-16 col-span-full text-lg">
              No projects found for "<span className="font-mono">{query}</span>"
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
