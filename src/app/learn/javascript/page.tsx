"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { JavaScriptSidebar } from "@/components/learn/javascript-sidebar"

// JavaScript topics data
const javascriptTopics = [
  {
    id: "variables",
    title: "Variables",
    description:
      "In JavaScript, variables are containers for storing data values. JavaScript provides different ways to declare variables: var, let, and const.",
    image: "/placeholder.svg?height=200&width=400&query=javascript+variables",
  },
  {
    id: "data-types",
    title: "Data Types",
    description:
      "JavaScript has several built-in data types: String, Number, Boolean, Object, Array, Null, and Undefined. Understanding these types is essential for effective programming.",
    image: "/placeholder.svg?height=200&width=400&query=javascript+data+types",
  },
  {
    id: "functions",
    title: "Functions",
    description:
      "Functions are blocks of code designed to perform a particular task. They are executed when something invokes (calls) them and can return data as a result.",
    image: "/placeholder.svg?height=200&width=400&query=javascript+functions",
  },
  {
    id: "objects",
    title: "Objects",
    description:
      "Objects are collections of properties, where each property is a key-value pair. They are one of the most important data types in JavaScript.",
    image: "/placeholder.svg?height=200&width=400&query=javascript+objects",
  },
  {
    id: "arrays",
    title: "Arrays",
    description:
      "Arrays are special objects used for storing multiple values in a single variable. They provide methods to perform various operations like adding, removing, and finding elements.",
    image: "/placeholder.svg?height=200&width=400&query=javascript+arrays",
  },
  {
    id: "dom-manipulation",
    title: "DOM Manipulation",
    description:
      "The Document Object Model (DOM) is a programming interface for web documents. JavaScript can change all the HTML elements and attributes in the page.",
    image: "/placeholder.svg?height=200&width=400&query=javascript+dom+manipulation",
  },
  {
    id: "events",
    title: "Events",
    description:
      "JavaScript's interaction with HTML is handled through events that occur when the user or the browser manipulates a page. Events are actions that can be detected by JavaScript.",
    image: "/placeholder.svg?height=200&width=400&query=javascript+events",
  },
  {
    id: "async-javascript",
    title: "Async JavaScript",
    description:
      "Asynchronous JavaScript allows code execution to continue while waiting for operations to complete. This includes Promises, async/await, and callbacks.",
    image: "/placeholder.svg?height=200&width=400&query=javascript+async",
  },
  {
    id: "algorand-sdk",
    title: "Algorand SDK",
    description:
      "Learn how to use the JavaScript SDK for Algorand to interact with the blockchain, create transactions, and build decentralized applications.",
    image: "/placeholder.svg?height=200&width=400&query=algorand+javascript+sdk",
  },
  {
    id: "web3-integration",
    title: "Web3 Integration",
    description:
      "Integrate Algorand blockchain functionality into web applications using JavaScript and Web3 technologies.",
    image: "/placeholder.svg?height=200&width=400&query=web3+javascript+integration",
  },
]

export default function JavaScriptLearningPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter topics based on search term
  const filteredTopics = javascriptTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar for navigation */}
      <div className="hidden lg:block w-64">
        <JavaScriptSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 mb-8 border border-indigo-400/20">
          <h1 className="text-3xl font-bold text-white mb-4">JavaScript Documentation</h1>
          <p className="text-gray-300 mb-6">
            Learn JavaScript programming for Algorand blockchain development. Explore variables, functions, objects, and
            more to build interactive decentralized applications.
          </p>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 h-5 w-5" />
            <Input
              placeholder="Search JavaScript topics..."
              className="pl-10 bg-black/30 border-indigo-400/20 text-white h-12 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <Link key={topic.id} href={`/learn/javascript/${topic.id}`}>
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
    </div>
  )
}
