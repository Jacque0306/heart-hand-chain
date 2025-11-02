import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";
import logoHelpChain from "@/assets/logo-helpchain-transparent.png";

interface NavbarProps {
  onConnectWallet?: () => void;
  walletAddress?: string;
}

export const Navbar = ({ onConnectWallet, walletAddress }: NavbarProps) => {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoHelpChain} alt="HelpChain Logo" className="h-10 w-10" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">HelpChain</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/campaigns" className="text-sm font-medium hover:text-primary transition-colors">
              Campaigns
            </Link>
            <Link to="/create" className="text-sm font-medium hover:text-primary transition-colors">
              Create Campaign
            </Link>
            
            {walletAddress ? (
              <Button variant="outline" className="gap-2">
                <Wallet className="h-4 w-4" />
                {formatAddress(walletAddress)}
              </Button>
            ) : (
              <Button onClick={onConnectWallet} className="gap-2">
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
