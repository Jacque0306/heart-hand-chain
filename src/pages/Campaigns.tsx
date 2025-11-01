import { Navbar } from "@/components/Navbar";
import { CampaignCard } from "@/components/CampaignCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock data - will be replaced with smart contract data
const mockCampaigns = [
  {
    id: 1,
    title: "Emergency Food Relief for Earthquake Victims",
    description: "Providing essential food supplies to families affected by the recent earthquake in rural communities.",
    goal: 10,
    raised: 6.5,
    donorCount: 23,
  },
  {
    id: 2,
    title: "School Supplies for Underprivileged Children",
    description: "Help us provide books, uniforms, and learning materials to children in need.",
    goal: 5,
    raised: 3.2,
    donorCount: 15,
  },
  {
    id: 3,
    title: "Clean Water Initiative",
    description: "Building water filtration systems in communities without access to clean drinking water.",
    goal: 20,
    raised: 12.8,
    donorCount: 42,
  },
  {
    id: 4,
    title: "Medical Equipment for Local Clinic",
    description: "Urgent need for medical supplies and equipment to serve remote village healthcare.",
    goal: 15,
    raised: 8.3,
    donorCount: 28,
  },
];

export default function Campaigns() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Active Campaigns</h1>
            <p className="text-muted-foreground mb-6">
              Support transparent, blockchain-verified charitable campaigns
            </p>
            
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
