"use client"

import { JavaScriptSidebar } from "@/components/learn/javascript-sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function JavaScriptVariablesPage() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar for navigation */}
      <div className="hidden lg:block w-64">
        <JavaScriptSidebar activeItem="variables" />
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-indigo-400/20">
          <h1 className="text-3xl font-bold text-white mb-6">Variables</h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              In JavaScript, variables are containers for storing data values. JavaScript provides different ways to
              declare variables: <code>var</code>, <code>let</code>, and <code>const</code>.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Variable Declaration</h2>

            <p className="text-gray-300 mb-6">There are three ways to declare variables in JavaScript:</p>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`// Using var (older way, function-scoped)
var age = 25;

// Using let (block-scoped, can be reassigned)
let name = "John";

// Using const (block-scoped, cannot be reassigned)
const PI = 3.14159;`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Variable Scope</h2>

            <p className="text-gray-300 mb-6">
              Variables declared with <code>var</code> are function-scoped, while variables declared with{" "}
              <code>let</code> and <code>const</code> are block-scoped.
            </p>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`// Function scope with var
function exampleFunction() {
  var x = 10;
  if (true) {
    var x = 20; // Same variable, x is now 20
    console.log(x); // 20
  }
  console.log(x); // 20
}

// Block scope with let
function exampleBlockScope() {
  let y = 10;
  if (true) {
    let y = 20; // Different variable, only exists in this block
    console.log(y); // 20
  }
  console.log(y); // 10
}`}
                only exists in this block console.log(y); // 20 } console.log(y); // 10 }`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Variable Hoisting</h2>

            <p className="text-gray-300 mb-6">
              Variables declared with <code>var</code> are hoisted to the top of their scope, while variables declared
              with <code>let</code> and <code>const</code> are not hoisted in the same way.
            </p>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`// Hoisting with var
console.log(x); // undefined (not an error)
var x = 5;

// Hoisting with let (results in error)
// console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 5;`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Data Types in JavaScript</h2>

            <p className="text-gray-300 mb-6">JavaScript variables can hold different data types:</p>

            <ul className="space-y-4 text-gray-300 mb-8">
              <li>
                <strong className="text-indigo-300">String:</strong> Text values enclosed in quotes.
              </li>
              <li>
                <strong className="text-indigo-300">Number:</strong> Numeric values (integers and floating-point).
              </li>
              <li>
                <strong className="text-indigo-300">Boolean:</strong> Logical values (true or false).
              </li>
              <li>
                <strong className="text-indigo-300">Object:</strong> Collections of key-value pairs.
              </li>
              <li>
                <strong className="text-indigo-300">Array:</strong> Ordered collections of values.
              </li>
              <li>
                <strong className="text-indigo-300">Null:</strong> Represents the intentional absence of any value.
              </li>
              <li>
                <strong className="text-indigo-300">Undefined:</strong> Represents a variable that has been declared but
                not assigned a value.
              </li>
            </ul>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`// Different data types
let name = "John";           // String
let age = 30;                // Number
let isActive = true;         // Boolean
let user = {                 // Object
  firstName: "John",
  lastName: "Doe"
};
let colors = ["red", "green", "blue"];  // Array
let empty = null;            // Null
let notDefined;              // Undefined`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Type Coercion</h2>

            <p className="text-gray-300 mb-6">
              JavaScript is a dynamically typed language, which means variables can change their type:
            </p>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`let x = 5;       // x is a number
x = "Hello";    // x is now a string

// Type coercion in operations
console.log("5" + 2);     // "52" (string concatenation)
console.log("5" - 2);     // 3 (numeric subtraction)
console.log("5" * "2");   // 10 (numeric multiplication)
console.log(5 + true);    // 6 (true is coerced to 1)
console.log(5 + false);   // 5 (false is coerced to 0)`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Best Practices for Variables</h2>

            <ul className="space-y-4 text-gray-300 mb-8">
              <li>
                Use <code>const</code> by default, and only use <code>let</code> when you need to reassign a variable.
              </li>
              <li>
                Avoid using <code>var</code> in modern JavaScript code.
              </li>
              <li>Use descriptive variable names that explain what the variable contains.</li>
              <li>
                Use camelCase for variable names (e.g., <code>firstName</code>, <code>totalAmount</code>).
              </li>
              <li>Declare variables at the top of their scope for better readability.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Using Variables with Algorand</h2>

            <p className="text-gray-300 mb-6">
              When working with Algorand in JavaScript, you'll often use variables to store important blockchain-related
              information:
            </p>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`// Algorand-related variables
const algodToken = "";
const algodServer = "https://mainnet-api.algonode.cloud";
const algodPort = "";

// Account information
const accountAddress = "YOURWALLETADDRESSHERE";
const privateKey = "your-private-key"; // Keep this secure!

// Asset information
const assetId = 12345;
const assetAmount = 1000000; // 1 Algo = 1,000,000 microAlgos

// Transaction parameters
const suggestedParams = await algodClient.getTransactionParams().do();
const note = new Uint8Array(Buffer.from("Hello Algorand!"));`}
              </pre>
            </div>
          </div>

          <div className="flex justify-between mt-10">
            <Link href="/learn/javascript">
              <Button variant="outline" className="border-indigo-400/20 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to JavaScript
              </Button>
            </Link>
            <Link href="/learn/javascript/data-types">
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
