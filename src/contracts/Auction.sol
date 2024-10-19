// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import  "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Auction is ERC721URIStorage, ReentrancyGuard{
  uint256 private totalItems;
  uint8 royaltyFee;
  address companyAcc;
  uint256 listingPrice = 0.02 ether;

  struct AuctionStruct{
    string name;
    string description;
    string image;
    uint256 tokenId;
    address seller;
    address owner;
    address winner;
    uint256 price;
    bool sold;
    bool live;
    bool biddable;
    uint256 bids;
    uint duration;

  }

  mapping(uint => AuctionStruct) auctionedItem;
  mapping(uint => bool) auctionedItemExist;

  event AuctionItemCreated(uint256 indexedtokenId, address seller,
  address owner, uint256 price, bool sold);

  constructor(uint8 _royaltyFee) ERC721("CreatCo", "CRT"){
    royaltyFee = _royaltyFee;
    companyAcc = msg.sender;

  }

  function mintToken(string memory tokenURI) internal returns (bool) {
    totalItems+=1;
    uint256 tokenId = totalItems;
    _mint(msg.sender, tokenId);
    _setTokenURI(tokenId, tokenURI);

    return true;
  }

  function createAuction(string memory _name, string memory _description,
  string memory _image, string memory _tokenURI, uint _price) public payable nonReentrant(){
    require(_price > 0 ether, "This sales prices is not valid");
    require(msg.value >= listingPrice, "Price must be greater than listing price");
   
    require(bytes(_name).length > 0, "name cannot be empty");
    require(bytes(_description).length > 0, "description cannot be empty");

    require(bytes(_image).length > 0, "image must be specified");
    require(mintToken(_tokenURI), "Could not mint token");

    uint256 _tokenId = totalItems;

    AuctionStruct memory auctions;
    auctions.tokenId = _tokenId;
    auctions.name = _name;
    auctions.description = _description;
    auctions.image = _image;
    auctions.price = _price;
    auctions.duration = getTimeSTamp(0,0,0,0);
    auctions.seller = msg.sender;
    auctions.owner = msg.sender;

    auctionedItem[_tokenId] = auctions;
    auctionedItemExist[_tokenId] = true;

    payy(companyAcc, msg.value);

    emit AuctionItemCreated(_tokenId, msg.sender, address(0), _price, false);
  }
  
}

function payy(address to, uint256 amount){
  (bool success, ) = payable(to).call{value: amount}("");
  require(success);
}

function getTimeSTamp(uint256 _seconds, uint256 _minutes,
uint256 _hour, uint256 _day) view returns (uint){
  return 
    block.timestamp + (1 seconds * _seconds) + (1 minutes * _minutes) +
    (1 hours * _hour) + (1 days * _day);

}
