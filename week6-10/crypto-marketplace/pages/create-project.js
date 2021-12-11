import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import { useState } from "react";
import Web3Modal from "web3modal";

// set and pins items to IPFS, a node
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { nftAddress, nftMarketAddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

function CreateProject() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const router = useRouter();

  // upload image/video
  const onAssetChange = async (e) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log("received::", prog),
      });

      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  // save to IPFS
  const createItem = async () => {
    const { description, name, price } = formInput;
    if (!description || !name || !price || !fileUrl) {
      return;
    }
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });

    try {
      const added = await client.add(data);
      // creates token url
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      createSellable(url);
    } catch (e) {
      console.log("Error uploading file: ", e);
    }
  };

  // list item for sale
  const createSellable = async (url) => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    // ref to contract
    let contract = new ethers.Contract(nftAddress, NFT.abi, signer);
    // create token, from contract => read .sol
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    // need to manipulate data to create NFT
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    // get ref to price we want to sell at
    const price = ethers.utils.parseUnits(formInput.price, "ether");
    // move from NFT to MarketItem
    contract = new ethers.Contract(nftMarketAddress, Market.abi, signer);
    // ensure commission
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();
    // mark item for sale
    transaction = await contract.createMarketItem(nftAddress, tokenId, price, {
      value: listingPrice,
    });
    // wait to finish
    await transaction.wait();
    // move to home to fetch
    router.push("/");
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          type="text"
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            setFormInput((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            setFormInput((prev) => ({ ...prev, description: e.target.value }))
          }
          required
        ></textarea>
        <input
          placeholder="Asset Price"
          className="mt-2 border rounded p-4"
          required
          onChange={(e) =>
            setFormInput((prev) => ({ ...prev, price: e.target.value }))
          }
        />
        <input
          type="file"
          placeholder="Asset"
          className="my-4"
          required
          onChange={onAssetChange}
        />
        {fileUrl && (
          <img
            src={fileUrl}
            alt="preview of uploaded NFT"
            className="rounded mt-4"
          />
        )}
        <button
          onClick={createItem}
          className="font-bold mt-4 bg-green-500 hover:bg-green-700 text-white rounded p-4 shadow-lg"
        >
          Create Digital Asset
        </button>
      </div>
    </div>
  );
}

export default CreateProject;
