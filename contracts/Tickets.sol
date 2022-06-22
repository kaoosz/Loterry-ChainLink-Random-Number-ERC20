// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;



import "../node_modules/@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "../node_modules/@openzeppelin/contracts/security/Pausable.sol";
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";




contract Tickets is VRFConsumerBase,Ownable,ReentrancyGuard {
    
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 internal Contador;
    uint256 public Delay;
    
    uint256 public randomResult=99;

    struct LotteryItem{
        address payable ownerticket;
        uint256 ticketId;
    }

    event LotteryItemCreated(
        address indexed ownerticket, 
        uint256 indexed ticketId
    );

    mapping(uint256 => LotteryItem) public idLotteryItem;
    mapping(uint256 => address) public MAP;
    address public tokenERC20;

    constructor() 
        VRFConsumerBase(
            0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
            0xa36085F69e2889c224210F603D836748e7dC0088    // LINK Token
        )
    {
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1 * 10 ** 18; // 0.1 LINK (Varies by network)
    }
    
    function SetTokenAddress(address _token) external onlyOwner{
        tokenERC20 = _token;
    }

    function getRandomNumber() internal returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = uint256(randomness % 10);
    }

    function reset()internal{
        for(uint256 i = 0; i <= 10; i++ ){
            delete MAP[i];
            delete idLotteryItem[i];
        }
        randomResult= 99;
        Contador=0;
    }

    function BuyTicketNumber(uint256 ticketId)external nonReentrant{
        require(ticketId <= 10, "0 to 10 Max Number");
        require(MAP[ticketId] == address(0), "Already Selled");
        require(Contador <= 11,"Contador FAIL");
        
        MAP[ticketId]= msg.sender;

        idLotteryItem[ticketId] = LotteryItem(
            payable(msg.sender),
            ticketId
        );
        
        emit LotteryItemCreated(
            payable(msg.sender),
            ticketId
        );
        Contador++;

        if(Contador >= 11){
            getRandomNumber();
            Delay = block.timestamp + 200;
        }

    }

    function Claim()external payable nonReentrant{
        require(msg.sender == winner(), "Not Winner !");
        require(block.timestamp > Delay, "Need 200 seconds of Delay!");
        require(Contador >= 11);
        require(randomResult < 99, "Need Wait Chainlink Give Randow Number");
        
        IERC20(tokenERC20).transferFrom(owner(),payable(winner()),1);
        reset();
    }

    function winner()public view returns(address){
        return MAP[randomResult];
    }
    
}

contract MyToken is ERC20 {

    address public Address;

    constructor(address start) ERC20("Reward", "RDD") {
        _mint(msg.sender, 1000);
        Address = start;
        approve(Address, totalSupply());
    }

}
