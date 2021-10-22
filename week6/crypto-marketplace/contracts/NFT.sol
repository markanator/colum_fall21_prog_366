// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// standards contract package
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// add extra functionality
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// util for incrementing id
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
  //want to use counters util
  using Counters for Counters.Counter;
  //! These are variables
  Counters.Counter private _tokenIds;
  address contractAddress; // address of marketplace we want the nft to interact with

  //
  constructor (address marketplaceAddress) ERC721("Metaverse Tokens", "METT") {
    contractAddress = marketplaceAddress;
  }

  // use to mint new tokens
  function createToken(string memory tokenURI) public returns (uint) {
    // we have a lot of metaData of transaction
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current(); // increment id
    // creater, id
    _mint(msg.sender, newItemId); // makes it part of the eth blockchain->makes it legit
    _setTokenURI(newItemId, tokenURI);
    // give marketplace approval to transact this token between users from within another contract
    setApprovalForAll(contractAddress, true);
    // needed for the front-end
    return newItemId;
  }
}
