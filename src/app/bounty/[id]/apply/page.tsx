"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@supabase/supabase-js"
import { toast } from "sonner"
import { ArrowLeft, Loader2, Calendar, Clock } from "lucide-react"
import { useWallet } from "@txnlab/use-wallet-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { format, addWeeks } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

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

// Estimated completion options
const completionTimeframes = ["Less than 1 week", "1-2 weeks", "2-4 weeks", "1-2 months", "More than 2 months"]

export default function ApplyToBountyPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { activeAccount } = useWallet()
  const router = useRouter()
  const [bounty, setBounty] = useState<Bounty | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState<Date | undefined>(
    addWeeks(new Date(), 2), // Default to 2 weeks from now
  )
  const [formData, setFormData] = useState({
    proposal: "",
    experience: "",
    timeframe: completionTimeframes[1], // Default to 1-2 weeks
    additionalInfo: "",
  })

  useEffect(() => {
    fetchBounty()
    checkIfAlreadyApplied()
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

  async function checkIfAlreadyApplied() {
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

      if (data) {
        // Already applied, redirect to bounty page
        toast.info("You have already applied for this bounty")
        router.push(`/bounty/${id}`)
      }
    } catch (error) {
      console.error("Error checking application status:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!activeAccount) {
      toast.error("Please connect your wallet to apply for a bounty", {
        description: "Authentication Required",
      })
      return
    }

    if (!bounty) {
      toast.error("Bounty information not available")
      return
    }

    // Validation
    if (!formData.proposal.trim() || !formData.experience.trim() || !estimatedCompletionDate) {
      toast.error("Please fill in all required fields", {
        description: "Validation Error",
      })
      return
    }

    setSubmitting(true)
    try {
      // Format date to match the database schema (YYYY-MM-DD)
      const formattedDate = format(estimatedCompletionDate, "yyyy-MM-dd")

      // Create application
      const { error } = await supabase.from("bounty_applications").insert({
        bounty_id: id,
        applicant_address: activeAccount.address,
        applicant_name: activeAccount.name || "Anonymous",
        proposal: formData.proposal,
        experience: formData.experience,
        timeframe: formData.timeframe,
        estimated_completion: formattedDate,
        additional_info: formData.additionalInfo,
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

      // Redirect to bounty page
      router.push(`/bounty/${id}`)
    } catch (error) {
      console.error("Error submitting application:", error)
      toast.error("Failed to submit application")
    } finally {
      setSubmitting(false)
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

  // Check if user is the creator of the bounty
  const isCreator = activeAccount && activeAccount.address === bounty.creatoraddress

  if (isCreator) {
    return (
      <main className="min-h-screen animated-gradient pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-black/30 rounded-xl border border-indigo-400/20 p-10 text-center">
            <h3 className="text-xl font-medium text-white mb-2">You cannot apply to your own bounty</h3>
            <p className="text-gray-400 mb-6">You are the creator of this bounty</p>
            <Link href={`/bounty/${id}`}>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Bounty
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
        <div className="max-w-3xl mx-auto">
          <Link href={`/bounty/${id}`} className="inline-flex items-center text-indigo-300 hover:text-indigo-200 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bounty
          </Link>

          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-indigo-400/20 mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Apply for Bounty</h1>
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="outline" className="bg-indigo-600/20 text-white border-indigo-400/30">
                {bounty.category}
              </Badge>
              <Badge variant="secondary" className="bg-green-500/20 text-green-500">
                {formatAlgoAmount(bounty.reward)}
              </Badge>
            </div>

            <div className="bg-black/30 rounded-lg p-4 border border-indigo-400/10 mb-8">
              <h2 className="text-xl font-bold text-white mb-2">{bounty.title}</h2>
              <p className="text-gray-300 mb-4">{bounty.organization}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-indigo-300">
                  <Clock className="h-4 w-4" />
                  <span>Due in {bounty.duein}</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-300">
                  <Calendar className="h-4 w-4" />
                  <span>Due date: {format(new Date(bounty.duedate), "PPP")}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="proposal" className="text-white">
                  Your Proposal <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="proposal"
                  value={formData.proposal}
                  onChange={(e) => setFormData({ ...formData, proposal: e.target.value })}
                  placeholder="Describe how you plan to complete this bounty. Be specific about your approach and methodology."
                  className="min-h-[150px] bg-black/30 border-indigo-400/20 text-white placeholder:text-gray-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="experience" className="text-white">
                  Relevant Experience <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="Describe your relevant experience and skills that make you qualified for this bounty."
                  className="min-h-[120px] bg-black/30 border-indigo-400/20 text-white placeholder:text-gray-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="timeframe" className="text-white">
                    Estimated Timeframe <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.timeframe}
                    onValueChange={(value) => setFormData({ ...formData, timeframe: value })}
                    required
                  >
                    <SelectTrigger id="timeframe" className="bg-black/30 border-indigo-400/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-indigo-400/20 text-white">
                      {completionTimeframes.map((timeframe) => (
                        <SelectItem
                          key={timeframe}
                          value={timeframe}
                          className="text-white focus:text-white focus:bg-indigo-600/50"
                        >
                          {timeframe}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="estimatedCompletion" className="text-white">
                    Estimated Completion Date <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="estimatedCompletion"
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-black/30 border-indigo-400/20 text-white"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {estimatedCompletionDate ? (
                          format(estimatedCompletionDate, "PPP")
                        ) : (
                          <span className="text-gray-400">Select a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-black/90 border-indigo-400/30">
                      <CalendarComponent
                        mode="single"
                        selected={estimatedCompletionDate}
                        onSelect={setEstimatedCompletionDate}
                        initialFocus
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        className="bg-black text-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="additionalInfo" className="text-white">
                  Additional Information (Optional)
                </Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  placeholder="Any additional information you'd like to share with the bounty creator."
                  className="min-h-[100px] bg-black/30 border-indigo-400/20 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-400/20 mb-4">
                <h4 className="text-indigo-300 text-sm font-medium mb-2">Important Note</h4>
                <p className="text-gray-400 text-sm">
                  By submitting this application, you agree to complete the bounty according to the requirements and
                  timeline specified. Payment will be made upon successful completion and approval by the bounty
                  creator.
                </p>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Link href={`/bounty/${id}`}>
                  <Button variant="outline" className="border-indigo-400/20 text-white">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={submitting || !activeAccount}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
