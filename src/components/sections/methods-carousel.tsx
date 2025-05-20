"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import  { useGsapFadeUpStagger } from "@/components/hooks/useGsapFadeUpStagger";
const methods = [
  {
    title: "Cognitive Behavioral Therapy (CBT)",
    description:
      "A structured, goal-oriented approach to therapy that focuses on changing negative thought patterns.",
    image: "/methods-carousel-1.png",
  },
  {
    title: "Mindfulness-Based Therapy",
    description:
      "Uses mindfulness practices to help you become more aware of your thoughts and feelings.",
    image: "/methods-carousel-2.png",
  },
  {
    title: "Solution-Focused Therapy",
    description:
      "Concentrates on finding solutions in the present time and exploring your hope for the future.",
    image: "/methods-carousel-3.png",
  },
  {
    title: "Acceptance & Commitment Therapy (ACT)",
    description:
      "Helps you accept what is out of your control and commit to actions that improve your life.",
    image: "/methods-carousel-4.png",
  },
  // Add more methods as needed
];

export function MethodsCarousel() {

    const sectionRef = useRef<HTMLDivElement>(null);
    useGsapFadeUpStagger(sectionRef, ".method-card");

  return (
    <div
    ref={sectionRef} 
    className="flex flex-col items-center justify-center w-full h-full p-4 mt-10">
      <h2 className="text-2xl font-bold text-center">Explore Our Therapy Methods</h2>
      <p className="mt-2 text-center">
        Discover the various therapy methods we offer to support your mental health journey.
      </p>
      {/* Grid for md+ screens, carousel for small screens */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6 w-full max-w-5xl">
        {methods.map((method, idx) => (
          <Card
            key={idx}
            className="method-card border rounded-xl shadow-md p-0 pb-6 gap-0 bg-card flex flex-col items-center overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-muted/40"
            style={{ minHeight: 340 }}
          >
            <CardHeader className="w-full p-0">
              <div className="relative w-full h-40">
                <Image
                  src={method.image}
                  alt={method.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 225px"
                  priority={idx === 0}
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center p-4 w-full">
              <CardTitle className="text-xl font-semibold text-center">{method.title}</CardTitle>
              <p className="mt-2 text-center text-secondary-accent">{method.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="block md:hidden w-full mt-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3500,
            }),
          ]}
          className="px-6"
        >
          <CarouselContent>
            {methods.map((method, idx) => (
              <CarouselItem key={idx}>
                <Card className="method-card border rounded-xl shadow-md p-0 pb-6 gap-4 bg-card flex flex-col items-center overflow-hidden mx-2 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-muted/40" style={{ minHeight: 340 }}>
                  <CardHeader className="w-full p-0">
                    <div className="relative w-full h-40">
                      <Image
                        src={method.image}
                        alt={method.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority={idx === 0}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-center items-center p-4 w-full">
                    <CardTitle className="text-xl font-semibold text-center">{method.title}</CardTitle>
                    <p className="mt-2 text-center text-secondary-accent">{method.description}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20" />
        </Carousel>
      </div>
    </div>
  );
}