import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";

interface CampaignCardProps {
  id: number;
  title: string;
  description: string;
  goal: number;
  raised: number;
  donorCount: number;
  image?: string;
}

export const CampaignCard = ({ id, title, description, goal, raised, donorCount, image }: CampaignCardProps) => {
  const progress = (raised / goal) * 100;

  return (
    <Card className="overflow-hidden hover:shadow-glow transition-all duration-300">
      {image && (
        <div className="h-48 w-full overflow-hidden">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold">{raised} ETH</span>
            <span className="text-muted-foreground">of {goal} ETH</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{donorCount} donors</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/campaign/${id}`} className="w-full">
          <Button className="w-full">View Campaign</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
