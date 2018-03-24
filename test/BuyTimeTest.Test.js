const NewsToken = artifacts.require("./NewsToken.sol");
const CrowdsaleTest = artifacts.require("./TESTNewsCrowdsale.sol");

contract ('Crowdsale_test', function(accounts) { 
    let token;
    let decimals = 10**12;
    let crowdsaleTest; 
    
    before(async function() {
        crowdsaleTest = await CrowdsaleTest.new(); 
        token = await NewsToken.new(crowdsaleTest.address); 

        await crowdsaleTest.setTokenAddress(token.address);
        await crowdsaleTest.initStartAuctionDays();
        await crowdsaleTest.initEndsAuctionDays();
    });
 
    describe('Buy_time_test', function() { 
        
        it('Should throw error if try to buy on break', async() => {  
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10}); 
            } catch(error) { return true; }
            throw new Error('transaction should failed!'); 
        }); 

        
        it('Should throw error if try to buy on break (with update time)', async() => { 
            await crowdsaleTest.updateTime(1);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10}); 
            } catch(error) { return true; }
            throw new Error('transaction should failed!'); 
        }); 

        it('Should throw error if try to buy on break (with update time)_2', async() => { 
            await crowdsaleTest.updateTime(79);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10}); 
            } catch(error) { return true; }
            throw new Error('transaction should failed!'); 
        }); 

        it('Should throw error if try to buy after auction (with update time)_1', async() => { 
            await crowdsaleTest.updateTime(91);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10}); 
            } catch(error) { return true; }
            throw new Error('transaction should failed!'); 
        }); 

        it('Try to buy after auction (with update time)_2', async() => { 
            await crowdsaleTest.updateTime(99);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10}); 
            } catch(error) { return true; }
            throw new Error('transaction should failed!'); 
        }); 

        it('Try to buy on 1 auction', async() => {  
            for(var i = 80; i < 90 ; i++) {
                await crowdsaleTest.updateTime(i);    
                await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        }); 

        it('Try to buy on 2 auction', async() => {  
            for(var i = 170; i < 180 ; i++) {
                await crowdsaleTest.updateTime(i);   
                await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });

        it('Try to buy on 3 auction', async() => {  
            for(var i = 260; i < 270 ; i++) {
                await crowdsaleTest.updateTime(i); 
                await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });

        it('Try to buy on 4 auction', async() => {  
            for(var i = 350; i < 360 ; i++) {
                await crowdsaleTest.updateTime(i);  
                await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });

        it('Try to buy on 5 auction', async() => {  
            for(var i = 440; i < 450 ; i++) {
                await crowdsaleTest.updateTime(i);  
                await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });

        it('Try to buy on 6 auction', async() => {  
            for(var i = 530; i < 540 ; i++) {
                await crowdsaleTest.updateTime(i);  
                await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });

        it('Try to buy on 7 auction', async() => {  
            for(var i = 620; i < 630 ; i++) {
                await crowdsaleTest.updateTime(i);  
                await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });

        it('Try to buy on 8 auction', async() => {  
            for(var i = 710; i < 720 ; i++) {
                await crowdsaleTest.updateTime(i);  
                await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });

        it('Try to buy on 9 auction', async() => {  
            for(var i = 800; i < 810 ; i++) {
                await crowdsaleTest.updateTime(i);  
                await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });

        it('Try to buy on 10 auction', async() => {  
            for(var i = 890; i < 900 ; i++) {
                await crowdsaleTest.updateTime(i);  
                await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });

        it('Try to buy on 11 auction', async() => {  
            for(var i = 980; i < 990 ; i++) {
                await crowdsaleTest.updateTime(i);  
                await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });

        it('Try to buy on 12 auction', async() => {  
            for(var i = 1070; i < 1080 ; i++) {
                await crowdsaleTest.updateTime(i);  
                await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });

        it('Try to buy on 13 auction', async() => {  
            for(var i = 1160; i < 1170 ; i++) {
                await crowdsaleTest.updateTime(i);  
                await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });

        it('Try to buy on 14 auction', async() => {  
            for(var i = 1250; i < 1260 ; i++) {
                await crowdsaleTest.updateTime(i);  
                await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });

        
        it('Try to buy on 15 auction', async() => {  
            for(var i = 1340; i < 1350 ; i++) {
                await crowdsaleTest.updateTime(i);  
                await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });

        it('Try to buy on last auction', async() => {  
            for(var i = 1430; i < 1440 ; i++) {
                await crowdsaleTest.updateTime(i);    
                await crowdsaleTest.buy({from: accounts[0], value: 10});
            }
        });
 
 
        it('Throw error when try to buy after 1 auction', async() => { 
            await crowdsaleTest.updateTime(91);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10}); 
            } catch(error) { return true; }
            throw new Error('transaction should failed!'); 
        });      
        
        it('Throw error when try to buy after 2 auction', async() => { 
            await crowdsaleTest.updateTime(259);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10}); 
            } catch(error) { return true; }
            throw new Error('transaction should failed!'); 
        });  
  
        it('Throw error when try to buy after 8 auction', async() => { 
            await crowdsaleTest.updateTime(721);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10}); 
            } catch(error) { return true; }
            throw new Error('transaction should failed!'); 
        });  

        it('Throw error when try to buy after 16 auction', async() => { 
            await crowdsaleTest.updateTime(1441);
            try{
                await crowdsaleTest.buy({from: accounts[0], value: 10}); 
            } catch(error) { return true; }
            throw new Error('transaction should failed!'); 
        });
    });

    describe('ClaimAll', function() {
        it('redeploy', async () => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 

            await crowdsaleTest.setTokenAddress(token.address);
            await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
        });
            it('inadequate interval (start > end)', async()=>{
                await crowdsaleTest.updateTime(11);
                try{
                    await crowdsaleTest.claimInterval(10,2);
                    console.log("Fail");
                } catch(error) { return true; }
                throw new Error('transaction should failed!'); 
            });
    
            it('inadequate interval (start == 0)', async()=>{
                await crowdsaleTest.updateTime(3);
                try{
                    await crowdsaleTest.claimInterval(0,2);
                    console.log("Fail");
                } catch(error) { return true; }
                throw new Error('transaction should failed!'); 
            });
    
            it('inadequate interval (start == end)', async()=>{
                await crowdsaleTest.updateTime(11);
                try{
                    await crowdsaleTest.claimInterval(10,10);
                    console.log("Fail");
                } catch(error) { return true; }
                throw new Error('transaction should failed!'); 
            });
    
            it('inadequate interval (start < 0)', async()=>{
                await crowdsaleTest.updateTime(3);
                try{
                    await crowdsaleTest.claimInterval(-1,2);
                    console.log("Fail");
                } catch(error) { return true; }
                throw new Error('transaction should failed!'); 
            });

        it('redeploy', async () => {
            crowdsaleTest = await CrowdsaleTest.new(); 
            token = await NewsToken.new(crowdsaleTest.address); 
    
            await crowdsaleTest.setTokenAddress(token.address);
            await crowdsaleTest.initStartAuctionDays();
            await crowdsaleTest.initEndsAuctionDays();
        });
            it('Correct interval (start == 1; end == 160)', async()=>{
                await crowdsaleTest.updateTime(161);
                await crowdsaleTest.claimInterval(1,160);
            });
    
            it('check output', async()=>{
                let balance = await token.balanceOf(accounts[0]);
                
                assert.equal(balance, 0);
    
                await crowdsaleTest.updateTime(80);
                await crowdsaleTest.buy({from: accounts[0], value: 10000});
    
                await crowdsaleTest.updateTime(85);
                await crowdsaleTest.buy({from: accounts[0], value: 10000});
    
                await crowdsaleTest.updateTime(445);
                await crowdsaleTest.buy({from: accounts[0], value: 10000});
                
                await crowdsaleTest.updateTime(447);
                await crowdsaleTest.claimInterval(1,46);
    
                let Newbalance = await token.balanceOf(accounts[0]);
                assert.equal(Newbalance, 3000000 * decimals);
                
            }); 
        });

    describe ('Burn_test', function() {
        it('Should throw error when try burn all tokens before auction ends', async() => {
            await crowdsaleTest.updateTime(1440);
            try{
                await crowdsaleTest.burnAllUnsoldTokens(); 
            } catch(error) { return true; }
            throw new Error('transaction should failed!'); 
        });

        it('Should throw error when try burn all tokens before passed 90 days', async() => {
            await crowdsaleTest.updateTime(1445);
            try{
                await crowdsaleTest.burnAllUnsoldTokens(); 
            } catch(error) { return true; }
            throw new Error('transaction should failed!'); 
        }); 

        it('Should burn all tokens after passed 90 days', async() => {
            await crowdsaleTest.updateTime(1531);

            let contractBalance = await token.balanceOf(crowdsaleTest.address);
            console.log("Bal: " + contractBalance);
            await crowdsaleTest.burnAllUnsoldTokens();  
            let newBalance = await token.balanceOf(crowdsaleTest.address);
            assert.equal(newBalance.toNumber(), 0);
        });
    });
});