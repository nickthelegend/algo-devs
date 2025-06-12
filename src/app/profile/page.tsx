"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from "@txnlab/use-wallet-react"
import {
  Star,
  Trophy,
  Target,
  Coins,
  Award,
  Lock,
  Copy,
  ExternalLink,
  CheckCircle,
  Pencil,
} from "lucide-react"

// --- TYPE DEFINITIONS AND CONSTANTS ---

type BadgeInfo = {
  name: string;
  tasksRequired?: number;
  description: string;
  unlocked: boolean;
  type: "task" | "first_sign";
  rarity: string;
};

type BadgeCriteria = Omit<BadgeInfo, "unlocked">;

const BADGE_CRITERIA: BadgeCriteria[] = [
  {name: "Rookie", description: "Awarded for connecting your wallet for the first time.", type: "first_sign", rarity: "common",},
  {name: "Power User", tasksRequired: 5, description: "Awarded for completing your first 5 tasks.", type: "task", rarity: "common",},
  {name: "Task Master", tasksRequired: 15, description: "Earned by completing 15 tasks.", type: "task", rarity: "rare",},
  {name: "Bounty Hunter", tasksRequired: 25, description: "Earned by completing 25 tasks.", type: "task", rarity: "epic",},
  {name: "Community Helper", tasksRequired: 50, description: "Earned by completing 50 tasks.", type: "task", rarity: "legendary",},
  {name: "Algorand Pro", tasksRequired: 65, description: "Earned by completing 65 tasks.", type: "task", rarity: "legendary",}
];

const ALGONODE_INDEXER_API = "https://testnet-idx.algonode.cloud";


// *** FIX: Define a type for the indexer's JSON response to help TypeScript ***
interface IndexerResponse {
  'next-token'?: string;
  transactions: any[]; // Using `any` for transactions is acceptable here as their structure is complex
}

function decodeNote(base64: string): string {
  try {
    return atob(base64);
  } catch {
    return "";
  }
}

// --- CORRECTED BADGES SUB-COMPONENT ---

interface BadgesProps {
  account: string | null;
}

