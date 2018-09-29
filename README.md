# NewsTokenERC20_Auction
Solidity (Smart Contractauction)
 
This package of smart contracts contains logic for distribute ICO tokens by auction,
as it was implemented in EOS cryptocurrency.

Description of contracts:

Smart contract NewsToken.sol implements the basic logic for creating token(ERC20) News on Ethereum blockchain.
NewsToken contract also has a specific function for transfering bounty tokens, witch can use only owner of the bounty wallet (address defined in contract variable boutyWallet)

Smart contact NewsCrowdsale.sol implements the logic of selling the News token through an auction.
Throughout auction days users can send ether to address NewsCrowdsale contract, on the next day they can take from smart contract proportional number of tokens.

The contract "knows" that every day of the auction
should sell N amout of tokens and independently recalculate amount of tokens for each user who contributed ether on certain day.

For example, on the first auction day contract can sell 100 tokens. Alice send to contract 2 ether, and Bob send 3 ether.
(Totaly received 5 ether. All tokens for sale / ether received => 100 / 5 = 20, so 20 * 2 should go for Alice and 20 * 3 for Bob)
 The next day, Alice and Bob can execute smart contract function claim(uint day) or claimInterval (uint fromDay, uint toDay)
indicating one or several days when they participated in the auction, and smart contract automatically will calculate the amount tokens witch they must get.
(The contract contains methods that provide all the necessary information about the current day of the auction)

The function of burning all unsold tokens (if them exist) will be available after all auction days have passed.


Numbers (By default):


TotalSupply 175 000 000 News tokens.
15 000 000 tokens are transfer to the purse bouty for bounty companies.

Total 160 auction days. Every day creating 1 million tokens.
Auction days aren't follow one another. After every 10 auction days, there are 80 days off. These days smart contract will not allow send him Ether. Thus, smart contract will finish its work after 1360 days, when the last auction day will pass.

All these parameters can configured using contract variables
numOf_SalesDays 
numOf_AuctionDays
numOf_BreakDays

Instruction for  deploy smart contracts (For publication via Mist / EthereumWallet / MyEtherWallet / Remix):
NewsCrowdsale.sol should be published first. From published time auction will start after the number of days specified in numOf_BreakDays.
Then you need to copy address NewsCrowdsale contract. When u deploy NewsToken.sol insert address NewsCrowdsale into contract cosntructor.
Next, copy NewsToken address. Invoke function SetTokenAddress in NewsCrowdsale contract and passing NewsToken address in buffer as
function parameter.
After all, you need to invoke initStartAuctionDays method, and then initEndsAuctionDays.

P.S. Such a complicated sequence of actions is caused by the fact that there is a limited amount of gas in the Ethereum network, which
smart contract can be used in one transaction. Since GasLimit per block is 8 million gas, it is better to make transaction witch not more than half; 4mln. gas per transaction. So the situation, when one contract deployed another contract - excluded.

