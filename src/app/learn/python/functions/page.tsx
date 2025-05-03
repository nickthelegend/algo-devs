"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PythonFunctionsPage() {
  return (
    <div>
      <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-indigo-400/20">
        <h1 className="text-3xl font-bold text-white mb-6">Functions</h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            In Python, a function is a block of code that performs a specific task. Functions help to modularize code,
            making it more readable and reusable.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Defining Functions</h2>

          <p className="text-gray-300 mb-6">
            You define a function using the <code>def</code> keyword, followed by the function name and parentheses
            containing any parameters:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`def greet(name):
    """This function greets the person passed in as a parameter"""
    print(f"Hello, {name}!")
    
# Calling the function
greet("Alice")  # Output: Hello, Alice!`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Function Parameters</h2>

          <p className="text-gray-300 mb-6">Functions can take different types of parameters:</p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Required Parameters</h3>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`def add(a, b):
    return a + b

result = add(5, 3)  # result = 8`}
            </pre>
          </div>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Default Parameters</h3>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))        # "Hello, Alice!"
print(greet("Bob", "Hi"))    # "Hi, Bob!"`}
            </pre>
          </div>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Keyword Arguments</h3>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`def describe_person(name, age, city):
    return f"{name} is {age} years old and lives in {city}."

# Using keyword arguments (order doesn't matter)
print(describe_person(age=30, city="New York", name="Alice"))`}
            </pre>
          </div>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Variable Number of Arguments</h3>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`# *args for variable positional arguments
def sum_all(*numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_all(1, 2, 3, 4))  # 10

# **kwargs for variable keyword arguments
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=30, city="New York")`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Return Values</h2>

          <p className="text-gray-300 mb-6">
            Functions can return values using the <code>return</code> statement:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`def square(x):
    return x * x

result = square(5)  # result = 25

# Multiple return values
def get_min_max(numbers):
    return min(numbers), max(numbers)

minimum, maximum = get_min_max([1, 5, 3, 9, 2])
print(minimum, maximum)  # 1 9`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Scope of Variables</h2>

          <p className="text-gray-300 mb-6">
            Variables defined inside a function have local scope, while variables defined outside have global scope:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`# Global variable
global_var = 10

def my_function():
    # Local variable
    local_var = 20
    print(global_var)  # Can access global variable
    print(local_var)   # Can access local variable

my_function()
print(global_var)      # Can access global variable
# print(local_var)     # Error: local_var is not defined

# Modifying global variables
def modify_global():
    global global_var
    global_var = 30

modify_global()
print(global_var)  # 30`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Lambda Functions</h2>

          <p className="text-gray-300 mb-6">
            Lambda functions are small anonymous functions defined with the <code>lambda</code> keyword:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`# Regular function
def square(x):
    return x * x

# Equivalent lambda function
square_lambda = lambda x: x * x

print(square(5))        # 25
print(square_lambda(5)) # 25

# Lambda with multiple parameters
add = lambda x, y: x + y
print(add(3, 5))  # 8

# Lambda with conditional expression
is_even = lambda x: True if x % 2 == 0 else False
print(is_even(4))  # True
print(is_even(5))  # False`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Higher-Order Functions</h2>

          <p className="text-gray-300 mb-6">
            Functions that take other functions as arguments or return functions are called higher-order functions:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`# Function as an argument
def apply_operation(x, y, operation):
    return operation(x, y)

def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

print(apply_operation(5, 3, add))      # 8
print(apply_operation(5, 3, multiply)) # 15
print(apply_operation(5, 3, lambda a, b: a - b))  # 2

# Function returning a function
def get_multiplier(factor):
    def multiply(x):
        return x * factor
    return multiply

double = get_multiplier(2)
triple = get_multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Built-in Functions</h2>

          <p className="text-gray-300 mb-6">
            Python provides many built-in functions like <code>map()</code>, <code>filter()</code>, and{" "}
            <code>reduce()</code> that work with other functions:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`# map() applies a function to each item in an iterable
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# filter() filters items based on a function
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(even_numbers)  # [2, 4]

