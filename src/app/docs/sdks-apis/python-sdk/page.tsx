"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Code, Zap, CheckCircle, AlertTriangle, Cpu, Database } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function PythonSDKPage() {
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
            <h1 className="text-5xl font-bold text-white mb-6">Algorand Python SDK</h1>
            <p className="text-xl text-gray-300 mb-8">
              A partial implementation of Python for the Algorand Virtual Machine
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">What is Algorand Python?</h2>
              <p className="text-gray-300 mb-4">
                Algorand Python is a partial implementation of the Python programming language that runs on the Algorand
                Virtual Machine (AVM). It includes a statically typed framework for the development of Algorand Smart
                Contracts and Logic Signatures, with Pythonic interfaces to underlying AVM functionality.
              </p>
              <p className="text-gray-300">
                Algorand Python is compiled for execution on the AVM by PuyaPy, an optimizing compiler that ensures the
                resulting AVM bytecode execution semantics match the given Python code. PuyaPy produces output that is
                directly compatible with AlgoKit typed clients, simplifying the process of deployment and calling. This
                allows developers to use standard Python tooling in their workflow.
              </p>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Benefits of Using Algorand Python</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Zap className="h-6 w-6 text-[#6104d7] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Rapid Development</h3>
                      <p className="text-gray-300">
                        Python's concise syntax allows for quick prototyping and iteration of smart contract ideas.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Code className="h-6 w-6 text-[#ec0033] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Lower Barrier to Entry</h3>
                      <p className="text-gray-300">
                        Python's popularity means more developers can transition into blockchain development without
                        learning a new language.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#6104d7] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Ease of Use</h3>
                      <p className="text-gray-300">
                        Designed to work with standard Python tooling, making it easy for Python developers to start
                        building smart contracts.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Cpu className="h-6 w-6 text-[#ec0033] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Efficiency</h3>
                      <p className="text-gray-300">
                        Compiled by PuyaPy optimizer that ensures AVM bytecode execution semantics match Python code.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Database className="h-6 w-6 text-[#6104d7] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Modularity</h3>
                      <p className="text-gray-300">
                        Supports modular and loosely coupled solution components, facilitating efficient parallel
                        development by small teams.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Python Implementation for AVM</h2>
              <p className="text-gray-300 mb-4">
                Algorand Python maintains the syntax and semantics of Python, supporting a subset of the language that
                will grow over time. However, due to the restricted nature of the AVM, it will never be a complete
                implementation. For example, async and await keywords are not supported as they don't make sense in the
                AVM context.
              </p>
              <p className="text-gray-300">
                This partial implementation allows existing developer tools like IDE syntax highlighting, static type
                checkers, linters, and auto-formatters to work out of the box. This approach differs from other partial
                language implementations that add or alter language elements, which require custom tooling support and
                force developers to learn non-obvious differences from regular Python.
              </p>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">AVM Types and Python Equivalents</h2>
              <div className="space-y-4">
                <p className="text-gray-300 mb-4">The basic types of the AVM are:</p>
                <div className="bg-black/40 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#6104d7] font-mono">uint64</span>
                    <span className="text-gray-300">→ Represented as UInt64 in Algorand Python</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6104d7] font-mono">bytes[]</span>
                    <span className="text-gray-300">→ Represented as Bytes in Algorand Python</span>
                  </div>
                </div>
                <p className="text-gray-300 mt-4">
                  The AVM also supports "bounded" types, such as bigint (represented as BigUInt in Algorand Python),
                  which is a variably sized (up to 512-bit) unsigned integer backed by bytes[].
                </p>
                <p className="text-gray-300 mt-4">
                  It's important to note that these types don't directly map to standard Python primitives. For example,
                  Python's int is signed and effectively unbounded, while a bytes object in Python is limited only by
                  available memory. In contrast, an AVM bytes[] has a maximum length of 4096.
                </p>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Python Primitives</h2>
              <p className="text-gray-300 mb-4">
                Algorand Python has limitations on standard Python primitives due to the constraints of the Algorand
                Virtual Machine (AVM).
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    Supported Primitives
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      • <strong>Bool:</strong> Algorand Python has full support for bool
                    </li>
                    <li>
                      • <strong>Tuple:</strong> Python tuples are supported as arguments to subroutines, local
                      variables, return types
                    </li>
                    <li>
                      • <strong>typing.NamedTuple:</strong> Python named tuples are also supported using
                      typing.NamedTuple
                    </li>
                    <li>
                      • <strong>None:</strong> None is not supported as a value, but is supported as a type annotation
                      to indicate a function returns no value
                    </li>
                  </ul>
                  <p className="text-gray-300 mt-4">
                    The int, str, and bytes built-in types are currently only supported as module-level constants or
                    literals. They can be passed as arguments to various Algorand Python methods that support them or
                    when interacting with certain AVM types.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                    Unsupported Primitives
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      • <strong>Float:</strong> Not supported
                    </li>
                    <li>
                      • <strong>Nested tuples:</strong> Not supported
                    </li>
                  </ul>
                  <p className="text-gray-300 mt-4">
                    Keep in mind, Python's int is unsigned and unbounded, while AVM's uint64 (represented as UInt64 in
                    Algorand Python) is a 64-bit unsigned integer. Similarly, Python's bytes objects are limited only by
                    available memory, whereas AVM's bytes[] (represented as Bytes in Algorand Python) have a maximum
                    length of 4096 bytes.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Unsupported Python Features</h2>
              <div className="space-y-4">
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Due to AVM Limitations</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      • <strong>Exception handling:</strong> raise, try/except/finally not supported
                    </li>
                    <li>
                      • <strong>Context managers:</strong> with statements not available
                    </li>
                    <li>
                      • <strong>Async programming:</strong> async/await keywords not supported
                    </li>
                    <li>
                      • <strong>Closures and lambdas:</strong> Function pointers not available
                    </li>
                    <li>
                      • <strong>Global keyword:</strong> Module-level values must be constants
                    </li>
                    <li>
                      • <strong>Inheritance:</strong> Limited to contract classes only
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">PuyaPy Compiler</h2>
              <p className="text-gray-300 mb-4">
                The PuyaPy compiler is a multi-stage, optimizing compiler that takes Algorand Python and prepares it for
                execution on the Algorand Virtual Machine (AVM). It ensures that the resulting AVM bytecode execution
                semantics match the given Python code. The output produced by PuyaPy is directly compatible with AlgoKit
                typed clients, making deployment and calling of smart contracts easy.
              </p>
              <p className="text-gray-300">
                The PuyaPy compiler is based on the Puya compiler architecture, which allows for multiple frontend
                languages to leverage the majority of the compiler logic. This makes adding new frontend languages for
                execution on Algorand relatively easy.
              </p>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Testing and Debugging</h2>
              <p className="text-gray-300 mb-4">
                The algorand-python-testing package allows for efficient unit testing of Algorand Python smart contracts
                in an offline environment. It emulates key AVM behaviors without requiring a network connection,
                offering fast and reliable testing capabilities with a familiar Pythonic interface.
              </p>
              <div className="bg-black/40 rounded-lg p-4">
                <pre className="text-green-400 text-sm">
                  {`# Example test structure
from algorand_python_testing import AlgodTestClient

def test_my_contract():
    client = AlgodTestClient()
    # Test your contract logic here
    assert contract.method() == expected_result`}
                </pre>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Best Practices</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Write Type-Safe Code</h3>
                  <p className="text-gray-300">
                    Always specify variable types, function parameters, and return values. Static typing is crucial in
                    Algorand Python, differing significantly from standard Python's dynamic typing. This ensures type
                    safety and helps prevent errors in smart contract development.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Leverage Existing Python Knowledge</h3>
                  <p className="text-gray-300">
                    Use familiar Python constructs and patterns where possible to maintain code readability and
                    developer productivity.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Be Aware of AVM Limitations</h3>
                  <p className="text-gray-300">
                    When writing smart contracts, consider the restrictions imposed by the AVM and design your code
                    accordingly to avoid unsupported features.
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
              <Link href="/docs/sdks-apis/typescript-sdk">
                <Button className="bg-[#6104d7] hover:bg-[#6104d7]/90">
                  Next: TypeScript SDK
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
