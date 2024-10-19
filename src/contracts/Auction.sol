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

  constructor(uint256 _royaltyFee) ERC721("CreatCo", "CRT"){
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

  function createAuction(string memory _name, string memory description,
  string memory image, string memory tokenURI, uint price) public payable nonReentrant(){
    require(price > 0 ether, "This sales prices is not valid");
    require(msg.value >= listingPrice, "Price must be greater than listing price");

    uint256 tokenId 

  }
  
}