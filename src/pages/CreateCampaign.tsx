import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateCampaign() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate smart contract interaction
    setTimeout(() => {
      toast({
        title: "Campaign Created!",
        description: "Your campaign has been deployed to the blockchain.",
      });
      setIsSubmitting(false);
      navigate("/campaigns");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Create Campaign</h1>
            <p className="text-muted-foreground">
              Launch a transparent, blockchain-verified fundraising campaign
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
              <CardDescription>
                All information will be stored on-chain and publicly visible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Campaign Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Emergency Food Relief"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your campaign's purpose and impact..."
                    rows={5}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal">Funding Goal (ETH) *</Label>
                    <Input
                      id="goal"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="10.0"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wallet">Recipient Wallet *</Label>
                    <Input
                      id="wallet"
                      placeholder="0x..."
                      required
                    />
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <h4 className="font-semibold text-sm">⚡ Smart Contract Details</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Campaign will be deployed to Polygon Mumbai testnet</li>
                    <li>• All donations tracked immutably on-chain</li>
                    <li>• You'll maintain full control via your wallet</li>
                    <li>• Gas fees required for deployment</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Deploying to Blockchain..." : "Create Campaign"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
