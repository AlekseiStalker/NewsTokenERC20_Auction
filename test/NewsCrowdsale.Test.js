const NewsToken = artifacts.require("./NewsToken.sol");
const Crowdsale = artifacts.require("./NewsCrowdsale.sol");

contract ('Crowdsale_base_test', function(accounts) {
    var [deployer, investor1, investor2, investor3] = web3.eth.accounts;

    let token;
    let crowdsale;  

    let oneDay = 86400;//seconds
    let auctionDays = 160;

    before(async function() {
        crowdsale = await Crowdsale.new(); 
        token = await NewsToken.new(crowdsale.address); 
    });

    describe('daysInitTest', function() {  

        it('Should be able to set token address', async ()=> { 
            await crowdsale.setTokenAddress(token.address); 
            let tokenAddress = await crowdsale.token();
            assert.equal(tokenAddress, token.address);
        });

        it('Should return correct amount of daySales', async() => {
            let numberOfSaleDays = await crowdsale.getNumberOfSalesDays();
            assert.equal(numberOfSaleDays, 160);
        });

        it('Should correcly set amount tokens witch sold every auction day', async ()=> {
            let tokensSold = await crowdsale.getQuantitySoldEveryDay();
            assert.equal(tokensSold.toNumber(), 1000000 * 10**12);
        });

        const getCountPassedDays = async(passed) => {
            let dayDeploy = await crowdsale.timeDeploy();
            return (dayDeploy + passed * oneDay) / oneDay;
        }

        const checkCounting = (daysPass, result) => { 
            let daysPass = getCountPassedDays(currentDay, daysPass);
            assert.equal(daysPass, result);
        }
 
        it ('Should correctly init START auction days', async() => { 
            await crowdsale.initStartAuctionDays();

            let timeDeploy = await crowdsale.timeDeploy();

            let firstDayStart = await crowdsale.timeStartDay(1);
            let daysBeforeFirstAuctionDay = (firstDayStart - timeDeploy) / oneDay;

            let lastDayStart = await crowdsale.timeStartDay(auctionDays);
            let daysBeforeLastAuctionDayStart = (lastDayStart - timeDeploy) / oneDay;

            assert.equal(daysBeforeFirstAuctionDay, 80);
            assert.equal(daysBeforeLastAuctionDayStart, 1439);
        });   

        it('Should correctly count 1 auction day starts', async () => checkCounting(1, 80));  
        it('Should correctly count 10 auction day starts', async () => checkCounting(10, 89)); 
        it('Should correctly count 21 auction day starts', async () => checkCounting(21, 180)); 
        it('Should correctly count 152 auction day starts', async () => checkCounting(152, 1431)); 
        it('Should correctly count 160 auction day starts', async () => checkCounting(160, 1439));

        it('Should throw error if try init START auction days again', async () => {
            try {
                await crowdsale.initStartAuctionDays();
            } catch (error) { return true; }
            throw new Error('transaction should failed!'); 
        }); 
  
        проверить корректную инициализацию добавляя дни в ручную и сравнивая с результатами контракта

        it ('Should correctly init ENDS auction days', async() => { 
            await crowdsale.initEndsAuctionDays();

            let timeDeploy = await crowdsale.timeDeploy();

            let firstDayEnds = await crowdsale.timeEndsDay(1);
            let daysBeforeFirstAuctionDay = (firstDayEnds - timeDeploy) / oneDay;

            let lastDayEnds = await crowdsale.timeEndsDay(auctionDays);
            let daysBeforeLastAuctionDayEnds = (lastDayEnds - timeDeploy) / oneDay;

            assert.equal(daysBeforeFirstAuctionDay, 81);
            assert.equal(daysBeforeLastAuctionDayEnds, 1431);
        });  

        it('Should throw error if try init ENDS auction days again', async () => {
            try {
                await crowdsale.initStartAuctionDays();
            } catch (error) { return true; }
            throw new Error('transaction should failed!'); 
        });
    });
});
 