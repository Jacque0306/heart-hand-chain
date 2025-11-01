import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Users, TrendingUp, Target } from "lucide-react";

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
  const isCompleted = progress >= 100;

  return (
    <Card className="group overflow-hidden hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/20">
      {image && (
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          {isCompleted && (
            <Badge className="absolute top-3 right-3 bg-success text-success-foreground">
              <Target className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
          {!isCompleted && progress > 50 && (
            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
              <TrendingUp className="h-3 w-3 mr-1" />
              {Math.round(progress)}%
            </Badge>
          )}
        </div>
      )}
      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pb-3">
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <div>
              <span className="text-2xl font-bold text-foreground">{raised}</span>
              <span className="text-sm text-muted-foreground ml-1">ETH</span>
            </div>
            <span className="text-sm text-muted-foreground">of {goal} ETH</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="font-medium">{donorCount}</span>
            <span>donors</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {Math.round(progress)}% funded
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/campaign/${id}`} className="w-full">
          <Button className="w-full group-hover:shadow-glow transition-all">
            View Campaign
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
