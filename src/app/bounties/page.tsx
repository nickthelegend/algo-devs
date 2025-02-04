import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users } from "lucide-react"

const bounties = [
  {
    id: 1,
    title: "Solana Games - Highest Cumulative PnL",
    organization: "Wasabi Protocol",
    reward: "70 SOL",
    dueIn: "8d",
    participants: 25,
    featured: true,
    status: "active",
  },
  {
    id: 2,
    title: "Solana Games - Highest Volume",
    organization: "Wasabi Protocol",
    reward: "70 SOL",
    dueIn: "9d",
    participants: 7,
    featured: true,
    status: "active",
  },
  // Add more bounties as needed
]

export default function BountiesPage() {
  return (
    <main className="min-h-screen animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-black/40 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white">$3,199,870</h3>
            <p className="text-gray-400">Total Value Earned</p>
          </div>
          <div className="bg-black/40 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white">1451</h3>
            <p className="text-gray-400">Opportunities Listed</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="outline" className="text-white border-white/20">
            All Opportunities
          </Button>
          <Button variant="outline" className="text-white border-white/20">
            Content
          </Button>
          <Button variant="outline" className="text-white border-white/20">
            Design
          </Button>
          <Button variant="outline" className="text-white border-white/20">
            Development
          </Button>
        </div>

        {/* Bounties Tabs */}
        <Tabs defaultValue="open" className="mb-8">
          <TabsList className="bg-black/40">
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="in-review">In Review</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Bounties List */}
        <div className="grid gap-4">
          {bounties.map((bounty) => (
            <Card key={bounty.id} className="bg-black/40 border-white/10 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{bounty.title}</h3>
                  <p className="text-gray-400 mb-4">{bounty.organization}</p>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-white border-white/20">
                      Bounty
                    </Badge>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>Due in {bounty.dueIn}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>{bounty.participants}</span>
                    </div>
                    {bounty.featured && (
                      <div className="flex items-center gap-2 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span>FEATURED</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-white mb-2">{bounty.reward}</p>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-500">
                    {bounty.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}

