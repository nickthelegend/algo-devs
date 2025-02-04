"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User } from "lucide-react"

const categories = ["Smart Contracts", "DeFi", "NFTs", "Tokenomics", "Development", "Security", "Governance"]

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      content: "Hello! I'm ALGO AI, your Algorand development assistant. How can I help you today?",
      sender: "ai",
    },
  ])
  const [input, setInput] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, { content: input, sender: "user" }])
    setInput("")
    // Add AI response logic here
  }

  return (
    <main className="min-h-screen animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Main Chat Area */}
          <div className="flex-1 glass-effect rounded-lg overflow-hidden">
            <ScrollArea className="h-[calc(100vh-12rem)]" ref={scrollAreaRef}>
              <div className="p-4 space-y-4">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === "user" ? "bg-white" : "bg-black"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="h-4 w-4 text-black" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.sender === "user" ? "bg-white text-black" : "bg-black text-white"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about Algorand..."
                  className="bg-transparent border-white/20 text-white"
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend} className="bg-white text-black hover:bg-white/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-64 space-y-4">
            <Card className="glass-effect p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}