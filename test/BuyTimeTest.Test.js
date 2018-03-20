const NewsToken = artifacts.require("./NewsToken.sol");
const CrowdsaleTest = artifacts.require("./TESTNewsCrowdsale.sol");

contract ('Crowdsale_test2', function(accounts) {
   // var [deployer, investor1, investor2, investor3] = web3.eth.accounts;

    let token;
    let crowdsaleTest;
    let ether = 1000000000000000000;
    describe('Buy time ', function() { 
        
        it('Try to buy on break', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
            await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();

            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10});
                console.log("FAIL!");
            } catch(error) {
                console.log(error.name + " " + error.message);
            }
        }); 

        
        it('Try to buy on break (with update time)', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
            await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(60);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10});
                console.log("FAIL!");
            } catch(error) {
                console.log(error.name + " " + error.message);
            }
        }); 

        it('Try to buy on break (with update time)_2', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
            await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(1);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10});
                console.log("FAIL!");
            } catch(error) {
                console.log(error.name + " " + error.message);
            }
        }); 

        it('Try to buy after auction (with update time)_1', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
            await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(95);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10});
                console.log("FAIL!");
            } catch(error) {
                console.log(error.name + " " + error.message);
            }
        }); 

        it('Try to buy after auction (with update time)_2', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
            await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(95);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10});
                console.log("FAIL!");
            } catch(error) {
                console.log(error.name + " " + error.message);
            }
        }); 

        it('Try to buy on auction', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
            await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(81);
            await crowdsaleTest.buy({from: accounts[0], value: 10});
        }); 

        it('Try to buy on 1 auction', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
            await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(80);
            for(var i = 80; i < 90 ; i++) {
            await crowdsaleTest.updateTime(i);    
            await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        }); 

        it('Try to buy on 2 auction', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
            await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(80);
            for(var i = 170; i < 180 ; i++) {
                await crowdsaleTest.updateTime(i);   
            await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });

        it('Try to buy on 3 auction', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
            await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(80);
            for(var i = 260; i < 270 ; i++) {
                await crowdsaleTest.updateTime(i); 
            await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });

        it('Try to buy on 4 auction', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
            await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(80);
            for(var i = 350; i < 360 ; i++) {
                await crowdsaleTest.updateTime(i);  
            await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });

        it('Try to buy on last auction', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
            await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(80);
            for(var i = 1430; i < 1440 ; i++) {
                await crowdsaleTest.updateTime(i);    
            await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });

      
        it('Try to buy after 1 auction', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
            await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(95);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10});
                console.log("FAIL!");
            } catch(error) {
                console.log(error.name + " " + error.message);
            }
        });      
        
        it('Try to buy after 2 auction', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
            await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(181);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10});
                console.log("FAIL!");
            } catch(error) {
                console.log(error.name + " " + error.message);
            }
        }); 

        it('Try to buy after 3 auction', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
           await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(271);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10});
                console.log("FAIL!");
            } catch(error) {
                console.log(error.name + " " + error.message);
            }
        }); 


        it('Try to buy after 4 auction', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
             await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(361);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10});
                console.log("FAIL!");
            } catch(error) {
                console.log(error.name + " " + error.message);
            }
        }); 

        it('Try to buy after 5 auction', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
             await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(451);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10});
                console.log("FAIL!");
            } catch(error) {
                console.log(error.name + " " + error.message);
            }
        }); 

       

        it('Try to buy after 6 auction', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
             await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(541);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10});
                console.log("FAIL!");
            } catch(error) {
                console.log(error.name + " " + error.message);
            }
        }); 

       
        it('Try to buy after 7 auction', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
             await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(631);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10});
                console.log("FAIL!");
            } catch(error) {
                console.log(error.name + " " + error.message);
            }
        }); 

     

        it('Try to buy after 8 auction', async() => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
             await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(721);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10});
                console.log("FAIL!");
            } catch(error) {
                console.log(error.name + " " + error.message);
            }
        }); 
    
        it('Claim at the time allowed ', async()=>{
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
             await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(81);
            await crowdsaleTest.buy({from: accounts[0], value: 1000});
            await crowdsaleTest.updateTime(81);
            await crowdsaleTest.testClaim(1);
        });

        
        it('Claim at the time that not allowed ', async()=>{
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
             await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(85);
            await crowdsaleTest.buy({from: accounts[0], value: 1000});
            try{
            await crowdsaleTest.claim(6);
            console.log("FAIL!");
            } catch(error) {
                console.log(error.name + " " + error.message);
            }
        });

         
        it('Claim at the time that not allowed (without buy)', async()=>{
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
            await crowdsaleTest.setTokenAddress(token.address);
             await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
            await crowdsaleTest.updateTime(85);
            try{
            await crowdsaleTest.claim(6);
            console.log("Yep!");
            } catch(error) {
                console.log(error.name + " " + error.message);
            }
        });
        
    });
});