"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageSquare,
  BookOpen,
  HandHeart,
  Coins,
  Vote,
  ImageIcon,
  TrendingUp,
  ArrowRight,
  Copy,
  CheckCircle,
  Calculator,
  Target,
  Clock,
  Users,
  DollarSign,
  Shuffle,
  PackageOpen,
  ArchiveRestore,
  Banknote,
} from "lucide-react"

const smartContractExamples = [
  {
    id: "hello-world",
    title: "Hello World Contract",
    description: "A simple smart contract that stores and retrieves a greeting message",
    category: "Beginner",
    difficulty: "Easy",
    icon: MessageSquare,
    python: `from puyapy import *

class HelloWorld(Contract):
    def __init__(self) -> None:
        self.greeting = GlobalState(Bytes, key="greeting")

    @create
    def create(self) -> None:
        self.greeting.value = Bytes(b"Hello, Algorand!")

    @external
    def set_greeting(self, new_greeting: Bytes) -> None:
        self.greeting.value = new_greeting

    @external
    def get_greeting(self) -> Bytes:
        return self.greeting.value`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class HelloWorld extends Contract {
  greeting = GlobalStateKey<string>();

  createApplication(): void {
    this.greeting.value = 'Hello, Algorand!';
  }

  setGreeting(newGreeting: string): void {
    this.greeting.value = newGreeting;
  }

  getGreeting(): string {
    return this.greeting.value;
  }
}

export default HelloWorld;`,
    questions: [
      {
        question: "What is the primary purpose of a Hello World smart contract?",
        options: [
          "To demonstrate basic functionality",
          "To handle complex transactions",
          "To manage user accounts",
          "To store large amounts of data",
        ],
        correct: 0,
      },
      {
        question: "Which method is used to initialize the contract in the Python version?",
        options: ["__init__", "create", "setup", "initialize"],
        correct: 1,
      },
      {
        question: "What type of storage is used for the greeting in both versions?",
        options: ["Local State", "Global State", "Box Storage", "External Storage"],
        correct: 1,
      },
      {
        question: "What decorator is used for the create method in the Python version?",
        options: ["@external", "@create", "@init", "@deploy"],
        correct: 1,
      },
    ],
  },
  {
    id: "calculator",
    title: "Calculator Contract",
    description: "A smart contract that performs basic arithmetic operations with state management",
    category: "Beginner",
    difficulty: "Easy",
    icon: Calculator,
    python: `from puyapy import *

class Calculator(Contract):
    def __init__(self) -> None:
        self.result = GlobalState(UInt64, key="result")

    @create
    def create(self) -> None:
        self.result.value = UInt64(0)

    @external
    def add(self, a: UInt64, b: UInt64) -> UInt64:
        result = a + b
        self.result.value = result
        return result

    @external
    def subtract(self, a: UInt64, b: UInt64) -> UInt64:
        assert a >= b, "Cannot subtract larger number from smaller"
        result = a - b
        self.result.value = result
        return result

    @external
    def multiply(self, a: UInt64, b: UInt64) -> UInt64:
        result = a * b
        self.result.value = result
        return result

    @external
    def divide(self, a: UInt64, b: UInt64) -> UInt64:
        assert b > 0, "Cannot divide by zero"
        result = a // b
        self.result.value = result
        return result

    @external
    def get_result(self) -> UInt64:
        return self.result.value`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class Calculator extends Contract {
  result = GlobalStateKey<uint64>();

  createApplication(): void {
    this.result.value = 0;
  }

  add(a: uint64, b: uint64): uint64 {
    const result = a + b;
    this.result.value = result;
    return result;
  }

  subtract(a: uint64, b: uint64): uint64 {
    assert(a >= b, 'Cannot subtract larger number from smaller');
    const result = a - b;
    this.result.value = result;
    return result;
  }

  multiply(a: uint64, b: uint64): uint64 {
    const result = a * b;
    this.result.value = result;
    return result;
  }

  divide(a: uint64, b: uint64): uint64 {
    assert(b > 0, 'Cannot divide by zero');
    const result = a / b;
    this.result.value = result;
    return result;
  }

  getResult(): uint64 {
    return this.result.value;
  }
}

export default Calculator;`,
    questions: [
      {
        question: "What happens when you try to divide by zero in this contract?",
        options: ["Returns 0", "Returns infinity", "Throws an assertion error", "Returns the previous result"],
        correct: 2,
      },
      {
        question: "What is the initial value of the result when the contract is created?",
        options: ["1", "0", "-1", "undefined"],
        correct: 1,
      },
      {
        question: "What type of division is performed in the divide method?",
        options: ["Floating point", "Integer division", "Modulo", "Exponential"],
        correct: 1,
      },
      {
        question: "What assertion is made in the subtract method?",
        options: ["a > 0", "b > 0", "a >= b", "a != b"],
        correct: 2,
      },
    ],
  },
  {
    id: "token-contract",
    title: "Custom Token (ASA)",
    description: "Create and manage custom tokens on Algorand with transfer controls",
    category: "Intermediate",
    difficulty: "Medium",
    icon: Coins,
    python: `from puyapy import *

class CustomToken(Contract):
    def __init__(self) -> None:
        self.total_supply = GlobalState(UInt64, key="total_supply")
        self.creator = GlobalState(Account, key="creator")
        self.balances = BoxMap(Account, UInt64, key_prefix="balance")

    @create
    def create(self, initial_supply: UInt64) -> None:
        self.total_supply.value = initial_supply
        self.creator.value = Txn.sender
        self.balances[Txn.sender] = initial_supply

    @external
    def transfer(self, to: Account, amount: UInt64) -> None:
        sender_balance = self.balances.get(Txn.sender, UInt64(0))
        assert sender_balance >= amount, "Insufficient balance"
        
        self.balances[Txn.sender] = sender_balance - amount
        receiver_balance = self.balances.get(to, UInt64(0))
        self.balances[to] = receiver_balance + amount

    @external
    def mint(self, amount: UInt64) -> None:
        assert Txn.sender == self.creator.value, "Only creator can mint"
        
        self.total_supply.value += amount
        creator_balance = self.balances.get(self.creator.value, UInt64(0))
        self.balances[self.creator.value] = creator_balance + amount

    @external
    def get_balance(self, account: Account) -> UInt64:
        return self.balances.get(account, UInt64(0))

    @external
    def get_total_supply(self) -> UInt64:
        return self.total_supply.value`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class CustomToken extends Contract {
  totalSupply = GlobalStateKey<uint64>();
  creator = GlobalStateKey<Address>();
  balances = BoxMap<Address, uint64>();

  createApplication(initialSupply: uint64): void {
    this.totalSupply.value = initialSupply;
    this.creator.value = this.txn.sender;
    this.balances(this.txn.sender).value = initialSupply;
  }

  transfer(to: Address, amount: uint64): void {
    const senderBalance = this.balances(this.txn.sender).value;
    assert(senderBalance >= amount, 'Insufficient balance');
    
    this.balances(this.txn.sender).value = senderBalance - amount;
    this.balances(to).value = this.balances(to).value + amount;
  }

  mint(amount: uint64): void {
    assert(this.txn.sender === this.creator.value, 'Only creator can mint');
    
    this.totalSupply.value += amount;
    this.balances(this.creator.value).value += amount;
  }

  getBalance(account: Address): uint64 {
    return this.balances(account).value;
  }

  getTotalSupply(): uint64 {
    return this.totalSupply.value;
  }
}

export default CustomToken;`,
    questions: [
      {
        question: "What storage mechanism is used for balances in the Python version?",
        options: ["GlobalState", "LocalState", "BoxMap", "Array"],
        correct: 2,
      },
      {
        question: "Who can mint new tokens in this contract?",
        options: ["Anyone", "Only the creator", "Only token holders", "Only validators"],
        correct: 1,
      },
      {
        question: "What happens if someone tries to transfer more tokens than they have?",
        options: [
          "Transfer succeeds with negative balance",
          "Transfer is ignored",
          "Assertion error is thrown",
          "Tokens are borrowed",
        ],
        correct: 2,
      },
      {
        question: "What is the initial balance of the creator when the contract is deployed?",
        options: ["0", "1000", "The initial supply", "Unlimited"],
        correct: 2,
      },
    ],
  },
  {
    id: "voting-contract",
    title: "Voting System",
    description: "Decentralized voting contract with proposal creation and voting mechanisms",
    category: "Advanced",
    difficulty: "Hard",
    icon: Vote,
    python: `from puyapy import *

class VotingSystem(Contract):
    def __init__(self) -> None:
        self.proposal_count = GlobalState(UInt64, key="proposal_count")
        self.voting_end = GlobalState(UInt64, key="voting_end")
        self.yes_votes = GlobalState(UInt64, key="yes_votes")
        self.no_votes = GlobalState(UInt64, key="no_votes")
        self.has_voted = LocalState(UInt64, key="has_voted")

    @create
    def create(self) -> None:
        self.proposal_count.value = UInt64(0)
        self.yes_votes.value = UInt64(0)
        self.no_votes.value = UInt64(0)

    @external
    def create_proposal(self, duration: UInt64) -> None:
        self.proposal_count.value += UInt64(1)
        self.voting_end.value = Global.latest_timestamp + duration
        self.yes_votes.value = UInt64(0)
        self.no_votes.value = UInt64(0)

    @external
    def vote(self, choice: bool) -> None:
        assert Global.latest_timestamp < self.voting_end.value, "Voting period ended"
        assert self.has_voted[Txn.sender] == UInt64(0), "Already voted"
        
        self.has_voted[Txn.sender] = UInt64(1)
        
        if choice:
            self.yes_votes.value += UInt64(1)
        else:
            self.no_votes.value += UInt64(1)

    @external
    def get_results(self) -> tuple[UInt64, UInt64]:
        return self.yes_votes.value, self.no_votes.value

    @external
    def has_user_voted(self, user: Account) -> bool:
        return self.has_voted[user] == UInt64(1)`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class VotingSystem extends Contract {
  proposalCount = GlobalStateKey<uint64>();
  votingEnd = GlobalStateKey<uint64>();
  yesVotes = GlobalStateKey<uint64>();
  noVotes = GlobalStateKey<uint64>();
  
  hasVoted = LocalStateKey<uint64>();

  createApplication(): void {
    this.proposalCount.value = 0;
    this.yesVotes.value = 0;
    this.noVotes.value = 0;
  }

  createProposal(duration: uint64): void {
    this.proposalCount.value += 1;
    this.votingEnd.value = globals.latestTimestamp + duration;
    this.yesVotes.value = 0;
    this.noVotes.value = 0;
  }

  vote(choice: boolean): void {
    assert(globals.latestTimestamp < this.votingEnd.value, 'Voting period ended');
    assert(this.hasVoted(this.txn.sender).value === 0, 'Already voted');
    
    this.hasVoted(this.txn.sender).value = 1;
    
    if (choice) {
      this.yesVotes.value += 1;
    } else {
      this.noVotes.value += 1;
    }
  }

  getResults(): [uint64, uint64] {
    return [this.yesVotes.value, this.noVotes.value];
  }

  hasUserVoted(user: Address): boolean {
    return this.hasVoted(user).value === 1;
  }
}

export default VotingSystem;`,
    questions: [
      {
        question: "What prevents a user from voting multiple times?",
        options: ["Time restrictions", "Local state tracking", "Global vote limit", "Transaction fees"],
        correct: 1,
      },
      {
        question: "What happens if someone tries to vote after the voting period ends?",
        options: [
          "Vote is counted anyway",
          "Vote is queued for next proposal",
          "Assertion error is thrown",
          "Vote is ignored silently",
        ],
        correct: 2,
      },
      {
        question: "How is the voting deadline determined?",
        options: [
          "Fixed 24 hours",
          "Current timestamp + duration",
          "Block number + duration",
          "Manual setting by admin",
        ],
        correct: 1,
      },
      {
        question: "What data structure tracks individual voting status?",
        options: ["GlobalState", "LocalState", "BoxMap", "Array"],
        correct: 1,
      },
    ],
  },
  {
    id: "auction-contract",
    title: "Auction System",
    description: "A decentralized auction contract with bidding, time limits, and automatic winner selection",
    category: "Advanced",
    difficulty: "Hard",
    icon: DollarSign,
    python: `from puyapy import *

class Auction(Contract):
    def __init__(self) -> None:
        self.seller = GlobalState(Account, key="seller")
        self.highest_bidder = GlobalState(Account, key="highest_bidder")
        self.highest_bid = GlobalState(UInt64, key="highest_bid")
        self.auction_end = GlobalState(UInt64, key="auction_end")
        self.ended = GlobalState(bool, key="ended")
        self.asset_id = GlobalState(UInt64, key="asset_id")

    @create
    def create(self, asset_id: UInt64, duration: UInt64, starting_bid: UInt64) -> None:
        self.seller.value = Txn.sender
        self.asset_id.value = asset_id
        self.auction_end.value = Global.latest_timestamp + duration
        self.highest_bid.value = starting_bid
        self.ended.value = False

    @external
    def bid(self, payment: PaymentTransaction) -> None:
        assert not self.ended.value, "Auction has ended"
        assert Global.latest_timestamp < self.auction_end.value, "Auction time expired"
        assert payment.amount > self.highest_bid.value, "Bid too low"
        assert payment.receiver == Global.current_application_address, "Payment must go to contract"

        # Refund previous highest bidder
        if self.highest_bidder.value != Global.zero_address:
            itxn.Payment(
                receiver=self.highest_bidder.value,
                amount=self.highest_bid.value,
            ).submit()

        self.highest_bidder.value = payment.sender
        self.highest_bid.value = payment.amount

    @external
    def end_auction(self) -> None:
        assert Global.latest_timestamp >= self.auction_end.value, "Auction not yet ended"
        assert not self.ended.value, "Auction already ended"

        self.ended.value = True

        if self.highest_bidder.value != Global.zero_address:
            # Transfer asset to winner
            itxn.AssetTransfer(
                asset_receiver=self.highest_bidder.value,
                asset_amount=1,
                xfer_asset=self.asset_id.value,
            ).submit()

            # Transfer payment to seller
            itxn.Payment(
                receiver=self.seller.value,
                amount=self.highest_bid.value,
            ).submit()

    @external
    def get_auction_info(self) -> tuple[Account, UInt64, UInt64, bool]:
        return (
            self.highest_bidder.value,
            self.highest_bid.value,
            self.auction_end.value,
            self.ended.value,
        )`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class Auction extends Contract {
  seller = GlobalStateKey<Address>();
  highestBidder = GlobalStateKey<Address>();
  highestBid = GlobalStateKey<uint64>();
  auctionEnd = GlobalStateKey<uint64>();
  ended = GlobalStateKey<boolean>();
  assetId = GlobalStateKey<uint64>();

  createApplication(assetId: uint64, duration: uint64, startingBid: uint64): void {
    this.seller.value = this.txn.sender;
    this.assetId.value = assetId;
    this.auctionEnd.value = globals.latestTimestamp + duration;
    this.highestBid.value = startingBid;
    this.ended.value = false;
  }

  bid(payment: PayTxn): void {
    assert(!this.ended.value, 'Auction has ended');
    assert(globals.latestTimestamp < this.auctionEnd.value, 'Auction time expired');
    assert(payment.amount > this.highestBid.value, 'Bid too low');
    assert(payment.receiver === this.app.address, 'Payment must go to contract');

    // Refund previous highest bidder
    if (this.highestBidder.value !== globals.zeroAddress) {
      sendPayment({
        to: this.highestBidder.value,
        amount: this.highestBid.value,
      });
    }

    this.highestBidder.value = payment.sender;
    this.highestBid.value = payment.amount;
  }

  endAuction(): void {
    assert(globals.latestTimestamp >= this.auctionEnd.value, 'Auction not yet ended');
    assert(!this.ended.value, 'Auction already ended');

    this.ended.value = true;

    if (this.highestBidder.value !== globals.zeroAddress) {
      // Transfer asset to winner
      sendAssetTransfer({
        to: this.highestBidder.value,
        assetId: this.assetId.value,
        amount: 1,
      });

      // Transfer payment to seller
      sendPayment({
        to: this.seller.value,
        amount: this.highestBid.value,
      });
    }
  }

  getAuctionInfo(): [Address, uint64, uint64, boolean] {
    return [
      this.highestBidder.value,
      this.highestBid.value,
      this.auctionEnd.value,
      this.ended.value,
    ];
  }
}

export default Auction;`,
    questions: [
      {
        question: "What happens to the previous highest bidder when a new higher bid is placed?",
        options: [
          "They lose their money",
          "They get automatically refunded",
          "They must manually withdraw",
          "Their bid is held until auction ends",
        ],
        correct: 1,
      },
      {
        question: "When can the auction be ended?",
        options: [
          "Anytime by the seller",
          "Only after the time expires",
          "When 10 bids are reached",
          "Only by the highest bidder",
        ],
        correct: 1,
      },
      {
        question: "What must be true for a bid to be accepted?",
        options: [
          "Must be from the seller",
          "Must be higher than current highest bid",
          "Must be exactly double the previous bid",
          "Must include a fee",
        ],
        correct: 1,
      },
      {
        question: "What happens if no one bids on the auction?",
        options: ["Seller keeps the asset", "Asset is burned", "Auction restarts", "Asset goes to the contract"],
        correct: 0,
      },
    ],
  },
  {
    id: "escrow-contract",
    title: "Escrow Service",
    description: "Secure escrow contract for safe peer-to-peer transactions",
    category: "Intermediate",
    difficulty: "Medium",
    icon: HandHeart,
    python: `from puyapy import *

class EscrowService(Contract):
    def __init__(self) -> None:
        self.buyer = GlobalState(Account, key="buyer")
        self.seller = GlobalState(Account, key="seller")
        self.amount = GlobalState(UInt64, key="amount")
        self.status = GlobalState(UInt64, key="status")  # 0: pending, 1: completed, 2: disputed

    @create
    def create(self, buyer: Account, seller: Account, amount: UInt64) -> None:
        self.buyer.value = buyer
        self.seller.value = seller
        self.amount.value = amount
        self.status.value = UInt64(0)

    @external
    def release_funds(self) -> None:
        assert Txn.sender == self.buyer.value, "Only buyer can release funds"
        assert self.status.value == UInt64(0), "Escrow not in pending state"
        
        self.status.value = UInt64(1)
        itxn.Payment(
            receiver=self.seller.value,
            amount=self.amount.value,
        ).submit()

    @external
    def refund_buyer(self) -> None:
        assert Txn.sender == self.seller.value, "Only seller can initiate refund"
        assert self.status.value == UInt64(0), "Escrow not in pending state"
        
        self.status.value = UInt64(1)
        itxn.Payment(
            receiver=self.buyer.value,
            amount=self.amount.value,
        ).submit()

    @external
    def dispute(self) -> None:
        assert (
            Txn.sender == self.buyer.value or Txn.sender == self.seller.value
        ), "Only buyer or seller can dispute"
        self.status.value = UInt64(2)

    @external
    def get_escrow_info(self) -> tuple[Account, Account, UInt64, UInt64]:
        return self.buyer.value, self.seller.value, self.amount.value, self.status.value`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class EscrowService extends Contract {
  buyer = GlobalStateKey<Address>();
  seller = GlobalStateKey<Address>();
  amount = GlobalStateKey<uint64>();
  status = GlobalStateKey<uint64>(); // 0: pending, 1: completed, 2: disputed

  createApplication(buyerAddr: Address, sellerAddr: Address, escrowAmount: uint64): void {
    this.buyer.value = buyerAddr;
    this.seller.value = sellerAddr;
    this.amount.value = escrowAmount;
    this.status.value = 0;
  }

  releaseFunds(): void {
    assert(this.txn.sender === this.buyer.value, 'Only buyer can release funds');
    assert(this.status.value === 0, 'Escrow not in pending state');
    
    this.status.value = 1;
    sendPayment({
      to: this.seller.value,
      amount: this.amount.value,
    });
  }

  refundBuyer(): void {
    assert(this.txn.sender === this.seller.value, 'Only seller can initiate refund');
    assert(this.status.value === 0, 'Escrow not in pending state');
    
    this.status.value = 1;
    sendPayment({
      to: this.buyer.value,
      amount: this.amount.value,
    });
  }

  dispute(): void {
    assert(
      this.txn.sender === this.buyer.value || 
      this.txn.sender === this.seller.value,
      'Only buyer or seller can dispute'
    );
    this.status.value = 2;
  }

  getEscrowInfo(): [Address, Address, uint64, uint64] {
    return [this.buyer.value, this.seller.value, this.amount.value, this.status.value];
  }
}

export default EscrowService;`,
    questions: [
      {
        question: "Who can release funds to the seller?",
        options: ["Anyone", "Only the buyer", "Only the seller", "Only an admin"],
        correct: 1,
      },
      {
        question: "What does status value 2 represent?",
        options: ["Pending", "Completed", "Disputed", "Cancelled"],
        correct: 2,
      },
      {
        question: "Who can initiate a refund to the buyer?",
        options: ["Only the buyer", "Only the seller", "Either buyer or seller", "Only an arbitrator"],
        correct: 1,
      },
      {
        question: "What happens when a dispute is raised?",
        options: [
          "Funds are automatically refunded",
          "Funds are released to seller",
          "Status changes to disputed",
          "Contract is destroyed",
        ],
        correct: 2,
      },
    ],
  },
  {
    id: "nft-marketplace",
    title: "NFT Marketplace",
    description: "Complete NFT marketplace with minting, listing, and trading functionality",
    category: "Advanced",
    difficulty: "Hard",
    icon: ImageIcon,
    python: `from puyapy import *

class NFTMarketplace(Contract):
    def __init__(self) -> None:
        self.nft_count = GlobalState(UInt64, key="nft_count")
        self.marketplace_fee = GlobalState(UInt64, key="marketplace_fee")
        self.nft_prices = BoxMap(UInt64, UInt64, key_prefix="price")
        self.nft_sellers = BoxMap(UInt64, Account, key_prefix="seller")
        self.nft_listed = BoxMap(UInt64, bool, key_prefix="listed")

    @create
    def create(self) -> None:
        self.nft_count.value = UInt64(0)
        self.marketplace_fee.value = UInt64(250)  # 2.5% fee (basis points)

    @external
    def mint_nft(self, metadata_url: Bytes) -> UInt64:
        nft_id = self.nft_count.value + UInt64(1)
        self.nft_count.value = nft_id
        
        # Create NFT asset
        itxn.AssetConfig(
            config_asset_total=1,
            config_asset_decimals=0,
            config_asset_default_frozen=False,
            config_asset_name=Bytes(b"NFT #") + itoa(nft_id),
            config_asset_url=metadata_url,
        ).submit()
        
        return nft_id

    @external
    def list_nft(self, nft_id: UInt64, price: UInt64) -> None:
        assert not self.nft_listed[nft_id], "NFT already listed"
        
        self.nft_prices[nft_id] = price
        self.nft_sellers[nft_id] = Txn.sender
        self.nft_listed[nft_id] = True

    @external
    def buy_nft(self, nft_id: UInt64, payment: PaymentTransaction) -> None:
        assert self.nft_listed[nft_id], "NFT not listed"
        
        price = self.nft_prices[nft_id]
        seller = self.nft_sellers[nft_id]
        fee = (price * self.marketplace_fee.value) // UInt64(10000)
        
        assert payment.amount >= price, "Insufficient payment"
        assert payment.receiver == Global.current_application_address, "Payment must go to contract"
        
        # Transfer payment to seller (minus fee)
        itxn.Payment(
            receiver=seller,
            amount=price - fee,
        ).submit()
        
        # Transfer NFT to buyer
        # Note: In practice, you'd need the actual asset ID from creation
        
        self.nft_listed[nft_id] = False

    @external
    def unlist_nft(self, nft_id: UInt64) -> None:
        assert Txn.sender == self.nft_sellers[nft_id], "Only seller can unlist"
        self.nft_listed[nft_id] = False

    @external
    def get_nft_info(self, nft_id: UInt64) -> tuple[UInt64, Account, bool]:
        return (
            self.nft_prices.get(nft_id, UInt64(0)),
            self.nft_sellers.get(nft_id, Global.zero_address),
            self.nft_listed.get(nft_id, False),
        )`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class NFTMarketplace extends Contract {
  nftCount = GlobalStateKey<uint64>();
  marketplaceFee = GlobalStateKey<uint64>();
  
  nftPrices = BoxMap<uint64, uint64>();
  nftSellers = BoxMap<uint64, Address>();
  nftListed = BoxMap<uint64, boolean>();

  createApplication(): void {
    this.nftCount.value = 0;
    this.marketplaceFee.value = 250; // 2.5% fee (basis points)
  }

  mintNFT(metadataUrl: string): uint64 {
    const nftId = this.nftCount.value + 1;
    this.nftCount.value = nftId;
    
    // Create NFT asset
    const assetId = sendAssetCreation({
      configAssetTotal: 1,
      configAssetDecimals: 0,
      configAssetDefaultFrozen: false,
      configAssetName: 'NFT #' + nftId,
      configAssetURL: metadataUrl,
    });
    
    return nftId;
  }

  listNFT(nftId: uint64, price: uint64): void {
    assert(!this.nftListed(nftId).value, 'NFT already listed');
    
    this.nftPrices(nftId).value = price;
    this.nftSellers(nftId).value = this.txn.sender;
    this.nftListed(nftId).value = true;
  }

  buyNFT(nftId: uint64, payment: PayTxn): void {
    assert(this.nftListed(nftId).value, 'NFT not listed');
    
    const price = this.nftPrices(nftId).value;
    const seller = this.nftSellers(nftId).value;
    const fee = (price * this.marketplaceFee.value) / 10000;
    
    assert(payment.amount >= price, 'Insufficient payment');
    assert(payment.receiver === this.app.address, 'Payment must go to contract');
    
    // Transfer payment to seller (minus fee)
    sendPayment({
      to: seller,
      amount: price - fee,
    });
    
    // Transfer NFT to buyer
    // Note: In practice, you'd need the actual asset ID from creation
    
    this.nftListed(nftId).value = false;
  }

  unlistNFT(nftId: uint64): void {
    assert(this.txn.sender === this.nftSellers(nftId).value, 'Only seller can unlist');
    this.nftListed(nftId).value = false;
  }

  getNFTInfo(nftId: uint64): [uint64, Address, boolean] {
    return [
      this.nftPrices(nftId).value,
      this.nftSellers(nftId).value,
      this.nftListed(nftId).value,
    ];
  }
}

export default NFTMarketplace;`,
    questions: [
      {
        question: "What is the marketplace fee percentage?",
        options: ["1%", "2.5%", "5%", "10%"],
        correct: 1,
      },
      {
        question: "What storage mechanism is used for NFT data?",
        options: ["GlobalState only", "LocalState only", "BoxMap", "External database"],
        correct: 2,
      },
      {
        question: "Who receives the marketplace fee when an NFT is sold?",
        options: ["The seller", "The buyer", "The contract/marketplace", "The NFT creator"],
        correct: 2,
      },
      {
        question: "What happens when someone tries to buy an unlisted NFT?",
        options: [
          "Purchase succeeds anyway",
          "Assertion error is thrown",
          "NFT is automatically listed",
          "Buyer gets a refund",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "defi-staking",
    title: "DeFi Staking Pool",
    description: "Staking contract with rewards distribution and compound interest",
    category: "Advanced",
    difficulty: "Hard",
    icon: TrendingUp,
    python: `from puyapy import *

class StakingPool(Contract):
    def __init__(self) -> None:
        self.total_staked = GlobalState(UInt64, key="total_staked")
        self.reward_rate = GlobalState(UInt64, key="reward_rate")
        self.last_update = GlobalState(UInt64, key="last_update")
        self.staked_amount = LocalState(UInt64, key="staked_amount")
        self.last_claim = LocalState(UInt64, key="last_claim")
        self.pending_rewards = LocalState(UInt64, key="pending_rewards")

    @create
    def create(self, initial_reward_rate: UInt64) -> None:
        self.total_staked.value = UInt64(0)
        self.reward_rate.value = initial_reward_rate
        self.last_update.value = Global.latest_timestamp

    @external
    def stake(self, amount: UInt64, payment: PaymentTransaction) -> None:
        assert amount > UInt64(0), "Amount must be positive"
        assert payment.amount == amount, "Payment amount mismatch"
        assert payment.receiver == Global.current_application_address, "Payment must go to contract"
        
        self._update_rewards()
        
        self.staked_amount[Txn.sender] += amount
        self.total_staked.value += amount
        self.last_claim[Txn.sender] = Global.latest_timestamp

    @external
    def claim_rewards(self) -> UInt64:
        self._update_rewards()
        
        rewards = self.pending_rewards[Txn.sender]
        self.pending_rewards[Txn.sender] = UInt64(0)
        self.last_claim[Txn.sender] = Global.latest_timestamp
        
        if rewards > UInt64(0):
            itxn.Payment(
                receiver=Txn.sender,
                amount=rewards,
            ).submit()
        
        return rewards

    @external
    def unstake(self, amount: UInt64) -> None:
        assert self.staked_amount[Txn.sender] >= amount, "Insufficient staked amount"
        
        # Claim pending rewards first
        self.claim_rewards()
        
        self.staked_amount[Txn.sender] -= amount
        self.total_staked.value -= amount
        
        # Return staked tokens
        itxn.Payment(
            receiver=Txn.sender,
            amount=amount,
        ).submit()

    @subroutine
    def _update_rewards(self) -> None:
        time_elapsed = Global.latest_timestamp - self.last_claim[Txn.sender]
        staked_amount = self.staked_amount[Txn.sender]
        
        if staked_amount > UInt64(0) and time_elapsed > UInt64(0):
            rewards = (staked_amount * self.reward_rate.value * time_elapsed) // (UInt64(86400) * UInt64(10000))
            self.pending_rewards[Txn.sender] += rewards

    @external
    def get_staked_amount(self) -> UInt64:
        return self.staked_amount[Txn.sender]

    @external
    def get_pending_rewards(self) -> UInt64:
        return self.pending_rewards[Txn.sender]`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class StakingPool extends Contract {
  totalStaked = GlobalStateKey<uint64>();
  rewardRate = GlobalStateKey<uint64>();
  lastUpdate = GlobalStateKey<uint64>();
  
  stakedAmount = LocalStateKey<uint64>();
  lastClaim = LocalStateKey<uint64>();
  pendingRewards = LocalStateKey<uint64>();

  createApplication(initialRewardRate: uint64): void {
    this.totalStaked.value = 0;
    this.rewardRate.value = initialRewardRate;
    this.lastUpdate.value = globals.latestTimestamp;
  }

  stake(amount: uint64, payment: PayTxn): void {
    assert(amount > 0, 'Amount must be positive');
    assert(payment.amount === amount, 'Payment amount mismatch');
    assert(payment.receiver === this.app.address, 'Payment must go to contract');
    
    this.updateRewards();
    
    this.stakedAmount(this.txn.sender).value += amount;
    this.totalStaked.value += amount;
    this.lastClaim(this.txn.sender).value = globals.latestTimestamp;
  }

  claimRewards(): uint64 {
    this.updateRewards();
    
    const rewards = this.pendingRewards(this.txn.sender).value;
    this.pendingRewards(this.txn.sender).value = 0;
    this.lastClaim(this.txn.sender).value = globals.latestTimestamp;
    
    if (rewards > 0) {
      sendPayment({
        to: this.txn.sender,
        amount: rewards,
      });
    }
    
    return rewards;
  }

  unstake(amount: uint64): void {
    assert(this.stakedAmount(this.txn.sender).value >= amount, 'Insufficient staked amount');
    
    // Claim pending rewards first
    this.claimRewards();
    
    this.stakedAmount(this.txn.sender).value -= amount;
    this.totalStaked.value -= amount;
    
    // Return staked tokens
    sendPayment({
      to: this.txn.sender,
      amount: amount,
    });
  }

  private updateRewards(): void {
    const timeElapsed = globals.latestTimestamp - this.lastClaim(this.txn.sender).value;
    const stakedAmount = this.stakedAmount(this.txn.sender).value;
    
    if (stakedAmount > 0 && timeElapsed > 0) {
      const rewards = (stakedAmount * this.rewardRate.value * timeElapsed) / (86400 * 10000);
      this.pendingRewards(this.txn.sender).value += rewards;
    }
  }

  getStakedAmount(): uint64 {
    return this.stakedAmount(this.txn.sender).value;
  }

  getPendingRewards(): uint64 {
    return this.pendingRewards(this.txn.sender).value;
  }
}

export default StakingPool;`,
    questions: [
      {
        question: "What happens when a user stakes tokens?",
        options: [
          "Tokens are burned",
          "Tokens are locked in the contract",
          "Tokens are transferred to other users",
          "Tokens are converted to rewards",
        ],
        correct: 1,
      },
      {
        question: "How are rewards calculated?",
        options: [
          "Fixed amount per day",
          "Based on staked amount, rate, and time",
          "Random distribution",
          "Equal for all users",
        ],
        correct: 1,
      },
      {
        question: "What happens when a user unstakes?",
        options: [
          "Only tokens are returned",
          "Only rewards are given",
          "Pending rewards are claimed and tokens returned",
          "Nothing happens",
        ],
        correct: 2,
      },
      {
        question: "What storage is used to track individual user stakes?",
        options: ["GlobalState", "LocalState", "BoxMap", "External storage"],
        correct: 1,
      },
    ],
  },
  {
    id: "lottery-contract",
    title: "Lottery System",
    description: "A decentralized lottery with ticket purchases, random winner selection, and prize distribution",
    category: "Intermediate",
    difficulty: "Medium",
    icon: Shuffle,
    python: `from puyapy import *

class Lottery(Contract):
    def __init__(self) -> None:
        self.ticket_price = GlobalState(UInt64, key="ticket_price")
        self.total_tickets = GlobalState(UInt64, key="total_tickets")
        self.lottery_end = GlobalState(UInt64, key="lottery_end")
        self.winner = GlobalState(Account, key="winner")
        self.ended = GlobalState(bool, key="ended")
        self.tickets = BoxMap(UInt64, Account, key_prefix="ticket")
        self.user_tickets = LocalState(UInt64, key="user_tickets")

    @create
    def create(self, ticket_price: UInt64, duration: UInt64) -> None:
        self.ticket_price.value = ticket_price
        self.total_tickets.value = UInt64(0)
        self.lottery_end.value = Global.latest_timestamp + duration
        self.ended.value = False

    @external
    def buy_ticket(self, payment: PaymentTransaction) -> UInt64:
        assert not self.ended.value, "Lottery has ended"
        assert Global.latest_timestamp < self.lottery_end.value, "Lottery time expired"
        assert payment.amount == self.ticket_price.value, "Incorrect payment amount"
        assert payment.receiver == Global.current_application_address, "Payment must go to contract"

        ticket_id = self.total_tickets.value + UInt64(1)
        self.total_tickets.value = ticket_id
        self.tickets[ticket_id] = payment.sender
        self.user_tickets[payment.sender] += UInt64(1)

        return ticket_id

    @external
    def draw_winner(self) -> Account:
        assert Global.latest_timestamp >= self.lottery_end.value, "Lottery not yet ended"
        assert not self.ended.value, "Lottery already ended"
        assert self.total_tickets.value > UInt64(0), "No tickets sold"

        # Simple random number generation (in practice, use VRF)
        random_seed = Global.latest_timestamp + Global.round
        winning_ticket = (random_seed % self.total_tickets.value) + UInt64(1)
        
        winner = self.tickets[winning_ticket]
        self.winner.value = winner
        self.ended.value = True

        # Transfer prize to winner (90% of total, 10% fee)
        total_prize = self.ticket_price.value * self.total_tickets.value
        winner_prize = (total_prize * UInt64(90)) // UInt64(100)
        
        itxn.Payment(
            receiver=winner,
            amount=winner_prize,
        ).submit()

        return winner

    @external
    def get_lottery_info(self) -> tuple[UInt64, UInt64, UInt64, Account, bool]:
        return (
            self.ticket_price.value,
            self.total_tickets.value,
            self.lottery_end.value,
            self.winner.value,
            self.ended.value,
        )

    @external
    def get_user_tickets(self, user: Account) -> UInt64:
        return self.user_tickets[user]`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class Lottery extends Contract {
  ticketPrice = GlobalStateKey<uint64>();
  totalTickets = GlobalStateKey<uint64>();
  lotteryEnd = GlobalStateKey<uint64>();
  winner = GlobalStateKey<Address>();
  ended = GlobalStateKey<boolean>();
  
  tickets = BoxMap<uint64, Address>();
  userTickets = LocalStateKey<uint64>();

  createApplication(ticketPrice: uint64, duration: uint64): void {
    this.ticketPrice.value = ticketPrice;
    this.totalTickets.value = 0;
    this.lotteryEnd.value = globals.latestTimestamp + duration;
    this.ended.value = false;
  }

  buyTicket(payment: PayTxn): uint64 {
    assert(!this.ended.value, 'Lottery has ended');
    assert(globals.latestTimestamp < this.lotteryEnd.value, 'Lottery time expired');
    assert(payment.amount === this.ticketPrice.value, 'Incorrect payment amount');
    assert(payment.receiver === this.app.address, 'Payment must go to contract');

    const ticketId = this.totalTickets.value + 1;
    this.totalTickets.value = ticketId;
    this.tickets(ticketId).value = payment.sender;
    this.userTickets(payment.sender).value += 1;

    return ticketId;
  }

  drawWinner(): Address {
    assert(globals.latestTimestamp >= this.lotteryEnd.value, 'Lottery not yet ended');
    assert(!this.ended.value, 'Lottery already ended');
    assert(this.totalTickets.value > 0, 'No tickets sold');

    // Simple random number generation (in practice, use VRF)
    const randomSeed = globals.latestTimestamp + globals.round;
    const winningTicket = (randomSeed % this.totalTickets.value) + 1;
    
    const winner = this.tickets(winningTicket).value;
    this.winner.value = winner;
    this.ended.value = true;

    // Transfer prize to winner (90% of total, 10% fee)
    const totalPrize = this.ticketPrice.value * this.totalTickets.value;
    const winnerPrize = (totalPrize * 90) / 100;
    
    sendPayment({
      to: winner,
      amount: winnerPrize,
    });

    return winner;
  }

  getLotteryInfo(): [uint64, uint64, uint64, Address, boolean] {
    return [
      this.ticketPrice.value,
      this.totalTickets.value,
      this.lotteryEnd.value,
      this.winner.value,
      this.ended.value,
    ];
  }

  getUserTickets(user: Address): uint64 {
    return this.userTickets(user).value;
  }
}

export default Lottery;`,
    questions: [
      {
        question: "What percentage of the total prize pool does the winner receive?",
        options: ["80%", "90%", "95%", "100%"],
        correct: 1,
      },
      {
        question: "When can the lottery winner be drawn?",
        options: [
          "Anytime during the lottery",
          "Only after the lottery end time",
          "When 100 tickets are sold",
          "Only by the contract creator",
        ],
        correct: 1,
      },
      {
        question: "How is the winning ticket determined?",
        options: [
          "First ticket sold",
          "Last ticket sold",
          "Random selection based on timestamp and round",
          "Highest paying ticket",
        ],
        correct: 2,
      },
      {
        question: "What happens if no tickets are sold?",
        options: [
          "Lottery proceeds anyway",
          "Creator wins by default",
          "Cannot draw winner - assertion fails",
          "Lottery restarts automatically",
        ],
        correct: 2,
      },
    ],
  },
  {
    id: "timelock-contract",
    title: "Timelock Vault",
    description: "A time-locked vault that releases funds only after a specified time period",
    category: "Intermediate",
    difficulty: "Medium",
    icon: Clock,
    python: `from puyapy import *

class TimelockVault(Contract):
    def __init__(self) -> None:
        self.owner = GlobalState(Account, key="owner")
        self.beneficiary = GlobalState(Account, key="beneficiary")
        self.release_time = GlobalState(UInt64, key="release_time")
        self.amount = GlobalState(UInt64, key="amount")
        self.released = GlobalState(bool, key="released")

    @create
    def create(self, beneficiary: Account, lock_duration: UInt64) -> None:
        self.owner.value = Txn.sender
        self.beneficiary.value = beneficiary
        self.release_time.value = Global.latest_timestamp + lock_duration
        self.amount.value = UInt64(0)
        self.released.value = False

    @external
    def deposit(self, payment: PaymentTransaction) -> None:
        assert not self.released.value, "Vault already released"
        assert payment.receiver == Global.current_application_address, "Payment must go to contract"
        
        self.amount.value += payment.amount

    @external
    def release(self) -> None:
        assert Global.latest_timestamp >= self.release_time.value, "Timelock not yet expired"
        assert not self.released.value, "Already released"
        assert self.amount.value > UInt64(0), "No funds to release"

        self.released.value = True
        
        itxn.Payment(
            receiver=self.beneficiary.value,
            amount=self.amount.value,
        ).submit()

    @external
    def emergency_withdraw(self) -> None:
        assert Txn.sender == self.owner.value, "Only owner can emergency withdraw"
        assert not self.released.value, "Already released"
        
        self.released.value = True
        
        itxn.Payment(
            receiver=self.owner.value,
            amount=self.amount.value,
        ).submit()

    @external
    def extend_timelock(self, additional_time: UInt64) -> None:
        assert Txn.sender == self.owner.value, "Only owner can extend timelock"
        assert not self.released.value, "Already released"
        
        self.release_time.value += additional_time

    @external
    def get_vault_info(self) -> tuple[Account, Account, UInt64, UInt64, bool]:
        return (
            self.owner.value,
            self.beneficiary.value,
            self.release_time.value,
            self.amount.value,
            self.released.value,
        )`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class TimelockVault extends Contract {
  owner = GlobalStateKey<Address>();
  beneficiary = GlobalStateKey<Address>();
  releaseTime = GlobalStateKey<uint64>();
  amount = GlobalStateKey<uint64>();
  released = GlobalStateKey<boolean>();

  createApplication(beneficiary: Address, lockDuration: uint64): void {
    this.owner.value = this.txn.sender;
    this.beneficiary.value = beneficiary;
    this.releaseTime.value = globals.latestTimestamp + lockDuration;
    this.amount.value = 0;
    this.released.value = false;
  }

  deposit(payment: PayTxn): void {
    assert(!this.released.value, 'Vault already released');
    assert(payment.receiver === this.app.address, 'Payment must go to contract');
    
    this.amount.value += payment.amount;
  }

  release(): void {
    assert(globals.latestTimestamp >= this.releaseTime.value, 'Timelock not yet expired');
    assert(!this.released.value, 'Already released');
    assert(this.amount.value > 0, 'No funds to release');

    this.released.value = true;
    
    sendPayment({
      to: this.beneficiary.value,
      amount: this.amount.value,
    });
  }

  emergencyWithdraw(): void {
    assert(this.txn.sender === this.owner.value, 'Only owner can emergency withdraw');
    assert(!this.released.value, 'Already released');
    
    this.released.value = true;
    
    sendPayment({
      to: this.owner.value,
      amount: this.amount.value,
    });
  }

  extendTimelock(additionalTime: uint64): void {
    assert(this.txn.sender === this.owner.value, 'Only owner can extend timelock');
    assert(!this.released.value, 'Already released');
    
    this.releaseTime.value += additionalTime;
  }

  getVaultInfo(): [Address, Address, uint64, uint64, boolean] {
    return [
      this.owner.value,
      this.beneficiary.value,
      this.releaseTime.value,
      this.amount.value,
      this.released.value,
    ];
  }
}

export default TimelockVault;`,
    questions: [
      {
        question: "When can the beneficiary release the funds?",
        options: [
          "Immediately after deposit",
          "Only after the timelock expires",
          "Anytime with owner permission",
          "Never, only owner can release",
        ],
        correct: 1,
      },
      {
        question: "Who can perform an emergency withdrawal?",
        options: ["Anyone", "Only the beneficiary", "Only the owner", "Only after timelock expires"],
        correct: 2,
      },
      {
        question: "What happens when the timelock is extended?",
        options: [
          "Funds are released immediately",
          "Release time is pushed further into the future",
          "Contract is destroyed",
          "Beneficiary is changed",
        ],
        correct: 1,
      },
      {
        question: "Can multiple deposits be made to the same vault?",
        options: [
          "No, only one deposit allowed",
          "Yes, deposits accumulate",
          "Only if timelock is extended",
          "Only by the beneficiary",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "multisig-wallet",
    title: "Multi-Signature Wallet",
    description: "A wallet requiring multiple signatures for transaction approval and enhanced security",
    category: "Advanced",
    difficulty: "Hard",
    icon: Users,
    python: `from puyapy import *

class MultiSigWallet(Contract):
    def __init__(self) -> None:
        self.owners = BoxMap(Account, bool, key_prefix="owner")
        self.required_signatures = GlobalState(UInt64, key="required_sigs")
        self.transaction_count = GlobalState(UInt64, key="tx_count")
        self.transactions = BoxMap(UInt64, Bytes, key_prefix="tx")
        self.confirmations = BoxMap(Bytes, UInt64, key_prefix="confirm")  # tx_id -> confirmation count
        self.user_confirmations = BoxMap(Bytes, bool, key_prefix="user_confirm")  # user+tx_id -> bool

    @create
    def create(self, owners: Bytes, required_sigs: UInt64) -> None:
        # owners is a concatenated list of addresses
        self.required_signatures.value = required_sigs
        self.transaction_count.value = UInt64(0)
        
        # Parse and add owners (simplified - in practice, you'd parse the bytes)
        # For demo, assume first owner is the creator
        self.owners[Txn.sender] = True

    @external
    def add_owner(self, new_owner: Account) -> None:
        assert self.owners[Txn.sender], "Only owners can add new owners"
        self.owners[new_owner] = True

    @external
    def submit_transaction(self, to: Account, amount: UInt64, data: Bytes) -> UInt64:
        assert self.owners[Txn.sender], "Only owners can submit transactions"
        
        tx_id = self.transaction_count.value + UInt64(1)
        self.transaction_count.value = tx_id
        
        # Store transaction data (simplified)
        tx_data = concat(to.bytes, itoa(amount), data)
        self.transactions[tx_id] = tx_data
        self.confirmations[itoa(tx_id)] = UInt64(0)
        
        return tx_id

    @external
    def confirm_transaction(self, tx_id: UInt64) -> None:
        assert self.owners[Txn.sender], "Only owners can confirm transactions"
        
        tx_key = itoa(tx_id)
        user_confirm_key = concat(Txn.sender.bytes, tx_key)
        
        assert not self.user_confirmations[user_confirm_key], "Already confirmed"
        
        self.user_confirmations[user_confirm_key] = True
        self.confirmations[tx_key] += UInt64(1)

    @external
    def execute_transaction(self, tx_id: UInt64, to: Account, amount: UInt64) -> None:
        tx_key = itoa(tx_id)
        confirmations = self.confirmations[tx_key]
        
        assert confirmations >= self.required_signatures.value, "Insufficient confirmations"
        assert self.transactions[tx_id] != Bytes(b""), "Transaction does not exist"
        
        # Execute the transaction
        itxn.Payment(
            receiver=to,
            amount=amount,
        ).submit()
        
        # Clear transaction data
        self.transactions[tx_id] = Bytes(b"")

    @external
    def get_confirmation_count(self, tx_id: UInt64) -> UInt64:
        return self.confirmations[itoa(tx_id)]

    @external
    def is_owner(self, account: Account) -> bool:
        return self.owners[account]`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class MultiSigWallet extends Contract {
  owners = BoxMap<Address, boolean>();
  requiredSignatures = GlobalStateKey<uint64>();
  transactionCount = GlobalStateKey<uint64>();
  transactions = BoxMap<uint64, bytes>();
  confirmations = BoxMap<uint64, uint64>();
  userConfirmations = BoxMap<bytes, boolean>();

  createApplication(ownersList: Address[], requiredSigs: uint64): void {
    this.requiredSignatures.value = requiredSigs;
    this.transactionCount.value = 0;
    
    // Add initial owners
    for (let i = 0; i < ownersList.length; i++) {
      this.owners(ownersList[i]).value = true;
    }
  }

  addOwner(newOwner: Address): void {
    assert(this.owners(this.txn.sender).value, 'Only owners can add new owners');
    this.owners(newOwner).value = true;
  }

  submitTransaction(to: Address, amount: uint64, data: bytes): uint64 {
    assert(this.owners(this.txn.sender).value, 'Only owners can submit transactions');
    
    const txId = this.transactionCount.value + 1;
    this.transactionCount.value = txId;
    
    // Store transaction data
    const txData = concat(to, itob(amount), data);
    this.transactions(txId).value = txData;
    this.confirmations(txId).value = 0;
    
    return txId;
  }

  confirmTransaction(txId: uint64): void {
    assert(this.owners(this.txn.sender).value, 'Only owners can confirm transactions');
    
    const userConfirmKey = concat(this.txn.sender, itob(txId));
    
    assert(!this.userConfirmations(userConfirmKey).value, 'Already confirmed');
    
    this.userConfirmations(userConfirmKey).value = true;
    this.confirmations(txId).value += 1;
  }

  executeTransaction(txId: uint64, to: Address, amount: uint64): void {
    const confirmations = this.confirmations(txId).value;
    
    assert(confirmations >= this.requiredSignatures.value, 'Insufficient confirmations');
    assert(this.transactions(txId).value.length > 0, 'Transaction does not exist');
    
    // Execute the transaction
    sendPayment({
      to: to,
      amount: amount,
    });
    
    // Clear transaction data
    this.transactions(txId).delete();
  }

  getConfirmationCount(txId: uint64): uint64 {
    return this.confirmations(txId).value;
  }

  isOwner(account: Address): boolean {
    return this.owners(account).value;
  }
}

export default MultiSigWallet;`,
    questions: [
      {
        question: "What is required to execute a transaction in a multi-sig wallet?",
        options: [
          "Only one signature",
          "All owners must sign",
          "A minimum number of required signatures",
          "Only the creator can execute",
        ],
        correct: 2,
      },
      {
        question: "Can an owner confirm the same transaction multiple times?",
        options: [
          "Yes, to increase priority",
          "No, each owner can only confirm once",
          "Only if they are the creator",
          "Yes, but only within 24 hours",
        ],
        correct: 1,
      },
      {
        question: "Who can submit new transactions to the multi-sig wallet?",
        options: ["Anyone", "Only the creator", "Only wallet owners", "Only external contracts"],
        correct: 2,
      },
      {
        question: "What happens to transaction data after successful execution?",
        options: [
          "It remains stored permanently",
          "It is cleared/deleted",
          "It is moved to archive",
          "It is encrypted",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "crowdfunding-contract",
    title: "Crowdfunding Platform",
    description: "A decentralized crowdfunding contract with goal tracking, refunds, and milestone-based releases",
    category: "Intermediate",
    difficulty: "Medium",
    icon: Target,
    python: `from puyapy import *

class Crowdfunding(Contract):
    def __init__(self) -> None:
        self.creator = GlobalState(Account, key="creator")
        self.goal = GlobalState(UInt64, key="goal")
        self.deadline = GlobalState(UInt64, key="deadline")
        self.total_raised = GlobalState(UInt64, key="total_raised")
        self.goal_reached = GlobalState(bool, key="goal_reached")
        self.funds_withdrawn = GlobalState(bool, key="funds_withdrawn")
        self.contributions = BoxMap(Account, UInt64, key_prefix="contrib")

    @create
    def create(self, goal: UInt64, duration: UInt64) -> None:
        self.creator.value = Txn.sender
        self.goal.value = goal
        self.deadline.value = Global.latest_timestamp + duration
        self.total_raised.value = UInt64(0)
        self.goal_reached.value = False
        self.funds_withdrawn.value = False

    @external
    def contribute(self, payment: PaymentTransaction) -> None:
        assert Global.latest_timestamp < self.deadline.value, "Campaign has ended"
        assert not self.goal_reached.value, "Goal already reached"
        assert payment.receiver == Global.current_application_address, "Payment must go to contract"
        
        self.contributions[payment.sender] += payment.amount
        self.total_raised.value += payment.amount
        
        if self.total_raised.value >= self.goal.value:
            self.goal_reached.value = True

    @external
    def withdraw_funds(self) -> None:
        assert Txn.sender == self.creator.value, "Only creator can withdraw"
        assert self.goal_reached.value, "Goal not reached"
        assert not self.funds_withdrawn.value, "Funds already withdrawn"
        
        self.funds_withdrawn.value = True
        
        itxn.Payment(
            receiver=self.creator.value,
            amount=self.total_raised.value,
        ).submit()

    @external
    def refund(self) -> None:
        assert Global.latest_timestamp >= self.deadline.value, "Campaign still active"
        assert not self.goal_reached.value, "Goal was reached"
        
        contribution = self.contributions[Txn.sender]
        assert contribution > UInt64(0), "No contribution to refund"
        
        self.contributions[Txn.sender] = UInt64(0)
        
        itxn.Payment(
            receiver=Txn.sender,
            amount=contribution,
        ).submit()

    @external
    def get_campaign_info(self) -> tuple[Account, UInt64, UInt64, UInt64, bool, bool]:
        return (
            self.creator.value,
            self.goal.value,
            self.deadline.value,
            self.total_raised.value,
            self.goal_reached.value,
            self.funds_withdrawn.value,
        )`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class Crowdfunding extends Contract {
  creator = GlobalStateKey<Address>();
  goal = GlobalStateKey<uint64>();
  deadline = GlobalStateKey<uint64>();
  totalRaised = GlobalStateKey<uint64>();
  goalReached = GlobalStateKey<boolean>();
  fundsWithdrawn = GlobalStateKey<boolean>();
  
  contributions = BoxMap<Address, uint64>();

  createApplication(goal: uint64, duration: uint64): void {
    this.creator.value = this.txn.sender;
    this.goal.value = goal;
    this.deadline.value = globals.latestTimestamp + duration;
    this.totalRaised.value = 0;
    this.goalReached.value = false;
    this.fundsWithdrawn.value = false;
  }

  contribute(payment: PayTxn): void {
    assert(globals.latestTimestamp < this.deadline.value, 'Campaign has ended');
    assert(!this.goalReached.value, 'Goal already reached');
    assert(payment.receiver === this.app.address, 'Payment must go to contract');
    
    this.contributions(payment.sender).value += payment.amount;
    this.totalRaised.value += payment.amount;
    
    if (this.totalRaised.value >= this.goal.value) {
      this.goalReached.value = true;
    }
  }

  withdrawFunds(): void {
    assert(this.txn.sender === this.creator.value, 'Only creator can withdraw');
    assert(this.goalReached.value, 'Goal not reached');
    assert(!this.fundsWithdrawn.value, 'Funds already withdrawn');
    
    this.fundsWithdrawn.value = true;
    
    sendPayment({
      to: this.creator.value,
      amount: this.totalRaised.value,
    });
  }

  refund(): void {
    assert(globals.latestTimestamp >= this.deadline.value, 'Campaign still active');
    assert(!this.goalReached.value, 'Goal was reached');
    
    const contribution = this.contributions(this.txn.sender).value;
    assert(contribution > 0, 'No contribution to refund');
    
    this.contributions(this.txn.sender).value = 0;
    
    sendPayment({
      to: this.txn.sender,
      amount: contribution,
    });
  }

  getCampaignInfo(): [Address, uint64, uint64, uint64, boolean, boolean] {
    return [
      this.creator.value,
      this.goal.value,
      this.deadline.value,
      this.totalRaised.value,
      this.goalReached.value,
      this.fundsWithdrawn.value,
    ];
  }
}

export default Crowdfunding;`,
    questions: [
      {
        question: "When can contributors get a refund?",
        options: [
          "Anytime during the campaign",
          "Only if the goal is not reached after the deadline",
          "Only if the creator approves",
          "Never, contributions are final",
        ],
        correct: 1,
      },
      {
        question: "What happens when the funding goal is reached?",
        options: [
          "Campaign automatically ends",
          "Goal reached flag is set to true",
          "Funds are immediately sent to creator",
          "New contributions are rejected",
        ],
        correct: 1,
      },
      {
        question: "Who can withdraw the raised funds?",
        options: ["Anyone", "Only contributors", "Only the campaign creator", "Only after voting"],
        correct: 2,
      },
      {
        question: "What must be true for the creator to withdraw funds?",
        options: [
          "Campaign deadline has passed",
          "At least one contribution exists",
          "Goal is reached and funds not already withdrawn",
          "All contributors approve",
        ],
        correct: 2,
      },
    ],
  },
  {
    id: "subscription-contract",
    title: "Subscription Service",
    description: "A recurring payment subscription contract with automatic billing and cancellation features",
    category: "Intermediate",
    difficulty: "Medium",
    icon: Clock,
    python: `from puyapy import *

class SubscriptionService(Contract):
    def __init__(self) -> None:
        self.service_provider = GlobalState(Account, key="provider")
        self.subscription_fee = GlobalState(UInt64, key="fee")
        self.billing_period = GlobalState(UInt64, key="period")
        self.subscriber_count = GlobalState(UInt64, key="sub_count")
        self.subscribers = BoxMap(Account, UInt64, key_prefix="subscriber")  # subscriber -> expiry
        self.last_payment = BoxMap(Account, UInt64, key_prefix="last_pay")

    @create
    def create(self, fee: UInt64, period: UInt64) -> None:
        self.service_provider.value = Txn.sender
        self.subscription_fee.value = fee
        self.billing_period.value = period
        self.subscriber_count.value = UInt64(0)

    @external
    def subscribe(self, payment: PaymentTransaction) -> None:
        assert payment.amount >= self.subscription_fee.value, "Insufficient payment"
        assert payment.receiver == Global.current_application_address, "Payment must go to contract"
        
        current_expiry = self.subscribers.get(payment.sender, UInt64(0))
        
        if current_expiry == UInt64(0):
            self.subscriber_count.value += UInt64(1)
        
        # Extend subscription from current time or existing expiry
        start_time = max(Global.latest_timestamp, current_expiry)
        new_expiry = start_time + self.billing_period.value
        
        self.subscribers[payment.sender] = new_expiry
        self.last_payment[payment.sender] = Global.latest_timestamp
        
        # Transfer payment to service provider
        itxn.Payment(
            receiver=self.service_provider.value,
            amount=payment.amount,
        ).submit()

    @external
    def renew_subscription(self, payment: PaymentTransaction) -> None:
        assert payment.amount >= self.subscription_fee.value, "Insufficient payment"
        assert payment.receiver == Global.current_application_address, "Payment must go to contract"
        assert self.subscribers[payment.sender] > UInt64(0), "Not a subscriber"
        
        # Extend subscription from current expiry
        current_expiry = self.subscribers[payment.sender]
        new_expiry = current_expiry + self.billing_period.value
        
        self.subscribers[payment.sender] = new_expiry
        self.last_payment[payment.sender] = Global.latest_timestamp
        
        # Transfer payment to service provider
        itxn.Payment(
            receiver=self.service_provider.value,
            amount=payment.amount,
        ).submit()

    @external
    def cancel_subscription(self) -> None:
        assert self.subscribers[Txn.sender] > UInt64(0), "Not a subscriber"
        
        self.subscribers[Txn.sender] = UInt64(0)
        self.subscriber_count.value -= UInt64(1)

    @external
    def is_active_subscriber(self, user: Account) -> bool:
        expiry = self.subscribers.get(user, UInt64(0))
        return expiry > Global.latest_timestamp

    @external
    def get_subscription_info(self, user: Account) -> tuple[UInt64, UInt64, bool]:
        expiry = self.subscribers.get(user, UInt64(0))
        last_pay = self.last_payment.get(user, UInt64(0))
        is_active = expiry > Global.latest_timestamp
        return expiry, last_pay, is_active

    @external
    def get_service_stats(self) -> tuple[UInt64, UInt64, UInt64]:
        return (
            self.subscription_fee.value,
            self.billing_period.value,
            self.subscriber_count.value,
        )`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class SubscriptionService extends Contract {
  serviceProvider = GlobalStateKey<Address>();
  subscriptionFee = GlobalStateKey<uint64>();
  billingPeriod = GlobalStateKey<uint64>();
  subscriberCount = GlobalStateKey<uint64>();
  
  subscribers = BoxMap<Address, uint64>(); // subscriber -> expiry
  lastPayment = BoxMap<Address, uint64>();

  createApplication(fee: uint64, period: uint64): void {
    this.serviceProvider.value = this.txn.sender;
    this.subscriptionFee.value = fee;
    this.billingPeriod.value = period;
    this.subscriberCount.value = 0;
  }

  subscribe(payment: PayTxn): void {
    assert(payment.amount >= this.subscriptionFee.value, 'Insufficient payment');
    assert(payment.receiver === this.app.address, 'Payment must go to contract');
    
    const currentExpiry = this.subscribers(payment.sender).value;
    
    if (currentExpiry === 0) {
      this.subscriberCount.value += 1;
    }
    
    // Extend subscription from current time or existing expiry
    const startTime = currentExpiry > globals.latestTimestamp ? currentExpiry : globals.latestTimestamp;
    const newExpiry = startTime + this.billingPeriod.value;
    
    this.subscribers(payment.sender).value = newExpiry;
    this.lastPayment(payment.sender).value = globals.latestTimestamp;
    
    // Transfer payment to service provider
    sendPayment({
      to: this.serviceProvider.value,
      amount: payment.amount,
    });
  }

  renewSubscription(payment: PayTxn): void {
    assert(payment.amount >= this.subscriptionFee.value, 'Insufficient payment');
    assert(payment.receiver === this.app.address, 'Payment must go to contract');
    assert(this.subscribers(payment.sender).value > 0, 'Not a subscriber');
    
    // Extend subscription from current expiry
    const currentExpiry = this.subscribers(payment.sender).value;
    const newExpiry = currentExpiry + this.billingPeriod.value;
    
    this.subscribers(payment.sender).value = newExpiry;
    this.lastPayment(payment.sender).value = globals.latestTimestamp;
    
    // Transfer payment to service provider
    sendPayment({
      to: this.serviceProvider.value,
      amount: payment.amount,
    });
  }

  cancelSubscription(): void {
    assert(this.subscribers(this.txn.sender).value > 0, 'Not a subscriber');
    
    this.subscribers(this.txn.sender).value = 0;
    this.subscriberCount.value -= 1;
  }

  isActiveSubscriber(user: Address): boolean {
    const expiry = this.subscribers(user).value;
    return expiry > globals.latestTimestamp;
  }

  getSubscriptionInfo(user: Address): [uint64, uint64, boolean] {
    const expiry = this.subscribers(user).value;
    const lastPay = this.lastPayment(user).value;
    const isActive = expiry > globals.latestTimestamp;
    return [expiry, lastPay, isActive];
  }

  getServiceStats(): [uint64, uint64, uint64] {
    return [
      this.subscriptionFee.value,
      this.billingPeriod.value,
      this.subscriberCount.value,
    ];
  }
}

export default SubscriptionService;`,
    questions: [
      {
        question: "What happens when a new user subscribes?",
        options: [
          "Subscription starts from next billing cycle",
          "Subscription starts immediately and subscriber count increases",
          "Payment is held until approval",
          "User must wait for admin approval",
        ],
        correct: 1,
      },
      {
        question: "How is subscription renewal handled?",
        options: [
          "Automatic renewal without payment",
          "Manual renewal with payment extending from current expiry",
          "Renewal only at exact expiry time",
          "Renewal requires service provider approval",
        ],
        correct: 1,
      },
      {
        question: "What determines if a subscriber is active?",
        options: [
          "Last payment date",
          "Subscription expiry time compared to current time",
          "Service provider approval",
          "Payment amount",
        ],
        correct: 1,
      },
      {
        question: "Who receives the subscription payments?",
        options: ["The contract", "All subscribers", "The service provider", "A treasury account"],
        correct: 2,
      },
    ],
  },
  {
    id: "insurance-contract",
    title: "Decentralized Insurance",
    description: "A parametric insurance contract with automated claims processing and premium collection",
    category: "Advanced",
    difficulty: "Hard",
    icon: HandHeart,
    python: `from puyapy import *

class DecentralizedInsurance(Contract):
    def __init__(self) -> None:
        self.insurer = GlobalState(Account, key="insurer")
        self.premium_amount = GlobalState(UInt64, key="premium")
        self.coverage_amount = GlobalState(UInt64, key="coverage")
        self.policy_duration = GlobalState(UInt64, key="duration")
        self.total_pool = GlobalState(UInt64, key="pool")
        self.active_policies = GlobalState(UInt64, key="active")
        self.policies = BoxMap(Account, UInt64, key_prefix="policy")  # policyholder -> expiry
        self.claims = BoxMap(Account, bool, key_prefix="claim")  # policyholder -> claimed
        self.oracle_address = GlobalState(Account, key="oracle")

    @create
    def create(self, premium: UInt64, coverage: UInt64, duration: UInt64, oracle: Account) -> None:
        self.insurer.value = Txn.sender
        self.premium_amount.value = premium
        self.coverage_amount.value = coverage
        self.policy_duration.value = duration
        self.oracle_address.value = oracle
        self.total_pool.value = UInt64(0)
        self.active_policies.value = UInt64(0)

    @external
    def buy_policy(self, payment: PaymentTransaction) -> None:
        assert payment.amount >= self.premium_amount.value, "Insufficient premium"
        assert payment.receiver == Global.current_application_address, "Payment must go to contract"
        assert self.policies[payment.sender] <= Global.latest_timestamp, "Policy already active"
        
        # Set policy expiry
        policy_expiry = Global.latest_timestamp + self.policy_duration.value
        self.policies[payment.sender] = policy_expiry
        self.claims[payment.sender] = False
        
        # Add to insurance pool
        self.total_pool.value += payment.amount
        self.active_policies.value += UInt64(1)

    @external
    def file_claim(self) -> None:
        assert self.policies[Txn.sender] > Global.latest_timestamp, "No active policy"
        assert not self.claims[Txn.sender], "Claim already filed"
        
        self.claims[Txn.sender] = True

    @external
    def process_claim(self, policyholder: Account, approved: bool) -> None:
        assert Txn.sender == self.oracle_address.value, "Only oracle can process claims"
        assert self.policies[policyholder] > Global.latest_timestamp, "No active policy"
        assert self.claims[policyholder], "No claim filed"
        
        if approved:
            assert self.total_pool.value >= self.coverage_amount.value, "Insufficient pool funds"
            
            # Pay claim
            itxn.Payment(
                receiver=policyholder,
                amount=self.coverage_amount.value,
            ).submit()
            
            self.total_pool.value -= self.coverage_amount.value
            
            # Invalidate policy after claim
            self.policies[policyholder] = UInt64(0)
            self.active_policies.value -= UInt64(1)
        
        # Reset claim status
        self.claims[policyholder] = False

    @external
    def add_to_pool(self, payment: PaymentTransaction) -> None:
        assert Txn.sender == self.insurer.value, "Only insurer can add to pool"
        assert payment.receiver == Global.current_application_address, "Payment must go to contract"
        
        self.total_pool.value += payment.amount

    @external
    def withdraw_excess(self, amount: UInt64) -> None:
        assert Txn.sender == self.insurer.value, "Only insurer can withdraw"
        
        # Ensure minimum pool coverage
        required_reserve = self.active_policies.value * self.coverage_amount.value
        available = self.total_pool.value - required_reserve
        
        assert amount <= available, "Insufficient excess funds"
        
        self.total_pool.value -= amount
        
        itxn.Payment(
            receiver=self.insurer.value,
            amount=amount,
        ).submit()

    @external
    def get_policy_info(self, user: Account) -> tuple[UInt64, bool, bool]:
        expiry = self.policies.get(user, UInt64(0))
        is_active = expiry > Global.latest_timestamp
        has_claim = self.claims.get(user, False)
        return expiry, is_active, has_claim

    @external
    def get_pool_stats(self) -> tuple[UInt64, UInt64, UInt64, UInt64]:
        return (
            self.total_pool.value,
            self.active_policies.value,
            self.premium_amount.value,
            self.coverage_amount.value,
        )`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class DecentralizedInsurance extends Contract {
  insurer = GlobalStateKey<Address>();
  premiumAmount = GlobalStateKey<uint64>();
  coverageAmount = GlobalStateKey<uint64>();
  policyDuration = GlobalStateKey<uint64>();
  totalPool = GlobalStateKey<uint64>();
  activePolicies = GlobalStateKey<uint64>();
  oracleAddress = GlobalStateKey<Address>();
  
  policies = BoxMap<Address, uint64>(); // policyholder -> expiry
  claims = BoxMap<Address, boolean>(); // policyholder -> claimed

  createApplication(premium: uint64, coverage: uint64, duration: uint64, oracle: Address): void {
    this.insurer.value = this.txn.sender;
    this.premiumAmount.value = premium;
    this.coverageAmount.value = coverage;
    this.policyDuration.value = duration;
    this.oracleAddress.value = oracle;
    this.totalPool.value = 0;
    this.activePolicies.value = 0;
  }

  buyPolicy(payment: PayTxn): void {
    assert(payment.amount >= this.premiumAmount.value, 'Insufficient premium');
    assert(payment.receiver === this.app.address, 'Payment must go to contract');
    assert(this.policies(payment.sender).value <= globals.latestTimestamp, 'Policy already active');
    
    // Set policy expiry
    const policyExpiry = globals.latestTimestamp + this.policyDuration.value;
    this.policies(payment.sender).value = policyExpiry;
    this.claims(payment.sender).value = false;
    
    // Add to insurance pool
    this.totalPool.value += payment.amount;
    this.activePolicies.value += 1;
  }

  fileClaim(): void {
    assert(this.policies(this.txn.sender).value > globals.latestTimestamp, 'No active policy');
    assert(!this.claims(this.txn.sender).value, 'Claim already filed');
    
    this.claims(this.txn.sender).value = true;
  }

  processClaim(policyholder: Address, approved: boolean): void {
    assert(this.txn.sender === this.oracleAddress.value, 'Only oracle can process claims');
    assert(this.policies(policyholder).value > globals.latestTimestamp, 'No active policy');
    assert(this.claims(policyholder).value, 'No claim filed');
    
    if (approved) {
      assert(this.totalPool.value >= this.coverageAmount.value, 'Insufficient pool funds');
      
      // Pay claim
      sendPayment({
        to: policyholder,
        amount: this.coverageAmount.value,
      });
      
      this.totalPool.value -= this.coverageAmount.value;
      
      // Invalidate policy after claim
      this.policies(policyholder).value = 0;
      this.activePolicies.value -= 1;
    }
    
    // Reset claim status
    this.claims(policyholder).value = false;
  }

  addToPool(payment: PayTxn): void {
    assert(this.txn.sender === this.insurer.value, 'Only insurer can add to pool');
    assert(payment.receiver === this.app.address, 'Payment must go to contract');
    
    this.totalPool.value += payment.amount;
  }

  withdrawExcess(amount: uint64): void {
    assert(this.txn.sender === this.insurer.value, 'Only insurer can withdraw');
    
    // Ensure minimum pool coverage
    const requiredReserve = this.activePolicies.value * this.coverageAmount.value;
    const available = this.totalPool.value - requiredReserve;
    
    assert(amount <= available, 'Insufficient excess funds');
    
    this.totalPool.value -= amount;
    
    sendPayment({
      to: this.insurer.value,
      amount: amount,
    });
  }

  getPolicyInfo(user: Address): [uint64, boolean, boolean] {
    const expiry = this.policies(user).value;
    const isActive = expiry > globals.latestTimestamp;
    const hasClaim = this.claims(user).value;
    return [expiry, isActive, hasClaim];
  }

  getPoolStats(): [uint64, uint64, uint64, uint64] {
    return [
      this.totalPool.value,
      this.activePolicies.value,
      this.premiumAmount.value,
      this.coverageAmount.value,
    ];
  }
}

export default DecentralizedInsurance;`,
    questions: [
      {
        question: "Who can process insurance claims?",
        options: ["Anyone", "Only the insurer", "Only the oracle", "Only policyholders"],
        correct: 2,
      },
      {
        question: "What happens to a policy after a successful claim?",
        options: [
          "Policy continues as normal",
          "Policy is invalidated and removed",
          "Policy premium increases",
          "Policy is transferred to insurer",
        ],
        correct: 1,
      },
      {
        question: "How much can the insurer withdraw from the pool?",
        options: [
          "Any amount",
          "Only the premium amounts",
          "Only excess funds above required reserves",
          "Nothing, funds are locked",
        ],
        correct: 2,
      },
      {
        question: "What is required to buy an insurance policy?",
        options: [
          "Only oracle approval",
          "Premium payment and no existing active policy",
          "Insurer permission",
          "Minimum pool balance",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "dao-governance",
    title: "DAO Governance",
    description: "A decentralized autonomous organization with proposal creation, voting, and execution mechanisms",
    category: "Advanced",
    difficulty: "Hard",
    icon: Users,
    python: `from puyapy import *

class DAOGovernance(Contract):
    def __init__(self) -> None:
        self.token_address = GlobalState(UInt64, key="token")
        self.proposal_count = GlobalState(UInt64, key="prop_count")
        self.voting_period = GlobalState(UInt64, key="vote_period")
        self.quorum_threshold = GlobalState(UInt64, key="quorum")
        self.proposals = BoxMap(UInt64, Bytes, key_prefix="proposal")
        self.proposal_votes_for = BoxMap(UInt64, UInt64, key_prefix="votes_for")
        self.proposal_votes_against = BoxMap(UInt64, UInt64, key_prefix="votes_against")
        self.proposal_end_time = BoxMap(UInt64, UInt64, key_prefix="end_time")
        self.proposal_executed = BoxMap(UInt64, bool, key_prefix="executed")
        self.user_votes = BoxMap(Bytes, UInt64, key_prefix="user_vote")  # user+proposal_id -> vote_power

    @create
    def create(self, token_id: UInt64, vote_period: UInt64, quorum: UInt64) -> None:
        self.token_address.value = token_id
        self.proposal_count.value = UInt64(0)
        self.voting_period.value = vote_period
        self.quorum_threshold.value = quorum

    @external
    def create_proposal(self, description: Bytes, target: Account, call_data: Bytes) -> UInt64:
        # Check if sender has governance tokens (simplified check)
        proposal_id = self.proposal_count.value + UInt64(1)
        self.proposal_count.value = proposal_id
        
        # Store proposal data
        proposal_data = concat(description, target.bytes, call_data)
        self.proposals[proposal_id] = proposal_data
        self.proposal_end_time[proposal_id] = Global.latest_timestamp + self.voting_period.value
        self.proposal_votes_for[proposal_id] = UInt64(0)
        self.proposal_votes_against[proposal_id] = UInt64(0)
        self.proposal_executed[proposal_id] = False
        
        return proposal_id

    @external
    def vote(self, proposal_id: UInt64, support: bool, vote_power: UInt64) -> None:
        assert proposal_id <= self.proposal_count.value, "Invalid proposal"
        assert Global.latest_timestamp < self.proposal_end_time[proposal_id], "Voting period ended"
        
        user_vote_key = concat(Txn.sender.bytes, itoa(proposal_id))
        assert self.user_votes[user_vote_key] == UInt64(0), "Already voted"
        
        # In practice, verify vote_power against token balance
        self.user_votes[user_vote_key] = vote_power
        
        if support:
            self.proposal_votes_for[proposal_id] += vote_power
        else:
            self.proposal_votes_against[proposal_id] += vote_power

    @external
    def execute_proposal(self, proposal_id: UInt64) -> None:
        assert proposal_id <= self.proposal_count.value, "Invalid proposal"
        assert Global.latest_timestamp >= self.proposal_end_time[proposal_id], "Voting still active"
        assert not self.proposal_executed[proposal_id], "Already executed"
        
        votes_for = self.proposal_votes_for[proposal_id]
        votes_against = self.proposal_votes_against[proposal_id]
        total_votes = votes_for + votes_against
        
        assert total_votes >= self.quorum_threshold.value, "Quorum not reached"
        assert votes_for > votes_against, "Proposal rejected"
        
        self.proposal_executed[proposal_id] = True
        
        # In practice, execute the proposal action here
        # This would involve calling the target contract with call_data

    @external
    def get_proposal_info(self, proposal_id: UInt64) -> tuple[UInt64, UInt64, UInt64, bool, bool]:
        votes_for = self.proposal_votes_for.get(proposal_id, UInt64(0))
        votes_against = self.proposal_votes_against.get(proposal_id, UInt64(0))
        end_time = self.proposal_end_time.get(proposal_id, UInt64(0))
        executed = self.proposal_executed.get(proposal_id, False)
        is_active = Global.latest_timestamp < end_time
        
        return votes_for, votes_against, end_time, executed, is_active

    @external
    def has_voted(self, user: Account, proposal_id: UInt64) -> bool:
        user_vote_key = concat(user.bytes, itoa(proposal_id))
        return self.user_votes.get(user_vote_key, UInt64(0)) > UInt64(0)

    @external
    def get_dao_stats(self) -> tuple[UInt64, UInt64, UInt64]:
        return (
            self.proposal_count.value,
            self.voting_period.value,
            self.quorum_threshold.value,
        )`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class DAOGovernance extends Contract {
  tokenAddress = GlobalStateKey<uint64>();
  proposalCount = GlobalStateKey<uint64>();
  votingPeriod = GlobalStateKey<uint64>();
  quorumThreshold = GlobalStateKey<uint64>();
  
  proposals = BoxMap<uint64, bytes>();
  proposalVotesFor = BoxMap<uint64, uint64>();
  proposalVotesAgainst = BoxMap<uint64, uint64>();
  proposalEndTime = BoxMap<uint64, uint64>();
  proposalExecuted = BoxMap<uint64, boolean>();
  userVotes = BoxMap<bytes, uint64>(); // user+proposal_id -> vote_power

  createApplication(tokenId: uint64, votePeriod: uint64, quorum: uint64): void {
    this.tokenAddress.value = tokenId;
    this.proposalCount.value = 0;
    this.votingPeriod.value = votePeriod;
    this.quorumThreshold.value = quorum;
  }

  createProposal(description: bytes, target: Address, callData: bytes): uint64 {
    // Check if sender has governance tokens (simplified check)
    const proposalId = this.proposalCount.value + 1;
    this.proposalCount.value = proposalId;
    
    // Store proposal data
    const proposalData = concat(description, target, callData);
    this.proposals(proposalId).value = proposalData;
    this.proposalEndTime(proposalId).value = globals.latestTimestamp + this.votingPeriod.value;
    this.proposalVotesFor(proposalId).value = 0;
    this.proposalVotesAgainst(proposalId).value = 0;
    this.proposalExecuted(proposalId).value = false;
    
    return proposalId;
  }

  vote(proposalId: uint64, support: boolean, votePower: uint64): void {
    assert(proposalId <= this.proposalCount.value, 'Invalid proposal');
    assert(globals.latestTimestamp < this.proposalEndTime(proposalId).value, 'Voting period ended');
    
    const userVoteKey = concat(this.txn.sender, itob(proposalId));
    assert(this.userVotes(userVoteKey).value === 0, 'Already voted');
    
    // In practice, verify vote_power against token balance
    this.userVotes(userVoteKey).value = votePower;
    
    if (support) {
      this.proposalVotesFor(proposalId).value += votePower;
    } else {
      this.proposalVotesAgainst(proposalId).value += votePower;
    }
  }

  executeProposal(proposalId: uint64): void {
    assert(proposalId <= this.proposalCount.value, 'Invalid proposal');
    assert(globals.latestTimestamp >= this.proposalEndTime(proposalId).value, 'Voting still active');
    assert(!this.proposalExecuted(proposalId).value, 'Already executed');
    
    const votesFor = this.proposalVotesFor(proposalId).value;
    const votesAgainst = this.proposalVotesAgainst(proposalId).value;
    const totalVotes = votesFor + votesAgainst;
    
    assert(totalVotes >= this.quorumThreshold.value, 'Quorum not reached');
    assert(votesFor > votesAgainst, 'Proposal rejected');
    
    this.proposalExecuted(proposalId).value = true;
    
    // In practice, execute the proposal action here
    // This would involve calling the target contract with call_data
  }

  getProposalInfo(proposalId: uint64): [uint64, uint64, uint64, boolean, boolean] {
    const votesFor = this.proposalVotesFor(proposalId).value;
    const votesAgainst = this.proposalVotesAgainst(proposalId).value;
    const endTime = this.proposalEndTime(proposalId).value;
    const executed = this.proposalExecuted(proposalId).value;
    const isActive = globals.latestTimestamp < endTime;
    
    return [votesFor, votesAgainst, endTime, executed, isActive];
  }

  hasVoted(user: Address, proposalId: uint64): boolean {
    const userVoteKey = concat(user, itob(proposalId));
    return this.userVotes(userVoteKey).value > 0;
  }

  getDAOStats(): [uint64, uint64, uint64] {
    return [
      this.proposalCount.value,
      this.votingPeriod.value,
      this.quorumThreshold.value,
    ];
  }
}

export default DAOGovernance;`,
    questions: [
      {
        question: "What is required for a proposal to be executed?",
        options: [
          "Only majority votes",
          "Quorum reached and more votes for than against",
          "Unanimous approval",
          "Creator approval only",
        ],
        correct: 1,
      },
      {
        question: "When can a proposal be executed?",
        options: [
          "Immediately after creation",
          "During the voting period",
          "Only after the voting period ends",
          "Anytime by the creator",
        ],
        correct: 2,
      },
      {
        question: "Can a user vote multiple times on the same proposal?",
        options: [
          "Yes, votes accumulate",
          "No, only one vote per user per proposal",
          "Yes, but only with different vote power",
          "Only if they have more tokens",
        ],
        correct: 1,
      },
      {
        question: "What determines voting power in this DAO?",
        options: [
          "One person, one vote",
          "Token balance (governance tokens)",
          "Reputation score",
          "Time since joining",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "prediction-market",
    title: "Prediction Market",
    description: "A decentralized prediction market with binary outcomes, betting, and automated resolution",
    category: "Advanced",
    difficulty: "Hard",
    icon: TrendingUp,
    python: `from puyapy import *

class PredictionMarket(Contract):
    def __init__(self) -> None:
        self.creator = GlobalState(Account, key="creator")
        self.oracle = GlobalState(Account, key="oracle")
        self.question = GlobalState(Bytes, key="question")
        self.resolution_time = GlobalState(UInt64, key="resolution_time")
        self.total_yes_bets = GlobalState(UInt64, key="yes_bets")
        self.total_no_bets = GlobalState(UInt64, key="no_bets")
        self.resolved = GlobalState(bool, key="resolved")
        self.outcome = GlobalState(bool, key="outcome")
        self.market_fee = GlobalState(UInt64, key="fee")  # basis points
        self.user_yes_bets = BoxMap(Account, UInt64, key_prefix="yes_bet")
        self.user_no_bets = BoxMap(Account, UInt64, key_prefix="no_bet")
        self.claimed = BoxMap(Account, bool, key_prefix="claimed")

    @create
    def create(self, question: Bytes, resolution_time: UInt64, oracle: Account, fee: UInt64) -> None:
        self.creator.value = Txn.sender
        self.oracle.value = oracle
        self.question.value = question
        self.resolution_time.value = resolution_time
        self.total_yes_bets.value = UInt64(0)
        self.total_no_bets.value = UInt64(0)
        self.resolved.value = False
        self.market_fee.value = fee

    @external
    def bet_yes(self, payment: PaymentTransaction) -> None:
        assert not self.resolved.value, "Market already resolved"
        assert Global.latest_timestamp < self.resolution_time.value, "Betting period ended"
        assert payment.receiver == Global.current_application_address, "Payment must go to contract"
        
        self.user_yes_bets[payment.sender] += payment.amount
        self.total_yes_bets.value += payment.amount

    @external
    def bet_no(self, payment: PaymentTransaction) -> None:
        assert not self.resolved.value, "Market already resolved"
        assert Global.latest_timestamp < self.resolution_time.value, "Betting period ended"
        assert payment.receiver == Global.current_application_address, "Payment must go to contract"
        
        self.user_no_bets[payment.sender] += payment.amount
        self.total_no_bets.value += payment.amount

    @external
    def resolve_market(self, result: bool) -> None:
        assert Txn.sender == self.oracle.value, "Only oracle can resolve"
        assert Global.latest_timestamp >= self.resolution_time.value, "Resolution time not reached"
        assert not self.resolved.value, "Already resolved"
        
        self.resolved.value = True
        self.outcome.value = result

    @external
    def claim_winnings(self) -> None:
        assert self.resolved.value, "Market not resolved"
        assert not self.claimed[Txn.sender], "Already claimed"
        
        user_winning_bet = UInt64(0)
        total_winning_bets = UInt64(0)
        total_losing_bets = UInt64(0)
        
        if self.outcome.value:  # YES outcome
            user_winning_bet = self.user_yes_bets.get(Txn.sender, UInt64(0))
            total_winning_bets = self.total_yes_bets.value
            total_losing_bets = self.total_no_bets.value
        else:  # NO outcome
            user_winning_bet = self.user_no_bets.get(Txn.sender, UInt64(0))
            total_winning_bets = self.total_no_bets.value
            total_losing_bets = self.total_yes_bets.value
        
        assert user_winning_bet > UInt64(0), "No winning bet to claim"
        
        # Calculate winnings: original bet + proportional share of losing bets (minus fee)
        total_pool = total_winning_bets + total_losing_bets
        fee_amount = (total_pool * self.market_fee.value) // UInt64(10000)
        net_losing_bets = total_losing_bets - fee_amount
        
        proportional_winnings = (user_winning_bet * net_losing_bets) // total_winning_bets
        total_payout = user_winning_bet + proportional_winnings
        
        self.claimed[Txn.sender] = True
        
        itxn.Payment(
            receiver=Txn.sender,
            amount=total_payout,
        ).submit()

    @external
    def withdraw_fees(self) -> None:
        assert Txn.sender == self.creator.value, "Only creator can withdraw fees"
        assert self.resolved.value, "Market not resolved"
        
        total_pool = self.total_yes_bets.value + self.total_no_bets.value
        fee_amount = (total_pool * self.market_fee.value) // UInt64(10000)
        
        itxn.Payment(
            receiver=self.creator.value,
            amount=fee_amount,
        ).submit()

    @external
    def get_market_info(self) -> tuple[UInt64, UInt64, UInt64, bool, bool]:
        return (
            self.total_yes_bets.value,
            self.total_no_bets.value,
            self.resolution_time.value,
            self.resolved.value,
            self.outcome.value,
        )

    @external
    def get_user_bets(self, user: Account) -> tuple[UInt64, UInt64, bool]:
        yes_bet = self.user_yes_bets.get(user, UInt64(0))
        no_bet = self.user_no_bets.get(user, UInt64(0))
        has_claimed = self.claimed.get(user, False)
        return yes_bet, no_bet, has_claimed`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class PredictionMarket extends Contract {
  creator = GlobalStateKey<Address>();
  oracle = GlobalStateKey<Address>();
  question = GlobalStateKey<bytes>();
  resolutionTime = GlobalStateKey<uint64>();
  totalYesBets = GlobalStateKey<uint64>();
  totalNoBets = GlobalStateKey<uint64>();
  resolved = GlobalStateKey<boolean>();
  outcome = GlobalStateKey<boolean>();
  marketFee = GlobalStateKey<uint64>(); // basis points
  
  userYesBets = BoxMap<Address, uint64>();
  userNoBets = BoxMap<Address, uint64>();
  claimed = BoxMap<Address, boolean>();

  createApplication(question: bytes, resolutionTime: uint64, oracle: Address, fee: uint64): void {
    this.creator.value = this.txn.sender;
    this.oracle.value = oracle;
    this.question.value = question;
    this.resolutionTime.value = resolutionTime;
    this.totalYesBets.value = 0;
    this.totalNoBets.value = 0;
    this.resolved.value = false;
    this.marketFee.value = fee;
  }

  betYes(payment: PayTxn): void {
    assert(!this.resolved.value, 'Market already resolved');
    assert(globals.latestTimestamp < this.resolutionTime.value, 'Betting period ended');
    assert(payment.receiver === this.app.address, 'Payment must go to contract');
    
    this.userYesBets(payment.sender).value += payment.amount;
    this.totalYesBets.value += payment.amount;
  }

  betNo(payment: PayTxn): void {
    assert(!this.resolved.value, 'Market already resolved');
    assert(globals.latestTimestamp < this.resolutionTime.value, 'Betting period ended');
    assert(payment.receiver === this.app.address, 'Payment must go to contract');
    
    this.userNoBets(payment.sender).value += payment.amount;
    this.totalNoBets.value += payment.amount;
  }

  resolveMarket(result: boolean): void {
    assert(this.txn.sender === this.oracle.value, 'Only oracle can resolve');
    assert(globals.latestTimestamp >= this.resolutionTime.value, 'Resolution time not reached');
    assert(!this.resolved.value, 'Already resolved');
    
    this.resolved.value = true;
    this.outcome.value = result;
  }

  claimWinnings(): void {
    assert(this.resolved.value, 'Market not resolved');
    assert(!this.claimed(this.txn.sender).value, 'Already claimed');
    
    let userWinningBet = 0;
    let totalWinningBets = 0;
    let totalLosingBets = 0;
    
    if (this.outcome.value) { // YES outcome
      userWinningBet = this.userYesBets(this.txn.sender).value;
      totalWinningBets = this.totalYesBets.value;
      totalLosingBets = this.totalNoBets.value;
    } else { // NO outcome
      userWinningBet = this.userNoBets(this.txn.sender).value;
      totalWinningBets = this.totalNoBets.value;
      totalLosingBets = this.totalYesBets.value;
    }
    
    assert(userWinningBet > 0, 'No winning bet to claim');
    
    // Calculate winnings: original bet + proportional share of losing bets (minus fee)
    const totalPool = totalWinningBets + totalLosingBets;
    const feeAmount = (totalPool * this.marketFee.value) / 10000;
    const netLosingBets = totalLosingBets - feeAmount;
    
    const proportionalWinnings = (userWinningBet * netLosingBets) / totalWinningBets;
    const totalPayout = userWinningBet + proportionalWinnings;
    
    this.claimed(this.txn.sender).value = true;
    
    sendPayment({
      to: this.txn.sender,
      amount: totalPayout,
    });
  }

  withdrawFees(): void {
    assert(this.txn.sender === this.creator.value, 'Only creator can withdraw fees');
    assert(this.resolved.value, 'Market not resolved');
    
    const totalPool = this.totalYesBets.value + this.totalNoBets.value;
    const feeAmount = (totalPool * this.marketFee.value) / 10000;
    
    sendPayment({
      to: this.creator.value,
      amount: feeAmount,
    });
  }

  getMarketInfo(): [uint64, uint64, uint64, boolean, boolean] {
    return [
      this.totalYesBets.value,
      this.totalNoBets.value,
      this.resolutionTime.value,
      this.resolved.value,
      this.outcome.value,
    ];
  }

  getUserBets(user: Address): [uint64, uint64, boolean] {
    const yesBet = this.userYesBets(user).value;
    const noBet = this.userNoBets(user).value;
    const hasClaimed = this.claimed(user).value;
    return [yesBet, noBet, hasClaimed];
  }
}

export default PredictionMarket;`,
    questions: [
      {
        question: "When can users place bets in the prediction market?",
        options: [
          "Anytime after creation",
          "Only before resolution time and market is not resolved",
          "Only after oracle approval",
          "Only during specific hours",
        ],
        correct: 1,
      },
      {
        question: "How are winnings calculated for successful bettors?",
        options: [
          "Fixed 2x return",
          "Original bet plus proportional share of losing bets minus fees",
          "Equal distribution among winners",
          "Based on time of bet placement",
        ],
        correct: 1,
      },
      {
        question: "Who can resolve the prediction market?",
        options: ["Anyone", "Only the creator", "Only the designated oracle", "Only bettors"],
        correct: 2,
      },
      {
        question: "What happens to the market fees?",
        options: [
          "Distributed to all users",
          "Burned/destroyed",
          "Can be withdrawn by the market creator",
          "Automatically reinvested",
        ],
        correct: 2,
      },
    ],
  },
  {
    id: "supply-chain",
    title: "Supply Chain Tracking",
    description: "A transparent supply chain contract for tracking product journey from origin to consumer",
    category: "Intermediate",
    difficulty: "Medium",
    icon: ArrowRight,
    python: `from puyapy import *

class SupplyChainTracking(Contract):
    def __init__(self) -> None:
        self.admin = GlobalState(Account, key="admin")
        self.product_count = GlobalState(UInt64, key="product_count")
        self.products = BoxMap(UInt64, Bytes, key_prefix="product")  # product_id -> product_data
        self.product_status = BoxMap(UInt64, UInt64, key_prefix="status")  # 0: created, 1: shipped, 2: delivered
        self.product_owner = BoxMap(UInt64, Account, key_prefix="owner")
        self.product_location = BoxMap(UInt64, Bytes, key_prefix="location")
        self.product_timestamp = BoxMap(UInt64, UInt64, key_prefix="timestamp")
        self.authorized_parties = BoxMap(Account, bool, key_prefix="authorized")

    @create
    def create(self) -> None:
        self.admin.value = Txn.sender
        self.product_count.value = UInt64(0)
        self.authorized_parties[Txn.sender] = True

    @external
    def authorize_party(self, party: Account) -> None:
        assert Txn.sender == self.admin.value, "Only admin can authorize parties"
        self.authorized_parties[party] = True

    @external
    def revoke_authorization(self, party: Account) -> None:
        assert Txn.sender == self.admin.value, "Only admin can revoke authorization"
        self.authorized_parties[party] = False

    @external
    def create_product(self, product_data: Bytes, initial_location: Bytes) -> UInt64:
        assert self.authorized_parties[Txn.sender], "Not authorized"
        
        product_id = self.product_count.value + UInt64(1)
        self.product_count.value = product_id
        
        self.products[product_id] = product_data
        self.product_status[product_id] = UInt64(0)  # Created
        self.product_owner[product_id] = Txn.sender
        self.product_location[product_id] = initial_location
        self.product_timestamp[product_id] = Global.latest_timestamp
        
        return product_id

    @external
    def update_location(self, product_id: UInt64, new_location: Bytes) -> None:
        assert self.authorized_parties[Txn.sender], "Not authorized"
        assert product_id <= self.product_count.value, "Invalid product ID"
        
        self.product_location[product_id] = new_location
        self.product_timestamp[product_id] = Global.latest_timestamp

    @external
    def transfer_ownership(self, product_id: UInt64, new_owner: Account) -> None:
        assert product_id <= self.product_count.value, "Invalid product ID"
        assert Txn.sender == self.product_owner[product_id], "Only current owner can transfer"
        assert self.authorized_parties[new_owner], "New owner not authorized"
        
        self.product_owner[product_id] = new_owner
        self.product_timestamp[product_id] = Global.latest_timestamp

    @external
    def update_status(self, product_id: UInt64, new_status: UInt64) -> None:
        assert self.authorized_parties[Txn.sender], "Not authorized"
        assert product_id <= self.product_count.value, "Invalid product ID"
        assert new_status <= UInt64(2), "Invalid status"
        
        current_status = self.product_status[product_id]
        assert new_status > current_status, "Cannot downgrade status"
        
        self.product_status[product_id] = new_status
        self.product_timestamp[product_id] = Global.latest_timestamp

    @external
    def get_product_info(self, product_id: UInt64) -> tuple[Bytes, UInt64, Account, Bytes, UInt64]:
        assert product_id <= self.product_count.value, "Invalid product ID"
        
        return (
            self.products[product_id],
            self.product_status[product_id],
            self.product_owner[product_id],
            self.product_location[product_id],
            self.product_timestamp[product_id],
        )

    @external
    def verify_authenticity(self, product_id: UInt64) -> bool:
        assert product_id <= self.product_count.value, "Invalid product ID"
        return self.products[product_id] != Bytes(b"")

    @external
    def is_authorized(self, party: Account) -> bool:
        return self.authorized_parties.get(party, False)

    @external
    def get_supply_chain_stats(self) -> tuple[UInt64, Account]:
        return self.product_count.value, self.admin.value`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class SupplyChainTracking extends Contract {
  admin = GlobalStateKey<Address>();
  productCount = GlobalStateKey<uint64>();
  
  products = BoxMap<uint64, bytes>(); // product_id -> product_data
  productStatus = BoxMap<uint64, uint64>(); // 0: created, 1: shipped, 2: delivered
  productOwner = BoxMap<uint64, Address>();
  productLocation = BoxMap<uint64, bytes>();
  productTimestamp = BoxMap<uint64, uint64>();
  authorizedParties = BoxMap<Address, boolean>();

  createApplication(): void {
    this.admin.value = this.txn.sender;
    this.productCount.value = 0;
    this.authorizedParties(this.txn.sender).value = true;
  }

  authorizeParty(party: Address): void {
    assert(this.txn.sender === this.admin.value, 'Only admin can authorize parties');
    this.authorizedParties(party).value = true;
  }

  revokeAuthorization(party: Address): void {
    assert(this.txn.sender === this.admin.value, 'Only admin can revoke authorization');
    this.authorizedParties(party).value = false;
  }

  createProduct(productData: bytes, initialLocation: bytes): uint64 {
    assert(this.authorizedParties(this.txn.sender).value, 'Not authorized');
    
    const productId = this.productCount.value + 1;
    this.productCount.value = productId;
    
    this.products(productId).value = productData;
    this.productStatus(productId).value = 0; // Created
    this.productOwner(productId).value = this.txn.sender;
    this.productLocation(productId).value = initialLocation;
    this.productTimestamp(productId).value = globals.latestTimestamp;
    
    return productId;
  }

  updateLocation(productId: uint64, newLocation: bytes): void {
    assert(this.authorizedParties(this.txn.sender).value, 'Not authorized');
    assert(productId <= this.productCount.value, 'Invalid product ID');
    
    this.productLocation(productId).value = newLocation;
    this.productTimestamp(productId).value = globals.latestTimestamp;
  }

  transferOwnership(productId: uint64, newOwner: Address): void {
    assert(productId <= this.productCount.value, 'Invalid product ID');
    assert(this.txn.sender === this.productOwner(productId).value, 'Only current owner can transfer');
    assert(this.authorizedParties(newOwner).value, 'New owner not authorized');
    
    this.productOwner(productId).value = newOwner;
    this.productTimestamp(productId).value = globals.latestTimestamp;
  }

  updateStatus(productId: uint64, newStatus: uint64): void {
    assert(this.authorizedParties(this.txn.sender).value, 'Not authorized');
    assert(productId <= this.productCount.value, 'Invalid product ID');
    assert(newStatus <= 2, 'Invalid status');
    
    const currentStatus = this.productStatus(productId).value;
    assert(newStatus > currentStatus, 'Cannot downgrade status');
    
    this.productStatus(productId).value = newStatus;
    this.productTimestamp(productId).value = globals.latestTimestamp;
  }

  getProductInfo(productId: uint64): [bytes, uint64, Address, bytes, uint64] {
    assert(productId <= this.productCount.value, 'Invalid product ID');
    
    return [
      this.products(productId).value,
      this.productStatus(productId).value,
      this.productOwner(productId).value,
      this.productLocation(productId).value,
      this.productTimestamp(productId).value,
    ];
  }

  verifyAuthenticity(productId: uint64): boolean {
    assert(productId <= this.productCount.value, 'Invalid product ID');
    return this.products(productId).value.length > 0;
  }

  isAuthorized(party: Address): boolean {
    return this.authorizedParties(party).value;
  }

  getSupplyChainStats(): [uint64, Address] {
    return [this.productCount.value, this.admin.value];
  }
}

export default SupplyChainTracking;`,
    questions: [
      {
        question: "Who can create new products in the supply chain?",
        options: ["Anyone", "Only the admin", "Only authorized parties", "Only product owners"],
        correct: 2,
      },
      {
        question: "What happens when a product status is updated?",
        options: [
          "Status can be changed to any value",
          "Status can only be upgraded, not downgraded",
          "Status resets to created",
          "Status requires admin approval",
        ],
        correct: 1,
      },
      {
        question: "Who can transfer ownership of a product?",
        options: [
          "Anyone",
          "Only the admin",
          "Only the current owner to authorized parties",
          "Only authorized parties",
        ],
        correct: 2,
      },
      {
        question: "How is product authenticity verified?",
        options: [
          "By checking if product data exists",
          "By admin verification",
          "By owner confirmation",
          "By location tracking",
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "carbon-credits",
    title: "Carbon Credits Trading",
    description: "A marketplace for trading verified carbon credits with automatic verification and retirement",
    category: "Intermediate",
    difficulty: "Medium",
    icon: TrendingUp,
    python: `from puyapy import *

class CarbonCreditsTrading(Contract):
    def __init__(self) -> None:
        self.admin = GlobalState(Account, key="admin")
        self.verifier = GlobalState(Account, key="verifier")
        self.credit_count = GlobalState(UInt64, key="credit_count")
        self.total_retired = GlobalState(UInt64, key="total_retired")
        self.credits = BoxMap(UInt64, Bytes, key_prefix="credit")  # credit_id -> project_data
        self.credit_owner = BoxMap(UInt64, Account, key_prefix="owner")
        self.credit_amount = BoxMap(UInt64, UInt64, key_prefix="amount")  # tons of CO2
        self.credit_price = BoxMap(UInt64, UInt64, key_prefix="price")
        self.credit_verified = BoxMap(UInt64, bool, key_prefix="verified")
        self.credit_retired = BoxMap(UInt64, bool, key_prefix="retired")
        self.credit_for_sale = BoxMap(UInt64, bool, key_prefix="for_sale")

    @create
    def create(self, verifier: Account) -> None:
        self.admin.value = Txn.sender
        self.verifier.value = verifier
        self.credit_count.value = UInt64(0)
        self.total_retired.value = UInt64(0)

    @external
    def issue_credits(self, project_data: Bytes, amount: UInt64, recipient: Account) -> UInt64:
        assert Txn.sender == self.admin.value, "Only admin can issue credits"
        
        credit_id = self.credit_count.value + UInt64(1)
        self.credit_count.value = credit_id
        
        self.credits[credit_id] = project_data
        self.credit_owner[credit_id] = recipient
        self.credit_amount[credit_id] = amount
        self.credit_verified[credit_id] = False
        self.credit_retired[credit_id] = False
        self.credit_for_sale[credit_id] = False
        self.credit_price[credit_id] = UInt64(0)
        
        return credit_id

    @external
    def verify_credits(self, credit_id: UInt64) -> None:
        assert Txn.sender == self.verifier.value, "Only verifier can verify credits"
        assert credit_id <= self.credit_count.value, "Invalid credit ID"
        assert not self.credit_retired[credit_id], "Cannot verify retired credits"
        
        self.credit_verified[credit_id] = True

    @external
    def list_for_sale(self, credit_id: UInt64, price: UInt64) -> None:
        assert credit_id <= self.credit_count.value, "Invalid credit ID"
        assert Txn.sender == self.credit_owner[credit_id], "Only owner can list for sale"
        assert self.credit_verified[credit_id], "Credits must be verified"
        assert not self.credit_retired[credit_id], "Cannot sell retired credits"
        
        self.credit_for_sale[credit_id] = True
        self.credit_price[credit_id] = price

    @external
    def remove_from_sale(self, credit_id: UInt64) -> None:
        assert credit_id <= self.credit_count.value, "Invalid credit ID"
        assert Txn.sender == self.credit_owner[credit_id], "Only owner can remove from sale"
        
        self.credit_for_sale[credit_id] = False
        self.credit_price[credit_id] = UInt64(0)

    @external
    def buy_credits(self, credit_id: UInt64, payment: PaymentTransaction) -> None:
        assert credit_id <= self.credit_count.value, "Invalid credit ID"
        assert self.credit_for_sale[credit_id], "Credits not for sale"
        assert not self.credit_retired[credit_id], "Cannot buy retired credits"
        assert payment.amount >= self.credit_price[credit_id], "Insufficient payment"
        assert payment.receiver == Global.current_application_address, "Payment must go to contract"
        
        seller = self.credit_owner[credit_id]
        
        # Transfer payment to seller
        itxn.Payment(
            receiver=seller,
            amount=payment.amount,
        ).submit()
        
        # Transfer ownership
        self.credit_owner[credit_id] = payment.sender
        self.credit_for_sale[credit_id] = False
        self.credit_price[credit_id] = UInt64(0)

    @external
    def retire_credits(self, credit_id: UInt64) -> None:
        assert credit_id <= self.credit_count.value, "Invalid credit ID"
        assert Txn.sender == self.credit_owner[credit_id], "Only owner can retire credits"
        assert self.credit_verified[credit_id], "Credits must be verified"
        assert not self.credit_retired[credit_id], "Credits already retired"
        
        self.credit_retired[credit_id] = True
        self.credit_for_sale[credit_id] = False
        self.total_retired.value += self.credit_amount[credit_id]

    @external
    def get_credit_info(self, credit_id: UInt64) -> tuple[Bytes, Account, UInt64, UInt64, bool, bool, bool]:
        assert credit_id <= self.credit_count.value, "Invalid credit ID"
        
        return (
            self.credits[credit_id],
            self.credit_owner[credit_id],
            self.credit_amount[credit_id],
            self.credit_price[credit_id],
            self.credit_verified[credit_id],
            self.credit_retired[credit_id],
            self.credit_for_sale[credit_id],
        )

    @external
    def get_market_stats(self) -> tuple[UInt64, UInt64]:
        return self.credit_count.value, self.total_retired.value`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class CarbonCreditsTrading extends Contract {
  admin = GlobalStateKey<Address>();
  verifier = GlobalStateKey<Address>();
  creditCount = GlobalStateKey<uint64>();
  totalRetired = GlobalStateKey<uint64>();
  
  credits = BoxMap<uint64, bytes>(); // credit_id -> project_data
  creditOwner = BoxMap<uint64, Address>();
  creditAmount = BoxMap<uint64, uint64>(); // tons of CO2
  creditPrice = BoxMap<uint64, uint64>();
  creditVerified = BoxMap<uint64, boolean>();
  creditRetired = BoxMap<uint64, boolean>();
  creditForSale = BoxMap<uint64, boolean>();

  createApplication(verifier: Address): void {
    this.admin.value = this.txn.sender;
    this.verifier.value = verifier;
    this.creditCount.value = 0;
    this.totalRetired.value = 0;
  }

  issueCredits(projectData: bytes, amount: uint64, recipient: Address): void {
    assert(this.txn.sender === this.admin.value, 'Only admin can issue credits');
    
    const creditId = this.creditCount.value + 1;
    this.creditCount.value = creditId;
    
    this.credits(creditId).value = projectData;
    this.creditOwner(creditId).value = recipient;
    this.creditAmount(creditId).value = amount;
    this.creditVerified(creditId).value = false;
    this.creditRetired(creditId).value = false;
    this.creditForSale(creditId).value = false;
    this.creditPrice(creditId).value = 0;
    
    return creditId;
  }

  verifyCredits(creditId: uint64): void {
    assert(this.txn.sender === this.verifier.value, 'Only verifier can verify credits');
    assert(creditId <= this.creditCount.value, 'Invalid credit ID');
    assert(!this.creditRetired(creditId).value, 'Cannot verify retired credits');
    
    this.creditVerified(creditId).value = true;
  }

  listForSale(creditId: uint64, price: uint64): void {
    assert(creditId <= this.creditCount.value, 'Invalid credit ID');
    assert(this.txn.sender === this.creditOwner(creditId).value, 'Only owner can list for sale');
    assert(this.creditVerified(creditId).value, 'Credits must be verified');
    assert(!this.creditRetired(creditId).value, 'Cannot sell retired credits');
    
    this.creditForSale(creditId).value = true;
    this.creditPrice(creditId).value = price;
  }

  removeFromSale(creditId: uint64): void {
    assert(creditId <= this.creditCount.value, 'Invalid credit ID');
    assert(this.txn.sender === this.creditOwner(creditId).value, 'Only owner can remove from sale');
    
    this.creditForSale(creditId).value = false;
    this.creditPrice(creditId).value = 0;
  }

  buyCredits(creditId: uint64, payment: PayTxn): void {
    assert(creditId <= this.creditCount.value, 'Invalid credit ID');
    assert(this.creditForSale(creditId).value, 'Credits not for sale');
    assert(!this.creditRetired(creditId).value, 'Cannot buy retired credits');
    assert(payment.amount >= this.creditPrice(creditId).value, 'Insufficient payment');
    assert(payment.receiver === this.app.address, 'Payment must go to contract');
    
    const seller = this.creditOwner(creditId).value;
    
    // Transfer payment to seller
    sendPayment({
      to: seller,
      amount: payment.amount,
    });
    
    // Transfer ownership
    this.creditOwner(creditId).value = payment.sender;
    this.creditForSale(creditId).value = false;
    this.creditPrice(creditId).value = 0;
  }

  retireCredits(creditId: uint64): void {
    assert(creditId <= this.creditCount.value, 'Invalid credit ID');
    assert(this.txn.sender === this.creditOwner(creditId).value, 'Only owner can retire credits');
    assert(this.creditVerified(creditId).value, 'Credits must be verified');
    assert(!this.creditRetired(creditId).value, 'Credits already retired');
    
    this.creditRetired(creditId).value = true;
    this.creditForSale(creditId).value = false;
    this.totalRetired.value += this.creditAmount(creditId).value;
  }

  getCreditInfo(creditId: uint64): [bytes, Address, uint64, uint64, boolean, boolean, boolean] {
    assert(creditId <= this.creditCount.value, 'Invalid credit ID');
    
    return [
      this.credits(creditId).value,
      this.creditOwner(creditId).value,
      this.creditAmount(creditId).value,
      this.creditPrice(creditId).value,
      this.creditVerified(creditId).value,
      this.creditRetired(creditId).value,
      this.creditForSale(creditId).value,
    ];
  }

  getMarketStats(): [uint64, uint64] {
    return [this.creditCount.value, this.totalRetired.value];
  }
}

export default CarbonCreditsTrading;`,
    questions: [
      {
        question: "What must happen before carbon credits can be sold?",
        options: [
          "Only admin approval needed",
          "Credits must be verified by the designated verifier",
          "Credits must be retired first",
          "No requirements, can sell immediately",
        ],
        correct: 1,
      },
      {
        question: "What happens when carbon credits are retired?",
        options: [
          "They can still be traded",
          "They are permanently removed from circulation and cannot be sold",
          "They can only be sold to admin",
          "They become more valuable",
        ],
        correct: 1,
      },
      {
        question: "Who receives payment when carbon credits are purchased?",
        options: ["The contract", "The admin", "The current owner/seller", "The verifier"],
        correct: 2,
      },
      {
        question: "Who can issue new carbon credits?",
        options: ["Anyone", "Only the verifier", "Only the admin", "Only credit owners"],
        correct: 2,
      },
    ],
  },
  {
    id: "real-estate-tokenization",
    title: "Real Estate Tokenization",
    description: "Tokenize real estate properties with fractional ownership and rental income distribution",
    category: "Advanced",
    difficulty: "Hard",
    icon: ImageIcon,
    python: `from puyapy import *

class RealEstateTokenization(Contract):
    def __init__(self) -> None:
        self.property_owner = GlobalState(Account, key="owner")
        self.property_value = GlobalState(UInt64, key="value")
        self.total_tokens = GlobalState(UInt64, key="total_tokens")
        self.tokens_sold = GlobalState(UInt64, key="tokens_sold")
        self.token_price = GlobalState(UInt64, key="token_price")
        self.rental_pool = GlobalState(UInt64, key="rental_pool")
        self.last_distribution = GlobalState(UInt64, key="last_distribution")
        self.property_data = GlobalState(Bytes, key="property_data")
        self.token_balances = BoxMap(Account, UInt64, key_prefix="balance")
        self.claimed_dividends = BoxMap(Account, UInt64, key_prefix="claimed")

    @create
    def create(self, property_val: UInt64, total_supply: UInt64, price_per_token: UInt64, prop_data: Bytes) -> None:
        self.property_owner.value = Txn.sender
        self.property_value.value = property_val
        self.total_tokens.value = total_supply
        self.token_price.value = price_per_token
        self.property_data.value = prop_data
        self.tokens_sold.value = UInt64(0)
        self.rental_pool.value = UInt64(0)
        self.last_distribution.value = Global.latest_timestamp

    @external
    def buy_tokens(self, quantity: UInt64, payment: PaymentTransaction) -> None:
        assert quantity > UInt64(0), "Quantity must be positive"
        assert self.tokens_sold.value + quantity <= self.total_tokens.value, "Not enough tokens available"
        
        total_cost = quantity * self.token_price.value
        assert payment.amount >= total_cost, "Insufficient payment"
        assert payment.receiver == Global.current_application_address, "Payment must go to contract"
        
        # Transfer payment to property owner
        itxn.Payment(
            receiver=self.property_owner.value,
            amount=payment.amount,
        ).submit()
        
        # Update token balances
        self.token_balances[payment.sender] += quantity
        self.tokens_sold.value += quantity

    @external
    def transfer_tokens(self, to: Account, quantity: UInt64) -> None:
        assert quantity > UInt64(0), "Quantity must be positive"
        assert self.token_balances[Txn.sender] >= quantity, "Insufficient token balance"
        
        self.token_balances[Txn.sender] -= quantity
        self.token_balances[to] += quantity

    @external
    def add_rental_income(self, payment: PaymentTransaction) -> None:
        assert Txn.sender == self.property_owner.value, "Only property owner can add rental income"
        assert payment.receiver == Global.current_application_address, "Payment must go to contract"
        
        self.rental_pool.value += payment.amount

    @external
    def distribute_dividends(self) -> None:
        assert Txn.sender == self.property_owner.value, "Only property owner can distribute dividends"
        assert self.rental_pool.value > UInt64(0), "No rental income to distribute"
        
        self.last_distribution.value = Global.latest_timestamp
        # Note: In practice, this would trigger individual dividend calculations

    @external
    def claim_dividends(self) -> UInt64:
        user_tokens = self.token_balances[Txn.sender]
        assert user_tokens > UInt64(0), "No tokens owned"
        
        # Calculate user's share of rental income
        user_share = (self.rental_pool.value * user_tokens) // self.tokens_sold.value
        already_claimed = self.claimed_dividends.get(Txn.sender, UInt64(0))
        
        claimable = user_share - already_claimed
        assert claimable > UInt64(0), "No dividends to claim"
        
        self.claimed_dividends[Txn.sender] = user_share
        
        itxn.Payment(
            receiver=Txn.sender,
            amount=claimable,
        ).submit()
        
        return claimable

    @external
    def update_property_value(self, new_value: UInt64) -> None:
        assert Txn.sender == self.property_owner.value, "Only property owner can update value"
        self.property_value.value = new_value

    @external
    def get_token_info(self, user: Account) -> tuple[UInt64, UInt64, UInt64]:
        user_balance = self.token_balances.get(user, UInt64(0))
        user_claimed = self.claimed_dividends.get(user, UInt64(0))
        
        # Calculate pending dividends
        user_share = UInt64(0)
        if self.tokens_sold.value > UInt64(0):
            user_share = (self.rental_pool.value * user_balance) // self.tokens_sold.value
        
        pending_dividends = user_share - user_claimed
        
        return user_balance, user_claimed, pending_dividends

    @external
    def get_property_info(self) -> tuple[UInt64, UInt64, UInt64, UInt64, UInt64, Bytes]:
        return (
            self.property_value.value,
            self.total_tokens.value,
            self.tokens_sold.value,
            self.token_price.value,
            self.rental_pool.value,
            self.property_data.value,
        )`,
    typescript: `import { Contract } from '@algorandfoundation/tealscript';

class RealEstateTokenization extends Contract {
  propertyOwner = GlobalStateKey<Address>();
  propertyValue = GlobalStateKey<uint64>();
  totalTokens = GlobalStateKey<uint64>();
  tokensSold = GlobalStateKey<uint64>();
  tokenPrice = GlobalStateKey<uint64>();
  rentalPool = GlobalStateKey<uint64>();
  lastDistribution = GlobalStateKey<uint64>();
  propertyData = GlobalStateKey<bytes>();
  
  tokenBalances = BoxMap<Address, uint64>();
  claimedDividends = BoxMap<Address, uint64>();

  createApplication(propertyVal: uint64, totalSupply: uint64, pricePerToken: uint64, propData: bytes): void {
    this.propertyOwner.value = this.txn.sender;
    this.propertyValue.value = propertyVal;
    this.totalTokens.value = totalSupply;
    this.tokenPrice.value = pricePerToken;
    this.propertyData.value = propData;
    this.tokensSold.value = 0;
    this.rentalPool.value = 0;
    this.lastDistribution.value = globals.latestTimestamp;
  }

  buyTokens(quantity: uint64, payment: PayTxn): void {
    assert(quantity > 0, 'Quantity must be positive');
    assert(this.tokensSold.value + quantity <= this.totalTokens.value, 'Not enough tokens available');
    
    const totalCost = quantity * this.tokenPrice.value;
    assert(payment.amount >= totalCost, 'Insufficient payment');
    assert(payment.receiver === this.app.address, 'Payment must go to contract');
    
    // Transfer payment to property owner
    sendPayment({
      to: this.propertyOwner.value,
      amount: payment.amount,
    });
    
    // Update token balances
    this.tokenBalances(payment.sender).value += quantity;
    this.tokensSold.value += quantity;
  }

  transferTokens(to: Address, quantity: uint64): void {
    assert(quantity > 0, 'Quantity must be positive');
    assert(this.tokenBalances(this.txn.sender).value >= quantity, 'Insufficient token balance');
    
    this.tokenBalances(this.txn.sender).value -= quantity;
    this.tokenBalances(to).value += quantity;
  }

  addRentalIncome(payment: PayTxn): void {
    assert(this.txn.sender === this.propertyOwner.value, 'Only property owner can add rental income');
    assert(payment.receiver === this.app.address, 'Payment must go to contract');
    
    this.rentalPool.value += payment.amount;
  }

  distributeDividends(): void {
    assert(this.txn.sender === this.propertyOwner.value, 'Only property owner can distribute dividends');
    assert(this.rentalPool.value > 0, 'No rental income to distribute');
    
    this.lastDistribution.value = globals.latestTimestamp;
    // Note: In practice, this would trigger individual dividend calculations
  }

  claimDividends(): uint64 {
    const userTokens = this.tokenBalances(this.txn.sender).value;
    assert(userTokens > 0, 'No tokens owned');
    
    // Calculate user's share of rental income
    const userShare = (this.rentalPool.value * userTokens) / this.tokensSold.value;
    const alreadyClaimed = this.claimedDividends(this.txn.sender).value;
    
    const claimable = userShare - alreadyClaimed;
    assert(claimable > 0, 'No dividends to claim');
    
    this.claimedDividends(this.txn.sender).value = userShare;
    
    sendPayment({
      to: this.txn.sender,
      amount: claimable,
    });
    
    return claimable;
  }

  updatePropertyValue(newValue: uint64): void {
    assert(this.txn.sender === this.propertyOwner.value, 'Only property owner can update value');
    this.propertyValue.value = newValue;
  }

  getTokenInfo(user: Address): [uint64, uint64, uint64] {
    const userBalance = this.tokenBalances(user).value;
    const userClaimed = this.claimedDividends(user).value;
    
    // Calculate pending dividends
    let userShare = 0;
    if (this.tokensSold.value > 0) {
      userShare = (this.rentalPool.value * userBalance) / this.tokensSold.value;
    }
    
    const pendingDividends = userShare - userClaimed;
    
    return [userBalance, userClaimed, pendingDividends];
  }

  getPropertyInfo(): [uint64, uint64, uint64, uint64, uint64, bytes] {
    return [
      this.propertyValue.value,
      this.totalTokens.value,
      this.tokensSold.value,
      this.tokenPrice.value,
      this.rentalPool.value,
      this.propertyData.value,
    ];
  }
}

export default RealEstateTokenization;`,
    questions: [
      {
        question: "How are rental income dividends calculated for token holders?",
        options: [
          "Equal distribution to all holders",
          "Based on time of token purchase",
          "Proportional to number of tokens owned",
          "Fixed amount per token",
        ],
        correct: 2,
      },
      {
        question: "Who can add rental income to the pool?",
        options: ["Anyone", "Only token holders", "Only the property owner", "Only the contract admin"],
        correct: 2,
      },
      {
        question: "What happens when someone buys property tokens?",
        options: [
          "Payment goes to rental pool",
          "Payment goes to property owner and tokens are allocated",
          "Payment is held in escrow",
          "Tokens are minted automatically",
        ],
        correct: 1,
      },
      {
        question: "Can token holders transfer their tokens to others?",
        options: [
          "No, tokens are non-transferable",
          "Only with property owner approval",
          "Yes, freely transferable",
          "Only after holding for minimum period",
        ],
        correct: 2,
      },
    ],
  },
  {
    id: "age-storage",
    title: "Custom Age Initialization and Retrieval",
    description: "A smart contract that stores an age value at creation and allows anyone to retrieve it",
    category: "Beginner",
    difficulty: "Easy",
    icon: PackageOpen,
    python: `from puyapy import *


from algopy import ARC4Contract, GlobalState, UInt64
from algopy.arc4 import abimethod
class CustomCreate(ARC4Contract):
    def __init__(self) -> None:
        self.age = GlobalState(UInt64)

    @abimethod(create="require")
    def custom_create(self, age: UInt64) -> None:
        self.age.value = age

    @abimethod()
    def get_age(self) -> UInt64:
        return self.age.value`,
    typescript: `import { Contract, Uint64, GlobalState, arc4 } from '@algorandfoundation/algorand-typescript'
import type { uint64 } from '@algorandfoundation/algorand-typescript'

export default class CustomCreate extends Contract {
  public age = GlobalState<uint64>() // UInt64 with no default value

  @arc4.abimethod({ onCreate: 'require' })
  public custom_create(age: uint64): void {
    this.age.value = Uint64(age)
  }

  public getAge(): uint64 {
    return this.age.value
  }
}
export default CustomCreate;`,
    questions: [
      {
        question: "What is the main purpose of the CustomCreate smart contract?",
        options: [
          "To store and update a user's name",
          "To store an age value at creation and allow retrieval",
          "To transfer Algos between accounts",
          "To delete a stored value from global state",
        ],
        correct: 2,
      },
      {
        question: "Which decorator ensures that the custom_create method must be called during contract creation?",
        options: [
          "@external",
          "@arc4method",
          "@abimethod(create='require')",
          "@init",
        ],
        correct: 3,
      },
      {
        question: "What data type is used for the age variable in the contract?",
        options: [
          "String",
          "UInt64",
          "Bytes",
          "Int32",
        ],
        correct: 2,
      },
      {
        question: "What does the get_age method do?",
        options: [
          "Sets a new age value",
          "Deletes the age value",
          "Returns the current age value stored in global state",
          "Increments the age value by one",
        ],
        correct: 3,
      },
    ],
  },
  {
    id: "storing-managing-user-struct",
    title: "Storing and Managing User Structs with BoxMap",
    description: "A smart contract that efficiently stores, retrieves, and manages structured user data",
    category: "Intermediate",
    difficulty: "Medium",
    icon: ArchiveRestore,
    python: `from puyapy import *

from algopy import BoxMap, arc4

class UserStruct(arc4.Struct):
    name: arc4.String
    id: arc4.UInt64
    asset: arc4.UInt64


class StructInBoxMap(arc4.ARC4Contract):
    def __init__(self) -> None:
        self.user_map = BoxMap(arc4.UInt64, UserStruct, key_prefix="users")

    @arc4.abimethod
    def box_map_test(self) -> bool:
        key_0 = arc4.UInt64(0)
        value = UserStruct(arc4.String("testName"), arc4.UInt64(70), arc4.UInt64(2))

        self.user_map[key_0] = value.copy()
        assert self.user_map[key_0].bytes.length == value.bytes.length
        assert self.user_map.length(key_0) == value.bytes.length
        return True

    @arc4.abimethod
    def box_map_set(self, key: arc4.UInt64, value: UserStruct) -> bool:
        self.user_map[key] = value.copy()
        assert self.user_map[key] == value
        return True

    @arc4.abimethod
    def box_map_get(self, key: arc4.UInt64) -> UserStruct:
        return self.user_map[key]

    @arc4.abimethod
    def box_map_exists(self, key: arc4.UInt64) -> bool:
        return key in self.user_map`,
    typescript: `import { arc4, abimethod, Contract, uint64, Uint64, BoxMap } from '@algorandfoundation/algorand-typescript'
import { assert } from '@algorandfoundation/algorand-typescript'

class UserStruct extends arc4.Struct<{
  name: arc4.Str
  id: arc4.UintN64
  asset: arc4.UintN64
}> {}

export default class StructInBoxMap extends Contract {
  public userMap = BoxMap<uint64, UserStruct>({ keyPrefix: 'users' })

  @abimethod()
  public boxMapTest(): boolean {
    const key0 = Uint64(0)
    const value = new UserStruct({
      name: new arc4.Str('testName'),
      id: new arc4.UintN64(70),
      asset: new arc4.UintN64(2),
    })

    this.userMap(key0).value = value.copy()
    assert(this.userMap(key0).length === value.bytes.length, 'Length mismatch')
    assert(this.userMap(key0).length === value.bytes.length, 'Length mismatch')
    return true
  }

  @abimethod()
  public boxMapSet(key: uint64, value: UserStruct): boolean {
    this.userMap(key).value = value.copy()
    assert(this.userMap(key).value === value.copy(), 'Value mismatch')
    return true
  }

  @abimethod()
  public boxMapGet(key: uint64): UserStruct {
    return this.userMap(key).value
  }

  @abimethod()
  public boxMapExists(key: uint64): boolean {
    return this.userMap(key).exists
  }
}
  export default StructInBoxMap;`,
    questions: [
      {
        question: "What is the main purpose of the StructInBoxMap contract?",
        options: [
          "To transfer Algos between accounts",
          "To store and manage structured user data in Algorand boxes using a mapping",
          "To create and delete Algorand assets",
          "To manage global state variables only",
        ],
        correct: 2, 
      },
      {
        question: "What are the fields defined in the UserStruct structure?",
        options: [
          "name, age, balance",
          "username, id, asset",
          "name, id, asset",
          "address, asset, balance",
        ],
        correct: 3,
      },
      {
        question: "Which method would you use to check if a user exists in the box map?",
        options: [
          "box_map_set",
          "box_map_get",
          "box_map_exists",
          "box_map_test",
        ],
        correct: 3,
      },
      {
        question: "What does the box_map_set method do?",
        options: [
          "Retrieves a user struct from the map",
          "Checks if a key exists in the map",
          "Stores a copy of a user struct at a specified key in the map",
          "Deletes a user struct from the map",
        ],
        correct: 3,
      },
    ],
  },
  {
    id: "strict-self-payment-logicsig-contract",
    title: "Strict Self-Payment LogicSig Contract",
    description: "A stateless contract that only authorizes a zero-amount self-payment in a specific block and network for maximum security",
    category: "Intermediate",
    difficulty: "Medium",
    icon: Banknote,
    python: `from puyapy import *

from algopy import (
    Bytes,
    Global,
    TemplateVar,
    TransactionType,
    Txn,
    UInt64,
    logicsig,
    op,
)


@logicsig
def self_payment() -> bool:
    """
    This Delegated Account will authorize a single empty self payment in a block known ahead of time.
    """
    return (
        Txn.type_enum == TransactionType.Payment
        and Txn.receiver == Txn.sender
        and Txn.amount == 0
        and Txn.rekey_to == Global.zero_address
        and Txn.close_remainder_to == Global.zero_address
        and Txn.fee == Global.min_txn_fee
        and Global.genesis_hash == TemplateVar[Bytes]("TARGET_NETWORK_GENESIS")
        # Acquiring a lease with last_round and a non-empty lease field prevents replay attacks.
        and Txn.last_valid == TemplateVar[UInt64]("LAST_ROUND")
        and Txn.lease == op.sha256(b"self-payment")
    )`,
    typescript: `import {
  Global,
  TemplateVar,
  TransactionType,
  Txn,
  bytes,
  uint64,
  op,
  Bytes,
  LogicSig,
} from '@algorandfoundation/algorand-typescript'


export default class SelfPayment extends LogicSig {
  /**
   * This Contract Account authorizes a single empty self-payment transaction in a specific block.
   * The contract includes safety measures like lease and network validation to prevent replay attacks.
   * @returns True if the transaction should be approved
   */
  public program(): boolean {
    return (
      Txn.typeEnum === TransactionType.Payment &&
      Txn.receiver === Txn.sender &&
      Txn.amount === 0 &&
      Txn.rekeyTo === Global.zeroAddress &&
      Txn.closeRemainderTo === Global.zeroAddress &&
      Txn.fee === Global.minTxnFee &&
      Global.genesisHash === TemplateVar<bytes>('TARGET_NETWORK_GENESIS') &&
      // Acquiring a lease with last_round and a non-empty lease field prevents replay attacks
      Txn.lastValid === TemplateVar<uint64>('LAST_ROUND') &&
      Txn.lease === op.sha256(Bytes('self-payment'))
    )
  }
}
  export default SelfPayment;`,
    questions: [
      {
        question: "What type of transaction does the self_payment LogicSig contract authorize?",
        options: [
          "Asset transfer",
          "Payment from sender to receiver",
          "Zero-amount payment from sender to themselves",
          "Rekey transaction",
        ],
        correct: 3,
      },
      {
        question: "What is the purpose of the Txn.lease == op.sha256(b'self-payment') condition in the contract?",
        options: [
          "To ensure the transaction is a payment",
          "To prevent replay attacks",
          "To check the transaction fee",
          "To verify the receiver’s address",
        ],
        correct: 2,
      },
      {
        question: "Which field is used to restrict the transaction to a specific Algorand network?",
        options: [
          "Txn.type_enum",
          "Global.genesis_hash",
          "Txn.amount",
          "Txn.receiver",
        ],
        correct: 2,
      },
      {
        question: "What happens if the transaction tries to close out the account or rekey it?",
        options: [
          "The LogicSig will approve the transaction",
          "The LogicSig will reject the transaction",
          "The transaction will be sent to another account",
          "The transaction will be retried in the next block",
        ],
        correct: 2,
      },
    ],
  },
]

const categories = ["All", "Beginner", "Intermediate", "Advanced"]


export default function LearnPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [selectedContract, setSelectedContract] = useState<(typeof smartContractExamples)[0] | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false)

  const filteredExamples = smartContractExamples.filter((example) => {
    const categoryMatch = selectedCategory === "All" || example.category === selectedCategory
    if (!categoryMatch) return false;
    if (!searchTerm) return true;
    const lowerSearch = searchTerm.toLowerCase();
    return (
      example.title.toLowerCase().includes(lowerSearch) ||
      example.description.toLowerCase().includes(lowerSearch) ||
      example.id.toLowerCase().includes(lowerSearch)
    );
  });

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  const handleStartQuiz = (contract: (typeof smartContractExamples)[0]) => {
    setSelectedContract(contract)
    setShowQuiz(true)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setShowAnswerFeedback(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showAnswerFeedback) {
      setSelectedAnswer(answerIndex)
    }
  }

  const handleNextQuestion = () => {
    if (selectedAnswer !== null && !showAnswerFeedback) {
      setShowAnswerFeedback(true)
      if (selectedAnswer === selectedContract!.questions[currentQuestion].correct) {
        setScore(score + 1)
      }

      // Auto-advance after 2 seconds
      setTimeout(() => {
        if (currentQuestion + 1 < selectedContract!.questions.length) {
          setCurrentQuestion(currentQuestion + 1)
          setSelectedAnswer(null)
          setShowAnswerFeedback(false)
        } else {
          setShowResult(true)
        }
      }, 2000)
    }
  }

  const getScoreMessage = (score: number) => {
    switch (score) {
      case 1:
        return "No problem, try again!"
      case 2:
        return "Well Done"
      case 3:
        return "Wow, great understanding"
      case 4:
        return "Awesome, keep rocking!!!"
      default:
        return "Keep learning!"
    }
  }

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setShowAnswerFeedback(false)
  }

  const handleBackToContracts = () => {
    setSelectedContract(null)
    setShowQuiz(false)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setShowAnswerFeedback(false)
  }

  if (showQuiz && selectedContract) {
    if (showResult) {
      return (
        <div className="min-h-screen animated-gradient">
          <div className="container mx-auto px-4 pt-24 pb-16">
            <div className="max-w-2xl mx-auto">
              <Card className="glass-effect border-purple-500/20 p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center mx-auto mb-6">
                  <selectedContract.icon className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Quiz Complete!</h2>
                <p className="text-gray-300 mb-2">
                  You scored {score} out of {selectedContract.questions.length} questions correctly.
                </p>
                <p className="text-xl font-bold text-purple-300 mb-6">{getScoreMessage(score)}</p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={handleRetakeQuiz}
                    className="transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30"
                  >
                    Retake Quiz
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleBackToContracts}
                    className="transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30"
                  >
                    Back to Contracts
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )
    }

    const question = selectedContract.questions[currentQuestion]

    return (
      <div className="min-h-screen animated-gradient">
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-2xl mx-auto">
            <Card className="glass-effect border-purple-500/20 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{selectedContract.title}</h2>
                <Badge variant="outline" className="text-white border-white">
                  {currentQuestion + 1} / {selectedContract.questions.length}
                </Badge>
              </div>

              <h3 className="text-lg font-semibold text-white mb-6">{question.question}</h3>

              <div className="space-y-3 mb-8">
                {question.options.map((option, index) => {
                  let buttonClass =
                    "w-full p-4 text-left rounded-lg border transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30 "

                  if (showAnswerFeedback) {
                    if (index === question.correct) {
                      buttonClass += "border-green-500 bg-green-500/20 text-green-300"
                    } else if (index === selectedAnswer && index !== question.correct) {
                      buttonClass += "border-red-500 bg-red-500/20 text-red-300"
                    } else {
                      buttonClass += "border-gray-600 bg-gray-800/50 text-gray-300"
                    }
                  } else if (selectedAnswer === index) {
                    buttonClass += "border-purple-500 bg-purple-500/20 text-white"
                  } else {
                    buttonClass += "border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500"
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={buttonClass}
                      disabled={showAnswerFeedback}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBackToContracts}
                  className="transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30"
                >
                  Back to Contracts
                </Button>
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null || showAnswerFeedback}
                  className="transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30"
                >
                  {showAnswerFeedback ? "Loading..." : "Submit Answer"}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen animated-gradient">
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-16 fade-in">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="h-12 w-12 text-purple-400 mr-4" />
            <h1 className="text-5xl font-bold gradient-text">Learn Smart Contracts</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Master Algorand smart contract development with comprehensive examples in Python (Puya) and TypeScript
            (TEALScript). From beginner-friendly contracts to advanced DeFi protocols.
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search by name, description, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-lg bg-black/30 border-purple-500/20 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
            />
            <BookOpen className="absolute left-3 top-3 h-5 w-5 text-purple-400 pointer-events-none" />
          </div>
        </div>


        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-400 self-center mr-2">Category:</span>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30 ${
                  selectedCategory === category
                    ? "gradient-button"
                    : "border-purple-500/30 text-black hover:bg-purple-500/10 hover:text-purple-300"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredExamples.length > 0 ? (
            filteredExamples.map((example, index) => (
              <Card
                key={example.id}
                className="glass-effect border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <example.icon className="h-6 w-6 text-purple-300" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-xl">{example.title}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge
                          variant="outline"
                          className={
                            example.category === "Beginner"
                              ? "border-green-500/50 text-green-400"
                              : example.category === "Intermediate"
                                ? "border-yellow-500/50 text-yellow-400"
                                : "border-red-500/50 text-red-400"
                          }
                        >
                          {example.category}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            example.difficulty === "Easy"
                              ? "border-green-500/50 text-green-400"
                              : example.difficulty === "Medium"
                                ? "border-yellow-500/50 text-yellow-400"
                                : "border-red-500/50 text-red-400"
                          }
                        >
                          {example.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-gray-300 mt-3">{example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="python" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-black/40">
                    <TabsTrigger value="python" className="data-[state=active]:bg-purple-600">
                      Python (Puya)
                    </TabsTrigger>
                    <TabsTrigger value="typescript" className="data-[state=active]:bg-purple-600">
                      TypeScript
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="python" className="mt-4">
                    <div className="relative">
                      <ScrollArea className="h-64 w-full rounded-md border border-purple-500/20 bg-black/60 p-4">
                        <pre className="text-sm text-gray-300 font-mono">
                          <code>{example.python}</code>
                        </pre>
                      </ScrollArea>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 border-purple-500/30 hover:bg-purple-500/10 transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30"
                        onClick={() => copyToClipboard(example.python, `${example.id}-python`)}
                      >
                        {copiedCode === `${example.id}-python` ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="typescript" className="mt-4">
                    <div className="relative">
                      <ScrollArea className="h-64 w-full rounded-md border border-purple-500/20 bg-black/60 p-4">
                        <pre className="text-sm text-gray-300 font-mono">
                          <code>{example.typescript}</code>
                        </pre>
                      </ScrollArea>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 border-purple-500/30 hover:bg-purple-500/10 transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30"
                        onClick={() => copyToClipboard(example.typescript, `${example.id}-typescript`)}
                      >
                        {copiedCode === `${example.id}-typescript` ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
                <div className="mt-4">
                  <Button
                    onClick={() => handleStartQuiz(example)}
                    className="w-full transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30"
                  >
                    <Target className="mr-2 h-4 w-4" />
                    Take Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-purple-300 py-12">
            <p className="text-lg font-semibold">No smart contracts found!</p>
            <p className="text-gray-400">Try a different search term or select another category.</p>
          </div>
        )}
        </div>

        <div className="text-center mt-16">
          <Card className="glass-effect border-purple-500/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Build?</h3>
              <p className="text-gray-300 mb-6">
                Start building your own smart contracts on Algorand. Join our community and get help from experienced
                developers.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/bounties">
                  <Button className="gradient-button transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30">
                    Browse Bounties
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button
                    variant="outline"
                    className="border-[#ec0033] text-[#ec0033] hover:bg-[#ec0033] hover:text-white transition-all duration-200 hover:shadow-md hover:shadow-purple-500/30"
                  >
                    View Documentation
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}