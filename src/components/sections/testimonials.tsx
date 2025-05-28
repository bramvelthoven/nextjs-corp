"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGsapFadeUpStagger } from "@/components/hooks/useGsapFadeUpStagger";

const testimonials = [
  { image: "/person1.png", text: "I can't believe how much better I feel", author: "Sarah J." },
  { image: "/person2.png", text: "This is the best decision I've made in a long time", author: "Mike D." },
  { image: "/person3.png", text: "I'm so glad I tried this", author: "Emily R." },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Use the reusable GSAP hook for fade-up stagger
  useGsapFadeUpStagger(sectionRef, ".testimonial-card");

  return (
    <section className="px-6 py-12 max-w-5xl mx-auto" ref={sectionRef}>
      <h3 className="text-xl font-semibold mb-6 text-center md:text-start">Real people, real results</h3>
      {/* Grid for md+ screens */}
      <div className="hidden md:flex gap-4 flex-wrap">
        {testimonials.map((t, idx) => (
          <Card
            key={idx}
            className="w-[200px] testimonial-card justify-between gap-0 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-muted/40"
          >
            <CardHeader className="items-center">
              <Image
                height={96}
                width={96}
                src={t.image}
                alt="Testimonial"
                className="rounded-full object-cover mx-auto"
              />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-secondary-accent text-center">
                {t.text}
              </CardDescription>
              <div className="mt-2 text-xs text-center text-muted-foreground font-semibold">
                {t.author}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Carousel for small screens */}
      <div className="block md:hidden w-full mt-6">
        <div className="relative min-h-[340px]">
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
            className="px-6 overflow-visible"
          >
            <CarouselContent>
              {testimonials.map((t, idx) => (
                <CarouselItem key={idx}>
                  <Card className="max-w-xs w-full mx-auto justify-between gap-0 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-muted/40 testimonial-card">
                    <CardHeader className="items-center">
                      <Image
                        height={96}
                        width={96}
                        src={t.image}
                        alt="Testimonial"
                        className="rounded-full object-cover mx-auto"
                      />
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm text-secondary-accent text-center">
                        {t.text}
                      </CardDescription>
                      <div className="mt-2 text-xs text-center text-muted-foreground font-semibold">
                        {t.author}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-20" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-20" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}