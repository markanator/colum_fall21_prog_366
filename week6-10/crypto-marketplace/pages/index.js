import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";

//
import { nftAddress, nftMarketAddress } from "../config";

// ref contract APIs
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState("not-loaded");

  const loadNFTS = async () => {
    // talk to smart contract and load NFTS
    // use generic provider when reading from api
    const provider = new ethers.providers.JsonRpcProvider();
    // ref to NFT contract
    const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
    // ref to market contract
    const marketContract = new ethers.Contract(
      nftMarketAddress,
      Market.abi,
      provider
    );
    // get data = MarketItems[]
    const data = await marketContract.fetchMarketItems();
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
    console.log("loading complete");
  }, []);

  // BUY NFTS
  const buyNft = async (nft) => {
    // lib to allow users to connect their wallet to allow purchasing
    const web3modal = new Web3Modal();
    // connect to eth
    const connection = await web3modal.connect();
    // create provider to facilitate transaction
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    // get a reference to a contract, ready to mint
    const contract = new ethers.Contract(nftMarketAddress, Market.abi, signer);
    // convert string to number we can use
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    // create market sale
    const transaction = await contract.createMarketSale(
      nftAddress,
      nft.tokenId,
      {
        value: price,
      }
    );
    // wait to finish
    await transaction.wait();
    // we need to remove the nft
    loadNFTS(); // should have one less nft
  };

  // render NFTS
  if (loading === "loaded" && !nfts.length) {
    return (
      <h1 className="px-20 py-10 text-3xl">No items in the marketplace</h1>
    );
  }

  return (
    <div className="flex justify-center py-24">
      <div className="px-4 " style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, idx) => (
            <div key={idx} className="border shadow rounded-xl ">
              <img
                src={nft.image}
                alt={nft.name}
                className="h-full w-full"
                style={{
                  maxHeight: "280px",
                  objectFit: "cover",
                }}
              />
              <div className="px-4 pt-4">
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
              <div className="p-4 bg-black h-auto rounded-b-xl">
                <p className="text-2xl mb-4 font-bold text-white">
                  {nft.price} Matic(eth)
                </p>
                <button
                  className="w-full bg-green-500 text-white font-bold py-2 px-12 rounded"
                  onClick={() => buyNft(nft)}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
