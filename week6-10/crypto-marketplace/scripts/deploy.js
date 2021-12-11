const hre = require("hardhat");
const fs = require("fs");

async function main() {
  // connect
  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  // deploy params
  const _nftMarket = await NFTMarket.deploy();
  // actual deployment of contract
  await _nftMarket.deployed();
  console.log("NFTMarket deployed to:", _nftMarket.address);

  // connect
  const NFT = await hre.ethers.getContractFactory("NFT");
  // deploy params for NFTs
  const _nft = await NFT.deploy(_nftMarket.address);
  // deploy contract
  await _nft.deployed();
  console.log("NFT deployed to:", _nft.address);

  // create config file to be used by the Front-End
  let config = `
  export const nftMarketAddress = "${_nftMarket.address}"
  export const nftAddress = "${_nft.address}"
  `;

  let data = JSON.stringify(config);
  fs.writeFileSync("config.js", JSON.parse(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
