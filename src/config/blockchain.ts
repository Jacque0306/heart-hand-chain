// Blockchain configuration for HelpChain
export const BLOCKCHAIN_CONFIG = {
  // RPC URLs - Add your Alchemy/Infura/Polygon RPC URL here
  RPC_URL: import.meta.env.VITE_RPC_URL || "https://rpc-amoy.polygon.technology/", // Polygon Amoy testnet (formerly Mumbai)
  
  // Network details
  CHAIN_ID: 80002, // Polygon Amoy testnet
  CHAIN_NAME: "Polygon Amoy Testnet",
  
  // Block explorer
  BLOCK_EXPLORER: "https://amoy.polygonscan.com",
  
  // Smart contract address (deploy your contract and update this)
  CONTRACT_ADDRESS: import.meta.env.VITE_CONTRACT_ADDRESS || "",
  
  // Native currency
  NATIVE_CURRENCY: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
};

// Helper to get the correct RPC URL
export const getRpcUrl = (): string => {
  return BLOCKCHAIN_CONFIG.RPC_URL;
};

// Helper to get block explorer URL for transaction
export const getExplorerUrl = (txHash: string): string => {
  return `${BLOCKCHAIN_CONFIG.BLOCK_EXPLORER}/tx/${txHash}`;
};

// Helper to get block explorer URL for address
export const getAddressExplorerUrl = (address: string): string => {
  return `${BLOCKCHAIN_CONFIG.BLOCK_EXPLORER}/address/${address}`;
};