# reduce() applies a function cumulatively
from functools import reduce
sum_all = reduce(lambda x, y: x + y, numbers)
print(sum_all)  # 15 (1+2+3+4+5)`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Decorators</h2>

          <p className="text-gray-300 mb-6">Decorators are functions that modify the behavior of other functions:</p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`def timer_decorator(func):
    import time
    
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"Function {func.__name__} took {end_time - start_time:.4f} seconds to run")
        return result
    
    return wrapper

@timer_decorator
def slow_function():
    import time
    time.sleep(1)
    print("Function executed")

slow_function()
# Output:
# Function executed
# Function slow_function took 1.0012 seconds to run`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Functions in Algorand Development</h2>

          <p className="text-gray-300 mb-6">
            Functions are extensively used in Algorand development to organize code and perform specific tasks:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`from algosdk import account, mnemonic
from algosdk.v2client import algod
from algosdk.future.transaction import PaymentTxn

# Function to create an Algorand client
def create_algod_client(algod_address, algod_token):
    """Create and return an Algorand client"""
    return algod.AlgodClient(algod_token, algod_address)

# Function to generate an account
def generate_algorand_account():
    """Generate and return an Algorand account with private key and address"""
    private_key, address = account.generate_account()
    return {
        "private_key": private_key,
        "address": address,
        "mnemonic": mnemonic.from_private_key(private_key)
    }

# Function to create a payment transaction
def create_payment_transaction(sender, receiver, amount, note, params):
    """Create and return a payment transaction"""
    return PaymentTxn(
        sender=sender,
        sp=params,
        receiver=receiver,
        amt=amount,
        note=note.encode()
    )

# Function to sign and send a transaction
def sign_and_send_transaction(client, transaction, private_key):
    """Sign and send a transaction, return the transaction ID"""
    signed_txn = transaction.sign(private_key)
    tx_id = signed_txn.transaction.get_txid()
    
    client.send_transactions([signed_txn])
    
    # Wait for confirmation
    wait_for_confirmation(client, tx_id)
    
    return tx_id

# Function to wait for transaction confirmation
def wait_for_confirmation(client, tx_id):
    """Wait for a transaction to be confirmed"""
    last_round = client.status().get('last-round')
    while True:
        txinfo = client.pending_transaction_info(tx_id)
        if txinfo.get('confirmed-round', 0) > 0:
            print(f"Transaction confirmed in round {txinfo['confirmed-round']}")
            break
        elif client.status().get('last-round') > last_round + 4:
            print("Transaction not confirmed after 4 rounds")
            break
        client.status_after_block(last_round + 1)
        last_round += 1

# Usage example
def main():
    # Initialize client
    algod_address = "https://mainnet-api.algonode.cloud"
    algod_token = ""
    client = create_algod_client(algod_address, algod_token)
    
    # Generate accounts
    sender_account = generate_algorand_account()
    receiver_account = generate_algorand_account()
    
    # Get transaction parameters
    params = client.suggested_params()
    
    # Create transaction
    txn = create_payment_transaction(
        sender=sender_account["address"],
        receiver=receiver_account["address"],
        amount=1000000,  # 1 Algo
        note="Example payment",
        params=params
    )
    
    # Sign and send transaction
    tx_id = sign_and_send_transaction(client, txn, sender_account["private_key"])
    print(f"Transaction ID: {tx_id}")`}
            </pre>
          </div>

          <p className="text-gray-300 mb-6">
            Functions are a fundamental building block in Python programming. They allow you to organize your code into
            reusable, modular components, making your programs more maintainable and easier to understand. When working
            with Algorand, well-designed functions can significantly simplify complex blockchain interactions.
          </p>
        </div>

        <div className="flex justify-between mt-10">
          <Link href="/learn/python/dictionaries">
            <Button variant="outline" className="border-indigo-400/20 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Dictionaries
            </Button>
          </Link>
          <Link href="/learn/python/imports">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Next: Imports <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
