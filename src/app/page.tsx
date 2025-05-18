'use client'

import  { HeroSection } from "@/components/herosection";
import { Testimonials } from "@/components/testimonials";
import { Features } from "@/components/features";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Testimonials />
      <Features />
    </>
  )
}