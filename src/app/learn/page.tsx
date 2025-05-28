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
]

const categories = ["All", "Beginner", "Intermediate", "Advanced"]

export default function LearnPage() {
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
    return categoryMatch
  })

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
          {filteredExamples.map((example, index) => (
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
          ))}
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