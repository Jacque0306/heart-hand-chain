import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import logoHelpChain from "@/assets/logo-helpchain.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <div className="flex justify-center mb-8">
              <img src={logoHelpChain} alt="HelpChain Logo" className="h-32 w-32 drop-shadow-glow" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Transparent Donations
              <br />
              Powered by Blockchain
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every donation tracked on-chain. Every step transparent. Every impact verified.
              Join the future of charitable giving with HelpChain.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/campaigns">
                <Button size="lg" className="gap-2 shadow-glow">
                  Explore Campaigns <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/create">
                <Button size="lg" variant="outline" className="gap-2">
                  Create Campaign
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why HelpChain?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Transparent</h3>
              <p className="text-muted-foreground">
                Every transaction recorded on the blockchain. Track your donations from start to delivery.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Impact</h3>
              <p className="text-muted-foreground">
                Donations reach campaigns immediately. No intermediaries, no delays.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
                <Globe className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Access</h3>
              <p className="text-muted-foreground">
                Support causes worldwide. Borderless donations with cryptocurrency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="rounded-2xl bg-gradient-hero p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 opacity-90">
              Connect your wallet and start supporting causes that matter.
            </p>
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2025 HelpChain. Donations secured by Solidity smart contracts.</p>
        </div>
      </footer>
    </div>
  );
}
