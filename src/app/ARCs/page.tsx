'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"

const arcs = [
  {
    id: "ARC-0000",
    title: "ARC Process and Guidelines",
    status: "Final",
    date: "2021-10-28",
    category: "General",
  },
  {
    id: "ARC-0001",
    title: "Algorand Wallet Transaction Signing API",
    status: "Final",
    date: "2021-07-06",
    category: "Interface",
  },
  {
    id: "ARC-0002",
    title: "Algorand Transaction Note Field Conventions",
    status: "Final",
    date: "2021-07-06",
    category: "ARC",
  },
  {
    id: "ARC-0003",
    title: "Conventions Fungible/Non-Fungible Tokens",
    status: "Final",
    date: "2021-08-07",
    category: "ARC",
  },
  {
    id: "ARC-0004",
    title: "Application Binary Interface (ABI)",
    status: "Final",
    date: "2021-07-29",
    category: "Interface",
  },
  {
    id: "ARC-0005",
    title: "Wallet Transaction Signing API (Functional)",
    status: "Final",
    date: "2021-08-09",
    category: "Interface",
  },
  {
    id: "ARC-0006",
    title: "Algorand Wallet Address Discovery API",
    status: "Deprecated",
    date: "2021-08-09",
    category: "Interface",
  },
  {
    id: "ARC-0007",
    title: "Algorand Wallet Post Transactions API",
    status: "Deprecated",
    date: "2021-08-09",
    category: "Interface",
  },
  {
    id: "ARC-0008",
    title: "Algorand Wallet Sign and Post API",
    status: "Deprecated",
    date: "2021-08-09",
    category: "Interface",
  },
  {
    id: "ARC-0009",
    title: "Algorand Wallet Algodv2 and Indexer API",
    status: "Deprecated",
    date: "2021-08-09",
    category: "Interface",
  },
  {
    id: "ARC-0010",
    title: "Algorand Wallet Reach Minimum Requirements",
    status: "Deprecated",
    date: "2021-08-09",
    category: "Interface",
  },
  {
    id: "ARC-0011",
    title: "Algorand Wallet Reach Browser Spec",
    status: "Deprecated",
    date: "2021-08-09",
    category: "Interface",
  },
  {
    id: "ARC-0012",
    title: "Claimable ASA from vault application",
    status: "Withdrawn",
    date: "2022-09-05",
    category: "ARC",
  },
  {
    id: "ARC-0015",
    title: "Encrypted Short Messages",
    status: "Deprecated",
    date: "2022-11-21",
    category: "Interface",
  },
  {
    id: "ARC-0016",
    title: "Convention for declaring traits of an NFT's",
    status: "Final",
    date: "2022-01-04",
    category: "ARC",
  },
  {
    id: "ARC-0018",
    title: "Royalty Enforcement Specification",
    status: "Final",
    date: "2022-02-16",
    category: "Interface",
  },
  {
    id: "ARC-0019",
    title: "Templating of NFT ASA URLs for mutability",
    status: "Final",
    date: "2021-01-23",
    category: "ARC",
  },
  {
    id: "ARC-0020",
    title: "Smart ASA",
    status: "Final",
    date: "2022-04-27",
    category: "Interface",
  },
  {
    id: "ARC-0021",
    title: "Round based datafeed oracles on Algorand",
    status: "Final",
    date: "2022-03-09",
    category: "Interface",
  },
  {
    id: "ARC-0022",
    title: "Add `read-only` annotation to ABI methods",
    status: "Final",
    date: "2022-03-16",
    category: "Interface",
  },
  {
    id: "ARC-0023",
    title: "Sharing Application Information",
    status: "Final",
    date: "2023-01-11",
    category: "Interface",
  },
  {
    id: "ARC-0025",
    title: "Algorand WalletConnect v1 API",
    status: "Final",
    date: "2022-05-12",
    category: "Interface",
  },
  {
    id: "ARC-0026",
    title: "URI scheme",
    status: "Final",
    date: "2022-04-21",
    category: "Interface",
  },
  {
    id: "ARC-0027",
    title: "Provider Message Schema",
    status: "Final",
    date: "2023-12-24",
    category: "Interface",
  },
  {
    id: "ARC-0028",
    title: "Algorand Event Log Spec",
    status: "Final",
    date: "2022-07-18",
    category: "ARC",
  },
  {
    id: "ARC-0032",
    title: "Application Specification",
    status: "Final",
    date: "2022-12-01",
    category: "ARC",
  },
  {
    id: "ARC-0033",
    title: "xGov Pilot - Becoming an xGov",
    status: "Deprecated",
    date: "2022-11-22",
    category: "Meta",
  },
  {
    id: "ARC-0034",
    title: "xGov Pilot - Proposal Process",
    status: "Deprecated",
    date: "2022-11-22",
    category: "Meta",
  },
  {
    id: "ARC-0035",
    title: "Algorand Offline Wallet Backup Protocol",
    status: "Final",
    date: "2023-01-03",
    category: "Interface",
  },
  {
    id: "ARC-0036",
    title: "Convention for declaring filters of an NFT",
    status: "Deprecated",
    date: "2023-03-10",
    category: "ARC",
  },
  {
    id: "ARC-0042",
    title: "xGov Pilot - Integration",
    status: "Deprecated",
    date: "2023-06-01",
    category: "Informational",
  },
  {
    id: "ARC-0047",
    title: "Logic Signature Templates",
    status: "Final",
    date: "2023-07-17",
    category: "ARC",
  },
  {
    id: "ARC-0048",
    title: "Targeted DeFi Rewards",
    status: "Deprecated",
    date: "2023-07-19",
    category: "Informational",
  },
  {
    id: "ARC-0049",
    title: "NFT Rewards",
    status: "Deprecated",
    date: "2023-07-19",
    category: "Informational",
  },
  {
    id: "ARC-0053",
    title: "Metadata Declarations",
    status: "Last Call",
    date: "2023-09-12",
    category: "Meta",
  },
  {
    id: "ARC-0054",
    title: "CASA Burning App",
    status: "Final",
    date: "2023-09-15",
    category: "ARC",
  },
  {
    id: "ARC-0055",
    title: "On-Chain storage/transfer for Multisig",
    status: "Final",
    date: "2023-10-16",
    category: "Interface",
  },
  {
    id: "ARC-0059",
    title: "ASA Inbox Router",
    status: "Final",
    date: "2024-03-08",
    category: "ARC",
  },
  {
    id: "ARC-0062",
    title: "ASA Circulating Supply",
    status: "Final",
    date: "2024-06-12",
    category: "Interface",
  },
  {
    id: "ARC-0065",
    title: "AVM Run Time Errors In Program",
    status: "Final",
    date: "2024-10-09",
    category: "ARC",
  },
  {
    id: "ARC-0069",
    title: "ASA Parameters Conventions, Digital Media",
    status: "Final",
    date: "2021-08-07",
    category: "ARC",
  },
  {
    id: "ARC-0071",
    title: "Non-Transferable ASA",
    status: "Final",
    date: "2023-03-17",
    category: "Interface",
  },
  {
    id: "ARC-0072",
    title: "Algorand Smart Contract NFT Specification",
    status: "Living",
    date: "2023-01-10",
    category: "Interface",
  },
  {
    id: "ARC-0073",
    title: "Algorand Interface Detection Spec",
    status: "Final",
    date: "2023-01-10",
    category: "Interface",
  },
  {
    id: "ARC-0074",
    title: "NFT Indexer API",
    status: "Final",
    date: "2023-02-17",
    category: "Interface",
  },
  {
    id: "ARC-0076",
    title: "Password Account",
    status: "Idle",
    date: "2023-06-12",
    category: "Core",
  },
  {
    id: "ARC-0078",
    title: "URI scheme, keyreg Transactions extension",
    status: "Final",
    date: "2024-10-02",
    category: "Interface",
  },
  {
    id: "ARC-0079",
    title: "URI scheme, App NoOp call extension",
    status: "Final",
    date: "2024-09-11",
    category: "Interface",
  },
  {
    id: "ARC-0082",
    title: "URI scheme blockchain information",
    status: "Final",
    date: "2024-11-13",
    category: "ARC",
  },
  {
    id: "ARC-0083",
    title: "xGov Council - Application Process",
    status: "Draft",
    date: "2025-03-12",
    category: "Meta",
  },
  {
    id: "ARC-0200",
    title: "Algorand Smart Contract Token Specification",
    status: "Living",
    date: "2023-07-03",
    category: "Interface",
  },
];

