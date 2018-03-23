pragma solidity ^0.4.18;

import "./NewsToken.sol";
 
 contract IToken {
    function balanceOf(address who) public view returns (uint256);
    function transfer(address to, uint256 value) public returns (bool);
}

contract NewsCrowdsale {
    
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

    function NewsCrowdsale() public {  
        numOf_SalesDays = 160; 
        numOf_BreakDays = 80;
        numOf_AuctionDays = 10;

        indexCurDay = 1; 
        decimalVar = 1 ether; 
          
        timeDeploy = now; 
        timeStartDay[1] = timeDeploy + numOf_BreakDays * 1 days; 
        timeEndsDay[1] = timeDeploy + (numOf_BreakDays + 1) * 1 days; 
    } 

    modifier whenNotPause(uint today) {
        while (today >= timeStartDay[indexCurDay + 1] && indexCurDay < numOf_SalesDays) {
            indexCurDay++;
        }
        
        require(today >= timeStartDay[indexCurDay] && today <= timeEndsDay[indexCurDay]);
        _;
    }  

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
    
    function buy() payable public whenNotPause(now) {   
 
        userContribution[indexCurDay][msg.sender] += msg.value;
        dailyTotals[indexCurDay] += msg.value; 
        
        ownerWallet.transfer(msg.value);
        
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
        for (uint i = 1; i < indexCurDay + 1; i++) {
            claim(i);
        } 
    }  

    function getQuantitySoldEveryDay() public view returns(uint) {
        return amountSellPerDay / decimalVar;
    } 
    
    function getCurrentDay() public view returns(uint) {
        uint dayCounter = indexCurDay;
        
        while (now >= timeStartDay[dayCounter + 1] && dayCounter < numOf_SalesDays) {
            dayCounter++;
        } 
        return now >= timeStartAuction && now <= timeFinalizeAuction
                ? dayCounter 
                : 0;
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
        while (now >= timeStartDay[dayCounter + 1] && dayCounter < numOf_SalesDays) {
            dayCounter++;
        } 

        return now >= timeStartDay[dayCounter] && now <= timeEndsDay[dayCounter];
    }
	
	function getTimeNow() public view returns(uint) {
		return now;
	} 

    function getDaysToNextAuction() public view returns(uint) {
        uint dayCounter = indexCurDay; 
        while (now >= timeStartDay[dayCounter + 1] && dayCounter < numOf_SalesDays) {
            dayCounter++;
        }

        if (now >= timeStartAuction && dayCounter < numOf_SalesDays) {
            return dayCounter % 10 == 0 && now >= timeEndsDay[dayCounter]
                   ? (timeStartDay[dayCounter + 1] - now) / 1 days
                   : 0;
        } else {
            return (timeStartAuction - now) / 1 days;
        }
    } 
}
//burn? & 2 wallets & claimAll/2