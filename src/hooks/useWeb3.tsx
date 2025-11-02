import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { BrowserProvider, JsonRpcProvider, JsonRpcSigner } from "ethers";
import { BLOCKCHAIN_CONFIG, getRpcUrl } from "@/config/blockchain";
import { useToast } from "@/hooks/use-toast";
import { ConnectButton, useActiveAccount, useActiveWallet } from "thirdweb/react";
import { client } from "@/config/thirdweb";

interface Web3ContextType {
  provider: BrowserProvider | JsonRpcProvider | null;
  signer: JsonRpcSigner | null;
  account: string | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<BrowserProvider | JsonRpcProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  // Initialize read-only provider on mount
  useEffect(() => {
    const rpcUrl = getRpcUrl();
    if (rpcUrl) {
      const readOnlyProvider = new JsonRpcProvider(rpcUrl);
      setProvider(readOnlyProvider);
    }
  }, []);

  // Check if wallet is already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            await connectWallet();
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to connect your wallet.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Create provider and signer
      const web3Provider = new BrowserProvider(window.ethereum);
      const web3Signer = await web3Provider.getSigner();
      const network = await web3Provider.getNetwork();

      setProvider(web3Provider);
      setSigner(web3Signer);
      setAccount(accounts[0]);
      setChainId(Number(network.chainId));

      // Check if on correct network
      if (Number(network.chainId) !== BLOCKCHAIN_CONFIG.CHAIN_ID) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: `0x${BLOCKCHAIN_CONFIG.CHAIN_ID.toString(16)}` }],
          });
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: `0x${BLOCKCHAIN_CONFIG.CHAIN_ID.toString(16)}`,
                    chainName: BLOCKCHAIN_CONFIG.CHAIN_NAME,
                    nativeCurrency: BLOCKCHAIN_CONFIG.NATIVE_CURRENCY,
                    rpcUrls: [getRpcUrl()],
                    blockExplorerUrls: [BLOCKCHAIN_CONFIG.BLOCK_EXPLORER],
                  },
                ],
              });
            } catch (addError) {
              toast({
                title: "Network Error",
                description: "Failed to add network to MetaMask.",
                variant: "destructive",
              });
            }
          }
        }
      }

      toast({
        title: "Wallet Connected",
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setSigner(null);
    // Keep read-only provider
    const rpcUrl = getRpcUrl();
    if (rpcUrl) {
      const readOnlyProvider = new JsonRpcProvider(rpcUrl);
      setProvider(readOnlyProvider);
    }
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else if (accounts[0] !== account) {
          setAccount(accounts[0]);
        }
      };

      const handleChainChanged = (_chainId: string) => {
        window.location.reload();
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, [account]);

  const value = {
    provider,
    signer,
    account,
    chainId,
    isConnected: !!account,
    isConnecting,
    connectWallet,
    disconnectWallet,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}
