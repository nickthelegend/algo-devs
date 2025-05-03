import { Contract } from '@algorandfoundation/tealscript';


export class Bounty extends Contract {


    bountyTitle= GlobalStateKey<string>();
    bountyCid = GlobalStateKey<string>();

    bountyOrganization =GlobalStateKey<string>();
    reward = GlobalStateKey<uint64>();
    winner = GlobalStateKey<Address>();
    expiryDate = GlobalStateKey<uint64>();

    createApplication(title: string,cfid: string,bountyOrganization: string,expiryDate : uint64): void {

        
        this.bountyTitle.value = title;
this.bountyCid.value = cfid;
this.bountyOrganization.value = bountyOrganization
this.expiryDate.value = expiryDate

      }

depositReward (rewardTxn: PayTxn){

assert(
    this.txn.sender == this.app.creator
)

verifyPayTxn(rewardTxn,
    {
        receiver: this.app.address
    })

this.reward.value = rewardTxn.amount



}


setWinner(winner: Address){

    assert(
        this.txn.sender == this.app.creator
    );

    this.winner.value= winner;


}

sendReward(){

    assert(
        this.txn.sender == this.app.creator
    )

    sendPayment({
        receiver: this.winner.value,
        amount: this.reward.value,
      });
}

   



}

