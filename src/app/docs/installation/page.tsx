"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Terminal,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  AlertTriangle,
  BookOpen,
  Rocket,
} from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

const prerequisites = [
  "Python 3.12 or higher",
  "PipX package manager",
  "Git version control",
  "Docker (recommended for LocalNet)",
  "VS Code or preferred IDE",
]

export default function InstallationPage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <main className="min-h-screen animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Back to Documentation */}
        <div className="max-w-4xl mx-auto">
          <Link href="/docs" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Documentation
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">AlgoKit Installation</h1>
          <p className="text-xl text-gray-300 mb-8">
            Get AlgoKit installed on your system and start building on Algorand. Follow the installation guide for your
            operating system to set up the complete development environment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/docs/quick-start">
              <Button
                variant="outline"
                className="border-[#ec0033] text-[#ec0033] hover:bg-[#ec0033] hover:text-white transition-colors duration-300"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Quick Start Guide
              </Button>
            </Link>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="glass-effect p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Prerequisites</h2>
            <p className="text-gray-300 mb-6">
              Before installing AlgoKit, ensure you have the following components installed on your system:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {prerequisites.map((prereq, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{prereq}</span>
                </div>
              ))}
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-200 text-sm">
                    <strong>Note:</strong> Some installation methods will automatically install Python and other
                    dependencies. Check the specific instructions for your operating system below.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Installation Methods */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Installation Methods</h2>

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
                    <h3 className="text-2xl font-bold text-white mb-4">Windows Installation</h3>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                      <p className="text-blue-200 text-sm">
                        <strong>Note:</strong> This method installs the most recent Python 3 version via winget. If you
                        already have Python 3.12+ installed, you may prefer to use the OS Agnostic method.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Step 1: Install Prerequisites</h4>
                    <p className="text-gray-300 mb-4">Install Git and Docker using Windows Package Manager:</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Install Git:</p>
                        <div className="bg-black/30 rounded-lg p-4">
                          <code className="text-green-400 font-mono">winget install git.git</code>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Install Docker Desktop:</p>
                        <div className="bg-black/30 rounded-lg p-4">
                          <code className="text-green-400 font-mono">winget install docker.dockerdesktop</code>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
                      <p className="text-yellow-200 text-sm">
                        <strong>Info:</strong> See our LocalNet documentation for additional tips on installing Docker
                        on Windows.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Step 2: Install Python</h4>
                    <div className="bg-black/30 rounded-lg p-4 mb-4">
                      <code className="text-green-400 font-mono">winget install python.python.3.12</code>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      Restart the terminal after installation to ensure Python and pip are available on the path.
                    </p>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                      <p className="text-yellow-200 text-sm">
                        <strong>Windows App Execution Aliases:</strong> Windows has a feature that provides redirects
                        for the Python command. If Python is installed via other means, disable these aliases by
                        searching for "Manage app execution aliases" and turning off entries for python.exe and
                        python3.exe.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Step 3: Install pipx and AlgoKit</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Install pipx:</p>
                        <div className="bg-black/30 rounded-lg p-4">
                          <code className="text-green-400 font-mono">pip install --user pipx</code>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Ensure pipx is on the path:</p>
                        <div className="bg-black/30 rounded-lg p-4">
                          <code className="text-green-400 font-mono">python -m pipx ensurepath</code>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Restart the terminal, then install AlgoKit:</p>
                        <div className="bg-black/30 rounded-lg p-4">
                          <code className="text-green-400 font-mono">pipx install algokit</code>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-2">If updating from a previous version:</p>
                        <div className="bg-black/30 rounded-lg p-4">
                          <code className="text-green-400 font-mono">pipx upgrade algokit</code>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mt-4">
                      Restart the terminal to ensure AlgoKit is available on the path.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="macos">
              <Card className="glass-effect p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">macOS Installation</h3>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                      <p className="text-blue-200 text-sm">
                        <strong>Note:</strong> This method installs the latest Python 3 release as a dependency via
                        Homebrew. If you already have Python 3.12+ installed, you may prefer to use the OS Agnostic
                        method.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Step 1: Install Prerequisites</h4>
                    <p className="text-gray-300 mb-4">Ensure you have the following installed:</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300">
                          <a href="https://docs.brew.sh/Installation" className="text-blue-400 hover:underline">
                            Homebrew
                          </a>
                        </span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300">Git (should be available if brew is installed)</span>
                      </li>
                    </ul>
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Install Docker Desktop:</p>
                      <div className="bg-black/30 rounded-lg p-4">
                        <code className="text-green-400 font-mono">brew install --cask docker</code>
                      </div>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
                      <p className="text-yellow-200 text-sm">
                        <strong>Info:</strong> Docker requires macOS 11 or later.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Step 2: Install AlgoKit</h4>
                    <div className="bg-black/30 rounded-lg p-4 mb-4">
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
                    <h3 className="text-2xl font-bold text-white mb-4">Linux Installation</h3>
                    <p className="text-gray-300 mb-6">
                      For Linux systems, ensure you have the prerequisites installed via your package manager, then use
                      the OS Agnostic installation method.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Prerequisites</h4>
                    <p className="text-gray-300 mb-4">
                      Install the following using your distribution's package manager:
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center space-x-3">
                        <Terminal className="h-4 w-4 text-blue-400" />
                        <span className="text-gray-300">
                          <a href="https://www.python.org/downloads/" className="text-blue-400 hover:underline">
                            Python 3.12+
                          </a>
                        </span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <Terminal className="h-4 w-4 text-blue-400" />
                        <span className="text-gray-300">
                          <a
                            href="https://pypa.github.io/pipx/#on-linux-install-via-pip-requires-pip-190-or-later"
                            className="text-blue-400 hover:underline"
                          >
                            pipx
                          </a>
                        </span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <Terminal className="h-4 w-4 text-blue-400" />
                        <span className="text-gray-300">
                          <a
                            href="https://github.com/git-guides/install-git#install-git-on-linux"
                            className="text-blue-400 hover:underline"
                          >
                            Git
                          </a>
                        </span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <Terminal className="h-4 w-4 text-blue-400" />
                        <span className="text-gray-300">
                          <a
                            href="https://docs.docker.com/desktop/install/linux-install/"
                            className="text-blue-400 hover:underline"
                          >
                            Docker
                          </a>
                        </span>
                      </li>
                    </ul>
                    <p className="text-gray-300">
                      Once prerequisites are installed, continue with the OS Agnostic installation method below.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="pipx">
              <Card className="glass-effect p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">OS Agnostic Installation</h3>
                    <p className="text-gray-300 mb-6">
                      This method works on any operating system where Python 3.12+ and pipx are available.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Install AlgoKit</h4>
                    <p className="text-gray-300 mb-4">Run the following command from a terminal:</p>
                    <div className="bg-black/30 rounded-lg p-4 mb-4">
                      <code className="text-green-400 font-mono">pipx install algokit</code>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Update AlgoKit</h4>
                    <p className="text-gray-300 mb-4">If you have used AlgoKit before, update it with:</p>
                    <div className="bg-black/30 rounded-lg p-4 mb-4">
                      <code className="text-green-400 font-mono">pipx upgrade algokit</code>
                    </div>
                    <p className="text-gray-400 text-sm">
                      After installation completes, restart the terminal to ensure AlgoKit is available on the path.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Additional Resources</h4>
                    <p className="text-gray-300 mb-4">
                      Additional AlgoKit videos are available on the{" "}
                      <a href="#" className="text-blue-400 hover:underline">
                        @AlgoDevs YouTube channel
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Verification */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="glass-effect p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Verify Installation</h2>
            <p className="text-gray-300 mb-4">
              To verify that AlgoKit has been installed correctly, run the following command:
            </p>
            <div className="bg-black/30 rounded-lg p-4 mb-6">
              <code className="text-green-400 font-mono">algokit --version</code>
            </div>
            <p className="text-gray-300 mb-4">Output similar to the following should be displayed:</p>
            <div className="bg-black/30 rounded-lg p-4 mb-6">
              <code className="text-blue-400 font-mono">algokit, version 2.0.0</code>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-400 mb-2">Installation Complete!</h3>
              <p className="text-green-200">
                AlgoKit is now installed and ready to use. You can start building on Algorand!
              </p>
            </div>
          </Card>
        </div>

        {/* Troubleshooting */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="glass-effect p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mr-4">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Troubleshooting</h2>
            </div>

            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">Common issues and their solutions:</p>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-red-400 mb-2">Command not found: algokit</h4>
                  <p className="text-gray-300 text-sm mb-2">This usually means pipx is not in your PATH. Try:</p>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <code className="text-green-400 text-sm">pipx ensurepath</code>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">Then restart your terminal and try again.</p>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-red-400 mb-2">Python version too old</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    AlgoKit requires Python 3.12 or higher. Check your version:
                  </p>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <code className="text-green-400 text-sm">python --version</code>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    If your version is older, please upgrade Python from{" "}
                    <a href="https://python.org" className="text-blue-400 hover:text-blue-300">
                      python.org
                    </a>
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-red-400 mb-2">Docker issues</h4>
                  <p className="text-gray-300 text-sm mb-2">If LocalNet fails to start, ensure Docker is running:</p>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <code className="text-green-400 text-sm">docker --version</code>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    Make sure Docker Desktop is running and you have sufficient permissions.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-red-400 mb-2">Permission denied errors</h4>
                  <p className="text-gray-300 text-sm mb-2">If you encounter permission errors during installation:</p>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <code className="text-green-400 text-sm">pip install --user pipx</code>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    Use the --user flag to install packages in your user directory instead of system-wide.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Next Steps */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-effect p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">What's Next?</h2>
            <p className="text-gray-300 mb-6">
              Now that AlgoKit is installed, continue your development journey with these resources:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/docs/quick-start">
                <Button
                  variant="outline"
                  className="w-full border-[#ec0033] text-[#ec0033] hover:bg-[#ec0033] hover:text-white transition-colors duration-300"
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  Quick Start Guide
                </Button>
              </Link>
              <Link href="/docs">
                <Button
                  variant="outline"
                  className="w-full border-[#ec0033] text-[#ec0033] hover:bg-[#ec0033] hover:text-white transition-colors duration-300"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Documentation
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
