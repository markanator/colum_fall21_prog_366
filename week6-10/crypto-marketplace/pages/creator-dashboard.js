import axios from "axios";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { nftAddress, nftMarketAddress } from "../config";
// abi
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

function CreatorDashboard() {
  const [nfts, setNfts] = useState([]);
  const [sold, setSold] = useState([]);
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
    const data = await marketContract.fetchItemsCreated();
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
          sold: i.sold,
          image: meta.data.image,
        };
      })
    );

    const soldItems = items.filter((i) => i.sold);
    // set state
    setSold(soldItems);
    setNfts(items);
    setLoading("loaded");
    console.log("SOLD", soldItems);
    console.log("Items", items);
  };
  useEffect(() => {
    loadNFTS();
  }, []);

  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl py-2">Items Created</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, idx) => (
            <div key={idx} className="border shadow rounded-xl overflow-hidden">
              <img src={nft.image} alt={nft.name} />
              <div>
                <p>{nft.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        {Boolean(sold.length) && (
          <>
            <h2 className="text-2xl py-2">Items Sold</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {sold.map((nft, idx) => (
                <div
                  key={idx}
                  className="border shadow rounded-xl overflow-hidden"
                >
                  <img src={nft.image} alt={nft.name} />
                  <div>
                    <p>{nft.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CreatorDashboard;
