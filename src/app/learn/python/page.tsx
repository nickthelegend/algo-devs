"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Python topics data
const pythonTopics = [
  {
    id: "variables",
    title: "Variables",
    description:
      "In Python, we have several data types that are used to store different kinds of information: Integer: Represents whole numbers without a decimal component.",
    image: "/placeholder.svg?key=55srt",
  },
  {
    id: "lists",
    title: "Lists",
    description:
      "Before we go over dictionaries, which are the most common datatype when sending and receiving information between applications (back-end to front-end), it's important to understand how lists work.",
    image: "/placeholder.svg?key=5ps0z",
  },
  {
    id: "dictionaries",
    title: "Dictionaries",
    description:
      "Now we'll dive into a bit more advanced data structures, dictionaries! A dictionary is like a list, except it uses curly brackets {} instead of square brackets [].",
    image: "/placeholder.svg?key=0g1xr",
  },
  {
    id: "functions",
    title: "Functions",
    description:
      "In Python, a function is a block of code that performs a specific task. Functions help to modularize code, making it more readable and reusable.",
    image: "/placeholder.svg?key=40ini",
  },
  {
    id: "imports",
    title: "Imports",
    description:
      'This code begins with module imports, which is a fancy way of saying— "someone wrote some code that does something, and I want to use that something."',
    image: "/placeholder.svg?key=k5xp4",
  },
  {
    id: "payment-transactions",
    title: "Payment Transactions",
    description:
      "In this chapter we are creating and managing Algorand accounts in Python, including generating addresses, converting mnemonics, and executing secure payment transactions.",
    image: "/placeholder.svg?height=200&width=400&query=algorand+payment+transactions",
  },
  {
    id: "key-registration",
    title: "Key Registration",
    description:
      'Generating Key Registration Transactions requires setting up a node, which is guided in the "Running Your Own Node" section in the "Installation and Setup" chapter.',
    image: "/placeholder.svg?height=200&width=400&query=algorand+key+registration",
  },
  {
    id: "freeze-and-clawback",
    title: "Freeze and Clawback",
    description:
      "In this chapter, we will explore how to manage assets on the Algorand blockchain using Python. This includes generating accounts, creating assets, and managing them.",
    image: "/placeholder.svg?height=200&width=400&query=algorand+freeze+clawback",
  },
  {
    id: "getting-started-with-algorand",
    title: "Getting Started with Algorand",
    description:
      "To set-up your own node, visit this github repository I have created for a previous tutorial series: GitHub Repository Scroll down to the installation instructions.",
    image: "/placeholder.svg?height=200&width=400&query=getting+started+with+algorand",
  },
  {
    id: "installation-and-setup",
    title: "Installation and Setup",
    description:
      "Getting Started with Discord Bot Development on the Algorand Blockchain This tutorial will guide you through setting up your development environment.",
    image: "/placeholder.svg?height=200&width=400&query=algorand+installation+setup",
  },
  {
    id: "speed-run-variables",
    title: "Speed Run Variables",
    description:
      "Video Tutorial Python offers various data types for storing information: Integer: Represents whole numbers without a decimal component.",
    image: "/placeholder.svg?height=200&width=400&query=python+speed+run+variables",
  },
  {
    id: "speed-run-functions-and-classes",
    title: "Speed Run Functions and Classes",
    description:
      "Video Tutorial Functions in Python are reusable blocks of code that perform specific tasks. They help organize code and make it more maintainable.",
    image: "/placeholder.svg?height=200&width=400&query=python+functions+classes",
  },
]

export default function PythonLearningPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter topics based on search term
  const filteredTopics = pythonTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 mb-8 border border-indigo-400/20">
        <h1 className="text-3xl font-bold text-white mb-4">Python Documentation</h1>
        <p className="text-gray-300 mb-6">
          Learn Python programming for Algorand blockchain development. Explore variables, data structures, functions,
          and more to build powerful decentralized applications.
        </p>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 h-5 w-5" />
          <Input
            placeholder="Search Python topics..."
            className="pl-10 bg-black/30 border-indigo-400/20 text-white h-12 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => (
          <Link key={topic.id} href={`/learn/python/${topic.id}`}>
            <Card className="bg-black/40 border-indigo-400/20 overflow-hidden h-full hover:border-indigo-400/50 transition-all">
              <img src={topic.image || "/placeholder.svg"} alt={topic.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{topic.title}</h3>
                <p className="text-gray-300 line-clamp-3">{topic.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
