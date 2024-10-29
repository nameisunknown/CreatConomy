//SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NftAuction is ERC721URIStorage, ReentrancyGuard {
    uint256 private totalItems;
    uint8 royaltyFee;
    address companyAcc;
    uint256 listingPrice = 0.02 ether;

    struct AuctionStruct {
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

    struct BiddableStruct {
        address bidder;
        uint256 price;
        uint256 timestamp;
        bool refunded;
        bool won;
    }

    mapping(uint => AuctionStruct) public auctionedItem;
    mapping(uint => bool) auctionedItemExist;
    mapping(uint => BiddableStruct[]) biddersOf;
    mapping(string => uint) existingURIs;

    event AuctionItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    error UnAuthorized_Entity();

    constructor(uint8 _royaltyFee) ERC721("CreatCo", "CRT") {
        royaltyFee = _royaltyFee;
        companyAcc = msg.sender;
    }

    function mintToken(string memory tokenURI) internal returns (bool) {
        totalItems += 1;
        uint256 tokenId = totalItems;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        return true;
    }

    function createAuction( string memory _name, string memory _description, string memory _image,
        string memory _tokenURI,
        uint _price
    ) public payable nonReentrant {
        require(_price > 0 ether, "This sales prices is not valid");
        require(
            msg.value >= listingPrice,
            "Price must be greater than listing price"
        );

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
        auctions.duration = getTimeSTamp(0, 0, 0, 0);
        auctions.seller = msg.sender;
        auctions.owner = msg.sender;

        auctionedItem[_tokenId] = auctions;
        auctionedItemExist[_tokenId] = true;

        payy(companyAcc, msg.value);

        emit AuctionItemCreated(
            _tokenId,
            auctions.seller,
            auctions.owner,
            _price,
            false
        );
    }

    function payy(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    function getTimeSTamp(
        uint256 _seconds,
        uint256 _minutes,
        uint256 _hour,
        uint256 _day
    ) public view returns (uint) {
        return
            block.timestamp +
            (1 seconds * _seconds) +
            (1 minutes * _minutes) +
            (1 hours * _hour) +
            (1 days * _day);
    }

    function offerAuction(
        uint256 _tokenId,
        bool biddable,
        uint256 sec,
        uint256 min,
        uint256 hour,
        uint256 day
    ) public {
        if (!auctionedItem[_tokenId].live) {
            setApprovalForAll(address(this), true);
            IERC721(address(this)).transferFrom(
                msg.sender,
                address(this),
                _tokenId
            );
        }
        auctionedItem[_tokenId].bids = 0;
        auctionedItem[_tokenId].live = true;
        auctionedItem[_tokenId].sold = false;
        auctionedItem[_tokenId].biddable = biddable;
        auctionedItem[_tokenId].duration = getTimeSTamp(sec, min, hour, day);
    }

    function getAllAuctions() public view returns (AuctionStruct[] memory Auctions)
    {
        uint totalItemsCount = totalItems;
        Auctions = new AuctionStruct[](totalItemsCount);

        for (uint i = 0; i < totalItemsCount; i++) {
            Auctions[i] = auctionedItem[i + 1];
        }
    }

    function getAuction(uint _id) public view returns (AuctionStruct memory) {
        require(auctionedItemExist[_id], "Auctioned Item not found");
        return auctionedItem[_id];
    }

    function buyAuctionedItem(uint256 _tokenId) public payable nonReentrant{
      require(msg.value >= auctionedItem[_tokenId].price, "Insufficient Amount");
      require(auctionedItem[_tokenId].duration > getTimeSTamp(0, 0, 0, 0), "Auctioned Item is not available");
      require(!auctionedItem[_tokenId].biddable, "Auction must not be biddable");

      AuctionStruct storage auct= auctionedItem[_tokenId];
      address seller = auct.seller;
      address owner = auct.owner;

      auct.live = false;
      auct.sold = true;
      auct.bids = 0;
      auct.duration = getTimeSTamp(0, 0, 0, 0);
      auct.owner = msg.sender;                             

      uint royalty = (msg.value * royaltyFee) / 100;

      payy(owner, (msg.value - royalty));
      payy(companyAcc, royalty);
      payy(seller, (msg.value - royalty));

      IERC721(address(this)).transferFrom(address(this), msg.sender, _tokenId);
    }

    function placeBid(uint256 _tokenId) public payable{
        require(msg.value >= auctionedItem[_tokenId].price, "Insufficient Amount");
        require(auctionedItem[_tokenId].duration > getTimeSTamp(0, 0, 0, 0), "Auctioned Item not available");
        require(auctionedItem[_tokenId].biddable, "Auction must be biddable");

        BiddableStruct memory bidder;
        bidder.bidder = msg.sender;
        bidder.price = msg.value;
        bidder.timestamp = getTimeSTamp(0, 0, 0, 0);

        biddersOf[_tokenId].push(bidder);
        auctionedItem[_tokenId].bids++;
        auctionedItem[_tokenId].price = msg.value;
        auctionedItem[_tokenId].winner = msg.sender;
    }

    function claimPrize(uint _tokenId, uint _bidNo)public{
        require(getTimeSTamp(0, 0, 0, 0) > auctionedItem[_tokenId].duration, "Auction is still Live");
        require(
            auctionedItem[_tokenId].winner == msg.sender,
            "You are not the winner"
        );

        _finalizeAuction(_tokenId);

        _handlePayments(_tokenId);

        _transferNFTToWinner(_tokenId);

        _refundNonWinners(_tokenId, _bidNo);

        // I ENCOUNTERED STACK TOO DEEP ISSUE FOR THIS:::
        // AuctionStruct storage auction = auctionedItem[_tokenId];

        // uint price = auction.price;
        // uint royality = (price * royaltyFee) / 100;

        // auction.live = false;
        // auction.sold = true;
        // auction.bids = 0;
        // auction.duration = getTimeSTamp(0, 0, 0, 0);

        // payy(companyAcc, royality);
        // payy(auction.owner, (price - royality));

        // _transfer(address(this), msg.sender, _tokenId);
        // auction.owner = msg.sender;

        // performRefund(_tokenId);
        // biddersOf[_tokenId][_bidNo].won = true;

    }

    function _finalizeAuction(uint _tokenId) internal {
        AuctionStruct storage auction = auctionedItem[_tokenId];
        auction.live = false;
        auction.sold = true;
        auction.bids = 0;
        auction.duration = getTimeSTamp(0, 0, 0, 0);
    }

    function _handlePayments(uint _tokenId) internal {
        AuctionStruct storage auction = auctionedItem[_tokenId];
        uint256 price = auction.price;
        uint256 royalty = (price * royaltyFee) / 100;

        payy(companyAcc, royalty);

        payy(auction.owner, (price - royalty));
    }

    function _transferNFTToWinner(uint _tokenId) internal {
        _transfer(address(this), auctionedItem[_tokenId].winner, _tokenId);

        auctionedItem[_tokenId].owner = auctionedItem[_tokenId].winner;
    }

    function _refundNonWinners(uint _tokenId, uint _bidNo) internal {
        for (uint i = 0; i < biddersOf[_tokenId].length; i++) {
            if (biddersOf[_tokenId][i].bidder != auctionedItem[_tokenId].winner) {
                if (!biddersOf[_tokenId][i].refunded) {
                    biddersOf[_tokenId][i].refunded = true;
                    payy(biddersOf[_tokenId][i].bidder, biddersOf[_tokenId][i].price);
                }
            } else {
                biddersOf[_tokenId][_bidNo].won = true;
            }
        }

        delete biddersOf[_tokenId];
    }

    //Sellers can now choose to view their persinal auction in here
    function getMyAuctions()
        public
        view
        returns (AuctionStruct[] memory Auctions)
    {
        uint totalItemsCount = totalItems;
        uint totalSpace;
        for (uint i = 0; i < totalItemsCount; i++) {
            if (auctionedItem[i + 1].owner == msg.sender) {
                totalSpace++;
            }
        }

        Auctions = new AuctionStruct[](totalSpace);

        uint index;
        for (uint i = 0; i < totalItemsCount; i++) {
            if (auctionedItem[i + 1].owner == msg.sender) {
                Auctions[index] = auctionedItem[i + 1];
                index++;
            }
        }
    }

    function getBidders(uint tokenId) public view
        returns (BiddableStruct[] memory)
    {
        return biddersOf[tokenId];
    }

    function getLiveAuctions() public view returns (AuctionStruct[] memory Auctions)
    {
        uint totalItemsCount = totalItems;
        uint totalSpace;
        for (uint i = 0; i < totalItemsCount; i++) {
            if (auctionedItem[i + 1].duration > getTimeSTamp(0, 0, 0, 0)) {
                totalSpace++;
            }
        }

        Auctions = new AuctionStruct[](totalSpace);

        uint index;
        for (uint i = 0; i < totalItemsCount; i++) {
            if (auctionedItem[i + 1].duration > getTimeSTamp(0, 0, 0, 0)) {
                Auctions[index] = auctionedItem[i + 1];
                index++;
            }
        }
    }

    function getUnsoldAuction()
        public
        view
        returns (AuctionStruct[] memory Auctions)
    {
        uint totalItemsCount = totalItems;
        uint totalSpace;
        for (uint i = 0; i < totalItemsCount; i++) {
            if (!auctionedItem[i + 1].sold) {
                totalSpace++;
            }
        }

        Auctions = new AuctionStruct[](totalSpace);

        uint index;
        for (uint i = 0; i < totalItemsCount; i++) {
            if (!auctionedItem[i + 1].sold) {
                Auctions[index] = auctionedItem[i + 1];
                index++;
            }
        }
    }

    function getSoldAuction()
        public
        view
        returns (AuctionStruct[] memory Auctions)
    {
        uint totalItemsCount = totalItems;
        uint totalSpace;
        for (uint i = 0; i < totalItemsCount; i++) {
            if (auctionedItem[i + 1].sold) {
                totalSpace++;
            }
        }

        Auctions = new AuctionStruct[](totalSpace);

        uint index;
        for (uint i = 0; i < totalItemsCount; i++) {
            if (auctionedItem[i + 1].sold) {
                Auctions[index] = auctionedItem[i + 1];
                index++;
            }
        }
    }

    function performRefund(uint _tokenId) internal {
        for (uint i = 0; i < biddersOf[_tokenId].length; i++) {
            if (biddersOf[_tokenId][i].bidder != auctionedItem[_tokenId].winner) {
                if (!biddersOf[_tokenId][i].refunded) {
                biddersOf[_tokenId][i].refunded = true;
                payy(biddersOf[_tokenId][i].bidder, biddersOf[_tokenId][i].price);
            }
         }else {
                biddersOf[_tokenId][i].won = true;
            }
            biddersOf[_tokenId][i].timestamp = getTimeSTamp(0, 0, 0, 0);
        }

        delete biddersOf[_tokenId];
    }

    function getListingPrice() public view returns (uint) {
        return listingPrice;
    }

    function setListingPrice(uint _price) public {
        require(msg.sender == companyAcc, "Unauthorized entity");
        listingPrice = _price;
    }

    function changePrice(uint tokenId, uint price) public {
        require(
            auctionedItem[tokenId].owner == msg.sender,
            "Unauthorized entity"
        );
        require(
            getTimeSTamp(0, 0, 0, 0) > auctionedItem[tokenId].duration,
            "Auction still Live"
        );
        require(price > 0 ether, "Price must be greater than zero");

        auctionedItem[tokenId].price = price;
    }

 
}
