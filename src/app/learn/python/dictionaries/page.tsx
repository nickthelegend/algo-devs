"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PythonDictionariesPage() {
  return (
    <div>
      <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-indigo-400/20">
        <h1 className="text-3xl font-bold text-white mb-6">Dictionaries</h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            Now we'll dive into a bit more advanced data structures, dictionaries! A dictionary is like a list, except
            it uses curly brackets {"{"} {"}"} instead of square brackets [ ], and it uses key-value pairs instead of
            just values.
          </p>

          <p className="text-gray-300 mb-6">Here's an example of a dictionary:</p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`my_dict = {
    "name": "John",
    "age": 30,
    "city": "New York",
    "is_student": False
}`}
            </pre>
          </div>

          <p className="text-gray-300 mb-6">
            Dictionaries are collections of key-value pairs, where each key is unique and maps to a specific value. They
            are incredibly useful for storing structured data where you need to access values by their keys rather than
            by position.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Creating Dictionaries</h2>

          <p className="text-gray-300 mb-6">There are several ways to create dictionaries in Python:</p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`# Using curly braces
person = {
    "name": "Alice",
    "age": 25,
    "skills": ["Python", "JavaScript", "SQL"]
}

# Using dict() constructor
person = dict(name="Alice", age=25)

# Creating an empty dictionary
empty_dict = {}
another_empty = dict()

# From a list of tuples
items = [("name", "Bob"), ("age", 30)]
person = dict(items)`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Accessing Dictionary Values</h2>

          <p className="text-gray-300 mb-6">You can access dictionary values using their keys:</p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`person = {"name": "John", "age": 30, "city": "New York"}

# Accessing values
name = person["name"]     # "John"
age = person["age"]       # 30

