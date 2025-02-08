"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { LinkIcon, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen animated-gradient">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-3xl w-full space-y-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">What do you want to build?</h1>
          <p className="text-gray-400 text-lg mb-8">Prompt, run, edit, and deploy full-stack web apps.</p>

          <div className="relative">
            <Textarea
              placeholder="How can Bolt help you today?"
              className="w-full h-32 bg-[#1a1a1a]/50 border border-white/10 rounded-lg text-white placeholder:text-gray-400 resize-none"
            />
            <div className="absolute bottom-3 right-3 flex gap-2">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <LinkIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Sparkles className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <Button variant="outline" className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10">
              Start a blog with Astro
            </Button>
            <Button variant="outline" className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10">
              Build a mobile app with NativeScript
            </Button>
            <Button variant="outline" className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10">
              Create a docs site with Vitepress
            </Button>
            <Button variant="outline" className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10">
              Scaffold UI with shadcn
            </Button>
            <Button variant="outline" className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10">
              Draft a presentation with Slidev
            </Button>
            <Button variant="outline" className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10">
              Code a video with Remotion
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

