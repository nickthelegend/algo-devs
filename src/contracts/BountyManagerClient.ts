import algosdk from "algosdk"

// Type definitions
export interface BountyManagerState {
  totalBounties: number
  activeBounties: number
  totalRewards: number
  platformFee: number
}

export interface BountyInfo {
  id: number
  creator: string
  title: string
  reward: number
  deadline: number
  isActive: boolean
  appId: number
}

// Bounty Manager Client
export class BountyManagerClient {
  private algodClient: algosdk.Algodv2
  private appId: number

  constructor(algodClient: algosdk.Algodv2, appId: number) {
    this.algodClient = algodClient
    this.appId = appId
  }

  async getManagerState(): Promise<BountyManagerState> {
    try {
      // Mock implementation - replace with actual contract call
      return {
        totalBounties: 150,
        activeBounties: 45,
        totalRewards: 50000000, // 50 ALGO in microAlgos
        platformFee: 250, // 2.5% in basis points
      }
    } catch (error) {
      console.error("Error fetching manager state:", error)
      throw error
    }
  }

  async getAllBounties(): Promise<BountyInfo[]> {
    try {
      // Mock implementation - replace with actual contract call
      return [
        {
          id: 1,
          creator: "ALGO123...",
          title: "Smart Contract Audit",
          reward: 5000000,
          deadline: Date.now() + 604800000, // 7 days
          isActive: true,
          appId: 12345,
        },
        {
          id: 2,
          creator: "ALGO456...",
          title: "DeFi Protocol Development",
          reward: 10000000,
          deadline: Date.now() + 1209600000, // 14 days
          isActive: true,
          appId: 12346,
        },
      ]
    } catch (error) {
      console.error("Error fetching bounties:", error)
      throw error
    }
  }

  async getActiveBounties(): Promise<BountyInfo[]> {
    try {
      const allBounties = await this.getAllBounties()
      return allBounties.filter((bounty) => bounty.isActive)
    } catch (error) {
      console.error("Error fetching active bounties:", error)
      throw error
    }
  }

  async getBountiesByCreator(creator: string): Promise<BountyInfo[]> {
    try {
      const allBounties = await this.getAllBounties()
      return allBounties.filter((bounty) => bounty.creator === creator)
    } catch (error) {
      console.error("Error fetching bounties by creator:", error)
      throw error
    }
  }

  async registerBounty(bountyAppId: number, creator: string): Promise<string> {
    try {
      const suggestedParams = await this.algodClient.getTransactionParams().do()

      const appArgs = [
        new Uint8Array(Buffer.from("register_bounty")),
        algosdk.encodeUint64(bountyAppId),
        new Uint8Array(Buffer.from(creator)),
      ]

      const txn = algosdk.makeApplicationCallTxnFromObject({
        from: creator,
        appIndex: this.appId,
        onComplete: algosdk.OnApplicationComplete.NoOpOC,
        appArgs,
        suggestedParams,
      })

      // Return mock transaction ID
      return "TXN_REGISTER_123..."
    } catch (error) {
      console.error("Error registering bounty:", error)
      throw error
    }
  }

  async updatePlatformFee(newFee: number, admin: string): Promise<string> {
    try {
      const suggestedParams = await this.algodClient.getTransactionParams().do()

      const appArgs = [new Uint8Array(Buffer.from("update_fee")), algosdk.encodeUint64(newFee)]

      const txn = algosdk.makeApplicationCallTxnFromObject({
        from: admin,
        appIndex: this.appId,
        onComplete: algosdk.OnApplicationComplete.NoOpOC,
        appArgs,
        suggestedParams,
      })

      // Return mock transaction ID
      return "TXN_UPDATE_FEE_123..."
    } catch (error) {
      console.error("Error updating platform fee:", error)
      throw error
    }
  }

  async getStatistics(): Promise<{
    totalBounties: number
    activeBounties: number
    completedBounties: number
    totalRewardsPaid: number
    averageReward: number
  }> {
    try {
      const state = await this.getManagerState()
      const allBounties = await this.getAllBounties()

      const completedBounties = allBounties.filter((b) => !b.isActive).length
      const totalRewardsPaid = allBounties.filter((b) => !b.isActive).reduce((sum, b) => sum + b.reward, 0)

      const averageReward =
        allBounties.length > 0 ? allBounties.reduce((sum, b) => sum + b.reward, 0) / allBounties.length : 0

      return {
        totalBounties: state.totalBounties,
        activeBounties: state.activeBounties,
        completedBounties,
        totalRewardsPaid,
        averageReward,
      }
    } catch (error) {
      console.error("Error fetching statistics:", error)
      throw error
    }
  }
}

// Export everything
export default BountyManagerClient
