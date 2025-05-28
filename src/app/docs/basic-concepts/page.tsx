"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ArrowRight,
  Blocks,
  Zap,
  Globe,
  Rocket,
  Shield,
  Users,
  Code,
  BookOpen,
  Sparkles,
  Coins,
} from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function BasicConceptsPage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <main className="min-h-screen animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <Link href="/docs" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Documentation
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Basic Concepts</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Understanding the fundamentals of blockchain technology and Algorand development
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* What is a blockchain? */}
          <section className="glass-effect rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mr-4">
                <Blocks className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">What is a blockchain?</h2>
            </div>

            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                A blockchain is a distributed digital ledger that maintains a continuously growing list of records,
                called blocks, which are linked and secured using cryptography. Think of it as a digital notebook that's
                shared across thousands of computers worldwide, where every transaction is recorded permanently and
                transparently.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {[
                  {
                    icon: Shield,
                    title: "Secure",
                    description:
                      "Cryptographic hashing and consensus mechanisms ensure data integrity and prevent tampering.",
                    color: "text-green-400",
                  },
                  {
                    icon: Users,
                    title: "Decentralized",
                    description: "No single point of control - the network is maintained by participants worldwide.",
                    color: "text-purple-400",
                  },
                  {
                    icon: Globe,
                    title: "Transparent",
                    description: "All transactions are publicly visible and verifiable by anyone on the network.",
                    color: "text-blue-400",
                  },
                ].map((item, index) => (
                  <div key={item.title}>
                    <Card className="glass-effect p-6 border-white/10">
                      <item.icon className={`h-8 w-8 ${item.color} mb-4`} />
                      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </Card>
                  </div>
                ))}
              </div>

              <div className="space-y-6 mt-8">
                <h3 className="text-xl font-semibold text-white">Blockchain vs Traditional Database</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="glass-effect p-6 border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-3">🔗 Blockchain Ledger</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      A public ledger distributed across multiple computers ("nodes") in a network. All nodes work
                      together using the same software and rules to verify transactions.
                    </p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Distributed across many computers</li>
                      <li>• Public and transparent</li>
                      <li>• Consensus-based verification</li>
                      <li>• Tamper-proof records</li>
                    </ul>
                  </Card>

                  <Card className="glass-effect p-6 border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-3">🏢 Traditional Database</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      A ledger that lives in a single database on a few computers that only certain people have access
                      to and control.
                    </p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Centralized control</li>
                      <li>• Limited access</li>
                      <li>• Trust-based system</li>
                      <li>• Vulnerable to manipulation</li>
                    </ul>
                  </Card>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">How Blockchain Works:</h4>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      The <strong className="text-blue-400">"block"</strong> refers to a set of transactions that are
                      proposed and verified by network nodes before being added to the ledger. The{" "}
                      <strong className="text-purple-400">"chain"</strong> refers to each block containing cryptographic
                      proof (a hash) of the previous block.
                    </p>
                    <p>
                      This pattern creates a publicly verifiable and tamper-proof record extending back to the genesis
                      block. If anyone attempts to change even a single record in the blockchain's history, it becomes
                      immediately evident and gets rejected by the network.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg p-6 border border-blue-500/20">
                  <h4 className="text-lg font-semibold text-white mb-3">Will Blockchain Benefit Your Application?</h4>
                  <p className="text-gray-300 mb-4">
                    Blockchain innovates how we transfer value. If your application exchanges value in some way,
                    blockchain could elevate it to the next level. Consider these questions:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 text-blue-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">
                        <strong className="text-blue-400">
                          Which blockchain characteristics are important for your use case?
                        </strong>{" "}
                        (Security, decentralization, transparency, efficiency, etc.)
                      </p>
                    </div>
                    <div className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">
                        <strong className="text-green-400">Are those properties lacking in your current design?</strong>{" "}
                        If yes, blockchain could be the solution.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-6 mt-8">
                <h4 className="text-lg font-semibold text-white mb-3">Key Benefits:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-green-400" />
                    Immutable record keeping
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-green-400" />
                    Reduced need for intermediaries
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-green-400" />
                    Global accessibility 24/7
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-green-400" />
                    Programmable money and contracts
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Why Algorand? */}
          <section className="glass-effect rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mr-4">
                <Zap className="h-6 w-6 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Why Algorand?</h2>
            </div>

            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                Algorand is a pure proof-of-stake blockchain that solves the blockchain trilemma of security,
                scalability, and decentralization. It offers instant finality, low fees, and carbon-neutral operations,
                making it ideal for building the next generation of decentralized applications.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {[
                  {
                    icon: Zap,
                    title: "Lightning Fast",
                    description: "4.5 second block times with instant finality - no waiting for confirmations.",
                    features: [
                      "1,000+ transactions per second",
                      "Sub-second transaction confirmation",
                      "No forking or rollbacks",
                    ],
                    color: "text-yellow-400",
                  },
                  {
                    icon: Shield,
                    title: "Secure & Scalable",
                    description: "Pure proof-of-stake consensus with cryptographic sortition.",
                    features: [
                      "Byzantine fault tolerance",
                      "Quantum-resistant cryptography",
                      "Scales to billions of users",
                    ],
                    color: "text-blue-400",
                  },
                  {
                    icon: Globe,
                    title: "Carbon Negative",
                    description: "Environmentally sustainable blockchain with minimal energy consumption.",
                    features: [
                      "99.99% less energy than Bitcoin",
                      "Carbon negative operations",
                      "Sustainable for the future",
                    ],
                    color: "text-green-400",
                  },
                  {
                    icon: Code,
                    title: "Developer Friendly",
                    description: "Rich tooling and multiple programming language support.",
                    features: ["Python, JavaScript, Go, Rust", "Comprehensive SDKs", "AlgoKit development suite"],
                    color: "text-purple-400",
                  },
                ].map((item, index) => (
                  <div key={item.title}>
                    <Card className="glass-effect p-6 border-white/10">
                      <div className="flex items-center mb-4">
                        <item.icon className={`h-6 w-6 ${item.color} mr-2`} />
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      </div>
                      <p className="text-gray-400 mb-3">{item.description}</p>
                      <ul className="text-sm text-gray-500 space-y-1">
                        {item.features.map((feature, idx) => (
                          <li key={idx}>• {feature}</li>
                        ))}
                      </ul>
                    </Card>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-6 mt-8 border border-green-500/20">
                <h4 className="text-lg font-semibold text-white mb-3">Perfect for:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <p className="font-medium text-green-400 mb-2">Financial Applications</p>
                    <ul className="text-sm space-y-1">
                      <li>• DeFi protocols</li>
                      <li>• Payment systems</li>
                      <li>• Digital assets</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-blue-400 mb-2">Enterprise Solutions</p>
                    <ul className="text-sm space-y-1">
                      <li>• Supply chain tracking</li>
                      <li>• Identity management</li>
                      <li>• Real estate tokenization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What is a dApp? */}
          <section className="glass-effect rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mr-4">
                <Globe className="h-6 w-6 text-purple-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">What is a dApp?</h2>
            </div>

            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                A decentralized application (dApp) is a software application that runs on a blockchain network instead
                of traditional centralized servers. dApps combine smart contracts (backend logic) with user interfaces
                (frontend) to create applications that are transparent, censorship-resistant, and operate without a
                central authority.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Traditional Apps vs dApps</h3>
                  <div className="space-y-4">
                    <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                      <h4 className="font-semibold text-red-400 mb-2">Traditional Apps</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Centralized servers</li>
                        <li>• Single point of failure</li>
                        <li>• Controlled by companies</li>
                        <li>• Data can be censored</li>
                        <li>• Requires trust in operators</li>
                      </ul>
                    </div>

                    <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                      <h4 className="font-semibold text-green-400 mb-2">Decentralized Apps</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Distributed blockchain network</li>
                        <li>• Highly resilient</li>
                        <li>• Community governed</li>
                        <li>• Censorship resistant</li>
                        <li>• Trustless operations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">dApp Components</h3>
                  <div className="space-y-4">
                    <Card className="glass-effect p-4 border-white/10">
                      <div className="flex items-center mb-2">
                        <Code className="h-5 w-5 text-blue-400 mr-2" />
                        <h4 className="font-semibold text-white">Smart Contracts</h4>
                      </div>
                      <p className="text-sm text-gray-400">
                        Backend logic that runs on the blockchain, handling business rules and data storage.
                      </p>
                    </Card>

                    <Card className="glass-effect p-4 border-white/10">
                      <div className="flex items-center mb-2">
                        <Globe className="h-5 w-5 text-green-400 mr-2" />
                        <h4 className="font-semibold text-white">Frontend Interface</h4>
                      </div>
                      <p className="text-sm text-gray-400">
                        User interface that interacts with smart contracts, often built with web technologies.
                      </p>
                    </Card>

                    <Card className="glass-effect p-4 border-white/10">
                      <div className="flex items-center mb-2">
                        <Shield className="h-5 w-5 text-purple-400 mr-2" />
                        <h4 className="font-semibold text-white">Wallet Integration</h4>
                      </div>
                      <p className="text-sm text-gray-400">
                        Connects users to the blockchain for authentication and transaction signing.
                      </p>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-6 mt-8">
                <h4 className="text-lg font-semibold text-white mb-3">Popular dApp Categories:</h4>
                <div className="grid md:grid-cols-3 gap-4 text-gray-300">
                  <div>
                    <p className="font-medium text-yellow-400 mb-2">DeFi (Decentralized Finance)</p>
                    <ul className="text-sm space-y-1">
                      <li>• DEXs (Decentralized Exchanges)</li>
                      <li>• Lending protocols</li>
                      <li>• Yield farming</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-pink-400 mb-2">NFTs & Gaming</p>
                    <ul className="text-sm space-y-1">
                      <li>• NFT marketplaces</li>
                      <li>• Blockchain games</li>
                      <li>• Digital collectibles</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-cyan-400 mb-2">Utilities</p>
                    <ul className="text-sm space-y-1">
                      <li>• Governance platforms</li>
                      <li>• Identity solutions</li>
                      <li>• Social networks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Create an NFT */}
          <section className="glass-effect rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mr-4">
                <Sparkles className="h-6 w-6 text-pink-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Create an NFT</h2>
            </div>

            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                Non-fungible tokens (NFTs) are unique digital assets represented on the blockchain. While digital art
                and collectibles are popular examples, NFTs have far broader applications including tokenizing rights to
                songs for royalty payments, in-game collectibles, and special edition merchandise.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">What Makes NFTs Special?</h3>
                  <div className="space-y-4">
                    <Card className="glass-effect p-4 border-white/10">
                      <div className="flex items-center mb-2">
                        <Sparkles className="h-5 w-5 text-pink-400 mr-2" />
                        <h4 className="font-semibold text-white">Uniqueness</h4>
                      </div>
                      <p className="text-sm text-gray-400">
                        Each NFT is one-of-a-kind with distinct properties that cannot be replicated or divided.
                      </p>
                    </Card>

                    <Card className="glass-effect p-4 border-white/10">
                      <div className="flex items-center mb-2">
                        <Shield className="h-5 w-5 text-blue-400 mr-2" />
                        <h4 className="font-semibold text-white">Provenance</h4>
                      </div>
                      <p className="text-sm text-gray-400">
                        Blockchain provides immutable proof of ownership and transaction history.
                      </p>
                    </Card>

                    <Card className="glass-effect p-4 border-white/10">
                      <div className="flex items-center mb-2">
                        <Globe className="h-5 w-5 text-green-400 mr-2" />
                        <h4 className="font-semibold text-white">Composability</h4>
                      </div>
                      <p className="text-sm text-gray-400">
                        NFTs can interact with smart contracts and other blockchain applications.
                      </p>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">How to Create NFTs on Algorand</h3>
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">Algorand Standard Assets (ASAs)</h4>
                      <p className="text-sm text-gray-400 mb-3">
                        NFTs are created using ASAs, which are built into the protocol.
                      </p>
                      <ul className="text-xs text-gray-400 space-y-1">
                        <li>• Set total units to 1</li>
                        <li>• Set decimals to 0</li>
                        <li>• Add metadata for validation</li>
                        <li>• Follow ARC standards</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg p-4 border border-pink-500/20">
                      <h4 className="font-semibold text-pink-400 mb-2">Fractional NFTs</h4>
                      <p className="text-sm text-gray-300 mb-2">
                        Divide unique assets into multiple equal shares to lower entry barriers and increase
                        accessibility.
                      </p>
                      <ul className="text-xs text-gray-400 space-y-1">
                        <li>• Total units must be power of 10</li>
                        <li>• Decimals = log₁₀(total units)</li>
                        <li>• Follows ARC-0003 standard</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-6 mt-8">
                <h4 className="text-lg font-semibold text-white mb-3">Popular NFT Use Cases:</h4>
                <div className="grid md:grid-cols-3 gap-4 text-gray-300">
                  <div>
                    <p className="font-medium text-pink-400 mb-2">🎨 Digital Art & Collectibles</p>
                    <ul className="text-sm space-y-1">
                      <li>• Unique artwork pieces</li>
                      <li>• Trading cards</li>
                      <li>• Digital memorabilia</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-blue-400 mb-2">🎵 Rights & Royalties</p>
                    <ul className="text-sm space-y-1">
                      <li>• Music royalty tokens</li>
                      <li>• Intellectual property</li>
                      <li>• Content licensing</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-green-400 mb-2">🎮 Gaming & Virtual Assets</p>
                    <ul className="text-sm space-y-1">
                      <li>• In-game items</li>
                      <li>• Virtual real estate</li>
                      <li>• Character skins</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Create a Fungible Token */}
          <section className="glass-effect rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center mr-4">
                <Coins className="h-6 w-6 text-yellow-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Create a Fungible Token</h2>
            </div>

            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                Fungible tokens (FTs) are assets divided into multiple identical, interchangeable units. Unlike NFTs,
                each unit of a fungible token has the same value and properties, making them perfect for currencies,
                loyalty points, and tokenized shares.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Understanding Fungibility</h3>
                  <div className="space-y-4">
                    <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                      <h4 className="font-semibold text-green-400 mb-2">✅ Fungible Examples</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Traditional currencies (USD, EUR)</li>
                        <li>• Cryptocurrency (Bitcoin, Algo)</li>
                        <li>• Loyalty reward points</li>
                        <li>• Company shares</li>
                        <li>• Commodity tokens (gold, oil)</li>
                      </ul>
                    </div>

                    <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                      <h4 className="font-semibold text-red-400 mb-2">❌ Non-Fungible Examples</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Real estate properties</li>
                        <li>• Unique artwork</li>
                        <li>• Individual identity documents</li>
                        <li>• Concert tickets (specific seats)</li>
                        <li>• Collectible trading cards</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Creating Fungible Tokens</h3>
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">Algorand Standard Assets (ASAs)</h4>
                      <p className="text-sm text-gray-400 mb-3">
                        Like NFTs, fungible tokens use ASAs but with different parameters to enable multiple identical
                        units.
                      </p>
                      <ul className="text-xs text-gray-400 space-y-1">
                        <li>• Set total count greater than 1</li>
                        <li>• Configure appropriate decimals</li>
                        <li>• Add comprehensive metadata</li>
                        <li>• Follow ARC standards</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-4 border border-yellow-500/20">
                      <p className="text-sm text-gray-300 mb-2">
                        Algorand's built-in ASA functionality means you can create tokens without writing complex smart
                        contract code.
                      </p>
                      <p className="text-xs text-gray-400">
                        Simply specify parameters and attach metadata for validation and integrity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-6 mt-8">
                <h4 className="text-lg font-semibold text-white mb-3">Common Fungible Token Use Cases:</h4>
                <div className="grid md:grid-cols-3 gap-4 text-gray-300">
                  <div>
                    <p className="font-medium text-yellow-400 mb-2">💰 Financial Instruments</p>
                    <ul className="text-sm space-y-1">
                      <li>• Stablecoins (USDC, USDT)</li>
                      <li>• Central bank digital currencies</li>
                      <li>• Tokenized securities</li>
                      <li>• Real estate investment tokens</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-purple-400 mb-2">🎯 Loyalty & Rewards</p>
                    <ul className="text-sm space-y-1">
                      <li>• Airline miles</li>
                      <li>• Store loyalty points</li>
                      <li>• Gaming currencies</li>
                      <li>• Community tokens</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-blue-400 mb-2">🏢 Business Applications</p>
                    <ul className="text-sm space-y-1">
                      <li>• Supply chain tokens</li>
                      <li>• Carbon credit tokens</li>
                      <li>• Utility tokens</li>
                      <li>• Governance tokens</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-6 border border-green-500/20">
                <h4 className="text-lg font-semibold text-white mb-3">Benefits of Tokenization</h4>
                <p className="text-gray-300 mb-4">
                  Tokenizing fungible assets provides access to all blockchain ecosystem benefits:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-green-400" />
                      Enhanced security and trust
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-green-400" />
                      Immutable transaction records
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-green-400" />
                      Improved efficiency and speed
                    </li>
                  </ul>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-blue-400" />
                      Reduced operational costs
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-blue-400" />
                      Global accessibility
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-blue-400" />
                      Composability with other dApps
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Where do I start? */}
          <section className="glass-effect rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mr-4">
                <Rocket className="h-6 w-6 text-orange-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Where do I start?</h2>
            </div>

            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                Ready to start building on Algorand? Here's your roadmap to becoming an Algorand developer. Whether
                you're new to blockchain or an experienced developer, we'll guide you through each step of your journey.
              </p>

              <div className="grid gap-6 mt-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      step: "1",
                      icon: BookOpen,
                      title: "Learn the Basics",
                      description: "Get familiar with blockchain concepts and Algorand's unique features.",
                      links: [
                        { name: "Read this guide", href: "/docs/basic-concepts", color: "text-blue-400" },
                        { name: "Algorand consensus", href: "#", color: "text-gray-400" },
                      ],
                      bgColor: "bg-blue-500",
                    },
                    {
                      step: "2",
                      icon: Code,
                      title: "Set Up Your Environment",
                      description: "Install AlgoKit and set up your development environment.",
                      links: [
                        { name: "Installation guide", href: "/docs/installation", color: "text-green-400" },
                        { name: "Quick start tutorial", href: "/docs/quick-start", color: "text-gray-400" },
                      ],
                      bgColor: "bg-green-500",
                    },
                    {
                      step: "3",
                      icon: Rocket,
                      title: "Build Your First dApp",
                      description: "Create and deploy your first smart contract and dApp.",
                      links: [
                        { name: "Smart contract tutorial", href: "#", color: "text-purple-400" },
                        { name: "dApp templates", href: "#", color: "text-gray-400" },
                      ],
                      bgColor: "bg-purple-500",
                    },
                  ].map((item, index) => (
                    <div key={item.step}>
                      <Card className="glass-effect p-6 border-white/10 relative">
                        <div
                          className={`absolute -top-3 -left-3 w-8 h-8 ${item.bgColor} rounded-full flex items-center justify-center text-white font-bold text-sm`}
                        >
                          {item.step}
                        </div>
                        <item.icon
                          className={`h-8 w-8 ${item.step === "1" ? "text-blue-400" : item.step === "2" ? "text-green-400" : "text-purple-400"} mb-4 mt-2`}
                        />
                        <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                        <p className="text-gray-400 mb-4">{item.description}</p>
                        <div className="space-y-2">
                          {item.links.map((link, linkIndex) => (
                            <Link key={linkIndex} href={link.href}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`w-full justify-start ${link.color} hover:text-white`}
                              >
                                <ArrowRight className="mr-2 h-4 w-4" />
                                {link.name}
                              </Button>
                            </Link>
                          ))}
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Learning Paths by Experience Level</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h5 className="font-medium text-green-400 mb-3">🌱 Beginner</h5>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li>• Blockchain fundamentals</li>
                        <li>• Algorand basics</li>
                        <li>• AlgoKit installation</li>
                        <li>• First smart contract</li>
                        <li>• Simple dApp deployment</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-yellow-400 mb-3">🚀 Intermediate</h5>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li>• Advanced smart contracts</li>
                        <li>• Frontend integration</li>
                        <li>• Wallet connectivity</li>
                        <li>• Testing strategies</li>
                        <li>• Mainnet deployment</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-red-400 mb-3">⚡ Advanced</h5>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li>• Complex dApp architecture</li>
                        <li>• Performance optimization</li>
                        <li>• Security best practices</li>
                        <li>• Custom tooling</li>
                        <li>• Protocol contributions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Ready to Start Building? */}
          <section className="glass-effect rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Building?</h2>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
              Now that you understand the basic concepts, you're ready to start building on Algorand. AlgoKit provides
              all the tools you need to create, deploy, and manage your blockchain applications.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#ec0033]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#ec0033]">1</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Install AlgoKit</h3>
                <p className="text-gray-400 text-sm">
                  Set up your development environment with our comprehensive installation guide.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#ec0033]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#ec0033]">2</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Follow Quick Start</h3>
                <p className="text-gray-400 text-sm">Learn the basics with our step-by-step quick start tutorial.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#ec0033]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#ec0033]">3</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Build Your Project</h3>
                <p className="text-gray-400 text-sm">
                  Create your first smart contract or dApp using our templates and tools.
                </p>
              </div>
            </div>
          </section>

          {/* Continue Your Learning Journey */}
          <section className="text-center">
            <div className="glass-effect rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Continue Your Learning Journey</h3>
              <p className="text-gray-300 mb-6">
                Explore more advanced topics and start building with these helpful resources:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/docs/installation">
                  <Button
                    variant="outline"
                    className="w-full border-[#ec0033] text-[#ec0033] hover:bg-[#ec0033] hover:text-white transition-colors duration-300"
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Installation Guide
                  </Button>
                </Link>
                <Link href="/docs/quick-start">
                  <Button
                    variant="outline"
                    className="w-full border-[#ec0033] text-[#ec0033] hover:bg-[#ec0033] hover:text-white transition-colors duration-300"
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Quick Start
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    variant="outline"
                    className="w-full border-[#ec0033] text-[#ec0033] hover:bg-[#ec0033] hover:text-white transition-colors duration-300"
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Browse Projects
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}