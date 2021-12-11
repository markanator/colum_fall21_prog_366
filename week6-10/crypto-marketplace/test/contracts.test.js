const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", function () {
  it("should create and execute market sales", async function () {
    // deploy market and nfts
    const Market = await ethers.getContractFactory('NFTMarket');
    const _market = await Market.deploy();
    await _market.deployed();
    const marketAddress = _market.address;

    const NFT = await ethers.getContractFactory("NFT");
    const _nft = await NFT.deploy(marketAddress);
    await _nft.deployed();
    const nftContractAddress = _nft.address;

    let listingPrice = await _market.getListingPrice();
    listingPrice = listingPrice.toString();
    const auctionPrice = ethers.utils.parseUnits('100', 'ether');

    // create nfts
    await _nft.createToken("https://www.mytokenLocation.com"); // id: 1
    await _nft.createToken("https://www.mytokenLocation2.com"); // id: 2

    // post for sale
    await _market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice });
    await _market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice });

    // fake temp addresses
    const [_, buyerAddress] = await ethers.getSigners();

    // purchase from someone else
    await _market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice });

    // query items
    let items = await _market.fetchMarketItems();
    items = await Promise.all(items.map(async (i) => {
      const tokenUri = await _nft.tokenURI(i.tokenId);
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller.toString(),
        owner: i.owner.toString(),
        tokenUri
      }
      return item;
    }))
    console.log("items:", items)
  });
});
