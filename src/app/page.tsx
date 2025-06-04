'use client'
import { lazy, Suspense } from "react";
import { HeroSection } from "@/components/sections/herosection";

const LazyTestimonials = lazy(() => import("@/components/sections/testimonials").then(module => ({ default: module.Testimonials })));
const LazyFeatures = lazy(() => import("@/components/sections/features").then(module => ({ default: module.Features })));
const LazyMethodsCarousel = lazy(() => import("@/components/sections/methods-carousel").then(module => ({ default: module.MethodsCarousel })));

export default function HomePage() {
  return (
    <div className="pt-8">
      <HeroSection />
      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
        <LazyTestimonials />
      </Suspense>
      <Suspense fallback={<div className="h-32 flex items-center justify-center">Loading...</div>}>
        <LazyFeatures />
      </Suspense>
      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
        <LazyMethodsCarousel />
      </Suspense>
    </div>
  )
}