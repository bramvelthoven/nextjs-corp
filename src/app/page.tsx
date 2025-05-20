'use client'
import { HeroSection } from "@/components/sections/herosection";
import { Testimonials } from "@/components/sections/testimonials";
import { Features } from "@/components/sections/features";
import  { MethodsCarousel } from "@/components/sections/methods-carousel";

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