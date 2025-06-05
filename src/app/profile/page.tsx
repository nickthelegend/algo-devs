"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from "@txnlab/use-wallet-react"
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Star,
  Trophy,
  Target,
  Coins,
  Shield,
  Award,
  Lock,
  Copy,
  ExternalLink,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
} from "lucide-react"


export default async function BountyProfilePage() {

    function statusIndicator() {
        const {activeAccount} = useWallet();
    }
    

    /*type WalletCopyProps = {
        address: string;
    };

  function WalletCopy({address}: WalletCopyProps) {
    const [copied, setCopied] = useState(false);

    return(
        <span>
            <CopyToClipboard text={address} 
            onCopy={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            }}>
                <button className="ml-2 p-1 rounded bg-purple-700 transition" title="Copy address">
                    <Copy size={16} />
                </button>
            </CopyToClipboard>
            {copied && (<span className="ml-2 text-green-400 text-xs">Copied!</span>)}
        </span>
    );
  }*/

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if (activeAccount && activeAccount.address && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        try {
            await navigator.clipboard.writeText(activeAccount.address);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    } else {
        console.warn("No address to copy");
    }
  }; 

    type AlgoBalanceProps = {
    address: string | null;
  };

  function AlgoBalance({address}: AlgoBalanceProps){
    if(!activeAccount) return <span>Connect Wallet to see balance</span>;
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (!address) {
            setBalance(null);
            return;
        }

        setLoading(true);
        setError(null);

        fetch(`https://mainnet-idx.algonode.cloud/v2/accounts/${address}`)
        .then((res) => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        .then((data) => {
            setBalance(data.account.amount / 1e6);
            setLoading(false);
        })
        .catch((err) => {
            setError("Failed to fetch Balance, please try again");
            setLoading(false);
        });
    }, [address]);
    if (!address) return <span>Connect Wallet to see balance</span>;
    if (loading) return <span>Loading balance...</span>;
    if (error) return <span>{error}</span>

    return (
        <span>
            Wallet Balance: <b>{balance} ALGO</b>
        </span>
    );
  };

  const { activeAccount } = useWallet()


  const badges = [
    {
      id: 1,
      name: "Rookie",
      description: "First Sign-In",
      icon: Target,
      unlocked: true,
      rarity: "common",
    },
    {
      id: 1,
      name: "First Bounty",
      description: "Completed your first bounty",
      icon: Target,
      unlocked: true,
      rarity: "common",
    },
    {
      id: 2,
      name: "Speed Demon",
      description: "Completed 5 bounties in 24 hours",
      icon: Clock,
      unlocked: true,
      rarity: "rare",
    },
    {
      id: 3,
      name: "Bug Hunter",
      description: "Found and fixed 10 critical bugs",
      icon: Shield,
      unlocked: true,
      rarity: "epic",
    },
    {
      id: 4,
      name: "Community Leader",
      description: "Helped 50+ developers",
      icon: Users,
      unlocked: false,
      rarity: "legendary",
    },
    {
      id: 5,
      name: "Millionaire",
      description: "Earned 1M ALGO in bounties",
      icon: Coins,
      unlocked: false,
      rarity: "legendary",
    },
    {
      id: 6,
      name: "Perfect Score",
      description: "Maintain 5.0 rating for 30 days",
      icon: Star,
      unlocked: true,
      rarity: "epic",
    },
  ]

  const projects = [
    { name: "AlgoSwap DEX", role: "Smart Contract Developer", bounties: 12, earned: "45,000 ALGO" },
    { name: "NFT Marketplace", role: "Frontend Developer", bounties: 8, earned: "32,000 ALGO" },
    { name: "DeFi Lending Protocol", role: "Security Auditor", bounties: 15, earned: "78,000 ALGO" },
    { name: "Cross-chain Bridge", role: "Backend Developer", bounties: 6, earned: "28,000 ALGO" },
  ]

  const recentTasks = [
    {
      title: "Fix smart contract vulnerability",
      project: "AlgoSwap DEX",
      reward: "5,000 ALGO",
      status: "completed",
      date: "2 days ago",
    },
    {
      title: "Implement wallet integration",
      project: "NFT Marketplace",
      reward: "3,200 ALGO",
      status: "completed",
      date: "5 days ago",
    },
    {
      title: "Optimize gas usage",
      project: "DeFi Protocol",
      reward: "7,800 ALGO",
      status: "in-progress",
      date: "1 week ago",
    },
    {
      title: "Add multi-sig support",
      project: "Cross-chain Bridge",
      reward: "4,500 ALGO",
      status: "completed",
      date: "2 weeks ago",
    },
  ]

  return (
    <div className="min-h-screen animated-gradient">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="glass-effect rounded-2xl p-8 mb-8 fade-in">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                AX
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="gradient-text text-3xl lg:text-4xl mb-2">WALLET ADDRESS:</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-black/30 rounded-lg px-4 py-2">
                  <code className="text-purple-300 text-sm font-mono">
                    <span>
                        {activeAccount? `${activeAccount.address.slice(0,9)}.....${activeAccount.address.slice(-9)}` : "Not Connected"}
                    </span>
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-6 w-6 p-0 hover:bg-purple-500/20"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-white font-semibold ml-2">5.0</span>
                  </div>
                  <Badge className="badge-green">Verified Developer</Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <p className="text-gray-300 text-lg mb-4">Status: </p>
                <p className="mt-[0.15rem]">
                    <span className={activeAccount ? "text-green-400" : "text-red-400"}>{activeAccount ? "Connected" : "Disconnected"}</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button className="gradient-button mb-4">
                <Coins className="w-4 h-4 mr-1" />
                <AlgoBalance address={activeAccount?.address ?? null} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href= "/leaderboard">
                    <Button variant="outline" className="border-[#ec0033] text-[#ec0033] hover:bg-[#ec0033] hover:text-white transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Leaderboard
                    </Button>
                </a>
                <a href= "/bounties">
                    <Button variant="outline" className="border-[#ec0033] text-[#ec0033] hover:bg-[#ec0033] hover:text-white transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Go to Bounties
                    </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="stats-card fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Tasks Completed</p>
                  <p className="text-3xl font-bold text-white">247</p>
                  <p className="text-green-400 text-sm flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +12 this month
                  </p>
                </div>
                <Target className="w-12 h-12 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Bounties Earned</p>
                  <p className="text-3xl font-bold text-white">183,200</p>
                  <p className="text-purple-300 text-sm">ALGO</p>
                </div>
                <Coins className="w-12 h-12 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Projects Contributed</p>
                  <p className="text-3xl font-bold text-white">41</p>
                  <p className="text-blue-400 text-sm">Across 15 protocols</p>
                </div>
                <Trophy className="w-12 h-12 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Reputation Score</p>
                  <p className="text-3xl font-bold text-white">9,847</p>
                  <p className="text-purple-300 text-sm">Top 1% globally</p>
                </div>
                <Award className="w-12 h-12 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-black/40 border border-purple-500/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="badges" className="data-[state=active]:bg-purple-600">
              Badges
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-purple-600">
              Projects
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-purple-600">
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Reputation Progress */}
              <Card className="algo-card fade-in">
                <CardHeader>
                  <CardTitle className="gradient-text">Reputation Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Current Level: Expert</span>
                      <span className="text-purple-300">9,847 / 10,000</span>
                    </div>
                    <p className="text-xs text-gray-400">153 points to Master level</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">98.5%</p>
                      <p className="text-xs text-gray-400">Success Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">4.2</p>
                      <p className="text-xs text-gray-400">Avg Days/Task</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card className="algo-card fade-in">
                <CardHeader>
                  <CardTitle className="gradient-text">Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-purple-900/20 rounded-lg">
                    <Shield className="w-8 h-8 text-purple-400" />
                    <div>
                      <p className="text-white font-medium">Security Expert</p>
                      <p className="text-xs text-gray-400">Completed 50 security audits</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-yellow-900/20 rounded-lg">
                    <Star className="w-8 h-8 text-yellow-400" />
                    <div>
                      <p className="text-white font-medium">Perfect Rating</p>
                      <p className="text-xs text-gray-400">Maintained 5.0 stars for 30 days</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-green-400" />
                    <div>
                      <p className="text-white font-medium">Rising Star</p>
                      <p className="text-xs text-gray-400">Top performer this quarter</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <Card className="algo-card fade-in">
              <CardHeader>
                <CardTitle className="gradient-text">Achievement Badges</CardTitle>
                <p className="text-gray-400">Unlock badges by completing bounties and contributing to projects</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {badges.map((badge) => {
                    const IconComponent = badge.icon
                    return (
                      <div
                        key={badge.id}
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          badge.unlocked
                            ? "bg-purple-900/40 border-purple-500/30 hover:border-purple-400/50"
                            : "bg-gray-900/40 border-gray-600/30 opacity-60"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 rounded-lg ${badge.unlocked ? "bg-purple-600/20" : "bg-gray-600/20"}`}>
                            {badge.unlocked ? (
                              <IconComponent className="w-6 h-6 text-purple-400" />
                            ) : (
                              <Lock className="w-6 h-6 text-gray-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-semibold ${badge.unlocked ? "text-white" : "text-gray-500"}`}>
                              {badge.name}
                            </h3>
                            <Badge
                              className={`text-xs ${
                                badge.rarity === "legendary"
                                  ? "badge-yellow"
                                  : badge.rarity === "epic"
                                    ? "badge-purple"
                                    : badge.rarity === "rare"
                                      ? "badge-green"
                                      : "badge-purple"
                              }`}
                            >
                              {badge.rarity}
                            </Badge>
                          </div>
                        </div>
                        <p className={`text-sm ${badge.unlocked ? "text-gray-300" : "text-gray-500"}`}>
                          {badge.description}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="algo-card fade-in">
              <CardHeader>
                <CardTitle className="gradient-text">Project Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index} className="p-4 bg-purple-900/20 rounded-xl border border-purple-500/20">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-white font-semibold text-lg">{project.name}</h3>
                          <p className="text-purple-300">{project.role}</p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <p className="text-white font-bold">{project.bounties}</p>
                              <p className="text-xs text-gray-400">Bounties</p>
                            </div>
                            <div className="text-center">
                              <p className="text-green-400 font-bold">{project.earned}</p>
                              <p className="text-xs text-gray-400">Earned</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="algo-card fade-in">
              <CardHeader>
                <CardTitle className="gradient-text">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-black/20 rounded-xl">
                      <div
                        className={`p-2 rounded-lg ${
                          task.status === "completed"
                            ? "bg-green-600/20"
                            : task.status === "in-progress"
                              ? "bg-yellow-600/20"
                              : "bg-gray-600/20"
                        }`}
                      >
                        {task.status === "completed" ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <Clock className="w-5 h-5 text-yellow-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{task.title}</h3>
                        <p className="text-gray-400 text-sm">{task.project}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-semibold">{task.reward}</p>
                        <p className="text-gray-400 text-sm">{task.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
