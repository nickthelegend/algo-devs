"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from "@txnlab/use-wallet-react"
import algosdk from "algosdk"
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


export default function BountyProfilePage() {

    const { activeAccount } = useWallet();
    
    function statusIndicator() {
        const {activeAccount} = useWallet();
    }
    
    /*const indexerClient = new algosdk.Indexer('', 'https://testnet-idx.algonode.cloud', '');

    type UserStats = {
      tasks_completed: number;
      bounties_earned: number;
    };
    type UseUserStatsReturn = {
      stats: UserStats;
      loading: boolean;
    };
    type ActiveAccount = {
      address: string;
    };

    function useUserStats(walletAddress: string | null, appId: number): UseUserStatsReturn {
      const [stats, setStats] = useState<UserStats>({ tasks_completed: 0, bounties_earned: 0 });
      const [loading, setLoading] = useState<boolean>(true);

      useEffect(() => {
        if (!walletAddress || !appId) return;
        setLoading(true);
        indexerClient.lookupAccountAppLocalStates(walletAddress).do()
        .then((response) => {
          const localStates = response.appsLocalStates || [];
          const appState = localStates.find((app:any) => app.id===appId);

          if (!appState || !appState.keyValue || !Array.isArray(appState.keyValue)) {
            setStats({ tasks_completed: 0, bounties_earned: 0 });
            setLoading(false);
            return;
          }

          const decodeValue = (key: string): number => {
            const kv = appState.keyValue?.find((kv: any) => atob(kv.key)===key);
            if (!kv || !kv.value) return 0;
            const value=kv.value.uint;
            return typeof value === 'bigint' ? Number(value) : value;
          };

          setStats({
            tasks_completed: decodeValue("tasks_completed"),
            bounties_earned: decodeValue("bounties_earned"),
          });
          setLoading(false);
        })
        .catch(() => {
          setStats({ tasks_completed: 0, bounties_earned: 0});
          setLoading(false);
        });
      }, [walletAddress, appId]);

      return {stats, loading};
    }
    type ProfilePageProps ={
      activeAccount: ActiveAccount | null;
    };

    function ProfilePage({ activeAccount }: ProfilePageProps): React.JSX.Element{
      const appId = 12345678
      const walletAddress = activeAccount?.address || null;
      const { stats, loading } = useUserStats(walletAddress, appId);

      if (!walletAddress) return <div>Please connect your wallet</div>;
      if (loading) return <div>Loading...</div>;

      return (
        <div>
          <p>Tasks Completed: {stats.tasks_completed}</p>
          <p>Bounties Earned: {stats.bounties_earned}</p>
        </div>
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

        fetch(`https://testnet-idx.algonode.cloud/v2/accounts/${address}`)
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

  type Badge = {
    name: string;
    tasksRequired?: number;
    description: string;
    unlocked: boolean;
    type: "task" | "first_sign";
  };

  type BadgeCriteria = {
    name: string;
    tasksRequired?: number;
    description: string;
    type: "task" | "first_sign";
  };

  const BADGE_CRITERIA: BadgeCriteria[] = [
    {name: "Rookie", description: "Awarded for connecting your wallet for the first time.", type: "first_sign",},
    {name: "Task Master", tasksRequired: 3, description: "Awarded for completing your first 3 tasks.", type: "task",},
    {name: "Bounty Hunter", tasksRequired: 5, description: "Unlocked after finishing 5 tasks.", type: "task",},
    {name: "Algorand Pro", tasksRequired: 10, description: "Earned by completing 10 tasks.", type: "task",},

  ];
  const ALGONODE_API = "https://testnet-api.algonode.cloud";

  function decodeNote(base64: string): string {
    try {
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i=0;i<binary.length;i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return new TextDecoder().decode(bytes);
    } catch {
      return "";
    }
  }
  interface BadgesProps {
    account: string;
  }

  function Badges({account}: BadgesProps) {
    const [badges, setBadges] = useState<Badge[]>([]);

    useEffect(() => {
      if (!account) return;

      async function fetchBadges() {
        try{
          const url = `${ALGONODE_API}/v2/accounts/${account}/transactions?limit=100`;
          const resp = await fetch(url);
          const data = await resp.json();
          const txs = (data.transactions || []) as any[];
          const completed = txs.filter(
            (tx:any) => tx.note && decodeNote(tx.note) === "task_complete"
          ).length;
          const isConnected = !!account;
          
          const newBadges = BADGE_CRITERIA.map((b) => {
            if (b.type === "first_sign") {
              return {...b, unlocked: isConnected};
            }
            if (b.type === "task") {
              return {...b, unlocked: completed >= (b.tasksRequired || 0)};
            }
            return {...b, unlocked: false};
          });
          setBadges(newBadges);
        } catch (err) {
          console.error("Failed to fetch transactions for badges", err);
        }
      }
      fetchBadges();
    }, [account]);

    if (!account) return null;
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4">Badges</h3>
        <div className="flex flex-wrap gap-4">
          {badges.map((badge, index) => (
            <div key={index} className={`min-w-[140px] p-4 rounded-lg text-center transition ${badge.unlocked? "border-2 border-green-500 bg-green-50 opacity-100":"border-2 border-gray-400 bg-gray-100 opacity-70"}`}>
              <div className="font-bold text-red">{badge.name}</div>
              <div className="text-2xl my-2 text-red">{badge.unlocked ? "✅" : "🔒"}</div>
              <div className="text-sm text-red">{badge.description}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }


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
      unlocked: false,
      rarity: "common",
    },
    {
      id: 2,
      name: "Speed Demon",
      description: "Completed 5 bounties in 24 hours",
      icon: Clock,
      unlocked: false,
      rarity: "rare",
    },
    {
      id: 3,
      name: "Bug Hunter",
      description: "Found and fixed 10 critical bugs",
      icon: Shield,
      unlocked: false,
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
      unlocked: false,
      rarity: "epic",
    },
  ]


  return (
    <div className="min-h-screen animated-gradient">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="glass-effect rounded-2xl p-8 mt-20 mb-8 fade-in">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                AD
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
                      <Star key={i} className="w-5 h-5 fill-black-400 text-white-400" />
                    ))}
                    <span className="text-white font-semibold ml-2">0.0</span>
                  </div>
                  <Badge className="badge-green hover:bg-green-500/20">Verified Developer</Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <p className="gradient-text text-lg mb-4">Connectivity: </p>
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
                  {/*<ProfilePage activeAccount={activeAccount} />*/}
                  <p className="text-3xl font-bold text-white">0</p>
                  <p className="text-green-400 text-sm flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +0 this month
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
                  <p className="text-3xl font-bold text-white">0</p>
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
                  <p className="text-3xl font-bold text-white">0</p>
                  <p className="text-blue-400 text-sm">Across 0 protocols</p>
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
                  <p className="text-3xl font-bold text-white">0</p>
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
                  <CardTitle className="gradient-text">Reputation Score</CardTitle>
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
                      <p className="text-2xl font-bold text-white">0.0%</p>
                      <p className="text-xs text-gray-400">Success Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">0.0</p>
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
                  <p className="text-white flex items-center">Keep going! Your next achievement is just around the corner.</p>
                  <a href= "/bounties">
                    <Button variant="outline" className="border-[#ec0033] text-[#ec0033] hover:bg-[#ec0033] hover:text-white transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30 mt-4">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Go to Bounties
                    </Button>
                </a>
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
                  <p className="text-white">New code</p>
                  {activeAccount?.address && <Badges account={activeAccount?.address ?? null} />}
                  {/*{badges.map((badge) => {
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
                                  ? "badge-yellow hover:bg-yellow-500/20"
                                  : badge.rarity === "epic"
                                    ? "badge-purple hover:bg-purple-500/20"
                                    : badge.rarity === "rare"
                                      ? "badge-green hover:bg-green-500/20"
                                      : "badge-purple hover:bg-purple-500/20"
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
                  })}*/}
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
                  <p className="text-white flex items-center">You haven't contributed to any of the projects.</p>
                </div>
                <a href= "/projects">
                    <Button variant="outline" className="border-[#ec0033] text-[#ec0033] hover:bg-[#ec0033] hover:text-white transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30 mt-4">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Go to Projects
                    </Button>
                </a>
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
                  <p className="text-white flex items-center">You're all caught up!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
