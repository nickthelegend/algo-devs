"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Code, Zap, CheckCircle, Cpu, Database } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function TypeScriptSDKPage() {
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
            <h1 className="text-5xl font-bold text-white mb-6">Algorand TypeScript SDK</h1>
            <p className="text-xl text-gray-300 mb-8">
              A partial implementation of TypeScript for the Algorand Virtual Machine
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">What is Algorand TypeScript?</h2>
              <p className="text-gray-300 mb-4">
                Algorand TypeScript is a partial implementation of the TypeScript programming language that runs on the
                Algorand Virtual Machine (AVM). It includes a statically typed framework for developing Algorand smart
                contracts and logic signatures, with TypeScript interfaces to underlying AVM functionality that works
                with standard TypeScript tooling.
              </p>
              <p className="text-gray-300">
                It maintains the syntax and semantics of TypeScript, so a developer who knows TypeScript can make safe
                assumptions about the behavior of the compiled code when running on the AVM. Algorand TypeScript is also
                executable TypeScript that can be run and debugged on a Node.js virtual machine with transpilation to
                EcmaScript and run from automated tests.
              </p>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Benefits of Using Algorand TypeScript</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Zap className="h-6 w-6 text-[#6104d7] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Rapid Development</h3>
                      <p className="text-gray-300">
                        TypeScript's concise syntax allows for quick prototyping and iteration of smart contract ideas.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Code className="h-6 w-6 text-[#ec0033] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Lower Barrier to Entry</h3>
                      <p className="text-gray-300">
                        TypeScript's popularity means more developers can transition into blockchain development without
                        learning a new language.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#6104d7] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Ease of Use</h3>
                      <p className="text-gray-300">
                        Designed to work with standard TypeScript tooling, making it easy for TypeScript developers to
                        start building smart contracts.
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
                        Compiled by PuyaTS optimizer that ensures AVM bytecode execution semantics match TypeScript
                        code.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Database className="h-6 w-6 text-[#6104d7] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Modularity</h3>
                      <p className="text-gray-300">
                        Supports modular solution components, facilitating efficient parallel development by small
                        teams.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">TypeScript Implementation for AVM</h2>
              <p className="text-gray-300 mb-4">
                Algorand TypeScript maintains the syntax and semantics of TypeScript, supporting a subset of the
                language that will grow over time. However, due to the restricted nature of the AVM, it will never be a
                complete implementation.
              </p>
              <p className="text-gray-300">
                Algorand TypeScript is compiled for execution on the AVM by PuyaTs, a TypeScript frontend for the Puya
                optimizing compiler that ensures the resulting AVM bytecode execution semantics that match the given
                TypeScript code. PuyaTs produces output directly compatible with AlgoKit-typed clients to simplify
                deployment and calling.
              </p>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Key Differences from Standard TypeScript</h2>
              <div className="space-y-4">
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Types Affect Behavior</h3>
                  <p className="text-gray-300 mb-2">
                    In TypeScript, using types, as expressions, or type arguments don't affect the compiled JS. In
                    Algorand TypeScript, however, types fundamentally change the compiled TEAL. For example, the literal
                    expression 1 results in int 1 in TEAL, but 1 as uint8 results in byte 0x01. This also means that
                    arithmetic is done differently on these numbers and they have different overflow protections.
                  </p>
                  <div className="bg-black/40 rounded-lg p-3 mt-2">
                    <pre className="text-green-400 text-sm">
                      {`// Standard: 1 results in int 1 in TEAL
const value = 1;

// Typed: 1 as uint8 results in byte 0x01
const typedValue = 1 as uint8;`}
                    </pre>
                  </div>
                </div>
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Numbers Can Be Bigger</h3>
                  <p className="text-gray-300">
                    In TypeScript, numeric literals with absolute values equal to 2^53 or greater are too large to be
                    represented accurately as integers. In Algorand TypeScript, however, numeric literals can be much
                    larger (up to 2^512) if properly type cast as uint512.
                  </p>
                </div>
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Types May Be Required</h3>
                  <p className="text-gray-300">
                    All JavaScript is valid TypeScript, but that is not the case with Algorand TypeScript. In certain
                    cases, types are required and the compiler will throw an error if they are missing. For example,
                    types are always required when defining a method or when defining an array.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Supported Primitives</h2>
              <p className="text-gray-300 mb-4">
                Algorand TypeScript supports several primitive types and data structures that are optimized for
                blockchain operations. These primitives are designed to work efficiently with the AVM while maintaining
                familiar TypeScript syntax.
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Static Arrays</h3>
                  <p className="text-gray-300 mb-2">
                    Static arrays are the most efficient and capable type of arrays in TypeScript for Algorand
                    development. They have a fixed length and offer improved performance and type safety.
                  </p>
                  <div className="bg-black/40 rounded-lg p-3">
                    <pre className="text-green-400 text-sm">
                      {`// Example: Array of 10 unsigned 64-bit integers
StaticArray<uint64, 10>

// Static arrays can be partially initialized
const x: StaticArray<uint64, 3> = [1]      // [1, undefined, undefined]
const y: StaticArray<uint64, 3> = [1, 0, 0] // [1, 0, 0]

// Iteration example
staticArrayIteration(): uint64 {
  const a: StaticArray<uint64, 3> = [1, 2, 3];
  let sum = 0;
  
  for (const v of a) {
    sum += v;
  }
  return sum; // 6
}`}
                    </pre>
                  </div>
                  <p className="text-gray-300 mt-2">
                    <strong>Supported Methods:</strong> length
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Dynamic Arrays</h3>
                  <p className="text-gray-300 mb-2">
                    Dynamic arrays are supported in Algorand TypeScript. Algorand TypeScript will chop off the length
                    prefix of dynamic arrays during runtime. Nested dynamic types are encoded as dynamic tuples.
                  </p>
                  <p className="text-gray-300">
                    <strong>Supported Methods:</strong> pop, push, splice, length
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Objects</h3>
                  <p className="text-gray-300 mb-2">
                    Objects can be defined much like in TypeScript. The same efficiencies of static vs dynamic types
                    also apply to objects. Under the hood, Algorand TypeScript objects are just tuples.
                  </p>
                  <div className="bg-black/40 rounded-lg p-3">
                    <pre className="text-green-400 text-sm">
                      {`// These result in the same byteslice:
[uint64, uint8]
{ foo: uint64, bar: uint8 }

// Example usage
type MyType = { foo: uint64, bar: uint8 }
const x: MyType = { foo: 1, bar: 2}
const y: MyType = { bar: 2, foo: 1 }`}
                    </pre>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Number Types</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Integers</h3>
                  <p className="text-gray-300 mb-2">
                    The Algorand Virtual Machine (AVM) natively supports unsigned 64-bit integers (uint64). Using uint64
                    for numeric operations ensures optimal performance. You can define specific-width unsigned integers
                    with the uint&lt;N&gt; generic type.
                  </p>
                  <div className="bg-black/40 rounded-lg p-3">
                    <pre className="text-green-400 text-sm">
                      {`// Specific-width unsigned integers
uint8, uint16, uint32, uint64, uint128, uint256, uint512

// Correct: Unsigned 64-bit integer
const n1: UInt<64> = 1;

// Correct: Unsigned 8-bit integer
const n2: UInt<8> = 1;`}
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Unsigned Fixed-Point Decimals</h3>
                  <p className="text-gray-300 mb-2">
                    To represent decimal values, use the ufixed&lt;N, M&gt; generic type. The first type argument is the
                    bit width, which must be divisible by 8. The second argument is the number of decimal places, which
                    must be less than 160.
                  </p>
                  <div className="bg-black/40 rounded-lg p-3">
                    <pre className="text-green-400 text-sm">
                      {`// Correct: Unsigned 64-bit with two decimal places
const price: UFixed<64, 2> = 1.23;

// Incorrect: Missing type definition
const invalidPrice = 1.23; // ERROR: Missing type

// Incorrect: Precision exceeds defined decimal places
const invalidPrice2: UFixed<64, 2> = 1.234; // ERROR`}
                    </pre>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Math Operations</h2>
              <p className="text-gray-300 mb-4">
                Algorand TypeScript requires explicit handling of math operations to ensure type safety and prevent
                overflow errors. Basic arithmetic operations (+, -, *, /) are supported but require explicit type
                handling.
              </p>
              <div className="bg-black/40 rounded-lg p-4">
                <pre className="text-green-400 text-sm">
                  {`// Results must be explicitly typed using:

// Constructor
const sum = Uint64(x + y);

// Type annotation
const sum: uint64 = x + y;

// Return type annotation
function add(x: uint64, y: uint64): uint64 { 
  return x + y; 
}

// Overflow handling
const a = UintN8(255);
const b = UintN8(255);
const c = UintN8(a + b); // Error: Overflow

// Better performance approach
const a: uint64 = 255;
const b: uint64 = 255;
const c: uint64 = a + b;
return UintN8(c - 255); // Only convert at the end`}
                </pre>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Pass by Reference</h2>
              <p className="text-gray-300 mb-4">
                All arrays and objects are passed by reference even if in contract state, much like TypeScript. Algorand
                TypeScript, however, will not let a function mutate an array that was passed as an argument. If you wish
                to pass by value you can use clone.
              </p>
              <div className="bg-black/40 rounded-lg p-4">
                <pre className="text-green-400 text-sm">
                  {`const x: uint64[] = [1, 2, 3];
const y = x;
y[0] = 4;

log(y); // [4, 2, 3]
log(x); // [4, 2, 3]

const z = clone(x);
z[1] = 5;

log(x); // [4, 2, 3] note x has NOT changed
log(z); // [4, 5, 3]`}
                </pre>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Limitations</h2>
              <div className="space-y-4">
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <ul className="space-y-2 text-gray-300">
                    <li>• Dynamic types and booleans are much more expensive to use and have some limitations</li>
                    <li>• Nested dynamic arrays (e.g., uint64[][]) are very inefficient and not recommended</li>
                    <li>• Functions cannot mutate arrays passed as arguments</li>
                    <li>• forEach is not supported - use for...of loops instead</li>
                    <li>• Dynamic array splice method is heavy in terms of opcode cost</li>
                    <li>• No Object methods are supported in Algorand TypeScript</li>
                    <li>• Number-related type errors might not show in IDE and only throw during compilation</li>
                    <li>• Static array instantiation using brackets (uint64[10]) is not valid TypeScript syntax</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">PuyaTs Compiler</h2>
              <p className="text-gray-300 mb-4">
                Algorand TypeScript is compiled for execution on the AVM by PuyaTs, a TypeScript frontend for the Puya
                optimizing compiler that ensures the resulting AVM bytecode execution semantics that match the given
                TypeScript code.
              </p>
              <p className="text-gray-300">
                PuyaTs produces output that is directly compatible with AlgoKit typed clients to make deployment and
                calling easy. This seamless integration allows developers to use familiar TypeScript development
                workflows while targeting the Algorand blockchain.
              </p>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Testing and Debugging</h2>
              <p className="text-gray-300 mb-4">
                The algorand-typescript-testing package allows for efficient unit testing of Algorand TypeScript smart
                contracts in an offline environment. It emulates key AVM behaviors without requiring a network
                connection, offering fast and reliable testing capabilities with a familiar TypeScript interface.
              </p>
              <div className="bg-black/40 rounded-lg p-4">
                <pre className="text-green-400 text-sm">
                  {`// Example test structure
import { AlgodTestClient } from 'algorand-typescript-testing';

describe('MyContract', () => {
  it('should execute correctly', () => {
    const client = new AlgodTestClient();
    // Test your contract logic here
    expect(contract.method()).toBe(expectedResult);
  });
});`}
                </pre>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Best Practices</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Use Static Types</h3>
                  <p className="text-gray-300">
                    Always define explicit types for arrays, tuples, and objects to leverage TypeScript's static typing
                    benefits.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Prefer UInt&lt;64&gt;</h3>
                  <p className="text-gray-300">
                    Utilize UInt&lt;64&gt; for numeric operations to align with AVM's native types, enhancing
                    performance and compatibility.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Limit Dynamic Arrays</h3>
                  <p className="text-gray-300">
                    Avoid excessive use of dynamic arrays, especially nested ones, to prevent inefficiencies. Also,
                    splice is rather heavy in terms of opcode cost so it should be used sparingly.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Efficient Iteration</h3>
                  <p className="text-gray-300">
                    Use for...of loops for iterating over arrays, which also enables continue/break functionality.
                  </p>
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <Link href="/docs/sdks-apis/python-sdk">
                <Button className="bg-[#6104d7] hover:bg-[#6104d7]/90">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Python SDK
                </Button>
              </Link>
              <Link href="/docs/sdks-apis/rest-apis">
                <Button className="bg-[#6104d7] hover:bg-[#6104d7]/90">
                  Next: REST APIs
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
