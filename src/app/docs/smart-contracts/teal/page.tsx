"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Code, Terminal, FileText, Cpu, Zap, Shield } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function TEALPage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <main className="min-h-screen animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back to Documentation */}
          <div className="max-w-4xl mx-auto">
            <Link
              href="/docs"
              className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Documentation
            </Link>
          </div>

          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">TEAL</h1>
            <p className="text-xl text-gray-300 mb-8">
              Transaction Execution Approval Language - Algorand's native smart contract language
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">What is TEAL?</h2>
              <p className="text-gray-300 mb-4">
                TEAL, or Transaction Execution Approval Language, is the smart contract language used in the Algorand
                blockchain. It is an assembly-like language processed by the Algorand Virtual Machine (AVM) and is
                Turing-complete, supporting both looping and subroutines. TEAL is primarily used for writing smart
                contracts and smart signatures, which can be authored directly in TEAL or via Python or TypeScript using
                AlgoKit.
              </p>
              <p className="text-gray-300">
                TEAL scripts create conditions for transaction execution. Smart contracts written in TEAL can control
                Algorand's native assets, interact with users, or enforce custom business logic. These contracts either
                approve or reject transactions based on predefined conditions.
              </p>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Use in Algorand Smart Contracts and Signatures</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Smart Contracts</h3>
                  <p className="text-gray-300">
                    Smart contracts written in TEAL can control Algorand's native assets, interact with users, or
                    enforce custom business logic. These contracts either approve or reject transactions based on
                    predefined conditions.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Smart Signatures</h3>
                  <p className="text-gray-300">
                    Smart signatures enforce specific rules on transactions initiated by accounts, typically serving as
                    a stateless contract. They provide a way to delegate transaction authorization based on programmatic
                    conditions.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Relationship to the Algorand Virtual Machine</h2>
              <p className="text-gray-300 mb-4">
                The AVM is responsible for processing TEAL programs. It interprets and executes the TEAL code, managing
                state changes and ensuring the contract's logic adheres to the set rules. The AVM also evaluates the
                computational cost of running TEAL code to enforce time limits on contract execution.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Cpu className="h-12 w-12 text-[#6104d7] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Processing</h3>
                  <p className="text-gray-400">AVM interprets and executes TEAL programs</p>
                </div>
                <div className="text-center">
                  <Shield className="h-12 w-12 text-[#ec0033] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">State Management</h3>
                  <p className="text-gray-400">Manages state changes and rule enforcement</p>
                </div>
                <div className="text-center">
                  <Zap className="h-12 w-12 text-[#6104d7] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Cost Evaluation</h3>
                  <p className="text-gray-400">Evaluates computational cost and enforces limits</p>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">TEAL Language Features</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Assembly-like Structure</h3>
                  <p className="text-gray-300">
                    TEAL resembles assembly language, where operations are performed in a sequential manner. Each line
                    in a TEAL program represents a single operation.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Stack-based Operations</h3>
                  <p className="text-gray-300">
                    TEAL is a stack-based language, meaning it relies heavily on a stack to manage data. Operations in
                    TEAL typically involve pushing data onto the stack, manipulating it, and then popping the result off
                    the stack.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Data Types</h3>
                  <p className="text-gray-300 mb-2">TEAL supports two primary data types:</p>
                  <ul className="list-disc list-inside text-gray-300 ml-4">
                    <li>Unsigned 64-bit Integers</li>
                    <li>Byte Strings</li>
                  </ul>
                  <p className="text-gray-300 mt-2">
                    These data types are used in various operations, including comparisons, arithmetic, and logical
                    operations.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Operators and Flow Control</h3>
                  <p className="text-gray-300">
                    TEAL includes a set of operators for performing arithmetic (+, -), comparisons (==, &lt;, &gt;), and
                    logical operations (&amp;&amp;, ||). Flow control in TEAL is managed through branching (bnz, bz) and
                    subroutine calls (callsub, retsub).
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Access to Transaction Properties and Global Values
                  </h3>
                  <p className="text-gray-300">
                    TEAL programs can access properties of transactions (e.g., sender, receiver, amount) and global
                    values (e.g., current round, group size) using specific opcodes like txn, gtxn, and global.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Program Versions and Compatibility</h2>
              <p className="text-gray-300 mb-4">
                Currently, Algorand supports versions 1 through 10 of TEAL. When writing contracts with program version
                2 or higher, make sure to add #pragma version # where # should be replaced by the specific number as the
                first line of the program. If this line does not exist, the protocol will treat the contract as a
                version 1 contract.
              </p>
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-gray-300">
                  <strong>Important:</strong> If upgrading a contract to version 2 or higher, it is important to verify
                  you are checking the RekeyTo property of all transactions that are attached to the contract.
                </p>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Looping and Subroutines</h2>
              <p className="text-gray-300 mb-4">
                TEAL contracts written in version 4 or higher can use loops and subroutines. Loops can be performed
                using any branching opcodes b, bz, and bnz. For example, the TEAL below loops ten times.
              </p>
              <div className="bg-black/40 rounded-lg p-4 mb-4">
                <pre className="text-green-400 text-sm">
                  {`#pragma version 10

// loop 1 - 10
// init loop var
int 0

loop:
  int 1
  +
  dup
  // implement loop code
  // ...
  // check upper bound
  int 10
  <=
  bnz loop
  // once the loop exits, the last counter value will be left on stack`}
                </pre>
              </div>
              <p className="text-gray-300 mb-4">
                Subroutines can be implemented using labels and the callsub and retsub opcodes. The sample below
                illustrates a sample subroutine call.
              </p>
              <div className="bg-black/40 rounded-lg p-4">
                <pre className="text-green-400 text-sm">
                  {`#pragma version 10
// jump to main loop
b main

// subroutine
my_subroutine:
  // implement subroutine code
  // with the two args
  retsub

main:
  int 1
  int 5
  callsub my_subroutine
  return`}
                </pre>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Dynamic Operational Cost</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Size Limitations</h3>
                  <p className="text-gray-300">
                    Smart signatures are limited to 1000 bytes in size. Size encompasses the compiled program plus
                    arguments. Smart contracts are limited to 2KB total for the compiled approval and clear programs.
                    This size can be increased in 2KB increments, up to an 8KB limit for both programs.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Computational Cost</h3>
                  <p className="text-gray-300 mb-2">
                    For optimal performance, smart contracts and smart signatures are also limited in opcode cost. This
                    cost is evaluated when a smart contract runs and is representative of its computational expense.
                    Every opcode executed by the AVM has a numeric value that represents its computational cost.
                  </p>
                  <ul className="list-disc list-inside text-gray-300 ml-4">
                    <li>Most opcodes have a computational cost of 1</li>
                    <li>SHA256 has a cost of 35</li>
                    <li>ed25519verify has a cost of 1900</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Budget Limits</h3>
                  <div className="bg-black/40 rounded-lg p-4">
                    <ul className="text-gray-300 space-y-1">
                      <li>• Smart signatures: 20,000 total computational cost</li>
                      <li>• Smart contracts (single transaction): 700 for either program</li>
                      <li>• Smart contracts (group transactions): 700 × number of application transactions</li>
                      <li>• Maximum group budget: 700 × (16 + 256) = 190,400</li>
                    </ul>
                  </div>
                  <p className="text-gray-300 mt-2">
                    If the smart contract is invoked via a group of application transactions, the computational budget
                    for approval programs is considered pooled. The total opcode budget will be 700 multiplied by the
                    number of application transactions within the group (including inner transactions).
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Tools and Development</h2>
              <p className="text-gray-300 mb-4">
                For developers who prefer Python or TypeScript, you can also write smart contracts in Python or
                TypeScript using AlgoKit. AlgoKit abstracts many low-level details of TEAL while providing the same
                functionality.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Terminal className="h-12 w-12 text-[#6104d7] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">AlgoKit</h3>
                  <p className="text-gray-400">
                    The official development toolkit with TEAL compilation, testing, and deployment capabilities
                  </p>
                </div>
                <div className="text-center">
                  <Code className="h-12 w-12 text-[#ec0033] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">goal</h3>
                  <p className="text-gray-400">
                    Command-line tool for compiling TEAL programs and interacting with the Algorand network
                  </p>
                </div>
                <div className="text-center">
                  <FileText className="h-12 w-12 text-[#6104d7] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">TEAL Debugger</h3>
                  <p className="text-gray-400">
                    Step-by-step debugging tools to trace TEAL execution and identify issues
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Terminal className="h-12 w-12 text-[#6104d7] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Low-Level Control</h3>
                  <p className="text-gray-400">Direct access to AVM operations and maximum efficiency</p>
                </div>
                <div className="text-center">
                  <Code className="h-12 w-12 text-[#ec0033] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Stack-Based</h3>
                  <p className="text-gray-400">Simple execution model with predictable gas costs</p>
                </div>
                <div className="text-center">
                  <FileText className="h-12 w-12 text-[#6104d7] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Readable</h3>
                  <p className="text-gray-400">Human-readable assembly language with clear syntax</p>
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <Link href="/docs/smart-contracts/overview">
                <Button className="bg-[#6104d7] hover:bg-[#6104d7]/90">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Overview
                </Button>
              </Link>
              <Link href="/docs/smart-contracts/avm">
                <Button className="bg-[#6104d7] hover:bg-[#6104d7]/90">
                  Next: Algorand Virtual Machine
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
