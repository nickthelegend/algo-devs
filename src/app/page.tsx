import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Code, Gem, GitBranch, GraduationCap } from "lucide-react"

const tags = ["Smart Contracts", "DeFi", "NFTs", "Web3", "Blockchain", "dApps", "AI", "Development"]

const features = [
  {
    title: "Bounties",
    description: "Earn rewards by solving blockchain challenges and contributing to the ecosystem",
    icon: Gem,
  },
  {
    title: "Open Source Projects",
    description: "Collaborate on cutting-edge Algorand projects and shape the future of blockchain",
    icon: GitBranch,
  },
  {
    title: "Learning Resources",
    description: "Access comprehensive tutorials and documentation to master Algorand development",
    icon: GraduationCap,
  },
]

const stats = [
  { label: "Active Developers", value: "5,000+" },
  { label: "Total Bounties", value: "$500K+" },
  { label: "Projects Launched", value: "1,000+" },
  { label: "Community Members", value: "50,000+" },
]

export default function Home() {
  return (
    <main className="bg-[#0c0909]">
      {/* Hero Section */}
      <section className="relative min-h-screen pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0909] via-[#6104d7]/20 to-[#ec0033]/20 pointer-events-none" />

        <div className="container relative mx-auto px-4 pt-20 pb-32">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter">
              ALGO
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6104d7] to-[#ec0033]">DEVS</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
              Join the future of blockchain development. Build, learn, and innovate with the Algorand community.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Button size="lg" className="bg-[#6104d7] hover:bg-[#6104d7]/90 text-white border-0">
                Start Building
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#ec0033] text-[#ec0033] hover:bg-[#ec0033] hover:text-white"
              >
                View Bounties
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/5 text-white/80 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#6104d7]/20 blur-3xl rounded-full transform translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-[#ec0033]/20 blur-3xl rounded-full" />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Build the Future of <span className="text-[#6104d7]">Blockchain</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-black/40 border-white/10">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-[#ec0033] mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#6104d7]/20 to-[#ec0033]/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Building?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of developers and start contributing to the Algorand ecosystem
          </p>
          <Button size="lg" className="bg-[#ec0033] hover:bg-[#ec0033]/90 text-white">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Latest Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12">Latest Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-black/40 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Code className="h-8 w-8 text-[#6104d7]" />
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#6104d7]/20 text-[#6104d7]">
                      Active
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Project {i}</h3>
                  <p className="text-gray-400 mb-4">A decentralized application built on Algorand</p>
                  <Button variant="ghost" className="text-[#6104d7] hover:text-[#6104d7]/90">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

