"use client"

export default function PythonImportsPage() {
  return (
    <div>
      <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-indigo-400/20">
        <h1 className="text-3xl font-bold text-white mb-6">Imports</h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            This code begins with module imports, which is a fancy way of saying— "someone wrote some code that does
            something, and I want to use that something." In this case, we're importing modules that will help us
            interact with the Algorand blockchain.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Basic Import Syntax</h2>

          <p className="text-gray-300 mb-6">
            Python provides several ways to import modules and their components:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`# Import an entire module
import math

# Use functions from the module
radius = 5
area = math.pi * math.pow(radius, 2)
print(f"Area of circle: {area}")

# Import specific items from a module
from math import pi, sqrt

# Use the imported items directly
area = pi * radius ** 2
print(f"Area of circle: {area}")
print(f"Square root of 16: {sqrt(16)}")

# Import with an alias
import numpy as np

array = np.array([1, 2, 3, 4, 5])
print(f"Mean: {np.mean(array)}")

# Import all items from a module (not recommended in production code)
from math import *
print(sin(pi/2))  # 1.0`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Python Standard Library</h2>

          <p className="text-gray-300 mb-6">
            Python comes with a rich standard library that provides modules for various tasks:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`# Working with dates and times
import datetime
current_time = datetime.datetime.now()
print(f"Current time: {current_time}")

# File operations
import os
import shutil

# Check if a file exists
if os.path.exists("example.txt"):
    # Read file content
    with open("example.txt", "r") as file:
        content = file.read()
    
    # Create a backup
    shutil.copy("example.txt", "example_backup.txt")

# Working with JSON
import json

data = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# Convert dictionary to JSON string
json_string = json.dumps(data, indent=2)
print(json_string)

# Parse JSON string
parsed_data = json.loads(json_string)
print(f"Name: {parsed_data['name']}")

# Random number generation
import random
print(f"Random number between 1 and 10: {random.randint(1, 10)}")
print(f"Random choice from list: {random.choice(['apple', 'banana', 'cherry'])}")

# Regular expressions
import re
text = "Contact us at info@example.com or support@example.org"
emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', text)
print(f"Emails found: {emails}")

# HTTP requests
import urllib.request
response = urllib.request.urlopen("https://www.example.com")
html = response.read().decode('utf-8')
print(f"First 100 characters of HTML: {html[:100]}")`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Third-Party Libraries</h2>

          <p className="text-gray-300 mb-6">
            Python's ecosystem includes thousands of third-party libraries that can be installed using pip:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`# Install a package (run in terminal)
# pip install requests pandas matplotlib

# HTTP requests with requests library
import requests
response = requests.get("https://api.example.com/data")
data = response.json()

# Data analysis with pandas
import pandas as pd
df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'Los Angeles', 'Chicago']
})
print(df)

# Data visualization with matplotlib
import matplotlib.pyplot as plt
plt.figure(figsize=(10, 5))
plt.bar(['Alice', 'Bob', 'Charlie'], [25, 30, 35])
plt.title('Ages')
plt.xlabel('Person')
plt.ylabel('Age')
plt.savefig('ages_chart.png')`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Creating and Importing Your Own Modules</h2>

          <p className="text-gray-300 mb-6">
            You can create your own modules to organize your code better:
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`# File: my_module.py
def greet(name):
    return f"Hello, {name}!"

def calculate_square(x):
    return x * x

PI = 3.14159

# In another file
import my_module

print(my_module.greet("Alice"))  # Hello, Alice!
print(my_module.calculate_square(5))  # 25
print(my_module.PI)  # 3.14159

# Or import specific items
from my_module import greet, PI

print(greet("Bob"))  # Hello, Bob!
print(PI)  # 3.14159`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Package Structure</h2>

          <p className="text-gray-300 mb-6">
            For larger projects, you can organize your code into packages (directories with an{" "}
            <code>__init__.py</code> file):
          </p>

          <div className="bg-black/60 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              {`# Directory structure
# my_package/
# ├── __init__.py
# ├── module1.py
# └── module2.py

# File: my_package/__init__.py
# This file can be empty or contain initialization code

# File: my_package/module1.py
def function1():
    return "This is function1 from module1"

# File: my_package/module2.py
def function2():
    return "This is function2 from module2"

# In another file
import my_package.module1
print(my_package.module1.function1())

from my_package.module2 import function2
print(function2())`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Relative Imports</h
