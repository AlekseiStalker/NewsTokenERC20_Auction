const NewsToken = artifacts.require("./NewsToken.sol");
const CrowdsaleTest = artifacts.require("./TESTNewsCrowdsale.sol");

contract ('Crowdsale_test', function(accounts) { 
    let token;
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

        it('Try to buy on auction', async() => { 
            await crowdsaleTest.updateTime(81);
            await crowdsaleTest.buy({from: accounts[0], value: 10});
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
});