const NewsToken = artifacts.require("./NewsToken.sol");
const Crowdsale = artifacts.require("./NewsCrowdsale.sol");

contract ('Crowdsale_base_test', function(accounts) {
    var [deployer, investor1, investor2, investor3] = web3.eth.accounts;

    let token;
    let crowdsale;  

    DECIMALS = 10**12;
    
    describe('Token_test', async () => {
        it('Should be able to create Token', async() => {
            crowdsale = await Crowdsale.new(); 
            token = await NewsToken.new(crowdsale.address); 

            let tokenName = await token.name();
            let tokenSymbol = await token.symbol();
            let tokenDecimals = await token.decimals();

            assert.equal(String(tokenName), "NewsToken");
            assert.equal(String(tokenSymbol), "NEWS");
            assert.equal(tokenDecimals.toNumber(), 12);
        });
        
        it('Should return correct totalSupply', async () => {
            let totalSup = await token.totalSupply();
            assert.equal(totalSup.toNumber(),  175000000 * DECIMALS);
        });

        it('Should return correct balanc bountyWallet and Crowdsale address', async () => {
            let saleAgentBalance = await token.balanceOf(crowdsale.address);
            assert.equal(saleAgentBalance, 160000000 * DECIMALS);
        });  
    });
});