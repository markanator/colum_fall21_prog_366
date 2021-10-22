import React from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Web3Modal from "web3modal";

import { nftAddress, nftMarketAddress } from "../config";
// abi
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

// return items that we have bought
function MyProjects() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState("not-loaded");

  const loadNFTS = async () => {
    // authenticate with wallet
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    // talk to smart contract and load NFTS
    const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftMarketAddress,
      Market.abi,
      provider
    );
    // fetch wallet nfts
    const data = await marketContract.fetchMyNFTs();
    // get token URI by looping
    const items = await Promise.all(
      data.map(async (i) => {
        // fetch each project's url
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        // get project info
        const meta = await axios.get(tokenUri);
        // get ether price
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        // return managable data for react
        return {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
      })
    );
    // set state
    setNfts(items);
    setLoading("loaded");
  };
  useEffect(() => {
    loadNFTS();
  }, []);

  // render NFTS
  if (loading === "loaded" && !nfts.length) {
    return <h1 className="px-20 py-10 text-3xl">No projects funded.</h1>;
  }

  return (
    <div className="flex justify-center">
      <div className="px-4 " style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, idx) => (
            <div key={idx} className="border shadow rounded-xl overflow-hidden">
              <img src={nft.image} alt={nft.name} />
              <div className="p-4">
                <p
                  style={{ height: "64px" }}
                  className="text-2xl font-semibold"
                >
                  {nft.name}
                </p>
                <div style={{ height: "70px", overflow: "hidden" }}>
                  <p className="text-gray-400">{nft.description}</p>
                </div>
              </div>
              <div className="bg-black">
                <p className="text-2xl mb-4 font-bold text-white">
                  {nft.price} Matic(eth)
                </p>
                {/* <button
                    className='w-full bg-green-500 text-white font-bold py-2 px-12 rounded'
                    onClick={() => buyNft(nft)}
                  >Sell</button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyProjects;
