"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  SquareStackIcon as Stack,
  Database,
  Code,
  Settings,
  Lock,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function AVMPage() {
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
            <h1 className="text-5xl font-bold text-white mb-6">Algorand Virtual Machine</h1>
            <p className="text-xl text-gray-300 mb-8">
              A bytecode-based stack interpreter that executes programs associated with Algorand transactions
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Introduction */}
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">What is the AVM?</h2>
              <p className="text-gray-300 mb-4">
                The AVM is a bytecode based stack interpreter that executes programs associated with Algorand
                transactions. TEAL is an assembly language syntax for specifying a program that is ultimately converted
                to AVM bytecode. These programs can be used to check the parameters of a transaction and approve the
                transaction as if by a signature.
              </p>
              <p className="text-gray-300 mb-4">
                This use is called a <strong className="text-white">Logic Signature</strong>. Starting with v2, these
                programs may also execute as
                <strong className="text-white"> Smart Contracts</strong>, which are often called Applications. Contract
                executions are invoked with explicit application call transactions.
              </p>
              <p className="text-gray-300">
                Programs have read-only access to the transaction they are attached to, the other transactions in their
                atomic transaction group, and a few global values. In addition, Smart Contracts have access to limited
                state that is global to the application, per-account local state for each account that has opted-in to
                the application, and additional per-application arbitrary state in named boxes.
              </p>
            </Card>

            {/* Execution Modes */}
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Execution Modes</h2>
              <p className="text-gray-300 mb-6">Starting from v2, the AVM can run programs in two distinct modes:</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-700 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Lock className="h-8 w-8 text-[#6104d7] mr-3" />
                    <h3 className="text-lg font-semibold text-white">LogicSig Mode</h3>
                  </div>
                  <p className="text-gray-300 mb-3">Stateless mode used to execute Logic Signatures</p>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Max program length: LogicSigMaxSize</li>
                    <li>• Max program cost: LogicSigMaxCost</li>
                    <li>• Limited opcode availability</li>
                    <li>• No access to changing global values</li>
                  </ul>
                </div>
                <div className="border border-gray-700 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Database className="h-8 w-8 text-[#ec0033] mr-3" />
                    <h3 className="text-lg font-semibold text-white">Application Mode</h3>
                  </div>
                  <p className="text-gray-300 mb-3">Stateful mode used to execute Smart Contracts</p>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Max program length: MaxAppTotalProgramLen</li>
                    <li>• Max program cost: MaxAppProgramCost</li>
                    <li>• Full opcode availability</li>
                    <li>• Access to blockchain state and changing values</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* The Stack */}
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Stack className="mr-3 h-6 w-6" />
                The Stack
              </h2>
              <p className="text-gray-300 mb-4">
                The stack starts empty and can contain values of either{" "}
                <code className="bg-gray-800 px-2 py-1 rounded text-[#6104d7]">uint64</code> or
                <code className="bg-gray-800 px-2 py-1 rounded text-[#6104d7]"> byte-arrays</code> (byte-arrays may not
                exceed 4096 bytes in length). Most operations act on the stack, popping arguments from it and pushing
                results to it.
              </p>

              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <h4 className="text-white font-semibold mb-2">Stack Limitations:</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>
                    • Maximum stack depth: <strong>1000</strong>
                  </li>
                  <li>
                    • Maximum byte-array length: <strong>4096 bytes</strong>
                  </li>
                  <li>• Program fails if limits are exceeded</li>
                  <li>• Operations fail if trying to access non-existent stack positions</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">Stack Types</h3>
              <p className="text-gray-300 mb-4">
                While the stack can only store two basic types of values - uint64 and bytes - these values are often
                bounded, meaning they have specific ranges or limits on what they can contain:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Boolean Values</h4>
                  <p className="text-gray-400 text-sm">uint64 that must be either 0 or 1</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Address Values</h4>
                  <p className="text-gray-400 text-sm">Must be exactly 32 bytes long</p>
                </div>
              </div>
            </Card>

            {/* Scratch Space */}
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Scratch Space</h2>
              <p className="text-gray-300 mb-4">
                In addition to the stack there are <strong>256 positions</strong> of scratch space. Like stack values,
                scratch locations may be uint64 or bytes. Scratch locations are initialized as uint64 zero.
              </p>
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Access Operations:</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>
                    • <code className="text-[#6104d7]">load(s)</code> - Move data from scratch space to stack
                  </li>
                  <li>
                    • <code className="text-[#6104d7]">store(s)</code> - Move data from stack to scratch space
                  </li>
                  <li>
                    • <code className="text-[#6104d7]">gload(s)(s)</code> - Inspect scratch space from earlier app calls
                    in same group
                  </li>
                </ul>
              </div>
            </Card>

            {/* Versions */}
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Settings className="mr-3 h-6 w-6" />
                Versions
              </h2>
              <p className="text-gray-300 mb-4">
                In order to maintain existing semantics for previously written programs, AVM code is versioned. When new
                opcodes are introduced, or behavior is changed, a new version is introduced. Programs carrying old
                versions are executed with their original semantics.
              </p>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-300">
                  In the AVM bytecode, the version is an incrementing integer and denoted{" "}
                  <strong className="text-white">vX</strong> throughout documentation.
                </p>
              </div>
            </Card>

            {/* Logic Signatures Execution Environment */}
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Execution Environment for Logic Signatures</h2>
              <p className="text-gray-300 mb-4">
                Logic Signatures execute as part of testing a proposed transaction to see if it is valid and authorized
                to be committed into a block. If an authorized program executes and finishes with a single non-zero
                uint64 value on the stack then that program has validated the transaction it is attached to.
              </p>

              <h3 className="text-lg font-semibold text-white mb-3">Data Access</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Transaction Data</h4>
                  <p className="text-gray-400 text-sm">
                    Access via <code className="text-[#6104d7]">txn</code> op
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Group Data</h4>
                  <p className="text-gray-400 text-sm">
                    Access via <code className="text-[#6104d7]">gtxn</code> op
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Global Values</h4>
                  <p className="text-gray-400 text-sm">
                    Access via <code className="text-[#6104d7]">global</code> op
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">Authorization Models</h3>
              <div className="space-y-4">
                <div className="border border-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Delegated Authorization</h4>
                  <p className="text-gray-300 text-sm">
                    Account signs the program with ed25519 or multisignature. Transaction is authorized if program
                    returns true. Allows delegated actions approved by the program.
                  </p>
                </div>
                <div className="border border-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Contract Account</h4>
                  <p className="text-gray-300 text-sm">
                    SHA512_256 hash of program (prefixed by "Program") equals the authorizer address. Contract account
                    wholly controlled by the program.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4 mt-4">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                  <h4 className="text-yellow-300 font-semibold">Important Note</h4>
                </div>
                <p className="text-yellow-200 text-sm">
                  Logic Signature Args are recorded on the blockchain and publicly visible when the transaction is
                  submitted, even before inclusion in a block. Args are not part of the transaction ID or TxGroup hash.
                </p>
              </div>
            </Card>

            {/* Smart Contracts Execution Environment */}
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Execution Environment for Smart Contracts</h2>
              <p className="text-gray-300 mb-4">
                Smart Contracts are executed in ApplicationCall transactions. Like Logic Signatures, contracts indicate
                success by leaving a single non-zero integer on the stack. A failed Smart Contract call to an
                ApprovalProgram is not a valid transaction, thus not written to the blockchain.
              </p>

              <h3 className="text-lg font-semibold text-white mb-3">Enhanced Capabilities</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">State Access</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Blockchain state (balances)</li>
                    <li>• Contract state (own and others)</li>
                    <li>• Global application state</li>
                    <li>• Per-account local state</li>
                    <li>• Named boxes for arbitrary state</li>
                  </ul>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Dynamic Values</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Time-changing global values</li>
                    <li>• Transaction effects observation</li>
                    <li>• Logs and allocated IDs</li>
                    <li>• ASA and Application creation</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">Cost Management</h3>
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Execution Cost Limits</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    Smart contracts have limits on their execution cost (700, consensus parameter MaxAppProgramCost).
                  </p>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>
                      • <strong>Before v4:</strong> Static limit on all instruction costs
                    </li>
                    <li>
                      • <strong>Starting v4:</strong> Dynamic cost tracking during execution
                    </li>
                    <li>
                      • <strong>Beginning v5:</strong> Pooled costs across app executions in group
                    </li>
                    <li>
                      • <strong>v6:</strong> Inner application calls increase pooled budget
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">ClearStateProgram Execution</h4>
                  <p className="text-gray-300 text-sm">
                    More stringent execution to ensure applications can be closed out while allowing cleanup. Requires
                    MaxAppProgramCost budget at start, limited to MaxAppProgramCost during execution.
                  </p>
                </div>
              </div>
            </Card>

            {/* Resource Availability */}
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Resource Availability</h2>
              <p className="text-gray-300 mb-4">
                Smart contracts have limits on the amount of blockchain state they may examine. Opcodes may only access
                blockchain resources such as Accounts, Assets, Boxes, and contract state if the given resource is
                available.
              </p>

              <h3 className="text-lg font-semibold text-white mb-3">Available Resources</h3>
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Always Available</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>
                      • <code className="text-[#6104d7]">txn.Sender</code>
                    </li>
                    <li>
                      • <code className="text-[#6104d7]">global CurrentApplicationID</code>
                    </li>
                    <li>
                      • <code className="text-[#6104d7]">global CurrentApplicationAddress</code>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Foreign Array Resources</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>
                      • Resources in <code className="text-[#6104d7]">txn.Accounts</code>
                    </li>
                    <li>
                      • Resources in <code className="text-[#6104d7]">txn.ForeignAssets</code>
                    </li>
                    <li>
                      • Resources in <code className="text-[#6104d7]">txn.ForeignApplications</code>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Group-Level Resource Sharing (v9+)</h4>
                  <p className="text-gray-300 text-sm">
                    Any resource available in some top-level transaction in a transaction group is available in all v9
                    or later application calls in the group.
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3 mt-6">Transaction Type Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Payment (pay)</h4>
                  <p className="text-gray-400 text-sm">Sender, Receiver, CloseRemainderTo</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Asset Transfer (axfer)</h4>
                  <p className="text-gray-400 text-sm">
                    Sender, AssetReceiver, AssetSender, AssetCloseTo, XferAsset holdings
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Asset Config (acfg)</h4>
                  <p className="text-gray-400 text-sm">Sender, ConfigAsset, ConfigAsset holding of Sender</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Asset Freeze (afrz)</h4>
                  <p className="text-gray-400 text-sm">Sender, FreezeAccount, FreezeAsset holdings</p>
                </div>
              </div>
            </Card>

            {/* Constants */}
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Constants</h2>
              <p className="text-gray-300 mb-4">
                Constants can be pushed onto the stack in two different ways for optimal efficiency:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Direct Push</h3>
                  <p className="text-gray-300 text-sm mb-3">More efficient for constants used only once</p>
                  <div className="bg-gray-900 rounded p-3">
                    <code className="text-[#6104d7] text-sm">
                      pushint 1234
                      <br />
                      pushbytes 0xcafed00d
                    </code>
                  </div>
                </div>
                <div className="border border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Constant Blocks</h3>
                  <p className="text-gray-300 text-sm mb-3">More efficient for constants used multiple times</p>
                  <div className="bg-gray-900 rounded p-3">
                    <code className="text-[#6104d7] text-sm">
                      intcblock
                      <br />
                      bytecblock
                      <br />
                      intc, intc_[0123]
                      <br />
                      bytec, bytec_[0123]
                    </code>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 mt-4">
                <h4 className="text-white font-semibold mb-2">Assembler Optimization</h4>
                <p className="text-gray-300 text-sm">
                  The assembler automatically optimizes constant usage, allowing simple use of{" "}
                  <code className="text-[#6104d7]">int 1234</code> and
                  <code className="text-[#6104d7]"> byte 0xcafed00d</code>. Constants are assembled into appropriate
                  opcodes to minimize program size.
                </p>
              </div>
            </Card>

            {/* Operations */}
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Code className="mr-3 h-6 w-6" />
                Operations
              </h2>
              <p className="text-gray-300 mb-4">
                Most operations work with only one type of argument, uint64 or bytes, and fail if the wrong type value
                is on the stack.
              </p>

              <h3 className="text-lg font-semibold text-white mb-3">Value Designation</h3>
              <p className="text-gray-300 mb-4">
                Many instructions accept values to designate Accounts, Assets, or Applications. Beginning with v4, these
                values may be given as:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Offset Method</h4>
                  <p className="text-gray-400 text-sm">
                    Offset in corresponding Txn fields (Txn.Accounts, Txn.ForeignAssets, Txn.ForeignApps)
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Direct Value</h4>
                  <p className="text-gray-400 text-sm">
                    The value itself (byte-array address for Accounts, uint64 ID for Assets/Apps)
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">Stack Argument Convention</h3>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <p className="text-gray-300 text-sm mb-2">
                  In opcode documentation, stack arguments are referred to alphabetically, beginning with the deepest
                  argument as A:
                </p>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Arguments are popped from stack and results pushed to it</li>
                  <li>• Type requirements are specified for each opcode</li>
                  <li>• Operations fail if specified type is incorrect</li>
                  <li>• Multiple results are named for clarity concerning stack positions</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">Operation Failures</h3>
              <div className="bg-red-900/20 border border-red-600 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <h4 className="text-red-300 font-semibold">Critical Failures</h4>
                </div>
                <ul className="text-red-200 text-sm space-y-1">
                  <li>• Some operations immediately fail the program</li>
                  <li>• A transaction checked by a failed program is not valid</li>
                  <li>• Stack underflow (accessing non-existent stack positions)</li>
                  <li>• Type mismatches for opcode requirements</li>
                  <li>• Exceeding stack depth or byte-array size limits</li>
                </ul>
              </div>
            </Card>

            {/* What AVM Programs Cannot Do */}
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">What AVM Programs Cannot Do</h2>
              <p className="text-gray-300 mb-4">
                While the AVM is powerful and flexible, there are important limitations designed to ensure security,
                determinism, and network performance:
              </p>

              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Network and External Access</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Cannot make HTTP requests or access external APIs</li>
                    <li>• Cannot access the internet or external data sources</li>
                    <li>• Cannot communicate with other blockchains directly</li>
                    <li>• No file system access or local storage</li>
                  </ul>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Non-Deterministic Operations</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Cannot generate true random numbers (must use VRF or external randomness)</li>
                    <li>• Cannot access current wall-clock time (only block timestamps)</li>
                    <li>• Cannot perform floating-point arithmetic</li>
                    <li>• No access to system-specific information</li>
                  </ul>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Resource and Performance Limits</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Cannot exceed opcode budget limits</li>
                    <li>• Cannot create infinite loops or unbounded recursion</li>
                    <li>• Limited memory and storage access</li>
                    <li>• Cannot access arbitrary blockchain state without proper references</li>
                  </ul>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">State and Transaction Limitations</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Cannot modify past transactions or blocks</li>
                    <li>• Cannot directly transfer Algos or assets (must use inner transactions)</li>
                    <li>• Cannot access private keys or perform arbitrary cryptographic operations</li>
                    <li>• Limited to predefined transaction types and operations</li>
                  </ul>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Programming Model Constraints</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• No dynamic memory allocation</li>
                    <li>• No garbage collection or automatic memory management</li>
                    <li>• Limited data types (only uint64 and bytes)</li>
                    <li>• No object-oriented programming constructs</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4 mt-6">
                <div className="flex items-center mb-2">
                  <Zap className="h-5 w-5 text-blue-500 mr-2" />
                  <h4 className="text-blue-300 font-semibold">Design Philosophy</h4>
                </div>
                <p className="text-blue-200 text-sm">
                  These limitations are intentional design choices that ensure AVM programs are deterministic, secure,
                  and efficient. They prevent common smart contract vulnerabilities while maintaining high performance
                  and predictable execution costs.
                </p>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <Link href="/docs/smart-contracts/teal">
                <Button className="bg-[#6104d7] hover:bg-[#6104d7]/90">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to TEAL
                </Button>
              </Link>
              <Link href="/docs">
                <Button className="bg-[#6104d7] hover:bg-[#6104d7]/90">
                  Back to Documentation
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
