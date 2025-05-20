import { useRef } from "react";
import { MessageSquareMore } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapFadeUpStagger } from "@/hooks/useGsapFadeUpStagger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { title: "Chat with a licensed therapist", text: "Licensed therapists use the latest techniques to help you improve your mental health." },
  { title: "Get the latest therapy techniques", text: "Licensed therapists use the latest techniques to help you improve your mental health." },
  { title: "Use at your own pace", text: "Licensed therapists use the latest techniques to help you improve your mental health." },
  { title: "Improve your mental health", text: "Licensed therapists use the latest techniques to help you improve your mental health." },
];

export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
    // Use the reusable GSAP hook for fade-up stagger
    useGsapFadeUpStagger(sectionRef, ".feature-card");

  return (
    <section className="px-6 py-12" ref={sectionRef}>
      <h3 className="text-xl font-semibold mb-6">Facts about therapy</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, idx) => (
          <Card
            key={idx}
            className="feature-card text-primary gap-0 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-muted/40"
          >
            <CardHeader className="pb-2">
              <MessageSquareMore size={24} className="text-primary" />
              <CardTitle className="text-sm font-semibold">
                {idx + 1}. {f.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-secondary-accent">
                {f.text}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}