function Badges({ account }: BadgesProps) {
  const [badges, setBadges] = useState<BadgeInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!account) {
      setIsLoading(false);
      return;
    }

    async function fetchAllTransactions(address: string) {
      let allTransactions: any[] = [];
      let nextToken: string | null = null;
      let hasMore = true;

      while (hasMore) {
        const url: string = `${ALGONODE_INDEXER_API}/v2/accounts/${address}/transactions?limit=1000${nextToken ? `&next=${nextToken}` : ''}`;
        
        // *** FIX: Explicitly type the response from fetch() as `Response` ***
        const resp: Response = await fetch(url);

        if (!resp.ok) {
          throw new Error("Failed to fetch transaction data from the indexer.");
        }

        // *** FIX: Explicitly type the parsed JSON data using our interface ***
        const data: IndexerResponse = await resp.json();
        
        allTransactions = allTransactions.concat(data.transactions || []);
        
        nextToken = data['next-token'] || null; // Use nullish coalescing for safety
        hasMore = !!nextToken;
      }
      return allTransactions;
    }

    async function processBadges() {
      setIsLoading(true);
      setError(null);
      try {
        const txs = await fetchAllTransactions(account!);

        const completedTasksCount = txs.filter(
          (tx: any) => tx.note && decodeNote(tx.note) === "task_complete"
        ).length;

        const isConnected = !!account;

        const unlockedBadges = BADGE_CRITERIA.map((criteria) => {
          let unlocked = false;
          if (criteria.type === "first_sign") {
            unlocked = isConnected;
          } else if (criteria.type === "task" && criteria.tasksRequired) {
            unlocked = completedTasksCount >= criteria.tasksRequired;
          }
          return { ...criteria, unlocked };
        });

        setBadges(unlockedBadges);
      } catch (err) {
        console.error("Failed to process badges:", err);
        setError("Could not load badges. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }



    processBadges();
  }, [account]);

  if (isLoading) {
    return <p className="text-gray-400">Loading badges...</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  if (badges.length === 0 && !isLoading) {
    return <p className="text-gray-400">No badges to display yet. Complete some tasks!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {badges.map((badge, index) => (
        <div key={index} className={`p-4 rounded-xl border transition-all duration-300 flex flex-col ${badge.unlocked? "bg-purple-900/40 border-purple-500/30 hover:border-purple-400/50" : "bg-gray-900/40 border-gray-600/30 opacity-60"}`}>
          <div className="flex gap-3 mb-3">
            <div className={`p-2 rounded-lg ${badge.unlocked? "bg-purple-600/20" : "bg-gray-600/20"}`}>
              {badge.unlocked ? (
                <Trophy className="w-6 h-6 text-purple-400" />
              ) : (<Lock className="w-6 h-6 text-gray-500" />
              )}
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold ${badge.unlocked? "text-white" : "text-gray-500"}`}>{badge.name}</h3>
              <Badge className={`text-xs ${
                badge.rarity === "legendary"
                  ? "badge-yellow hover:bg-yellow-500/20"
                  : badge.rarity === "epic"
                    ? "badge-purple hover:bg-purple-500/20"
                    : badge.rarity === "rare"
                      ? "badge-green hover:bg-green-500/20"
                      : "badge-purple hover:bg-purple-500/20"
              }`}>
                {badge.rarity}
              </Badge>
            </div>
          </div>
          <p className={`text-sm mt-auto ${badge.unlocked? "text-gray-300" : "text-gray-500"}`}>{badge.description}</p>
        </div>
      ))}
    </div>
  );
}


// --- BALANCE SUB-COMPONENT ---
type AlgoBalanceProps = {
  address: string | null;
};

function AlgoBalance({ address }: AlgoBalanceProps) {
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

    fetch(`${ALGONODE_INDEXER_API}/v2/accounts/${address}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setBalance(data.account.amount / 1e6);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch Balance");
        setLoading(false);
      });
  }, [address]);

  if (!address) return <span>Connect Wallet</span>;
  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error</span>;

  return <span>Wallet Balance: {balance?.toFixed(2) ?? 'Loading...'} ALGO</span>;
};

type ReputationData = {
  tasksCompleted: number;
  displayScore: number;
  level: string;
  nextLevelScore: number;
  isLoading: boolean;
  error: string | null;
};

interface ReputationStatsProps {
  account: string | null;
  selectedAvatar: string;
  defaultAvatarSrc: string;
  children: (data: ReputationData) => React.ReactNode;
}

function ReputationStats({ account, selectedAvatar, defaultAvatarSrc, children}: ReputationStatsProps) {
  const [data, setData] = useState<ReputationData>({
    tasksCompleted: 0,
    displayScore: 0,
    level: "Rookie",
    nextLevelScore: 50,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!account) {
      setData(prev => ({...prev, isLoading: false, displayScore: 40, tasksCompleted: 0}));
      return;
    }
    const calculateReputation = async () => {
      setData(prev => ({...prev, isLoading: true, error: null}));
      try {
        let allTransactions: any[] = [];
        let nextToken: string | null = null;
        let hasMore = true;
        while (hasMore) {
          const url = `${ALGONODE_INDEXER_API}/v2/accounts/${account}/transactions?limit=1000${nextToken ? `&next=${nextToken}` : ''}`;
          const resp = await fetch(url);
          if (!resp.ok) throw new Error("Failed to fetch transaction data.");
          const data: IndexerResponse = await resp.json();
          allTransactions = allTransactions.concat(data.transactions || []);
          nextToken = data['next-token'] || null;
          hasMore = !!nextToken;
        }
        const tasksCompleted = allTransactions.filter(tx => decodeNote(tx.note)==="task_complete").length;
        const avatarBonus = selectedAvatar !== defaultAvatarSrc ? 100 : 0;
        const rawScore = 100 + (tasksCompleted * 500) + avatarBonus;
        const displayScore = Math.floor(Math.log10(rawScore) * 10 + 20);
        let level = "Rookie";
        let nextLevelScore = 50;
        if (displayScore >= 80) { level = "Legend"; nextLevelScore = 80; }
        else if (displayScore >= 70) { level = "Master"; nextLevelScore = 80; }
        else if (displayScore >= 60) { level = "Elite"; nextLevelScore = 70; }
        else if (displayScore >= 50) { level = "Veteran"; nextLevelScore = 60; }
        setData({ tasksCompleted, displayScore, level, nextLevelScore, isLoading: false, error: null});
        } catch (err) {
          console.error("Failed to calculate reputation:", err);
          setData({tasksCompleted: 0, displayScore:0, level:"Rookie", nextLevelScore:50, isLoading:false, error:"Could not load reputation."});
        }
      };
      calculateReputation();
  }, [account, selectedAvatar, defaultAvatarSrc]);
  return <>{children(data)}</>;
}

interface StarRatingProps {
  rating: number;
  className?: string;
}
export function StarRating({rating, className}: StarRatingProps) {
  const gradientId = `half-star-gradient-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={`flex items-center ${className}`}>
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="50%" stopColor="#6b7280" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
      {[...Array(5)].map((_, i) => {
        const starValue = i+1;
        if (rating >= starValue) {
          return <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />;
        }
        if (rating >= starValue - 0.5) {
          return <Star key={i} className="w-5 h-5" style={{ fill: `url(#${gradientId})`, color: '#6b7280' }} />;
        }
        return <Star key={i} className="w-5 h-5 text-gray-500" />;
      })}
    </div>
  )
}

