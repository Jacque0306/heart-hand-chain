import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { ArrowUpRight, Coins, Package, CheckCircle2, TruckIcon, Inbox } from "lucide-react";
import { useState } from "react";

// Mock data
const mockCampaign = {
  id: 1,
  title: "Emergency Food Relief for Earthquake Victims",
  description: "Providing essential food supplies to families affected by the recent earthquake in rural communities. The funds will be used to purchase and distribute rice, canned goods, water, and other necessities to over 500 families in need.",
  goal: 10,
  raised: 6.5,
  creator: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  wallet: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  active: true,
};

const mockDonations = [
  {
    id: 1,
    donor: "0x742d35...0bEb",
    amount: 2.5,
    tipo: "Dinero",
    timestamp: "2025-01-15 14:32",
    status: "Entregada",
    txHash: "0xabc123...",
  },
  {
    id: 2,
    donor: "0x9f2e83...3a9c",
    amount: 0,
    tipo: "Víveres",
    metadataCID: "QmX4...",
    description: "50kg rice, 30kg beans, water bottles",
    timestamp: "2025-01-14 10:15",
    status: "EnCamino",
    txHash: "0xdef456...",
  },
  {
    id: 3,
    donor: "0x1a4b92...7f3e",
    amount: 1.2,
    tipo: "Dinero",
    timestamp: "2025-01-13 16:48",
    status: "Entregada",
    txHash: "0xghi789...",
  },
];

export default function CampaignDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [donationType, setDonationType] = useState<"money" | "goods">("money");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const progress = (mockCampaign.raised / mockCampaign.goal) * 100;

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Donation Successful!",
        description: "Your donation has been recorded on the blockchain.",
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Recibida":
        return <Inbox className="h-4 w-4" />;
      case "EnCamino":
        return <TruckIcon className="h-4 w-4" />;
      case "Entregada":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Recibida":
        return "bg-warning";
      case "EnCamino":
        return "bg-primary";
      case "Entregada":
        return "bg-success";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{mockCampaign.title}</h1>
                <p className="text-muted-foreground text-lg">{mockCampaign.description}</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-2xl font-bold">{mockCampaign.raised} ETH</span>
                      <span className="text-muted-foreground">of {mockCampaign.goal} ETH</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Campaign Creator</p>
                      <p className="font-mono text-sm">{mockCampaign.creator.slice(0, 10)}...</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Recipient Wallet</p>
                      <p className="font-mono text-sm">{mockCampaign.wallet.slice(0, 10)}...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Donations List */}
              <Card>
                <CardHeader>
                  <CardTitle>Donation History</CardTitle>
                  <CardDescription>All donations verified on-chain</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockDonations.map((donation) => (
                      <div key={donation.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge variant={donation.tipo === "Dinero" ? "default" : "secondary"}>
                                {donation.tipo === "Dinero" ? <Coins className="h-3 w-3 mr-1" /> : <Package className="h-3 w-3 mr-1" />}
                                {donation.tipo}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{donation.timestamp}</span>
                            </div>
                            <p className="font-mono text-sm">{donation.donor}</p>
                            {donation.description && (
                              <p className="text-sm text-muted-foreground">{donation.description}</p>
                            )}
                          </div>
                          {donation.amount > 0 && (
                            <p className="text-lg font-bold">{donation.amount} ETH</p>
                          )}
                        </div>

                        {/* Status Timeline */}
                        <div className="flex items-center gap-2 pt-2">
                          <div className={`h-2 w-2 rounded-full ${getStatusColor("Recibida")}`} />
                          <div className={`flex-1 h-0.5 ${donation.status !== "Recibida" ? getStatusColor(donation.status) : "bg-muted"}`} />
                          <div className={`h-2 w-2 rounded-full ${donation.status === "EnCamino" || donation.status === "Entregada" ? getStatusColor(donation.status) : "bg-muted"}`} />
                          <div className={`flex-1 h-0.5 ${donation.status === "Entregada" ? getStatusColor("Entregada") : "bg-muted"}`} />
                          <div className={`h-2 w-2 rounded-full ${donation.status === "Entregada" ? getStatusColor("Entregada") : "bg-muted"}`} />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(donation.status)}
                            <span className="text-sm font-medium">
                              {donation.status === "EnCamino" ? "En Camino" : donation.status}
                            </span>
                          </div>
                          <a
                            href={`https://mumbai.polygonscan.com/tx/${donation.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            View on Explorer <ArrowUpRight className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Make a Donation</CardTitle>
                  <CardDescription>Support this campaign with crypto or goods</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDonate} className="space-y-4">
                    <Tabs value={donationType} onValueChange={(v) => setDonationType(v as any)}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="money">💰 Money</TabsTrigger>
                        <TabsTrigger value="goods">📦 Goods</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="money" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="amount">Amount (ETH)</Label>
                          <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.1"
                            required
                          />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="goods" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="goods-description">Description</Label>
                          <Textarea
                            id="goods-description"
                            placeholder="e.g., 50kg rice, water bottles..."
                            rows={3}
                            required
                          />
                        </div>
                      </TabsContent>
                    </Tabs>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Processing..." : "Donate Now"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Donation will be recorded on Polygon Mumbai testnet
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
