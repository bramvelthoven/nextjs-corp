'use client'
import { HeroSection } from "@/components/herosection";
import { Testimonials } from "@/components/testimonials";
import { Features } from "@/components/features";
import  { MethodsCarousel } from "@/components/methods-carousel";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Testimonials />
      <Features />
      <MethodsCarousel />
    </>
  )
}