# Using get() method (safer, returns None if key doesn't exist)
city = person.get("city")  # "New York"
country = person.get("country")  # None
country = person.get("country", "Unknown")  # "Unknown" (default value)`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Modifying Dictionaries</h2>

          <p className="text-gray-300 mb-6">
            Dictionaries are mutable, so you can add, change, or remove key-value pairs:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`person = {"name": "John", "age": 30}

# Adding new key-value pairs
person["city"] = "New York"
person["is_student"] = False

# Modifying existing values
person["age"] = 31

# Updating multiple key-value pairs at once
person.update({"age": 32, "job": "Developer", "country": "USA"})

# Removing key-value pairs
removed_age = person.pop("age")  # Removes and returns the value
del person["city"]               # Removes the key-value pair

# Removing all items
person.clear()  # Empties the dictionary`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Dictionary Methods</h2>

          <p className="text-gray-300 mb-6">Python provides several useful methods for working with dictionaries:</p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`person = {"name": "John", "age": 30, "city": "New York"}

# Getting all keys
keys = person.keys()      # dict_keys(['name', 'age', 'city'])

# Getting all values
values = person.values()  # dict_values(['John', 30, 'New York'])

# Getting all key-value pairs as tuples
items = person.items()    # dict_items([('name', 'John'), ('age', 30), ('city', 'New York')])

# Checking if a key exists
has_name = "name" in person  # True
has_country = "country" in person  # False

# Creating a copy
person_copy = person.copy()

# Getting the number of key-value pairs
size = len(person)  # 3`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Nested Dictionaries</h2>

          <p className="text-gray-300 mb-6">
            Dictionaries can contain other dictionaries as values, creating nested structures:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`# Nested dictionary
user = {
    "id": 1,
    "name": "John Smith",
    "contact": {
        "email": "john@example.com",
        "phone": "555-1234",
        "address": {
            "street": "123 Main St",
            "city": "New York",
            "zip": "10001"
        }
    },
    "preferences": {
        "theme": "dark",
        "notifications": True
    }
}

# Accessing nested values
email = user["contact"]["email"]  # "john@example.com"
city = user["contact"]["address"]["city"]  # "New York"`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Dictionary Comprehensions</h2>

          <p className="text-gray-300 mb-6">
            Similar to list comprehensions, dictionary comprehensions provide a concise way to create dictionaries:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`# Creating a dictionary of squares
squares = {x: x**2 for x in range(6)}  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# With condition
even_squares = {x: x**2 for x in range(10) if x % 2 == 0}  # {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}

# Transforming keys and values
names = ["Alice", "Bob", "Charlie"]
name_lengths = {name: len(name) for name in names}  # {'Alice': 5, 'Bob': 3, 'Charlie': 7}`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Dictionaries in Algorand Development</h2>

          <p className="text-gray-300 mb-6">
            Dictionaries are extensively used in Algorand development for various purposes:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`# Transaction parameters as a dictionary
txn_params = {
    "sender": "WWYLMYPM2Y5NIIZITFA05N73A4ZTZQWX6TNP23U37LQ6WWF543SRTGKWUU",
    "receiver": "7IWZ342UGNQ2JVS2EAGFDAMFUNLAZIWDYNFZIANRAU7WZXODRPQCNSYY",
    "amount": 1000000,  # 1 Algo
    "note": "Payment for services",
    "fee": 1000,
    "first": 12345,
    "last": 12346,
    "genesis_hash": "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI="
}

# Asset configuration
asset_config = {
    "total": 1000000,
    "decimals": 0,
    "default_frozen": False,
    "unit_name": "EXMPL",
    "asset_name": "Example Token",
    "manager": manager_address,
    "reserve": reserve_address,
    "freeze": freeze_address,
    "clawback": clawback_address,
    "url": "https://example.com",
    "metadata_hash": "16efaa3924a6fd9d3a4824799a4ac65d"
}

# Account information
account_info = {
    "address": "WWYLMYPM2Y5NIIZITFA05N73A4ZTZQWX6TNP23U37LQ6WWF543SRTGKWUU",
    "amount": 5000000,
    "amount-without-pending-rewards": 5000000,
    "assets": [
        {
            "amount": 1000,
            "asset-id": 12345,
            "creator": "7IWZ342UGNQ2JVS2EAGFDAMFUNLAZIWDYNFZIANRAU7WZXODRPQCNSYY",
            "is-frozen": False
        }
    ],
    "created-apps": [],
    "created-assets": [
        {
            "index": 12345,
            "params": {
                "clawback": "WWYLMYPM2Y5NIIZITFA05N73A4ZTZQWX6TNP23U37LQ6WWF543SRTGKWUU",
                "creator": "WWYLMYPM2Y5NIIZITFA05N73A4ZTZQWX6TNP23U37LQ6WWF543SRTGKWUU",
                "decimals": 0,
                "default-frozen": False,
                "freeze": "WWYLMYPM2Y5NIIZITFA05N73A4ZTZQWX6TNP23U37LQ6WWF543SRTGKWUU",
                "manager": "WWYLMYPM2Y5NIIZITFA05N73A4ZTZQWX6TNP23U37LQ6WWF543SRTGKWUU",
                "name": "Example Token",
                "reserve": "WWYLMYPM2Y5NIIZITFA05N73A4ZTZQWX6TNP23U37LQ6WWF543SRTGKWUU",
                "total": 1000000,
                "unit-name": "EXMPL"
            }
        }
    ]
}`}
            </pre>
          </div>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">JSON and Dictionaries</h3>

          <p className="text-gray-300 mb-6">
            When working with APIs, including the Algorand API, data is often exchanged in JSON format, which maps
            directly to Python dictionaries:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`import json

# Converting dictionary to JSON string
account_info_json = json.dumps(account_info, indent=2)

# Converting JSON string back to dictionary
parsed_info = json.loads(account_info_json)

# Working with Algorand API responses
response = algod_client.account_info(address)
balance = response["amount"]
assets = response["assets"]

for asset in assets:
    asset_id = asset["asset-id"]
    asset_balance = asset["amount"]
    print(f"Asset ID: {asset_id}, Balance: {asset_balance}")`}
            </pre>
          </div>

          <p className="text-gray-300 mb-6">
            Dictionaries are one of the most important data structures in Python, especially when working with Algorand
            and other blockchain technologies. They provide a flexible way to structure and access data, making them
            essential for any Python developer.
          </p>
        </div>

        <div className="flex justify-between mt-10">
          <Link href="/learn/python/lists">
            <Button variant="outline" className="border-indigo-400/20 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Lists
            </Button>
          </Link>
          <Link href="/learn/python/functions">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Next: Functions <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
