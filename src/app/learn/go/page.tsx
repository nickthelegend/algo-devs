"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { GoSidebar } from "@/components/learn/go-sidebar"

// Go topics data
const goTopics = [
  {
    id: "variables",
    title: "Variables",
    description:
      "In Go, variables are declared using the var keyword or using short declaration syntax. Go is statically typed, so each variable has a specific type.",
    image: "/placeholder.svg?height=200&width=400&query=go+variables",
  },
  {
    id: "data-types",
    title: "Data Types",
    description:
      "Go has several built-in data types including basic types (numbers, strings, booleans), aggregate types (arrays, structs), reference types (pointers, slices, maps, channels), and interface types.",
    image: "/placeholder.svg?height=200&width=400&query=go+data+types",
  },
  {
    id: "functions",
    title: "Functions",
    description:
      "Functions in Go are declared using the func keyword. Go functions can return multiple values, which is a powerful feature for error handling and other use cases.",
    image: "/placeholder.svg?height=200&width=400&query=go+functions",
  },
  {
    id: "structs",
    title: "Structs",
    description:
      "Structs in Go are composite data types that group together variables under a single name. They're similar to classes in object-oriented languages but without inheritance.",
    image: "/placeholder.svg?height=200&width=400&query=go+structs",
  },
  {
    id: "interfaces",
    title: "Interfaces",
    description:
      "Interfaces in Go provide a way to specify the behavior of an object. They define a set of methods but don't implement them. A type implements an interface by implementing its methods.",
    image: "/placeholder.svg?height=200&width=400&query=go+interfaces",
  },
  {
    id: "concurrency",
    title: "Concurrency",
    description:
      "Go has built-in support for concurrency through goroutines and channels. Goroutines are lightweight threads managed by the Go runtime, and channels are the pipes that connect them.",
    image: "/placeholder.svg?height=200&width=400&query=go+concurrency",
  },
  {
    id: "error-handling",
    title: "Error Handling",
    description:
      "Go handles errors by returning an error value rather than throwing exceptions. This encourages explicit error checking and makes error handling a first-class concern.",
    image: "/placeholder.svg?height=200&width=400&query=go+error+handling",
  },
  {
    id: "packages",
    title: "Packages",
    description:
      "Go programs are organized into packages. A package is a collection of Go files in the same directory that are compiled together. Every Go program starts in package main.",
    image: "/placeholder.svg?height=200&width=400&query=go+packages",
  },
  {
    id: "algorand-sdk",
    title: "Algorand SDK",
    description:
      "Learn how to use the Go SDK for Algorand to interact with the blockchain, create transactions, and build decentralized applications.",
    image: "/placeholder.svg?height=200&width=400&query=algorand+go+sdk",
  },
  {
    id: "smart-contracts",
    title: "Smart Contracts",
    description:
      "Develop and deploy smart contracts on the Algorand blockchain using Go and TEAL (Transaction Execution Approval Language).",
    image: "/placeholder.svg?height=200&width=400&query=algorand+smart+contracts",
  },
]

export default function GoLearningPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter topics based on search term
  const filteredTopics = goTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar for navigation */}
      <div className="hidden lg:block w-64">
        <GoSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 mb-8 border border-indigo-400/20">
          <h1 className="text-3xl font-bold text-white mb-4">Go Documentation</h1>
          <p className="text-gray-300 mb-6">
            Learn Go programming for Algorand blockchain development. Explore variables, data structures, concurrency,
            and more to build efficient and scalable decentralized applications.
          </p>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 h-5 w-5" />
            <Input
              placeholder="Search Go topics..."
              className="pl-10 bg-black/30 border-indigo-400/20 text-white h-12 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <Link key={topic.id} href={`/learn/go/${topic.id}`}>
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
