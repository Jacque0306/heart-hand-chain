# HelpChain - Blockchain Donation Platform

## Overview
HelpChain is a transparent donation platform powered by Solidity smart contracts. Every donation is tracked immutably on-chain, from receipt to delivery.

## Smart Contract Features

### Core Functionality
- **Campaign Management**: Create campaigns with funding goals and recipient wallets
- **Dual Donation Types**: 
  - Monetary donations (ETH/MATIC)
  - In-kind donations (tracked via IPFS metadata)
- **Status Tracking**: Three-stage delivery verification (Recibida → En Camino → Entregada)
- **Transparent Withdrawals**: Campaign creators can withdraw funds to designated wallets

### Contract Address
Deploy to: Polygon Mumbai or Sepolia testnet
Contract: `contracts/HelpChainDonations.sol`

## Frontend Stack
- **React** + **Vite** + **TypeScript**
- **TailwindCSS** for styling
- **ethers.js** for blockchain interaction
- **shadcn/ui** component library

## Deployment Guide

### Prerequisites
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npm install ethers
```

### Environment Setup
Create `.env` file:
```
PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://rpc-mumbai.maticvigil.com/
# Or for Sepolia: https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

### Deploy Contract
```bash
npx hardhat run scripts/deploy.js --network mumbai
```

### Frontend Configuration
Update `src/config/contract.ts` with deployed contract address:
```typescript
export const CONTRACT_ADDRESS = "0x..."; // Your deployed contract
export const NETWORK = "mumbai"; // or "sepolia"
```

## How It Works

### 1. Create Campaign
Campaign creators specify:
- Title and description
- Funding goal (in ETH/MATIC)
- Recipient wallet address

### 2. Donate
Donors can contribute via:
- **Money**: Send ETH/MATIC directly
- **Goods**: Register in-kind donations with IPFS metadata

### 3. Track Progress
Every donation shows:
- Transaction hash (verify on block explorer)
- Current status (Recibida/En Camino/Entregada)
- Timestamp and donor address

### 4. Withdraw Funds
Campaign creators withdraw raised funds to designated wallet via smart contract function.

## Smart Contract Methods

### Public Functions
- `createCampaign(title, description, goal, walletReceiver)`
- `donate(campaignId, tipo, metadataCID) payable`
- `updateDonationStatus(donationId, newStatus)`
- `withdraw(campaignId)`
- `getCampaign(campaignId)` view
- `getDonationsForCampaign(campaignId)` view

### Events
- `CampaignCreated`
- `DonationMade`
- `DonationStatusUpdated`
- `Withdrawal`

## Testing

### Hardhat Tests
```bash
npx hardhat test
```

### Local Development
```bash
npm run dev
```

### Testnet Testing
1. Get testnet tokens from faucet
2. Connect MetaMask to Mumbai/Sepolia
3. Interact with deployed contract via UI

## Security Features
- Reentrancy protection on withdrawals
- Access control (only campaign creators can withdraw)
- Input validation on all functions
- Event emission for all state changes

## Architecture

```
Frontend (React)
    ↓ ethers.js
Smart Contract (Solidity)
    ↓ Events
Blockchain (Polygon/Sepolia)
```

Optional: Add backend indexer for faster queries
```
Backend (Node.js)
    ↓ Listen to events
MongoDB (Cache)
    ↓ REST API
Frontend
```

## Next Steps
1. Deploy smart contract to testnet
2. Update frontend config with contract address
3. Test wallet connection (MetaMask)
4. Create test campaign
5. Make test donation
6. Verify transaction on block explorer

## Resources
- [Hardhat Documentation](https://hardhat.org/docs)
- [Polygon Mumbai Faucet](https://faucet.polygon.technology/)
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [ethers.js Docs](https://docs.ethers.org/)

---
Built with ❤️ for transparent charitable giving