function getArcGithubUrl(arcId: string) {
  // Convert ARC-0000 to arc-0000.md
  const num = arcId.replace("ARC-", "").padStart(4, "0");
  return `https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-${num}.md`;
}


export default function ARCsPage() {
  const [search, setSearch] = useState("");
  const filteredArcs = arcs.filter(arc =>
  arc.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Algorand Request for Comments (ARCs)</h1>

        <div className="glass-effect rounded-lg p-4 mb-8">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search ARCs..." type="text"  value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-transparent border-white/20 text-white" />
            </div>
            <Button variant="outline" className=" border-white/20">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <div className="glass-effect rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">ARC</TableHead>
                <TableHead className="text-white">Title</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Category</TableHead>
                <TableHead className="text-white">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArcs.map((arc) => (
                <TableRow  key={arc.id} className="hover:bg-white/5 cursor-pointer" onClick={() => window.open(getArcGithubUrl(arc.id), "_blank")} title={`Open ${arc.id} on GitHub`}>
                  <TableCell className="font-medium text-white">{arc.id}</TableCell>
                  <TableCell className="text-gray-300">{arc.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        arc.status === "Final" ? "border-green-500 text-green-500" : "border-yellow-500 text-yellow-500"
                      }
                    >
                      {arc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{arc.category}</TableCell>
                  <TableCell className="text-gray-300">{arc.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredArcs.length === 0 && (
            <div className="mt-4 text-gray-500">No ARCs found.</div>
          )}
        </div>
      </div>
    </main>
  )
}

