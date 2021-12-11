README.md

# Custom Portfolio Assignment Progress

This week I made forward progress on discovery and opted to pivot and follow a crypto tutorial to make this crypto-marketplace. After following this tutorial and implementing some custom styles and names I had a better understanding of how to implement smart contracts. I will plan out how I will implement crypto donations to my original project.

# Getting the Project Started

1. Clone this repo

   - install dependencies `npm i`
   - copy `.env` file: `cp .env.example .env.local`

2. Start ETH NODE using hardhat

   - open a new terminal and run `npx hardhat node`

3. Deploy contracts local

   - start a new terminal `npx hardhat run scripts/deploy.js --network localhost`

4. Start Front-End
   - open a new terminal and run `npm run dev`
   - ensure you have MetaMask wallet plugin on your browser to import hardhat test wallets

## Acknowledgements

- [Tutorial Article Used](https://dev.to/dabit3/building-scalable-full-stack-apps-on-ethereum-with-polygon-2cfb)
- [Tutorial Video Used](https://www.youtube.com/watch?v=GKJBEEXUha0)
