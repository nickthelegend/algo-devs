import algosdk from "algosdk"

// Type definitions
export interface BountyState {
  creator: string
  title: string
  description: string
  reward: number
  deadline: number
  isActive: boolean
  submissions: number
  winner?: string
}

export interface CreateBountyParams {
  title: string
  description: string
  reward: number
  deadline: number
}

export interface SubmitSolutionParams {
  bountyId: number
  solution: string
  submitter: string
}

// Bounty Factory Client
export class BountyFactory {
  private algodClient: algosdk.Algodv2
  private appId: number

  constructor(algodClient: algosdk.Algodv2, appId: number) {
    this.algodClient = algodClient
    this.appId = appId
  }

  async createBounty(params: CreateBountyParams, sender: string): Promise<number> {
    try {
      const suggestedParams = await this.algodClient.getTransactionParams().do()

      const appArgs = [
        new Uint8Array(Buffer.from("create_bounty")),
        new Uint8Array(Buffer.from(params.title)),
        new Uint8Array(Buffer.from(params.description)),
        algosdk.encodeUint64(params.reward),
        algosdk.encodeUint64(params.deadline),
      ]

      const txn = algosdk.makeApplicationCallTxnFromObject({
        from: sender,
        appIndex: this.appId,
        onComplete: algosdk.OnApplicationComplete.NoOpOC,
        appArgs,
        suggestedParams,
      })

      // Return mock bounty ID for now
      return Math.floor(Math.random() * 1000000)
    } catch (error) {
      console.error("Error creating bounty:", error)
      throw error
    }
  }

  async getBounties(): Promise<BountyState[]> {
    try {
      // Mock implementation - replace with actual contract call
      return [
        {
          creator: "ALGO123...",
          title: "Sample Bounty",
          description: "This is a sample bounty",
          reward: 1000000, // 1 ALGO in microAlgos
          deadline: Date.now() + 86400000, // 24 hours from now
          isActive: true,
          submissions: 0,
        },
      ]
    } catch (error) {
      console.error("Error fetching bounties:", error)
      throw error
    }
  }
}

// Individual Bounty Client
export class BountyClient {
  private algodClient: algosdk.Algodv2
  private appId: number

  constructor(algodClient: algosdk.Algodv2, appId: number) {
    this.algodClient = algodClient
    this.appId = appId
  }

  async getBountyState(): Promise<BountyState> {
    try {
      // Mock implementation - replace with actual contract call
      return {
        creator: "ALGO123...",
        title: "Sample Bounty",
        description: "This is a sample bounty",
        reward: 1000000,
        deadline: Date.now() + 86400000,
        isActive: true,
        submissions: 0,
      }
    } catch (error) {
      console.error("Error fetching bounty state:", error)
      throw error
    }
  }

  async submitSolution(params: SubmitSolutionParams, sender: string): Promise<string> {
    try {
      const suggestedParams = await this.algodClient.getTransactionParams().do()

      const appArgs = [
        new Uint8Array(Buffer.from("submit_solution")),
        algosdk.encodeUint64(params.bountyId),
        new Uint8Array(Buffer.from(params.solution)),
        new Uint8Array(Buffer.from(params.submitter)),
      ]

      const txn = algosdk.makeApplicationCallTxnFromObject({
        from: sender,
        appIndex: this.appId,
        onComplete: algosdk.OnApplicationComplete.NoOpOC,
        appArgs,
        suggestedParams,
      })

      // Return mock transaction ID
      return "TXN123..."
    } catch (error) {
      console.error("Error submitting solution:", error)
      throw error
    }
  }

  async selectWinner(submissionId: string, sender: string): Promise<string> {
    try {
      const suggestedParams = await this.algodClient.getTransactionParams().do()

      const appArgs = [new Uint8Array(Buffer.from("select_winner")), new Uint8Array(Buffer.from(submissionId))]

      const txn = algosdk.makeApplicationCallTxnFromObject({
        from: sender,
        appIndex: this.appId,
        onComplete: algosdk.OnApplicationComplete.NoOpOC,
        appArgs,
        suggestedParams,
      })

      // Return mock transaction ID
      return "TXN456..."
    } catch (error) {
      console.error("Error selecting winner:", error)
      throw error
    }
  }

  async closeBounty(sender: string): Promise<string> {
    try {
      const suggestedParams = await this.algodClient.getTransactionParams().do()

      const appArgs = [new Uint8Array(Buffer.from("close_bounty"))]

      const txn = algosdk.makeApplicationCallTxnFromObject({
        from: sender,
        appIndex: this.appId,
        onComplete: algosdk.OnApplicationComplete.NoOpOC,
        appArgs,
        suggestedParams,
      })

      // Return mock transaction ID
      return "TXN789..."
    } catch (error) {
      console.error("Error closing bounty:", error)
      throw error
    }
  }
}

// Export everything
export default { BountyFactory, BountyClient }
