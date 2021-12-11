// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// standards contract package
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// add extra functionality
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// util for incrementing id
import "@openzeppelin/contracts/utils/Counters.sol";
// security to prevent reentry attacks
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract NFTMarket is ReentrancyGuard {
  //want to use counters util
  using Counters for Counters.Counter;
  //! These are variables
  Counters.Counter private _itemIds;
  // used to store items sold,forSale,notSold
  Counters.Counter private _itemsSold; // cannot have dynamic length arrs
  // owner of contract, will make a commission on each thing sold
  address payable owner;
  // .025 madic -> .02cent // must change on what coin is being used
  uint256 listingPrice = 0.025 ether;

  constructor() {
    // ownder of this.contract
    owner = payable(msg.sender);
  }

  // like JS Object
  struct MarketItem {
    uint itemId;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
  }

  // fetches marketItem based on Id
  // will return struct above
  mapping(uint256 => MarketItem) private idToMarketItem;

  // emit event, to listen on the frontend
  event MarketItemCreated (
    uint indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price,
    bool sold
  );

  function getListingPrice() public view returns (uint256) {
    return listingPrice;
  }

  // functions to interact with contracts
  function createMarketItem(
    address nftContract,
    uint256 tokenId,
    uint256 price
  ) public payable nonReentrant {
    // like input valdiation
    require(price > 0, "Price must be at least 1 wei.");
    require(msg.value == listingPrice, "Price must be equal to listing price");

    // id for marketPlace item going on sale
    _itemIds.increment();
    uint256 itemId = _itemIds.current();

    // create and set mapping
    idToMarketItem[itemId] = MarketItem(
      itemId,
      nftContract, // arg0
      tokenId,  // arg1
      payable(msg.sender), // seller of this nft/contract
      payable(address(0)), // owner, set address to zero
      price, // arg3
      // has not been sold
      false
    );

    // transfer owndership of nft to this.contract -> this.contract to.buyer
    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
    // emit event so front-end can listen and update
    emit MarketItemCreated(itemId, nftContract, tokenId, msg.sender, address(0), price, false);
  }

  // creates marketplaceSale
  function createMarketSale(
    address nftContract,
    uint256 itemId
  ) public payable nonReentrant {
    uint price = idToMarketItem[itemId].price;
    uint tokenId = idToMarketItem[itemId].tokenId;
    // validation
    require(msg.value == price, "Please submit the asking price in order to complete the purchase.");

    // transfer money to seller
    idToMarketItem[itemId].seller.transfer(msg.value);
    // transfer ownership of digital asset
    IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
    // set local val of owner
    idToMarketItem[itemId].owner = payable(msg.sender);
    idToMarketItem[itemId].sold = true;
    // increase count of total items sold
    _itemsSold.increment();
    // listing fee comission for marketplace owner
    payable(owner).transfer(listingPrice);
  }

  // different views/selections of sets of nfts
  // total NOT sold
  function fetchMarketItems() public view returns (MarketItem[] memory) {
    uint itemCount = _itemIds.current();
    uint unsoldItemCount = _itemIds.current() - _itemsSold.current();

    // for loop
    uint currentIndex = 0;
    // creates new array of specific length for unsoldItems
    MarketItem[] memory items = new MarketItem[](unsoldItemCount);
    // loop through all items created
    for (uint i = 0; i < itemCount; i++){
      // if this nft is not sold
      if (idToMarketItem[i + 1].owner == address(0)) {
        // el at currIdx
        uint currentId = i + 1;
        // ref to current item
        MarketItem storage currentItem = idToMarketItem[currentId];
        // insert into array
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }
  // total purchased
  function fetchMyNFTs() public view returns (MarketItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    // get count of owned nfts
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        itemCount += 1;
      }
    }

    // finally able to create array to return
    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        // el at currIdx
        uint currentId = i + 1;
        // ref to current item
        MarketItem storage currentItem = idToMarketItem[currentId];
        // insert into array
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }

    // fetch those that we have purchased
    return items;
  }

  // total nfts created
  function fetchItemsCreated() public view returns (MarketItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    // get count of purchased NFTs
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        itemCount += 1;
      }
    }

    // finally able to create array to return
    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }
}