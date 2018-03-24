const ether = require("./helpers/ether.js");

const NewsToken = artifacts.require("./NewsToken.sol");
const CrowdsaleTest = artifacts.require("./TESTNewsCrowdsale.sol");

contract ('Crowdsale_test', function(accounts) {
    var [deployer, investor1, investor2, investor3] = web3.eth.accounts;

    let token;
    let crowdsaleTest;   

    beforeEach(async function() {
        crowdsaleTest = await CrowdsaleTest.new(); 
        token = await NewsToken.new(crowdsaleTest.address); 

        await crowdsaleTest.setTokenAddress(token.address); 
    });

    describe('UserContribution_test', function() {  

        it ('Should give correctly amount of tokens to users (contribut value < 1 ether)', async() => { 
            await crowdsaleTest.testSetUserContribut(1, {from: investor1, value: ether(0.005)});  
            await crowdsaleTest.testSetUserContribut(1, {from: investor2, value: ether(0.01)});
 
            await crowdsaleTest.testSetUserContribut(2, {from: investor1, value: ether(0.0007)});
            await crowdsaleTest.testSetUserContribut(2, {from: investor2, value: ether(0.006)}); 
             
            await crowdsaleTest.testClaimInterval(1, 2, {from: investor1});
            await crowdsaleTest.testClaimInterval(1, 2, {from: investor2});

            let investor1Balance = await token.balanceOf(investor1);
            let investor2Balance = await token.balanceOf(investor2);

             assert.equal(437810945273631840, investor1Balance.toNumber());
             assert.equal(1562189054726368158, investor2Balance.toNumber());
        });

        it ('Should give correctly amount of tokens to users (contribut value > 1 ether)', async() => { 
            await crowdsaleTest.testSetUserContribut(45, {from: investor1, value: ether(3.5)});  
            await crowdsaleTest.testSetUserContribut(45, {from: investor2, value: ether(0.038)});
 
            await crowdsaleTest.testSetUserContribut(69, {from: investor1, value: ether(0.07)});
            await crowdsaleTest.testSetUserContribut(69, {from: investor2, value: ether(0.5)}); 
            await crowdsaleTest.testSetUserContribut(69, {from: investor2, value: ether(0.5)}); 
            await crowdsaleTest.testSetUserContribut(69, {from: investor2, value: ether(0.02)}); 
              
            await crowdsaleTest.testClaimInterval(44, 70, {from: investor1});
            await crowdsaleTest.testClaimInterval(44, 70, {from: investor2});

            let investor1Balance = await token.balanceOf(investor1);
            let investor2Balance = await token.balanceOf(investor2);

             assert.equal(1053479652112581098, investor1Balance.toNumber());
             assert.equal(946520347887418900, investor2Balance.toNumber());
        }); 
    });
});
 