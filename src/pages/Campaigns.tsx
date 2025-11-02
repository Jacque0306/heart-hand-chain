import { Navbar } from "@/components/Navbar";
import { CampaignCard } from "@/components/CampaignCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, TrendingUp, Target, Users, Filter } from "lucide-react";
import { useState } from "react";

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
  {
    id: 5,
    title: "Disaster Relief Housing Project",
    description: "Building temporary shelters for families displaced by natural disasters in coastal regions.",
    goal: 25,
    raised: 18.7,
    donorCount: 56,
  },
  {
    id: 6,
    title: "Digital Literacy Program for Seniors",
    description: "Teaching technology skills to elderly community members to help them stay connected.",
    goal: 8,
    raised: 8,
    donorCount: 34,
  },
  {
    id: 7,
    title: "Animal Rescue and Rehabilitation Center",
    description: "Creating a safe haven for abandoned and injured animals with medical care and adoption services.",
    goal: 30,
    raised: 22.4,
    donorCount: 67,
  },
  {
    id: 8,
    title: "Solar Panel Installation for Rural Schools",
    description: "Providing sustainable energy solutions for schools in remote areas without reliable electricity.",
    goal: 40,
    raised: 28.5,
    donorCount: 89,
  },
  {
    id: 9,
    title: "Mental Health Support Initiative",
    description: "Funding counseling services and support groups for communities affected by trauma.",
    goal: 12,
    raised: 5.4,
    donorCount: 19,
  },
  {
    id: 10,
    title: "Community Garden and Food Security",
    description: "Establishing urban gardens to provide fresh produce and education about sustainable farming.",
    goal: 7,
    raised: 4.1,
    donorCount: 26,
  },
  {
    id: 11,
    title: "Women's Entrepreneurship Fund",
    description: "Providing microloans and business training to women entrepreneurs in developing communities.",
    goal: 18,
    raised: 11.2,
    donorCount: 45,
  },
  {
    id: 12,
    title: "Emergency Medical Transport Vehicles",
    description: "Purchasing ambulances for remote regions where medical emergency response is limited.",
    goal: 50,
    raised: 35.8,
    donorCount: 102,
  },
];

export default function Campaigns() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const totalRaised = mockCampaigns.reduce((sum, c) => sum + c.raised, 0);
  const totalDonors = mockCampaigns.reduce((sum, c) => sum + c.donorCount, 0);
  const totalGoal = mockCampaigns.reduce((sum, c) => sum + c.goal, 0);

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && campaign.raised < campaign.goal;
    if (activeTab === "completed") return matchesSearch && campaign.raised >= campaign.goal;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <Badge variant="secondary" className="mb-4">
              <TrendingUp className="h-3 w-3 mr-1" />
              Blockchain-Verified Donations
            </Badge>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
              Active Campaigns
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Support transparent, blockchain-verified charitable campaigns. Every donation tracked on-chain.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="rounded-xl border bg-card p-6 shadow-soft hover:shadow-glow transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Total Raised</span>
              </div>
              <p className="text-3xl font-bold">{totalRaised} ETH</p>
              <p className="text-xs text-muted-foreground mt-1">of {totalGoal} ETH goal</p>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-soft hover:shadow-glow transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Total Donors</span>
              </div>
              <p className="text-3xl font-bold">{totalDonors}</p>
              <p className="text-xs text-muted-foreground mt-1">Generous contributors</p>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-soft hover:shadow-glow transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-success/10">
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Active Campaigns</span>
              </div>
              <p className="text-3xl font-bold">{mockCampaigns.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Making impact now</p>
            </div>
          </div>

          {/* Filters Section */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid w-full md:w-auto grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Campaigns Grid */}
          {filteredCampaigns.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} {...campaign} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No campaigns found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