// --- MAIN PROFILE PAGE COMPONENT ---
export default function BountyProfilePage() {
    const { activeAccount } = useWallet();

    const AVATARS = [
      { id: 1, src: 'https://robohash.org/1.png?set=set4' },
      { id: 2, src: 'https://robohash.org/2.png?set=set4' },
      { id: 3, src: 'https://robohash.org/3.png?set=set4' },
      { id: 4, src: 'https://robohash.org/4.png?set=set4' },
      { id: 5, src: 'https://robohash.org/5.png?set=set4' },
      { id: 6, src: 'https://robohash.org/6.png?set=set4' },
      { id: 7, src: 'https://robohash.org/7.png?set=set4' },
      { id: 8, src: 'https://robohash.org/8.png?set=set4' },
    ];
    
    const [selectedAvatar, setSelectedAvatar] = useState<string>(AVATARS[0].src);
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showFullAddress, setShowFullAddress] = useState(false);

    useEffect(() => {
      if (activeAccount) {
        const storageKey = `user-avatar-${activeAccount.address}`;
        const savedAvatar = localStorage.getItem(storageKey);
        if (savedAvatar) {
          setSelectedAvatar(savedAvatar);
        } else {
          setSelectedAvatar(AVATARS[0].src);
        }
      } else {
        setSelectedAvatar(AVATARS[0].src);
      }
    }, [activeAccount]);

    useEffect(() => {
      if (activeAccount && selectedAvatar !== AVATARS[0].src) {
        const storageKey = `user-avatar-${activeAccount.address}`;
        localStorage.setItem(storageKey, selectedAvatar);
      }
    }, [selectedAvatar, activeAccount]);

    const handleAvatarSelect = (avatarSrc: string) => {
      setSelectedAvatar(avatarSrc);
      setIsAvatarModalOpen(false);
    };

    const handleCopy = async () => {
      if (activeAccount?.address && navigator.clipboard) {
          try {
              await navigator.clipboard.writeText(activeAccount.address);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
          } catch (err) {
              console.error("Failed to copy address:", err);
          }
      }//{({isLoading, error, tasksCompleted, displayScore, level, nextLevelScore}) => ()}
    }; 
    
    return (
      <ReputationStats account={activeAccount?.address??null} selectedAvatar={selectedAvatar} defaultAvatarSrc={AVATARS[0].src}>
        {({isLoading, error, tasksCompleted, displayScore, level, nextLevelScore}) => {
          const MIN_SCORE = 40;
          const MAX_SCORE = 80;
          const starRating = isLoading || error ? 0 : Math.max(0, Math.min(5, ((displayScore - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * 5));
          return (
            <div className="min-h-screen animated-gradient">
              <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header Section */}
                <div className="glass-effect rounded-2xl p-8 mt-20 mb-8 fade-in">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                      <div className="relative group cursor-pointer" onClick={() => setIsAvatarModalOpen(true)}>
                        {selectedAvatar && (<img src={selectedAvatar} alt="User Avatar" className="w-32 h-32 rounded-full object-cover bg-gray-800 shadow-2xl border-2 border-purple-500" />)}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full flex items-center justify-center transition-opacity duration-300">
                          <Pencil className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="gradient-text text-3xl lg:text-4xl mb-2">WALLET ADDRESS:</p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                          <div className="flex items-center gap-2 bg-black/30 rounded-lg px-4 py-2">
                            <code className="text-purple-300 text-sm font-mono">
                              <span>
                                  {activeAccount? showFullAddress? activeAccount.address: `${activeAccount.address.slice(0,9)}.....${activeAccount.address.slice(-9)}` : "Not Connected"}
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
                            {activeAccount && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowFullAddress((prev) => !prev)}
                                className="h-6 w-12 p-0 bg-purple-500/20"
                              >
                                {showFullAddress ? "Hide" : "Show"}
                              </Button>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <StarRating rating={starRating} />
                            <span className="text-white font-semibold ml-1">
                               {isLoading ? '...' : error ? 'N/A' : starRating.toFixed(1)}
                            </span>
                            <Badge className="badge-green hover:bg-green-500/20">{level}</Badge>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                          <p className="gradient-text text-lg">Connectivity: </p>
                          <p><span className={activeAccount ? "text-green-400" : "text-red-400"}>{activeAccount ? "Connected" : "Disconnected"}</span></p>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                          <Button className="gradient-button mb-4">
                            <Coins className="w-4 h-4 mr-2" />
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
          
                  {isAvatarModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                      <div className="glass-effect rounded-2xl p-8 max-w-lg w-full relative">
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">Choose Your Avatar</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {AVATARS.map((avatar) => (
                            <img key={avatar.id} src={avatar.src} alt={`Avatar ${avatar.id}`} className={`w-24 h-24 rounded-full cursor-pointer object-cover border-4 transition-all duration-200 ${selectedAvatar === avatar.src ? 'border-purple-500 scale-110' : 'border-transparent hover:border-purple-400'}`} onClick={() => handleAvatarSelect(avatar.src)} />
                          ))}
                        </div>
                        <Button variant="outline" className="w-full mt-8 border-purple-500/50 text-black hover:bg-purple-600 hover:text-white" onClick={() => setIsAvatarModalOpen(false)}>
                          Close
                        </Button>
                      </div>
                    </div>
                  )}
          
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="stats-card fade-in">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-sm">Tasks Completed</p>
                            <p className="text-3xl font-bold text-white">{isLoading ? '...' : error ? '!' : tasksCompleted}</p>
                          </div>
                          <Target className="w-12 h-12 text-purple-400" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="stats-card fade-in"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-gray-400 text-sm">Bounties Earned</p><p className="text-3xl font-bold text-white">0</p><p className="text-purple-300 text-sm">ALGO</p></div><Coins className="w-12 h-12 text-yellow-400" /></div></CardContent></Card>
                    <Card className="stats-card fade-in"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-gray-400 text-sm">Projects Contributed</p><p className="text-3xl font-bold text-white">0</p><p className="text-blue-400 text-sm">Across 0 protocols</p></div><Trophy className="w-12 h-12 text-blue-400" /></div></CardContent></Card>
                    <Card className="stats-card fade-in">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-sm">Reputation Score</p>
                            <p className="text-3xl font-bold text-white">{isLoading ? '...' : error ? '!' : displayScore}</p>
                            <p className="text-purple-300 text-sm">{level}</p>
                          </div>
                          <Award className="w-12 h-12 text-purple-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
          
                  {/* Main Content Tabs */}
                  <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="bg-black/40 border border-purple-500/20">
                      <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">Overview</TabsTrigger>
                      <TabsTrigger value="badges" className="data-[state=active]:bg-purple-600">Badges</TabsTrigger>
                      <TabsTrigger value="projects" className="data-[state=active]:bg-purple-600">Projects</TabsTrigger>
                      <TabsTrigger value="activity" className="data-[state=active]:bg-purple-600">Activity</TabsTrigger>
                    </TabsList>
          
                    <TabsContent value="overview" className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="algo-card fade-in">
                          <CardHeader><CardTitle className="gradient-text">Reputation Score</CardTitle></CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Current Level: {level}</span>
                                <span className="text-purple-300">{isLoading? '...' : `${displayScore} / ${nextLevelScore}`}</span>
                              </div>
                              <p className="text-xs text-gray-400">{isLoading ? 'Calculating...' : error ? 'Error' : (displayScore >= nextLevelScore) ? 'Max level reached!' : `${nextLevelScore - displayScore} points to next level`}</p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="algo-card fade-in">
                          <CardHeader><CardTitle className="gradient-text">Recent Achievements</CardTitle></CardHeader>
                          <CardContent className="space-y-3"><p className="text-white flex items-center">Keep going! Your next achievement is just around the corner.</p><a href="/bounties"><Button variant="outline" className="border-[#ec0033] text-[#ec0033] hover:bg-[#ec0033] hover:text-white transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30 mt-4"><ExternalLink className="w-4 h-4 mr-2" />Go to Bounties</Button></a></CardContent>
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
                            <Badges account={activeAccount?.address ?? null} />
                        </CardContent>
                      </Card>
                    </TabsContent>
          
                    <TabsContent value="projects" className="space-y-6">
                      <Card className="algo-card fade-in">
                        <CardHeader><CardTitle className="gradient-text">Project Contributions</CardTitle></CardHeader>
                        <CardContent><div className="space-y-4"><p className="text-white flex items-center">You haven't contributed to any of the projects.</p></div><a href="/projects"><Button variant="outline" className="border-[#ec0033] text-[#ec0033] hover:bg-[#ec0033] hover:text-white transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30 mt-4"><ExternalLink className="w-4 h-4 mr-2" />Go to Projects</Button></a></CardContent>
                      </Card>
                    </TabsContent>
          
                    <TabsContent value="activity" className="space-y-6">
                      <Card className="algo-card fade-in">
                        <CardHeader><CardTitle className="gradient-text">Recent Activity</CardTitle></CardHeader>
                        <CardContent><div className="space-y-4"><p className="text-white flex items-center">You're all caught up!</p></div></CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
              </div>
            </div>
          )
        }}
      </ReputationStats>
    );
}
