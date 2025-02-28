# CreatorsHub DApp

CreatorsHub is a decentralized application (DApp) that enables creators to upload and share various types of content (videos, music, art, blogs, etc.) directly on the platform. By leveraging the Kaia blockchain and decentralized storage solutions like IPFS, CreatorsHub ensures content immutability, security, and fair monetization.

## Features

### 🔹 Content Upload & Sharing
- Creators can upload and share various content types, including:
  - Videos
  - Music
  - Digital Art
  - Blogs
- All content is securely stored on the Kaia blockchain or IPFS.

### 🔹 Microtransactions
- Fans can pay creators using Kaia tokens or other supported cryptocurrencies.
- Access to exclusive content can be granted via pay-per-view or one-time purchases.

### 🔹 Subscription Model
- Creators can offer subscription-based access to premium content.
- Fans can subscribe using Kaia tokens, ensuring a recurring revenue stream for creators.

### 🔹 Donations & Tips
- Fans can directly tip their favorite creators using Kaia tokens.
- Supporters can contribute freely without the need for intermediaries.

### 🔹 NFT Marketplace
- Creators can mint their content as NFTs (e.g., digital art, music, videos).
- NFTs can be listed and sold in an integrated marketplace.
- Ownership and provenance of digital assets are verified via smart contracts.

## Technology Stack

- **Frontend**: React.js (Next.js optional), Web3.js
- **Blockchain**: Kaia Blockchain, Solidity Smart Contracts
- **Storage**: IPFS / Filecoin for decentralized content storage
- **Wallet Integration**: MetaMask
- **Backend (Optional)**: Node.js, Express.js, MongoDB for user authentication and content management

## Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MetaMask](https://metamask.io/) extension
- [Kaia Blockchain Wallet](https://kaia.io/)
- IPFS CLI (optional, if running a local node)

### Steps to Run the Project

1. **Clone the Repository**
```sh
 git clone https://github.com/your-username/CreatorsHub.git
 cd CreatorsHub
```

2. **Install Dependencies**
```sh
 npm install
```

3. **Set Up Environment Variables**
Create a `.env` file in the root directory and add the required environment variables:
```sh
REACT_APP_INFURA_PROJECT_ID=your_infura_project_id
REACT_APP_KAIA_RPC_URL=https://rpc.kaia.io
REACT_APP_CONTRACT_ADDRESS=your_smart_contract_address
```

4. **Start the Development Server**
```sh
 npm run start
```

5. **Deploy Smart Contracts (Optional)**
```sh
 truffle migrate --network kaia
```

## Smart Contracts Overview

### CreatorsHub Smart Contract
The contract handles:
- Content uploads and storage references
- Payment distribution for microtransactions
- Subscription management
- NFT minting and trading

### Deployment on Kaia Blockchain
- The smart contracts are deployed on the Kaia blockchain.
- Interactions happen through Web3.js and MetaMask.

## Usage Guide

1. **Connect Wallet**: Users must connect their MetaMask wallet to interact with the DApp.
2. **Upload Content**: Creators can upload videos, music, blogs, and art.
3. **Monetize Content**: Set up microtransactions, subscriptions, and NFT sales.
4. **Engage with Fans**: Fans can purchase, subscribe, or tip creators.
5. **Explore NFTs**: Users can buy, sell, and trade NFTs in the marketplace.

## Contributing

We welcome contributions! Follow these steps:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to your fork and submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, reach out via:
- Email: support@creatorshub.io
- Discord: [Join our community](https://discord.gg/creatorshub)
- Twitter: [@CreatorsHub](https://twitter.com/CreatorsHub)

