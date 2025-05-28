"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Globe, Database, Zap, Shield } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function RestAPIsPage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const address = "ACCOUNTADDRESS"
  const round = "BLOCKROUND"
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
            <h1 className="text-5xl font-bold text-white mb-6">Algorand REST APIs</h1>
            <p className="text-xl text-gray-300 mb-8">HTTP APIs for interacting with the Algorand blockchain</p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">What are Algorand REST APIs?</h2>
              <p className="text-gray-300 mb-4">
                Algorand REST APIs provide HTTP endpoints for interacting with the Algorand blockchain. These APIs allow
                developers to query blockchain data, submit transactions, and interact with smart contracts using
                standard HTTP requests from any programming language or platform.
              </p>
              <p className="text-gray-300">
                The REST APIs are the foundation for all Algorand SDKs and provide direct access to blockchain
                functionality without requiring language-specific libraries.
              </p>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Core API Services</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Globe className="h-6 w-6 text-[#6104d7] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Algod API</h3>
                      <p className="text-gray-300">
                        Core blockchain operations including transaction submission, account queries, and network
                        status.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Database className="h-6 w-6 text-[#ec0033] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Indexer API</h3>
                      <p className="text-gray-300">
                        Advanced querying and searching of historical blockchain data with filtering and pagination.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Zap className="h-6 w-6 text-[#6104d7] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">KMD API</h3>
                      <p className="text-gray-300">
                        Key Management Daemon for secure wallet operations and transaction signing.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-[#ec0033] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Conduit API</h3>
                      <p className="text-gray-300">
                        Real-time blockchain data streaming and custom data pipeline configuration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Algod API Endpoints</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Account Operations</h3>
                  <div className="bg-black/40 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#6104d7] font-mono">GET /v2/accounts/{address}</span>
                      <span className="text-gray-300">Get account information</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6104d7] font-mono">GET /v2/accounts/{address}/assets</span>
                      <span className="text-gray-300">Get account assets</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6104d7] font-mono">GET /v2/accounts/{address}/applications</span>
                      <span className="text-gray-300">Get account applications</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Transaction Operations</h3>
                  <div className="bg-black/40 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#6104d7] font-mono">POST /v2/transactions</span>
                      <span className="text-gray-300">Submit a transaction</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6104d7] font-mono">GET /v2/transactions/pending</span>
                      <span className="text-gray-300">Get pending transactions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6104d7] font-mono">GET /v2/transactions/params</span>
                      <span className="text-gray-300">Get transaction parameters</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Block Operations</h3>
                  <div className="bg-black/40 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#6104d7] font-mono">GET /v2/blocks/{round}</span>
                      <span className="text-gray-300">Get block by round</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6104d7] font-mono">GET /v2/status</span>
                      <span className="text-gray-300">Get node status</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Indexer API Endpoints</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Search Operations</h3>
                  <div className="bg-black/40 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#6104d7] font-mono">GET /v2/transactions</span>
                      <span className="text-gray-300">Search transactions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6104d7] font-mono">GET /v2/accounts</span>
                      <span className="text-gray-300">Search accounts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6104d7] font-mono">GET /v2/assets</span>
                      <span className="text-gray-300">Search assets</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6104d7] font-mono">GET /v2/applications</span>
                      <span className="text-gray-300">Search applications</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Filtering and Pagination</h3>
                  <p className="text-gray-300">
                    The Indexer API supports advanced filtering with query parameters like asset-id, application-id,
                    min-amount, max-amount, before-time, after-time, and many more. Results are paginated using
                    next-token for efficient data retrieval.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Authentication and Rate Limiting</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">API Tokens</h3>
                  <p className="text-gray-300 mb-2">
                    Most Algorand REST API endpoints require authentication using API tokens. Include the token in the
                    request header:
                  </p>
                  <div className="bg-black/40 rounded-lg p-3">
                    <pre className="text-green-400 text-sm">{`X-Algo-API-Token: your-api-token-here`}</pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Rate Limits</h3>
                  <p className="text-gray-300">
                    API endpoints have rate limits to ensure fair usage and network stability. Check response headers
                    for rate limit information and implement appropriate retry logic in your applications.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Example API Calls</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Get Account Information</h3>
                  <div className="bg-black/40 rounded-lg p-4">
                    <pre className="text-green-400 text-sm">
                      {`curl -X GET \\
  "https://testnet-api.algonode.cloud/v2/accounts/ACCOUNTADDRESS" \\
  -H "accept: application/json"`}
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Submit Transaction</h3>
                  <div className="bg-black/40 rounded-lg p-4">
                    <pre className="text-green-400 text-sm">
                      {`curl -X POST \\
  "https://testnet-api.algonode.cloud/v2/transactions" \\
  -H "Content-Type: application/x-binary" \\
  --data-binary @signed_transaction.txn`}
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Search Transactions</h3>
                  <div className="bg-black/40 rounded-lg p-4">
                    <pre className="text-green-400 text-sm">
                      {`curl -X GET \\
  "https://testnet-idx.algonode.cloud/v2/transactions?address=ACCOUNTADDRESS&limit=10" \\
  -H "accept: application/json"`}
                    </pre>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Network Endpoints</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">MainNet</h3>
                  <div className="bg-black/40 rounded-lg p-3 space-y-1">
                    <div>
                      <span className="text-[#6104d7]">Algod:</span>{" "}
                      <span className="text-gray-300">https://mainnet-api.algonode.cloud</span>
                    </div>
                    <div>
                      <span className="text-[#6104d7]">Indexer:</span>{" "}
                      <span className="text-gray-300">https://mainnet-idx.algonode.cloud</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">TestNet</h3>
                  <div className="bg-black/40 rounded-lg p-3 space-y-1">
                    <div>
                      <span className="text-[#6104d7]">Algod:</span>{" "}
                      <span className="text-gray-300">https://testnet-api.algonode.cloud</span>
                    </div>
                    <div>
                      <span className="text-[#6104d7]">Indexer:</span>{" "}
                      <span className="text-gray-300">https://testnet-idx.algonode.cloud</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">BetaNet</h3>
                  <div className="bg-black/40 rounded-lg p-3 space-y-1">
                    <div>
                      <span className="text-[#6104d7]">Algod:</span>{" "}
                      <span className="text-gray-300">https://betanet-api.algonode.cloud</span>
                    </div>
                    <div>
                      <span className="text-[#6104d7]">Indexer:</span>{" "}
                      <span className="text-gray-300">https://betanet-idx.algonode.cloud</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Best Practices</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Error Handling</h3>
                  <p className="text-gray-300">
                    Always implement proper error handling for API calls. Check HTTP status codes and parse error
                    messages from response bodies to handle failures gracefully.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Caching</h3>
                  <p className="text-gray-300">
                    Implement appropriate caching strategies for frequently accessed data to reduce API calls and
                    improve application performance.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Pagination</h3>
                  <p className="text-gray-300">
                    Use pagination parameters effectively when dealing with large datasets. The Indexer API provides
                    next-token for efficient pagination through results.
                  </p>
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <Link href="/docs/sdks-apis/typescript-sdk">
                <Button className="bg-[#6104d7] hover:bg-[#6104d7]/90">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to TypeScript SDK
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
