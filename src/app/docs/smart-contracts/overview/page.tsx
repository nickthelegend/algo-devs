"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Code, Lightbulb, Zap, Database, Shield } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function SmartContractsOverviewPage() {
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
            <h1 className="text-5xl font-bold text-white mb-6">Smart Contracts Overview</h1>
            <p className="text-xl text-gray-300 mb-8">Understanding smart contracts on the Algorand blockchain</p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">What are Algorand Smart Contracts?</h2>
              <p className="text-gray-300 mb-4">
                Algorand Smart Contracts (ASC1) are self-executing programs deployed on the Algorand blockchain that
                enable developers to build secure, scalable decentralized applications. Smart contracts on Algorand can
                be written in Algorand TypeScript, Algorand Python, or directly in TEAL. Smart contract code written in
                TypeScript or Python is compiled to TEAL, an assembly-like language that is interpreted by the Algorand
                Virtual Machine (AVM) running within an Algorand node.
              </p>
              <p className="text-gray-300">
                Smart contracts are separated into two main categories: Applications and Logic Signatures.
              </p>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Applications</h2>
              <p className="text-gray-300 mb-4">
                When you deploy a smart contract to the Algorand blockchain, it becomes an Application with a unique
                Application ID. These Applications can be interacted with through special transactions called
                Application Calls. Applications form the foundation of decentralized applications (dApps) by handling
                their core on-chain logic.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Database className="h-6 w-6 text-[#6104d7] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">State Management</h3>
                      <p className="text-gray-300">
                        Applications can modify state associated with the application as global state or as local state
                        for specific application and account pairs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Zap className="h-6 w-6 text-[#ec0033] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">On-Chain Access</h3>
                      <p className="text-gray-300">
                        Applications can access on-chain values, such as account balances, asset configuration
                        parameters, or the latest block time.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Code className="h-6 w-6 text-[#6104d7] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Inner Transactions</h3>
                      <p className="text-gray-300">
                        Applications can execute inner transactions during their execution, allowing one application to
                        call another. This enables composability between applications.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-[#ec0033] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Application Account</h3>
                      <p className="text-gray-300">
                        Each Application has an Application Account which can hold Algo and Algorand Standard Assets
                        (ASAs), making it useful as an on-chain escrow.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mt-4">
                To provide a standard method for exposing an API and encoding/decoding data types from application call
                transactions, the ABI should be used.
              </p>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Logic Signatures</h2>
              <p className="text-gray-300 mb-4">
                Logic Signatures are programs that validate transactions through custom rules and are primarily used for
                signature delegation. When submitting a transaction with a Logic Signature, the program code is included
                and evaluated by the Algorand Virtual Machine (AVM). The transaction only proceeds if the program
                successfully executes - if the program fails, the transaction is rejected.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Specialized Accounts</h3>
                  <p className="text-gray-300">
                    Logic Signatures can create specialized Algorand accounts that hold Algo or assets. These accounts
                    only release funds when a transaction meets the conditions specified in the program.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Account Delegation</h3>
                  <p className="text-gray-300">
                    They enable account delegation, where an account owner can define specific transaction rules that
                    allow another account to act on their behalf.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Independent Verification</h3>
                  <p className="text-gray-300">
                    Each transaction using a Logic Signature is independently verified by an Algorand node using the
                    AVM. These programs have limited access to global variables, temporary scratch space, and the
                    properties of the transaction(s) they are validating.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Writing Smart Contracts</h2>
              <p className="text-gray-300 mb-6">
                Algorand smart contracts are written in standard Python and TypeScript - known as Algorand Python and
                Algorand TypeScript in the ecosystem. These are not special variants or supersets, but rather standard
                code that compiles to TEAL. This means developers can use their existing knowledge, tools, and practices
                while building smart contracts. The direct compilation to TEAL for the Algorand Virtual Machine (AVM)
                provides an ideal balance of familiar development experience and blockchain performance.
              </p>

              {/* Code Examples */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Algorand TypeScript</h3>
                  <div className="bg-black/40 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      {`import { Contract } from '@algorandfoundation/tealscript';

export class HelloWorld extends Contract {
  /**
   * @param name The name of the user to greet.
   * @returns A greeting message to the user.
   */
  hello(name: string): string {
    return 'Hello, ' + name;
  }
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Algorand Python</h3>
                  <div className="bg-black/40 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      {`from algopy import ARC4Contract, arc4

class HelloWorldContract(ARC4Contract):
    @arc4.abimethod
    def hello(self, name: arc4.String) -> arc4.String:
        return "Hello, " + name`}
                    </pre>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Zap className="h-12 w-12 text-[#6104d7] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Instant Finality</h3>
                  <p className="text-gray-400">Transactions are final in under 3 seconds with immediate confirmation</p>
                </div>
                <div className="text-center">
                  <Code className="h-12 w-12 text-[#ec0033] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Multiple Languages</h3>
                  <p className="text-gray-400">Write contracts in TEAL, Python, or TypeScript with familiar syntax</p>
                </div>
                <div className="text-center">
                  <Lightbulb className="h-12 w-12 text-[#6104d7] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Low Cost</h3>
                  <p className="text-gray-400">Minimal transaction fees for contract execution and deployment</p>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Development Advantages</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Familiar Development Experience</h3>
                  <p className="text-gray-300">
                    Use standard Python and TypeScript syntax, tools, and development practices. No need to learn
                    specialized blockchain languages or frameworks.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Optimized Compilation</h3>
                  <p className="text-gray-300">
                    Advanced compilers (PuyaPy for Python, PuyaTs for TypeScript) ensure optimal TEAL bytecode
                    generation with performance optimizations.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Seamless Integration</h3>
                  <p className="text-gray-300">
                    Direct compatibility with AlgoKit typed clients simplifies deployment, testing, and interaction with
                    smart contracts.
                  </p>
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <Link href="/docs">
                <Button className="bg-[#6104d7] hover:bg-[#6104d7]/90">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Documentation
                </Button>
              </Link>
              <Link href="/docs/smart-contracts/teal">
                <Button className="bg-[#6104d7] hover:bg-[#6104d7]/90">
                  Next: TEAL
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
