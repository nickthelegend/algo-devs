"use client"

import { GoSidebar } from "@/components/learn/go-sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function GoVariablesPage() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar for navigation */}
      <div className="hidden lg:block w-64">
        <GoSidebar activeItem="variables" />
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-indigo-400/20">
          <h1 className="text-3xl font-bold text-white mb-6">Variables</h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              In Go, variables are declared using the <code>var</code> keyword or using short declaration syntax. Go is
              statically typed, so each variable has a specific type.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Variable Declaration</h2>

            <p className="text-gray-300 mb-6">There are several ways to declare variables in Go:</p>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`// Using var keyword with explicit type
var name string = "John"

// Using var keyword with type inference
var age = 30

// Short declaration syntax (only inside functions)
count := 42

// Multiple variable declaration
var (
    firstName string = "Jane"
    lastName  string = "Doe"
    isActive  bool   = true
)`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Zero Values</h2>

            <p className="text-gray-300 mb-6">
              In Go, variables declared without an explicit initial value are given their zero value:
            </p>

            <ul className="space-y-4 text-gray-300 mb-8">
              <li>
                <strong className="text-indigo-300">0</strong> for numeric types
              </li>
              <li>
                <strong className="text-indigo-300">false</strong> for boolean type
              </li>
              <li>
                <strong className="text-indigo-300">""</strong> (empty string) for strings
              </li>
              <li>
                <strong className="text-indigo-300">nil</strong> for pointers, slices, maps, channels, functions, and
                interfaces
              </li>
            </ul>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`var i int       // i = 0
var f float64   // f = 0.0
var b bool      // b = false
var s string    // s = ""
var p *int      // p = nil`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Basic Types in Go</h2>

            <p className="text-gray-300 mb-6">Go has several basic types:</p>

            <ul className="space-y-4 text-gray-300 mb-8">
              <li>
                <strong className="text-indigo-300">bool:</strong> Boolean values (true or false)
              </li>
              <li>
                <strong className="text-indigo-300">string:</strong> Text values
              </li>
              <li>
                <strong className="text-indigo-300">int, int8, int16, int32, int64:</strong> Integer numbers of various
                sizes
              </li>
              <li>
                <strong className="text-indigo-300">uint, uint8, uint16, uint32, uint64, uintptr:</strong> Unsigned
                integers
              </li>
              <li>
                <strong className="text-indigo-300">byte:</strong> Alias for uint8
              </li>
              <li>
                <strong className="text-indigo-300">rune:</strong> Alias for int32, represents a Unicode code point
              </li>
              <li>
                <strong className="text-indigo-300">float32, float64:</strong> Floating-point numbers
              </li>
              <li>
                <strong className="text-indigo-300">complex64, complex128:</strong> Complex numbers
              </li>
            </ul>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`var (
    b bool       = true
    s string     = "hello"
    i int        = 42
    i8 int8      = 127
    ui uint      = 100
    f float64    = 3.14159
    c complex128 = 1 + 2i
    r rune       = 'A'
    by byte      = 'B'
)`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Type Conversion</h2>

            <p className="text-gray-300 mb-6">
              Go requires explicit type conversion. There are no automatic type conversions.
            </p>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`var i int = 42
var f float64 = float64(i)
var u uint = uint(f)

// This would cause a compilation error:
// var i2 int = f  // Cannot use f (type float64) as type int`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Constants</h2>

            <p className="text-gray-300 mb-6">
              Constants in Go are declared using the <code>const</code> keyword. They can be character, string, boolean,
              or numeric values.
            </p>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`const Pi = 3.14159
const (
    StatusOK      = 200
    StatusCreated = 201
    StatusAccepted = 202
)

// Typed constants
const MaxConnections int = 100

// iota for enumerated constants
const (
    Sunday = iota  // 0
    Monday         // 1
    Tuesday        // 2
    Wednesday      // 3
    Thursday       // 4
    Friday         // 5
    Saturday       // 6
)`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Variable Scope</h2>

            <p className="text-gray-300 mb-6">
              The scope of a variable refers to where in the code the variable can be accessed:
            </p>

            <ul className="space-y-4 text-gray-300 mb-8">
              <li>
                <strong className="text-indigo-300">Package-level variables:</strong> Declared outside any function,
                accessible throughout the package
              </li>
              <li>
                <strong className="text-indigo-300">Local variables:</strong> Declared inside a function or block,
                accessible only within that function or block
              </li>
            </ul>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`// Package-level variable
var globalVar = "I'm global"

func main() {
    // Local variable
    localVar := "I'm local to main"
    
    {
        // Block-scoped variable
        blockVar := "I'm local to this block"
        fmt.Println(globalVar)   // Accessible
        fmt.Println(localVar)    // Accessible
        fmt.Println(blockVar)    // Accessible
    }
    
    fmt.Println(globalVar)   // Accessible
    fmt.Println(localVar)    // Accessible
    // fmt.Println(blockVar) // Not accessible, out of scope
}`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Using Variables with Algorand</h2>

            <p className="text-gray-300 mb-6">
              When working with Algorand in Go, you'll often use variables to store important blockchain-related
              information:
            </p>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`// Algorand client configuration
algodAddress := "https://mainnet-api.algonode.cloud"
algodToken := ""
algodClient, err := algod.MakeClient(algodAddress, algodToken)

// Account information
var privateKey ed25519.PrivateKey
var address string
privateKey, address, err = account.GenerateAccount()
mnemonic, err := mnemonic.FromPrivateKey(privateKey)

// Transaction parameters
var txParams types.SuggestedParams
txParams, err = algodClient.SuggestedParams().Do(context.Background())

// Asset information
assetID := uint64(12345)
assetAmount := uint64(1000000) // 1 Algo = 1,000,000 microAlgos

// Note field for transaction
note := []byte("Hello Algorand!")`}
              </pre>
            </div>
          </div>

          <div className="flex justify-between mt-10">
            <Link href="/learn/go">
              <Button variant="outline" className="border-indigo-400/20 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Go
              </Button>
            </Link>
            <Link href="/learn/go/data-types">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Next: Data Types <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
