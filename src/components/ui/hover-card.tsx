import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HoverCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
  className?: string;
}

export function HoverCard({ children, className, ...props }: HoverCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-muted/40",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}