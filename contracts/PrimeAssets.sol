// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./Counters.sol";
import {VerificationSystem} from "./verification.sol";


contract PrimeAssets is ERC721, ReentrancyGuard {
    using Counters for Counters.Counter;
    address immutable public verify;

    Counters.Counter private _TokenId;
    /*
    struct that holds the Asset owner details
    */
  // Enum to track the status of an asset
  enum assetStatus {
    OPEN,
    PAID,
    HELD,
    REFUNDED,
    SOLD
}
    struct asset {
        bool probe;
        bool bought;
        assetStatus status;
        uint256 timestamp;
        uint256 price;
        uint256 id;
        address seller;
        string title;
        string description;
        string credential; 
    }

    struct buyer {
        uint256 id;
        address owner;
        uint256 amountpaid;
        uint256 timestamp;
        bool paid;
        bool checked;
        string credential;
        assetStatus status;
        
    }


    mapping(uint256 => buyer) refundedBuyers;

    mapping(uint256 => buyer) buyerMap;
    // uint256[] private TokenIdNumber;
    asset[] assetArray;

    mapping(uint256 => asset) assets;
    //  event is that holds asset creation
    event assetCreation(
        address owner,
        uint256 indexed id,
        string credential,
        uint256 timestamp,
        uint256 price
    );

    // map all buyer into buyerof to store details all as a key-value pair
    // keep track of asset that exist
    mapping(string => bool) AssetExist;
    mapping(uint256 => bool) AssetIdExist;




    event refundAction(
        assetStatus,
        assetStatus
    );

    event sold(bool confirm, assetStatus status);

    event action(
        address buyer,
        address seller,
        uint256 timestamp,
        uint256 amount,
        bool paid
    );
  

    event assetTransfer(
        address from,
        address to,
        uint256 tokenId,
        string credential,
        uint timestamp
    );

    address public owner;


    constructor(
        string memory _name,
        string memory _symbol,
        address _verificationSystem
    )
        ERC721(_name, _symbol)
    {
        owner = msg.sender;
        verify = _verificationSystem;
    }



    function createAsset(
        string memory title,
        string memory description,
        string memory credential,
        uint256 price
    ) public returns (bool) {
        // set all condition
        require(VerificationSystem(verify).isAddressVerified(), "Address not verified");
        require(bytes(title).length > 0 && bytes(description).length > 0, "Title must be greater than 0");
        
        require(bytes(credential).length > 0 && price > 0 ether, "Image cannot be empty");
        require(!AssetExist[credential], "Asset already exist");

        _TokenId.increment();

        // Get the current token ID
        uint256 tokenId = _TokenId.current();

        assetArray.push(asset(false, false, assetStatus.OPEN, block.timestamp, price, tokenId, msg.sender, title, description, credential));

        AssetExist[credential] = true;

        AssetIdExist[tokenId] = true;

        emit assetCreation(
            msg.sender,
            tokenId,
            credential,
            block.timestamp,
            price
        );
        _safeMint(msg.sender, tokenId);
        return true;
    }
    /*
    * the buyAsset function create an instance of the new buyer 
    *
    */

    function buyAsset(uint256 id) public payable nonReentrant {
        require(VerificationSystem(verify).isAddressVerified(), "Address not verified");

        require(
            assetArray[id].status == assetStatus.OPEN,
            "Asset is undegoing Negotiation"
        );
        // require(msg.value > 0 ether, "value cannot be Zero");

        require(
            msg.sender != assetArray[id].seller,
            "You cannot buy your Asset"
        );
        require(AssetIdExist[id], "Asset does not Exist");
        require(msg.value == assetArray[id].price, "Incorrect payment amount");

        // create a new buyer and set the details

        buyerMap[id] = buyer(id, msg.sender, msg.value, block.timestamp,true,false,'',assetStatus.PAID);


       assetArray[id].bought = true;

        emit action(
            msg.sender,
            assetArray[id].seller,
            block.timestamp,
            msg.value,
            true
        );

        assetArray[id].status = assetStatus.PAID;
        
    }

    function pay(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success, "Failed to send Ether");
    }

    function refund(uint256 id) public {
        buyer storage buyerRefund = buyerMap[id];
        asset storage assetRefund = assetArray[id];


             require( msg.sender == buyerRefund.owner &&  buyerRefund.status == assetStatus.PAID, "You are not the buyer of this asset");
      
        buyerRefund.status = assetStatus.REFUNDED;
         refundedBuyers[id]= buyerRefund;

        buyerMap[id] = buyer(0, address(0), 0, block.timestamp,false,false,'',assetStatus.OPEN);

            pay(buyerRefund.owner, assetRefund.price);
            assetRefund.bought = false;
            assetRefund.status = assetStatus.OPEN;
            emit refundAction( assetRefund.status, buyerRefund.status  );
        }

    function Probe(uint256 id) public {
        require(
            msg.sender == owner && !assetArray[id].probe,
            "Only Owner has the authority to can probe Asset, Process Reversed"
        );
        assetArray[id].probe = true;

        if (assetArray[id].status == assetStatus.PAID) {
            pay(buyerMap[id].owner, assetArray[id].price);
        }
        assetArray[id].status = assetStatus.HELD;
    }

    function releaseAsset(uint256 id) public {
        asset memory assetRelease = assetArray[id];
        require(
            msg.sender == owner && assetRelease.status == assetStatus.HELD,
            "only the owner can release Asset"
        );
        assetRelease.probe = false;
        assetArray[id].status = assetStatus.OPEN;
    }

    function confirm(uint256 id) public {
        asset memory assetConfirm = assetArray[id];

        // check if asset exist
        require(AssetIdExist[id], "Asset does not Exist");
        //the asset must be set to PAID before approval

        require(
            assetConfirm.status == assetStatus.PAID ,
            "Asset is undergoing Negotiation"
        );
         //only the initial buyer and the owner can call this function
        require(
            msg.sender == buyerMap[id].owner && !buyerMap[id].checked,
            "Only the buyer can call this function"
        );

        // change the checking status to true
        buyerMap[id].checked = true;

        // uint256 fund = assetConfirm.price;
        //  pay the asset owner
         pay(assetConfirm.seller, assetConfirm.price);
        assetConfirm.status = assetStatus.SOLD;
        // transfer ownership
        _transfer(assetConfirm.seller, msg.sender, assetConfirm.id);
        buyerMap[id].credential = assetConfirm.credential;
        assetConfirm.seller = msg.sender;
       
        

        emit assetTransfer(
            assetConfirm.seller,
            buyerMap[id].owner,
            assetConfirm.id,
            buyerMap[id].credential,
            block.timestamp
        );
         buyerMap[id].status = assetStatus.SOLD;

        emit sold(buyerMap[id].checked, assetConfirm.status);
    }

    function getAssets() public view returns (asset[] memory) {
        return assetArray;
    }
  function getRefundedBuyers(uint _id) public view returns (buyer memory) {
        return refundedBuyers[_id];
    }
    function getBuyer(uint256 buyerId) public view returns (buyer memory) {
        return buyerMap[buyerId];
    }

    function getAsset(uint256 _id) public view returns (asset memory) {
        return assetArray[_id];
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
    
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0
            ? string(abi.encodePacked(baseURI, Strings.toString(tokenId)))
            : "";
    }
    
}