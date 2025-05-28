"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Download, Terminal, Code, CheckCircle, ExternalLink, FileCode, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"

const prerequisites = [
  "Python 3.12 or higher",
  "PipX package manager",
  "Git version control",
  "Docker (recommended for LocalNet)",
  "VS Code or preferred IDE",
]

const features = [
  {
    title: "Smart Contract Templates",
    description: "Pre-built templates to kickstart your development with best practices",
    icon: Code,
  },
  {
    title: "Local Infrastructure",
    description: "Complete application infrastructure running locally for development",
    icon: Terminal,
  },
  {
    title: "Language Integration",
    description: "Native support for Python and TypeScript with familiar toolchains",
    icon: FileCode,
  },
  {
    title: "Simplified Frontend",
    description: "Streamlined frontend design experience for dApp development",
    icon: Eye,
  },
]

export default function QuickStartPage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <main className="min-h-screen animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Back to Documentation */}
        <div className="max-w-5xl mx-auto">
          <Link href="/docs" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Documentation
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">AlgoKit Quick Start Guide</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
            AlgoKit is a comprehensive, one-stop development tool that enables developers to quickly and efficiently
            build and launch secure, automated, production-ready decentralized applications on the Algorand protocol.
            Now featuring native Python support, empowering developers to write Algorand apps in one of the world's most
            popular programming languages.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/docs/installation">
              <Button
                variant="outline"
                className="border-[#ec0033] text-[#ec0033] hover:bg-[#ec0033] hover:text-white transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30"
              >
                <Download className="mr-2 h-4 w-4" />
                Install AlgoKit
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                variant="outline"
                className="border-[#ec0033] text-[#ec0033] hover:bg-[#ec0033] hover:text-white transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Documentation
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Overview */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">What AlgoKit Provides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass-effect p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Prerequisites */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="glass-effect p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Prerequisites</h2>
            <p className="text-gray-300 mb-6">
              Before getting started with AlgoKit, ensure you have the following components installed on your system:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {prerequisites.map((prereq, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{prereq}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Installation */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Installation Instructions</h2>

          <Tabs defaultValue="windows" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="windows">Windows</TabsTrigger>
              <TabsTrigger value="macos">macOS</TabsTrigger>
              <TabsTrigger value="linux">Linux</TabsTrigger>
              <TabsTrigger value="pipx">OS Agnostic</TabsTrigger>
            </TabsList>

            <TabsContent value="windows">
              <Card className="glass-effect p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Windows Installation</h3>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                      <p className="text-blue-200 text-sm">
                        <strong>Note:</strong> This method installs the most recent Python 3 version via winget. If you
                        already have Python 3.12+ installed, you may prefer to use the OS Agnostic tab.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">1. Install Prerequisites</h4>
                    <div className="space-y-3">
                      <div className="bg-black/30 rounded-lg p-4">
                        <code className="text-green-400 font-mono">winget install git.git</code>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4">
                        <code className="text-green-400 font-mono">winget install docker.dockerdesktop</code>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">2. Install Python</h4>
                    <div className="bg-black/30 rounded-lg p-4 mb-3">
                      <code className="text-green-400 font-mono">winget install python.python.3.12</code>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Restart the terminal after installation to ensure Python and pip are available.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">3. Install pipx and AlgoKit</h4>
                    <div className="space-y-3">
                      <div className="bg-black/30 rounded-lg p-4">
                        <code className="text-green-400 font-mono">pip install --user pipx</code>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4">
                        <code className="text-green-400 font-mono">python -m pipx ensurepath</code>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4">
                        <code className="text-green-400 font-mono">pipx install algokit</code>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="macos">
              <Card className="glass-effect p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">macOS Installation</h3>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                      <p className="text-blue-200 text-sm">
                        <strong>Note:</strong> This method installs the latest Python 3 release via Homebrew. Docker
                        requires macOS 11+.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">1. Install Prerequisites</h4>
                    <div className="space-y-3">
                      <div className="bg-black/30 rounded-lg p-4">
                        <code className="text-green-400 font-mono">brew install --cask docker</code>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">2. Install AlgoKit</h4>
                    <div className="bg-black/30 rounded-lg p-4 mb-3">
                      <code className="text-green-400 font-mono">brew install algorandfoundation/tap/algokit</code>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Restart the terminal to ensure AlgoKit is available on the path.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="linux">
              <Card className="glass-effect p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Linux Installation</h3>
                    <p className="text-gray-300 mb-4">
                      Ensure you have Python 3.12+, pipx, Git, and Docker installed via your package manager, then
                      continue with the OS Agnostic installation method.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="pipx">
              <Card className="glass-effect p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">OS Agnostic Installation</h3>
                    <p className="text-gray-300 mb-4">To install AlgoKit using pipx (works on any operating system):</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Install AlgoKit</h4>
                    <div className="bg-black/30 rounded-lg p-4 mb-3">
                      <code className="text-green-400 font-mono">pipx install algokit</code>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Update AlgoKit (if previously installed)</h4>
                    <div className="bg-black/30 rounded-lg p-4 mb-3">
                      <code className="text-green-400 font-mono">pipx upgrade algokit</code>
                    </div>
                    <p className="text-gray-400 text-sm">After installation completes, restart the terminal.</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Verification */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="glass-effect p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Verify Installation</h2>
            <p className="text-gray-300 mb-4">
              To confirm AlgoKit has been installed correctly, run the following command:
            </p>
            <div className="bg-black/30 rounded-lg p-4 mb-4">
              <code className="text-green-400 font-mono">algokit --version</code>
            </div>
            <p className="text-gray-300 mb-4">You should see output similar to:</p>
            <div className="bg-black/30 rounded-lg p-4">
              <code className="text-blue-400 font-mono">algokit, version 2.0.0</code>
            </div>
          </Card>
        </div>

        {/* Start LocalNet */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="glass-effect p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Start a LocalNet</h2>
            <p className="text-gray-300 mb-4">
              AlgoKit supports running a local version of the Algorand blockchain for development. To start a LocalNet
              instance:
            </p>
            <div className="bg-black/30 rounded-lg p-4 mb-6">
              <code className="text-green-400 font-mono">algokit localnet start</code>
            </div>
            <p className="text-gray-300 mb-6">
              This command starts a LocalNet instance within Docker. You can verify it's running by opening Docker
              Desktop:
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Zi6ntcQrtGWpLkLG4RW1AoxVaDluwk.png"
                alt="Docker Desktop showing AlgoKit LocalNet containers running"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </Card>
        </div>

        {/* Create Project */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="glass-effect p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Create an AlgoKit Project</h2>
            <p className="text-gray-300 mb-4">
              With AlgoKit installed, you can rapidly create a new project tailored to your needs:
            </p>
            <div className="bg-black/30 rounded-lg p-4 mb-6">
              <code className="text-green-400 font-mono">algokit init</code>
            </div>
            <p className="text-gray-300 mb-6">
              This launches a guided menu system to create a project from various templates. For this guide, select:
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="border-white text-white">
                  1
                </Badge>
                <span className="text-gray-300">Smart Contracts</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="border-white text-white">
                  2
                </Badge>
                <span className="text-gray-300">Python</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="border-white text-white">
                  3
                </Badge>
                <span className="text-gray-300">Project name: DEMO</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="border-white text-white">
                  4
                </Badge>
                <span className="text-gray-300">Template preset: Starter</span>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Once completed, VS Code will open with the initialized project. The starter app contains one smart
              contract built with Algorand Python:
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xo8Dy94XcPe4vhOaqW32GcQCpMGXO9.png"
                alt="VS Code showing the AlgoKit starter smart contract in Python"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </Card>
        </div>

        {/* Run Demo */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="glass-effect p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Run the Demo Application</h2>
            <p className="text-gray-300 mb-6">
              In the smart_contracts/hello_world folder, you'll find deploy_config.py, which demonstrates deploying and
              calling the smart contract:
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10 mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Du5aSIdmrz1p7VuVHFQQVZdxqiSERA.png"
                alt="VS Code showing the deploy_config.py file with deployment configuration"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Press F5 to deploy the HelloWorld smart contract and call it. Alternatively, use these commands:
            </p>
            <div className="space-y-3 mb-6">
              <div className="bg-black/30 rounded-lg p-4">
                <code className="text-green-400 font-mono">algokit project run build</code>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <code className="text-green-400 font-mono">algokit project deploy</code>
              </div>
            </div>
            <p className="text-gray-300 mb-4">Expected output:</p>
            <div className="bg-black/30 rounded-lg p-4 mb-6">
              <code className="text-blue-400 font-mono text-sm">
                HelloWorld not found in account, deploying app.
                <br />
                HelloWorld (v1.0) deployed successfully, with app id 1002.
                <br />
                Called hello on HelloWorld (1002) with name=world, received: Hello, world
              </code>
            </div>
            <p className="text-gray-300 mb-6">
              The artifacts folder will contain the compiled TEAL code and manifest files:
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zObRYjMVGqYwPG9z3qxfqAy9DaR2VY.png"
                alt="VS Code showing the HelloWorld.arc32.json manifest file in the artifacts folder"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </Card>
        </div>

        {/* Using Lora */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="glass-effect p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Using Lora</h2>
            <p className="text-gray-300 mb-4">
              Lora is a web-based interface for visualizing accounts, transactions, assets, and applications on Algorand
              networks. Launch it with:
            </p>
            <div className="bg-black/30 rounded-lg p-4 mb-6">
              <code className="text-green-400 font-mono">algokit explore</code>
            </div>
            <p className="text-gray-300 mb-6">This opens Lora in your default browser, connected to LocalNet:</p>
            <div className="rounded-lg overflow-hidden border border-white/10 mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TtP7pmvh3tgNscG2QycoJNZjrns37p.png"
                alt="Lora blockchain explorer interface showing LocalNet blocks and transactions"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>

            <h3 className="text-xl font-bold text-white mb-4">Connect Local Account for Testing</h3>
            <p className="text-gray-300 mb-4">
              To interact with LocalNet, you need an account with ALGO. Click "Connect Wallet" and choose "Connect KMD":
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10 mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DmfFdMGmglOzUehBDnWIIxZQAmdaex.png"
                alt="Lora wallet connection dialog showing KMD, MNEMONIC, and Lute options"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>

            <h3 className="text-xl font-bold text-white mb-4">Deploy via Lora</h3>
            <p className="text-gray-300 mb-4">Navigate to App Lab and click "Create" to deploy your smart contract:</p>
            <div className="rounded-lg overflow-hidden border border-white/10 mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ILz8kA0Rt35DU3z1Bq7eiwdEenbABO.png"
                alt="Lora App Lab interface with Create button for deploying applications"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Choose "Deploy new" and select your HelloWorld.arc32.json manifest file:
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10 mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Qa11pp254uzpxammXOVUbnKGqCKGUF.png"
                alt="Lora create app interface showing options to use existing app or deploy new"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden border border-white/10 mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-c28Ejp1xA1tvR6j9vOHss3EaxOZRJe.png"
                alt="Lora file selection dialog for choosing ARC-32 JSON app spec file"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <p className="text-gray-300 mb-6">
              This will load the specific manifest file for the Hello World sample application. You can modify the Name
              and Version of your app if needed, but we'll keep the defaults. Click Next:
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10 mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZWtN1LceTKoicMvgHiBT8byhtu9MKW.png"
                alt="Lora Create App Interface showing HelloWorld app configuration with name and version fields"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>

            <h3 className="text-xl font-bold text-white mb-4">Build and Deploy Transaction</h3>
            <p className="text-gray-300 mb-4">
              Click the "Call" button, then build and add the create transaction by clicking "Add":
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10 mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pzwfxhfx7NaEK01azU5FfivqVnA0fJ.png"
                alt="Lora transaction group page showing Call button and Deploy option"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <p className="text-gray-300 mb-6">
              This opens the Build Transaction dialog where you can configure the deployment parameters:
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10 mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3P1o64t0KOgPE40Q9shnUVP8EQJbqa.png"
                alt="Lora Build Transaction modal showing configuration options for smart contract deployment"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <p className="text-gray-300 mb-6">
              After configuring the transaction, you'll see it added to the transaction group. Click "Deploy" and sign
              the transaction by clicking "OK" in the KMD popup to deploy the smart contract to the local Algorand
              network:
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10 mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-w7hu7nNuVBycOVn3hQ15CxrKd3LfuB.png"
                alt="Lora showing the built application call transaction ready for deployment"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>

            <h3 className="text-xl font-bold text-white mb-4">View Deployed Contract</h3>
            <p className="text-gray-300 mb-6">
              You should now see the deployed HelloWorld contract on the App Lab page:
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10 mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tGVG7Ld3uz8pWRIdjjZyGeNACj4Bzz.png"
                alt="Lora App Lab showing the successfully deployed HelloWorld contract"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <p className="text-gray-300 mb-6">
              Now click on the App ID inside the HelloWorld card to navigate to the Application page:
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10 mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LwXSJwOhwxItDuxXccfMr9Les5xiFP.png"
                alt="Lora Application page showing contract details and ABI Methods section with hello method"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>

            <h3 className="text-xl font-bold text-white mb-4">Call Smart Contract Method</h3>
            <p className="text-gray-300 mb-4">
              In the ABI Methods section, you should see the "hello" method. Click on the dropdown and the "Call"
              button. You'll be prompted with a popup allowing you to enter the parameter for the hello method:
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10 mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oVkjO74a5P8VqkOuUXzwbiyEWbH4An.png"
                alt="Lora Build Transaction modal for calling the hello method with parameter input fields"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <p className="text-gray-300 mb-6">Enter a string in the value input field and click "Add":</p>
            <div className="rounded-lg overflow-hidden border border-white/10 mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ojEKm9LAQEl8VqNMXnEKEV096ZoPDx.png"
                alt="Lora Build Transaction modal showing 'Algorand Dev!' entered as the parameter value"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <p className="text-gray-300 mb-6">
              You should now see the transaction you just built on the Application page. Click "Send" and sign the
              transaction with your KMD wallet to execute the transaction:
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10 mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RD8FuLATcID80kAVTMVgysqgjt0Ryu.png"
                alt="Lora Application page showing the built transaction ready to send with Send button"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>

            <h3 className="text-xl font-bold text-white mb-4">View Transaction Results</h3>
            <p className="text-gray-300 mb-6">
              You should now see the Send Result showing you the details about the transaction you just executed!
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10 mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oEhLZyI5Kf9eyLPCHHBiULfK3PKHKO.png"
                alt="Lora transaction result page showing Send Result with transaction visual and App Call Results displaying 'Hello, Algorand Dev!' return value"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <p className="text-gray-300 mb-6">
              You can also click on the Transaction ID to go to the Transaction page and see the full details of the
              transaction:
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10 mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DJHZTvhE1GBCuMtCqnskDurSMyYh2S.png"
                alt="Lora detailed Transaction page showing comprehensive transaction information including ABI method details and logs"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
              <h4 className="text-xl font-bold text-green-400 mb-2">🎉 Success!</h4>
              <p className="text-green-200">
                You have now successfully deployed and executed a smart contract method call using Lora!
              </p>
            </div>
          </Card>
        </div>

        {/* Next Steps */}
        <div className="max-w-5xl mx-auto">
          <Card className="glass-effect p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Congratulations!</h2>
            <p className="text-gray-300 mb-6">
              You have successfully deployed and executed a smart contract on Algorand using AlgoKit and Lora. Continue
              your development journey with these resources:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/docs">
                <Button
                  variant="outline"
                  className="w-full border-[#ec0033] text-[#ec0033] hover:bg-[#ec0033] hover:text-white transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Explore Documentation
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  variant="outline"
                  className="w-full border-[#ec0033] text-[#ec0033] hover:bg-[#ec0033] hover:text-white transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Browse Projects
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
