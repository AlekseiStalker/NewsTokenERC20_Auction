pragma solidity ^0.4.18;

import "./NewsToken.sol";
 
 
contract IToken {
    function balanceOf(address who) public view returns (uint256);
    function transfer(address to, uint256 value) public returns (bool);
}

contract TESTNewsCrowdsale {

    uint NowTime; 
 
    address public token;
 
    uint public timeDeploy; 

    address public ownerWallet;

    uint timeStartAuction; 
    uint timeFinalizeAuction;  

    uint numOf_SalesDays;
    uint numOf_AuctionDays;
    uint numOf_BreakDays; 
    uint indexCurDay;  

    uint amountSellPerDay;
    uint decimalVar;

    mapping (uint => uint) public timeStartDay;
    mapping (uint => uint) public timeEndsDay;
    mapping (uint => uint) public dailyTotals;

    mapping (uint => mapping (address => uint)) public userContribution;
    mapping (uint => mapping (address => bool)) public claimed;
    
    event Buy (uint day, address user, uint amount);
    event Claim (uint day, address user, uint amount); 
    
    modifier whenNotPause(uint today) {
        while (today >= timeStartDay[indexCurDay + 1] && indexCurDay < numOf_SalesDays) {
            indexCurDay++;
        }
        
        require(NowTime >= timeStartDay[indexCurDay] && NowTime <= timeEndsDay[indexCurDay]);
        _;
    }  

    // TEST
    function updateTime(uint _i) public {
        NowTime = now + _i * 1 days;
    }

    function TESTNewsCrowdsale() public { 
        updateTime(0);
        timeDeploy = NowTime; 

        numOf_SalesDays = 160; 
        numOf_BreakDays = 80;
        numOf_AuctionDays = 10;

        indexCurDay = 1; 
        decimalVar = 1 ether; 
          
        
        timeStartDay[1] = timeDeploy + numOf_BreakDays * 1 days; 
        timeEndsDay[1] = timeDeploy + (numOf_BreakDays + 1) * 1 days; 
    }  

    //TEST

    function setTokenAddress(address tokenAddress) public {
        require(token == address(0));
        token = tokenAddress;

        amountSellPerDay = IToken(token).balanceOf(this) / numOf_SalesDays * decimalVar;
    }
     
    
    function initStartAuctionDays() public {
        require(timeStartAuction == 0);

        uint i = 1;
        while (i < numOf_SalesDays) {  
            
            uint j = 1;
            for (;j < numOf_AuctionDays; j++) {
                timeStartDay[i + j] = timeStartDay[i + j - 1] + 1 days; 
            }
            i += j;
            
            timeStartDay[i] = timeStartDay[i - 1] + (numOf_BreakDays + 1) * 1 days;  
        } 

        timeStartAuction = timeStartDay[1];  
    }

    function initEndsAuctionDays() public {
        require(timeFinalizeAuction == 0);

        uint i = 1;
        while (i < numOf_SalesDays) {  
            
            uint j = 1;
            for (;j < numOf_AuctionDays; j++) {
                timeEndsDay[i + j] = timeEndsDay[i + j - 1] + 1 days; 
            }
            i += j;
            
            timeEndsDay[i] = timeEndsDay[i - 1] + (numOf_BreakDays + 1) * 1 days;  
        } 

        timeFinalizeAuction = timeEndsDay[numOf_SalesDays];  
    }
    
    function () payable external {
       buy();
    }  
    
    function buy() payable public whenNotPause(NowTime) {   
 
        userContribution[indexCurDay][msg.sender] += msg.value;
        dailyTotals[indexCurDay] += msg.value; 
        
       // ownerWallet.transfer(msg.value);
        
        Buy(indexCurDay, msg.sender, msg.value);
    }  

    function claim(uint day) public { 
        if (claimed[day][msg.sender] || dailyTotals[day] == 0) {
            return;
        }
        
        require(now > timeEndsDay[day]);
        
        uint price        = amountSellPerDay / dailyTotals[day];
        uint userPersent  = price * userContribution[day][msg.sender];
        uint reward       = userPersent / decimalVar; 

        claimed[day][msg.sender] = true;
        IToken(token).transfer(msg.sender, reward);

        Claim(day, msg.sender, reward);
    } 

    function claimAll() external { 
        for (uint i = 1; i <= indexCurDay; i++) {
            claim(i);
        } 
    }   

    function getQuantitySoldEveryDay() public view returns(uint) {
        return amountSellPerDay / decimalVar;
    } 
    
    function getCurrentDay() public view returns(uint) {
        uint dayCounter = indexCurDay;
        
        while (now >= timeStartDay[dayCounter + 1]) {
            dayCounter++;
        } 
        return dayCounter;
    }

    function getNumberOfSalesDays() public view returns(uint) {
        return numOf_SalesDays;
    }

    function getTimeAuctionStart() public view returns(uint) {
        return timeStartAuction;
    }

    function getTimeAuctionFinalize() public view returns(uint) {
        return timeFinalizeAuction;
    }

    function isAuctionActive() public view returns(bool) {
        uint dayCounter = indexCurDay; 
        while (now >= timeStartDay[dayCounter + 1]) {
            dayCounter++;
        } 

        return now >= timeStartDay[dayCounter] && now <= timeEndsDay[dayCounter];
    }
    
    //---------------------------test-method-buy/claim-----------------------
    
    uint testLastDay;
     function testSetUserContribut(uint day) public payable {
        userContribution[day][msg.sender] += msg.value;
        dailyTotals[day] += msg.value; 
        
        Buy(day, msg.sender, msg.value);
        testLastDay = day; 
    }
     function testClaim(uint day) public { 
        if (claimed[day][msg.sender] || dailyTotals[day] == 0) {
            return;
        } 

        uint price        = amountSellPerDay / dailyTotals[day];
        uint userPersent  = price * userContribution[day][msg.sender];
        uint reward       = userPersent / decimalVar; 

        claimed[day][msg.sender] = true;
        IToken(token).transfer(msg.sender, reward);

        Claim(day, msg.sender, reward);
    } 
    
    function testClaimAll() external { 
        for (uint i = 1; i <= testLastDay; i++) {
            testClaim(i);
        } 
    }   

    function getNowTime() public returns(uint) {
        return NowTime;
    }
    function time() public returns(uint) {
        return now;
    }
}