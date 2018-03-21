const NewsToken = artifacts.require("./NewsToken.sol");
const Crowdsale = artifacts.require("./NewsCrowdsale.sol");

// contract ('Crowdsale_base_test', function(accounts) {
//     var [deployer, investor1, investor2, investor3] = web3.eth.accounts;

//     let token;
//     let crowdsale;  

//     let oneDay = 86400;//seconds
//     let auctionDays = 160;

//     before(async function() {
//         crowdsale = await Crowdsale.new(); 
//         token = await NewsToken.new(crowdsale.address); 
//     });

    describe('daysInit_test', function() {  

        it('Should be able to set token address', async ()=> { 
            await crowdsale.setTokenAddress(token.address); 
            let tokenAddress = await crowdsale.token();
            assert.equal(tokenAddress, token.address);
        });

//         it('Should be able to set token address', async ()=> { 
//             await crowdsale.setTokenAddress(token.address); 
//             let tokenAddress = await crowdsale.token();
//             assert.equal(tokenAddress, token.address);
//         });

//         it('Should return correct amount of daySales', async() => {
//             let numberOfSaleDays = await crowdsale.getNumberOfSalesDays();
//             assert.equal(numberOfSaleDays, 160);
//         });

        it('Should return correct amount of daySales', async() => {
            let numberOfSaleDays = await crowdsale.getNumberOfSalesDays();
            assert.equal(numberOfSaleDays, 160);
        });

        it('Should correcly set amount tokens witch sold every auction day', async ()=> {
            let tokensSold = await crowdsale.getQuantitySoldEveryDay();
            assert.equal(tokensSold.toNumber(), 1000000 * 10**12);
        }); 

//         const checkCounting = async(day, result, startOrEnd) => { 
//             let dayDeploy = (await crowdsale.timeDeploy()).toNumber();

//             let dayAuction;
//             if(startOrEnd === "start") {
//                 dayAuction = (await crowdsale.timeStartDay(day)).toNumber();  
//             } else {
//                 dayAuction = (await crowdsale.timeEndsDay(day)).toNumber(); 
//             }
            

//             let daysPass = (dayAuction - dayDeploy) / oneDay; 
//             assert.equal(daysPass, result);
//         }
 
//         it ('Should correctly init START auction days', async() => { 
//             await crowdsale.initStartAuctionDays();

//             let timeDeploy = await crowdsale.timeDeploy();

//             let firstDayStart = await crowdsale.timeStartDay(1);
//             let daysBeforeFirstAuctionDay = (firstDayStart - timeDeploy) / oneDay;

//             let lastDayStart = await crowdsale.timeStartDay(auctionDays);
//             let daysBeforeLastAuctionDayStart = (lastDayStart - timeDeploy) / oneDay;

//             assert.equal(daysBeforeFirstAuctionDay, 80);
//             assert.equal(daysBeforeLastAuctionDayStart, 1439);
//         });   

//         it('Should correctly count 1 auction day starts', async () => checkCounting(1, 80, "start"));  
//         it('Should correctly count 10 auction day starts', async () => checkCounting(10, 89, "start")); 
//         it('Should correctly count 21 auction day starts', async () => checkCounting(21, 260, "start")); 
//         it('Should correctly count 39 auction day starts', async () => checkCounting(39, 358, "start"));  
//         it('Should correctly count 152 auction day starts', async () => checkCounting(152, 1431, "start")); 
//         it('Should correctly count 160 auction day starts', async () => checkCounting(160, 1439, "start"));

//         it('Should throw error if try init START auction days again', async () => {
//             try {
//                 await crowdsale.initStartAuctionDays();
//             } catch (error) { return true; }
//             throw new Error('transaction should failed!'); 
//         }); 
  
//         проверить корректную инициализацию добавляя дни в ручную и сравнивая с результатами контракта

//         it ('Should correctly init ENDS auction days', async() => { 
//             await crowdsale.initEndsAuctionDays();

//             let timeDeploy = await crowdsale.timeDeploy();

//             let firstDayEnds = await crowdsale.timeEndsDay(1);
//             let daysBeforeFirstAuctionDay = (firstDayEnds - timeDeploy) / oneDay;

//             let lastDayEnds = await crowdsale.timeEndsDay(auctionDays);
//             let daysAfterLastAuctionDayEnds = (lastDayEnds - timeDeploy) / oneDay;

//             assert.equal(daysBeforeFirstAuctionDay, 81);
//             assert.equal(daysAfterLastAuctionDayEnds, 1440);
//         });  

//         it('Should correctly count 1 auction day ends', async () => checkCounting(1, 81, "end"));  
//         it('Should correctly count 10 auction day ends', async () => checkCounting(10, 90, "end")); 
//         it('Should correctly count 21 auction day ends', async () => checkCounting(21, 261, "end")); 
//         it('Should correctly count 39 auction day starts', async () => checkCounting(39, 359, "end"));   
//         it('Should correctly count 152 auction day ends', async () => checkCounting(152, 1432, "end")); 
//         it('Should correctly count 160 auction day ends', async () => checkCounting(160, 1440, "end"));

//         it('Should throw error if try init ENDS auction days again', async () => {
//             try {
//                 await crowdsale.initStartAuctionDays();
//             } catch (error) { return true; }
//             throw new Error('transaction should failed!'); 
//         });
//     });
// });
 