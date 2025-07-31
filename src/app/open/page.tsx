import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Search, GitFork, Star, X } from "lucide-react"

const initialProjects = [
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
  const [projects, setProjects] = useState(initialProjects)
  const [query, setQuery] = useState("")
  const [languageFilter, setLanguageFilter] = useState("all")
  const [sortFilter, setSortFilter] = useState("recent")

  // Modal state and form fields
  const [modalOpen, setModalOpen] = useState(false)
  const [newProjectName, setNewProjectName] = useState("")
  const [newProjectDescription, setNewProjectDescription] = useState("")
  const [newProjectLanguage, setNewProjectLanguage] = useState("TypeScript")
  const [newProjectStars, setNewProjectStars] = useState("")
  const [newProjectForks, setNewProjectForks] = useState("")
  const [newTagInput, setNewTagInput] = useState("")
  const [newProjectTags, setNewProjectTags] = useState<string[]>([])

  // Filter projects by search and language
  let filteredProjects = projects.filter((project) => {
    const matchesQuery =
      project.name.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase())

    const matchesLanguage =
      languageFilter === "all" || project.language.toLowerCase() === languageFilter

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

  // Handler to open modal
  const openModal = () => {
    setModalOpen(true)
    // Reset form fields on open
    setNewProjectName("")
    setNewProjectDescription("")
    setNewProjectLanguage("TypeScript")
    setNewProjectStars("")
    setNewProjectForks("")
    setNewProjectTags([])
    setNewTagInput("")
  }

  // Handler to close modal
  const closeModal = () => {
    setModalOpen(false)
  }

  // Add tag on Enter key or button click
  const addTag = () => {
    const tag = newTagInput.trim()
    if (tag !== "" && !newProjectTags.includes(tag)) {
      setNewProjectTags([...newProjectTags, tag])
      setNewTagInput("")
    }
  }

  // Remove tag by index
  const removeTag = (index: number) => {
    setNewProjectTags(newProjectTags.filter((_, i) => i !== index))
  }

  // Handle Enter key in tag input
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  // Handler to submit new project
  const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Basic validation
    if (!newProjectName.trim()) {
      alert("Project name is required")
      return
    }
    if (!newProjectDescription.trim()) {
      alert("Project description is required")
      return
    }

    // Parse stars and forks or default to 0
    const starsNum = parseInt(newProjectStars, 10)
    const forksNum = parseInt(newProjectForks, 10)

    // Create new project object
    const newProject = {
      id: projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1,
      name: newProjectName.trim(),
      description: newProjectDescription.trim(),
      language: newProjectLanguage,
      stars: isNaN(starsNum) ? 0 : starsNum,
      forks: isNaN(forksNum) ? 0 : forksNum,
      tags: newProjectTags,
    }

    // Add new project to list
    setProjects([newProject, ...projects])
    closeModal()
  }

  return (
    <>
      <main className="min-h-screen animated-gradient pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Open Source Projects</h1>
            <Button className="bg-white text-black hover:bg-white/90" onClick={openModal}>
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
                      <div className="flex gap-3 items-center flex-wrap">
                        <span className="text-sm text-gray-400">{project.language}</span>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Star className="h-4 w-4" />
                          <span>{project.stars}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <GitFork className="h-4 w-4" />
                          <span>{project.forks}</span>
                        </div>
                        {/* Show tags if any */}
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex gap-1 flex-wrap">
                            {project.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="text-xs bg-purple-600 rounded-full px-2 py-0.5 text-white"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" className="border-white/20">
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

      {/* Modal overlay */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <form
            onClick={(e) => e.stopPropagation()} // Prevent closing on form click
            onSubmit={handleAddProject}
            className="bg-gray-900 rounded-lg max-w-md w-full p-6 text-white glass-effect"
          >
            <h2 id="modal-title" className="text-2xl font-bold mb-6">
              Add New Project
            </h2>

            <label className="block mb-4">
              <span className="block mb-1 font-medium">Project Name *</span>
              <Input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                required
                placeholder="Enter project name"
                className="bg-transparent border-white/50 text-white"
              />
            </label>

            <label className="block mb-4">
              <span className="block mb-1 font-medium">Short Description *</span>
              <textarea
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                required
                placeholder="Enter short description"
                rows={3}
                className="w-full px-3 py-2 text-white bg-transparent border border-white/50 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </label>

            <label className="block mb-4">
              <span className="block mb-1 font-medium">Language</span>
              <Select
                value={newProjectLanguage}
                onValueChange={(value) => setNewProjectLanguage(value)}
              >
                <SelectTrigger className="bg-transparent text-white border-white/50 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TypeScript">TypeScript</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                </SelectContent>
              </Select>
            </label>

            <div className="flex gap-4 mb-6">
              <label className="flex-1">
                <span className="block mb-1 font-medium">Stars</span>
                <Input
                  type="number"
                  min={0}
                  value={newProjectStars}
                  onChange={(e) => setNewProjectStars(e.target.value)}
                  placeholder="0"
                  className="bg-transparent border-white/50 text-white"
                />
              </label>

              <label className="flex-1">
                <span className="block mb-1 font-medium">Forks</span>
                <Input
                  type="number"
                  min={0}
                  value={newProjectForks}
                  onChange={(e) => setNewProjectForks(e.target.value)}
                  placeholder="0"
                  className="bg-transparent border-white/50 text-white"
                />
              </label>
            </div>

            {/* Tags input section */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newProjectTags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-purple-600 px-3 py-1 rounded-full text-sm cursor-default"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="ml-2 hover:text-red-400"
                      aria-label={`Remove tag ${tag}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter a tag and press Enter"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  className="bg-transparent border-white/50 text-white"
                />
                <Button type="button" onClick={addTag} className="px-4">
                  Add
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" className="border-white/50" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Add Project
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
