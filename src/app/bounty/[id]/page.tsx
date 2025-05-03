"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Star, Clock, Users, ArrowLeft, Loader2, User, Calendar, Award } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import { toast } from "sonner"
import { useWallet } from "@txnlab/use-wallet-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"

// Initialize Supabase client
const supabase =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    : null

// Define the Bounty type
interface Bounty {
  id: string
  title: string
  description: string
  organization: string
  reward: number
  duein: string
  duedate: string
  participants: number
  featured: boolean
  status: "active" | "in-review" | "completed"
  category: string
  requirements?: string
  creatoraddress: string
  created_at: string
}

export default function BountyDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { activeAccount } = useWallet()
  const router = useRouter()
  const [bounty, setBounty] = useState<Bounty | null>(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

  useEffect(() => {
    fetchBounty()
    if (activeAccount) {
      checkIfApplied()
    }
  }, [id, activeAccount])

  async function fetchBounty() {
    setLoading(true)
    try {
      if (!supabase) {
        toast.error("Database connection not available")
        setLoading(false)
        return
      }

      const { data, error } = await supabase.from("bounties").select("*").eq("id", id).single()

      if (error) throw error

      if (!data) {
        toast.error("Bounty not found")
        router.push("/bounties")
        return
      }

      setBounty(data)
    } catch (error) {
      console.error("Error fetching bounty:", error)
      toast.error("Failed to fetch bounty details")
    } finally {
      setLoading(false)
    }
  }

  async function checkIfApplied() {
    try {
      if (!supabase || !activeAccount) return

      const { data, error } = await supabase
        .from("bounty_applications")
        .select("*")
        .eq("bounty_id", id)
        .eq("applicant_address", activeAccount.address)
        .single()

      if (error && error.code !== "PGRST116") {
        // PGRST116 is the error code for "no rows returned"
        console.error("Error checking application status:", error)
        return
      }

      setHasApplied(!!data)
    } catch (error) {
      console.error("Error checking application status:", error)
    }
  }

  async function applyForBounty() {
    if (!activeAccount) {
      toast.error("Please connect your wallet to apply for a bounty", {
        description: "Authentication Required",
      })
      return
    }

    if (!bounty) return

    setApplying(true)
    try {
      // Create application
      const { error } = await supabase.from("bounty_applications").insert({
        bounty_id: id,
        applicant_address: activeAccount.address,
        applicant_name: activeAccount.name || "Anonymous",
        status: "pending",
        created_at: new Date().toISOString(),
      })

      if (error) throw error

      // Update participants count
      const { error: updateError } = await supabase.rpc("increment_bounty_participants", {
        bounty_id: id,
      })

      if (updateError) throw updateError

      toast.success("Application submitted successfully")
      setHasApplied(true)

      // Refresh bounty to update participants count
      fetchBounty()
    } catch (error) {
      console.error("Error applying for bounty:", error)
      toast.error("Failed to submit application")
    } finally {
      setApplying(false)
    }
  }

  const formatAlgoAmount = (amount: number | string) => {
    return `${amount} ALGO`
  }

  if (loading) {
    return (
      <main className="min-h-screen animated-gradient pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 text-indigo-500 animate-spin" />
          </div>
        </div>
      </main>
    )
  }

  if (!bounty) {
    return (
      <main className="min-h-screen animated-gradient pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-black/30 rounded-xl border border-indigo-400/20 p-10 text-center">
            <h3 className="text-xl font-medium text-white mb-2">Bounty not found</h3>
            <p className="text-gray-400 mb-6">The bounty you're looking for doesn't exist or has been removed</p>
            <Link href="/bounties">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Bounties
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        <Link href="/bounties" className="inline-flex items-center text-indigo-300 hover:text-indigo-200 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Bounties
        </Link>

        <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-indigo-400/20 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="bg-indigo-600/20 text-white border-indigo-400/30">
                  {bounty.category}
                </Badge>
                {bounty.featured && (
                  <div className="flex items-center gap-2 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span>FEATURED</span>
                  </div>
                )}
                <Badge
                  variant="secondary"
                  className={
                    bounty.status === "active"
                      ? "bg-green-500/20 text-green-500"
                      : bounty.status === "in-review"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-blue-500/20 text-blue-500"
                  }
                >
                  {bounty.status === "active" ? "Active" : bounty.status === "in-review" ? "In Review" : "Completed"}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{bounty.title}</h1>
              <p className="text-xl text-indigo-300 mb-4">Posted by {bounty.organization || "Anonymous"}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-right mb-4">
                <p className="text-sm text-gray-400 mb-1">Reward</p>
                <p className="text-3xl font-bold text-white">{formatAlgoAmount(bounty.reward)}</p>
              </div>
              {bounty.status === "active" && activeAccount && (
                <Button
                  onClick={applyForBounty}
                  disabled={applying || hasApplied || bounty.creatoraddress === activeAccount.address}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                >
                  {applying ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Applying...
                    </>
                  ) : hasApplied ? (
                    "Applied"
                  ) : bounty.creatoraddress === activeAccount.address ? (
                    "Your Bounty"
                  ) : (
                    "Apply for Bounty"
                  )}
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-black/30 border-indigo-400/20 p-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-indigo-400" />
                <div>
                  <p className="text-sm text-gray-400">Due Date</p>
                  <p className="text-white">{format(new Date(bounty.duedate), "PPP")}</p>
                </div>
              </div>
            </Card>
            <Card className="bg-black/30 border-indigo-400/20 p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-indigo-400" />
                <div>
                  <p className="text-sm text-gray-400">Time Remaining</p>
                  <p className="text-white">Due in {bounty.duein}</p>
                </div>
              </div>
            </Card>
            <Card className="bg-black/30 border-indigo-400/20 p-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-indigo-400" />
                <div>
                  <p className="text-sm text-gray-400">Participants</p>
                  <p className="text-white">{bounty.participants} applicants</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Description</h2>
            <div className="bg-black/30 rounded-lg p-6 border border-indigo-400/10 text-gray-300 whitespace-pre-line">
              {bounty.description}
            </div>
          </div>

          {bounty.requirements && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Submission Requirements</h2>
              <div className="bg-black/30 rounded-lg p-6 border border-indigo-400/10 text-gray-300 whitespace-pre-line">
                {bounty.requirements}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold text-white mb-4">About the Poster</h2>
            <div className="bg-black/30 rounded-lg p-6 border border-indigo-400/10">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-600/20 rounded-full p-3">
                  <User className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <p className="text-white font-medium">{bounty.organization || "Anonymous"}</p>
                  <p className="text-gray-400 text-sm">
                    {bounty.creatoraddress.slice(0, 6)}...{bounty.creatoraddress.slice(-4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {bounty.status === "active" && activeAccount && (
          <div className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-500/20 text-center">
            <Award className="h-10 w-10 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Ready to take on this challenge?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Apply now to work on this bounty and earn {formatAlgoAmount(bounty.reward)} upon successful completion.
            </p>
            <Button
              onClick={applyForBounty}
              disabled={applying || hasApplied || bounty.creatoraddress === activeAccount.address}
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              {applying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Applying...
                </>
              ) : hasApplied ? (
                "Already Applied"
              ) : bounty.creatoraddress === activeAccount.address ? (
                "This is Your Bounty"
              ) : (
                "Apply for Bounty"
              )}
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
