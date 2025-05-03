"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PythonListsPage() {
  return (
    <div>
      <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-indigo-400/20">
        <h1 className="text-3xl font-bold text-white mb-6">Lists</h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            Before we go over dictionaries, which are the most common datatype when sending and receiving information
            between applications (back-end to front-end, front-end to back-end, or back-end to websites, etc.), and this
            is especially true when interacting with the Algorand blockchain, I think it's important to have an
            understanding of how lists work.
          </p>

          <p className="text-gray-300 mb-6">Below is an example of a list:</p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">my_list = [7, "Hello", False, 63.5]</pre>
          </div>

          <p className="text-gray-300 mb-6">
            A list can hold all types of data, and you can have all kinds of data in one list. You use lists when you
            need exactly that, a list. Lists are also mutable, as opposed to tuples—which means we can rearrange,
            extend, and replace items in a list, meaning they're super flexible!
          </p>

          <p className="text-gray-300 mb-6">
            A list is a collection of data enclosed between square brackets [ ], and separated by commas. An example of
            common kinds of data you would have in a list on Algorand could be one that has asset ID's.
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">asset_ids = [1126597502, 1138580612, 408593267]</pre>
          </div>

          <p className="text-gray-300 mb-6">Or perhaps a list of addresses:</p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`addresses = [
'WWYLMYPM2Y5NIIZITFA05N73A4ZTZQWX6TNP23U37LQ6WWF543SRTGKWUU',
'7IWZ342UGNQ2JVS2EAGFDAMFUNLAZIWDYNFZIANRAU7WZXODRPQCNSYY',
'H2573JK6JIJXILONBBZOHX6BKPXEM2VVXNRFSUEOGKFD5ZD24PM33MVA']`}
            </pre>
          </div>

          <p className="text-gray-300 mb-6">
            Although lists don't have to be organized in anyway and are not descriptive, they can be manipulated. For
            example, if you wanted to remove duplicate entries in a list, you could use the set() function.
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">my_list = [1, 1, 2, 3, 4, 4]</pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">List Operations</h2>

          <p className="text-gray-300 mb-6">
            Python lists support various operations that make them powerful and flexible:
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Accessing Elements</h3>

          <p className="text-gray-300 mb-6">
            You can access list elements using their index (position). Python uses zero-based indexing, meaning the
            first element is at index 0.
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`my_list = [7, "Hello", False, 63.5]

# Accessing elements
first_element = my_list[0]    # 7
second_element = my_list[1]   # "Hello"

# Negative indexing (counting from the end)
last_element = my_list[-1]    # 63.5
second_last = my_list[-2]     # False`}
            </pre>
          </div>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Slicing</h3>

          <p className="text-gray-300 mb-6">
            You can extract a portion of a list using slicing. The syntax is <code>list[start:end:step]</code>, where
            <code>start</code> is inclusive and <code>end</code> is exclusive.
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`my_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Slicing examples
first_three = my_list[0:3]     # [0, 1, 2]
middle_elements = my_list[3:7] # [3, 4, 5, 6]
every_second = my_list[::2]    # [0, 2, 4, 6, 8]
reversed_list = my_list[::-1]  # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]`}
            </pre>
          </div>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Modifying Lists</h3>

          <p className="text-gray-300 mb-6">
            Lists are mutable, which means you can change their content after creation:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`# Changing an element
my_list = [1, 2, 3, 4]
my_list[2] = 30
print(my_list)  # [1, 2, 30, 4]

# Adding elements
my_list.append(5)       # Adds to the end: [1, 2, 30, 4, 5]
my_list.insert(0, 0)    # Insert at index 0: [0, 1, 2, 30, 4, 5]
my_list.extend([6, 7])  # Add multiple items: [0, 1, 2, 30, 4, 5, 6, 7]

# Removing elements
my_list.remove(30)      # Removes first occurrence of 30: [0, 1, 2, 4, 5, 6, 7]
popped_value = my_list.pop()  # Removes and returns last item: 7, list becomes [0, 1, 2, 4, 5, 6]
popped_index = my_list.pop(2) # Removes and returns item at index 2: 2, list becomes [0, 1, 4, 5, 6]
del my_list[1]          # Deletes item at index 1: [0, 4, 5, 6]`}
            </pre>
          </div>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">List Methods</h3>

          <p className="text-gray-300 mb-6">Python provides many built-in methods for working with lists:</p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`my_list = [3, 1, 4, 1, 5, 9, 2, 6]

# Sorting
my_list.sort()              # Sorts in-place: [1, 1, 2, 3, 4, 5, 6, 9]
my_list.sort(reverse=True)  # Descending order: [9, 6, 5, 4, 3, 2, 1, 1]

# Other operations
my_list.reverse()           # Reverses in-place: [1, 1, 2, 3, 4, 5, 6, 9]
count_of_ones = my_list.count(1)  # Counts occurrences of 1: 2
index_of_five = my_list.index(5)  # Finds index of first 5: 5

# Creating a copy
list_copy = my_list.copy()  # Creates a shallow copy

# Clearing a list
my_list.clear()             # Removes all items: []`}
            </pre>
          </div>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">List Comprehensions</h3>

          <p className="text-gray-300 mb-6">
            List comprehensions provide a concise way to create lists based on existing lists:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`# Basic list comprehension
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]  # [1, 4, 9, 16, 25]

# With condition
even_squares = [x**2 for x in numbers if x % 2 == 0]  # [4, 16]

# Nested list comprehension
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]  # [1, 2, 3, 4, 5, 6, 7, 8, 9]`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Lists in Algorand Development</h2>

          <p className="text-gray-300 mb-6">
            When working with Algorand, lists are commonly used for various purposes:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`# List of transaction objects
transactions = [
    PaymentTxn(sender, params, receiver, amount),
    AssetTransferTxn(sender, params, receiver, amount, asset_id)
]

# List of asset IDs to track
tracked_assets = [12345, 67890, 54321]

# List of account addresses
accounts = [
    "WWYLMYPM2Y5NIIZITFA05N73A4ZTZQWX6TNP23U37LQ6WWF543SRTGKWUU",
    "7IWZ342UGNQ2JVS2EAGFDAMFUNLAZIWDYNFZIANRAU7WZXODRPQCNSYY"
]

# Processing transactions in a group
signed_group = []
for tx in transactions:
    signed_tx = tx.sign(private_key)
    signed_group.append(signed_tx)

# Send the group of transactions
algod_client.send_transactions(signed_group)`}
            </pre>
          </div>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Common List Patterns in Algorand</h3>

          <p className="text-gray-300 mb-6">Here are some common patterns when using lists in Algorand development:</p>

          <ul className="space-y-4 text-gray-300 mb-8">
            <li>
              <strong className="text-indigo-300">Transaction Groups:</strong> Lists are used to group multiple
              transactions that should be executed atomically.
            </li>
            <li>
              <strong className="text-indigo-300">Asset Management:</strong> Tracking multiple assets and their IDs.
            </li>
            <li>
              <strong className="text-indigo-300">Account Management:</strong> Managing multiple account addresses and
              their associated information.
            </li>
            <li>
              <strong className="text-indigo-300">Block Processing:</strong> Processing lists of transactions within
              blocks.
            </li>
          </ul>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`# Example: Creating a transaction group
from algosdk.future.transaction import PaymentTxn, AssetTransferTxn, assign_group_id

# Create transactions
txn1 = PaymentTxn(sender, params, receiver1, 1000000)
txn2 = AssetTransferTxn(sender, params, receiver2, 10, asset_id)

# Group them
transaction_group = [txn1, txn2]
grouped_transactions = assign_group_id(transaction_group)

# Sign them
signed_transactions = [tx.sign(private_key) for tx in grouped_transactions]

# Submit the group
algod_client.send_transactions(signed_transactions)`}
            </pre>
          </div>
        </div>

        <div className="flex justify-between mt-10">
          <Link href="/learn/python/variables">
            <Button variant="outline" className="border-indigo-400/20 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Variables
            </Button>
          </Link>
          <Link href="/learn/python/dictionaries">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Next: Dictionaries <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
