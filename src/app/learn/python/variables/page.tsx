"use client"

import { PythonSidebar } from "@/components/learn/python-sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PythonVariablesPage() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar for navigation */}
      <div className="hidden lg:block w-64">
        <PythonSidebar activeItem="variables" />
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-indigo-400/20">
          <h1 className="text-3xl font-bold text-white mb-6">Variables</h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              In Python, we have several data types that are used to store different kinds of information:
            </p>

            <ul className="space-y-4 text-gray-300 mb-8">
              <li>
                <strong className="text-indigo-300">Integer:</strong> Represents whole numbers without a decimal
                component.
              </li>
              <li>
                <strong className="text-indigo-300">String:</strong> A sequence of characters enclosed within quotes.
              </li>
              <li>
                <strong className="text-indigo-300">Float:</strong> Represents numbers that contain a decimal point.
              </li>
              <li>
                <strong className="text-indigo-300">Boolean:</strong> Represents one of two values, True or False.
              </li>
              <li>
                <strong className="text-indigo-300">List:</strong> An ordered collection of items enclosed within square
                brackets.
              </li>
              <li>
                <strong className="text-indigo-300">Dictionary:</strong> A collection of key-value pairs enclosed within
                curly braces.
              </li>
              <li>
                <strong className="text-indigo-300">Tuple:</strong> An ordered collection of items enclosed within
                parentheses.
              </li>
            </ul>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`my_number = 1000    # Integer
my_text = "Hello!"   # String
my_float = 7.5      # Float
my_bool_1 = True    # Boolean
my_bool_2 = False   # Boolean
my_list = []        # List
my_dictionary = {}  # Dictionary
my_tuple = (1, 2, 3)  # Tuple`}
              </pre>
            </div>

            <p className="text-gray-300 mb-6">
              These data types are essential for storing and manipulating different kinds of information in Python.
            </p>

            <p className="text-gray-300 mb-6">
              The name you see before the '=' is what's called a "variable". You can name it whatever you want! Above
              you can see how I named my variables eg: my_number, my_text, my_float, my_bool_1.
            </p>

            <p className="text-gray-300 mb-6">
              It's good practice to name your variable relevant to its purpose. For example if I was creating a variable
              that would represent the cash price of an item, I might name it something like:
            </p>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`item_cost = 1                # The cost of an item, which will be 1 dollar
supply_remaining = 2_500_000_000  # The number of items in inventory that are remaining
name_CID = "John Woods"`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Variable Naming Rules</h2>

            <p className="text-gray-300 mb-6">
              When naming variables in Python, there are certain rules and conventions to follow:
            </p>

            <ul className="space-y-4 text-gray-300 mb-8">
              <li>
                Variable names must start with a letter or underscore (_), followed by letters, numbers, or underscores.
              </li>
              <li>Variable names are case-sensitive (age, Age, and AGE are three different variables).</li>
              <li>
                Variable names cannot be Python keywords (like <code>if</code>, <code>for</code>, <code>while</code>,
                etc.).
              </li>
              <li>
                By convention, variable names should be lowercase with words separated by underscores (snake_case),
                e.g., <code>item_price</code>, <code>user_name</code>.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Variable Assignment</h2>

            <p className="text-gray-300 mb-6">
              In Python, you can assign values to variables using the equals sign (=). You can also assign multiple
              variables at once:
            </p>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`# Single assignment
x = 10

# Multiple assignment
a, b, c = 1, 2, 3

# Assigning the same value to multiple variables
x = y = z = 0`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Variable Reassignment</h2>

            <p className="text-gray-300 mb-6">
              Python variables can be reassigned to different values or even different data types:
            </p>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`x = 10       # x is an integer
print(x)     # Output: 10

x = "hello"  # Now x is a string
print(x)     # Output: hello

x = [1, 2, 3]  # Now x is a list
print(x)     # Output: [1, 2, 3]`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Using Variables in Expressions</h2>

            <p className="text-gray-300 mb-6">
              Variables can be used in expressions to perform calculations or manipulate data:
            </p>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`# Arithmetic operations
x = 10
y = 5
sum_result = x + y      # 15
diff_result = x - y     # 5
prod_result = x * y     # 50
div_result = x / y      # 2.0 (division always returns a float)
int_div_result = x // y # 2 (integer division)
mod_result = x % y      # 0 (remainder)
exp_result = x ** y     # 100000 (exponentiation)

# String operations
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name  # "John Doe" (concatenation)
greeting = f"Hello, {full_name}!"         # "Hello, John Doe!" (f-string)`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Type Conversion</h2>

            <p className="text-gray-300 mb-6">You can convert between different data types using built-in functions:</p>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`# Converting between types
x = 10
x_float = float(x)    # 10.0
x_str = str(x)        # "10"
x_bool = bool(x)      # True (non-zero numbers are True)

y = "20"
y_int = int(y)        # 20
y_float = float(y)    # 20.0

z = 0
z_bool = bool(z)      # False (zero is False)`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Constants</h2>

            <p className="text-gray-300 mb-6">
              Python doesn't have built-in constant types, but by convention, constants are written in all capital
              letters with underscores separating words:
            </p>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`PI = 3.14159
MAX_CONNECTIONS = 1000
DEFAULT_USERNAME = "guest"`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Variable Scope</h2>

            <p className="text-gray-300 mb-6">
              Variables in Python have different scopes, which determine where they can be accessed:
            </p>

            <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`# Global variable
global_var = 100

def my_function():
    # Local variable
    local_var = 200
    print(global_var)  # Can access global variable
    print(local_var)   # Can access local variable

my_function()
print(global_var)      # Can access global variable
# print(local_var)     # Error: local_var is not defined in this scope`}
              </pre>
            </div>
          </div>

          <div className="flex justify-between mt-10">
            <Link href="/learn/python">
              <Button variant="outline" className="border-indigo-400/20 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Python
              </Button>
            </Link>
            <Link href="/learn/python/lists">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Next: Lists <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
