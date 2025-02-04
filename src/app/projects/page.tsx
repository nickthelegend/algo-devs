import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Plus } from "lucide-react"

const projects = [
  {
    id: 1,
    name: "Dfoodcore",
    description: "A food tech project",
    stage: "Idea Stage",
    category: "Creativity",
    teamSize: 1,
    createdBy: "Ayodeji Oshinowo",
    date: "February 4th",
    roles: ["CTO and co-founder"],
  },
  {
    id: 2,
    name: "Houzzie.in",
    description:
      "Houzzie offers stylish, functional household goods online. Starting with Houzzie.in, we focus on quality and design, with a vision to expand into home interiors.",
    stage: "Building MVP",
    category: "E-Commerce",
    teamSize: 1,
    createdBy: "Anurag Shukla",
    date: "February 4th",
    roles: ["Marketing specialist", "Accountant", "Graphic designer"],
  },
  // Add more projects as needed
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-black/40 rounded-lg p-4 mb-8">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for a specific project..."
                className="pl-10 bg-transparent border-white/20 text-white"
              />
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="text-white border-white/20">
              MY PROJECTS
            </Button>
            <Select>
              <SelectTrigger className="w-[180px] bg-transparent text-white border-white/20">
                <SelectValue placeholder="CATEGORY" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px] bg-transparent text-white border-white/20">
                <SelectValue placeholder="TEAM SIZE" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Member</SelectItem>
                <SelectItem value="2-5">2-5 Members</SelectItem>
                <SelectItem value="5+">5+ Members</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="bg-black/40 border-white/10">
              <div className="p-6">
                <Badge className="mb-4 bg-purple-600 text-white">{project.stage}</Badge>
                <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white">{project.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Team Size:</span>
                    <span className="text-white">{project.teamSize}</span>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  {project.roles.map((role) => (
                    <Button key={role} className="w-full bg-white text-black hover:bg-white/90">
                      Apply for {role} role
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}

