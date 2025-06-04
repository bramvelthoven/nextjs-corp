"use client"

import { useRef } from "react"
import { useGsapFadeIn } from "@/hooks/useGsapFadeIn"
import { PricingCard } from "@/components/pricing-card"
import { PLANS } from "@/lib/stripe"

const plans = [
  {
    name: "Free",
    price: "Free" as const,
    description: "Get started with basic features.",
    features: [
      "Limited AI therapy sessions (5/month)",
      "Basic mood tracking",
      "Community support",
    ],
    popular: false,
    isFree: true,
  },
  {
    name: PLANS.starter.name,
    price: PLANS.starter.price,
    priceId: PLANS.starter.priceId,
    description: "Perfect for getting started with regular therapy.",
    features: PLANS.starter.features,
    popular: false,
  },
  {
    name: PLANS.professional.name,
    price: PLANS.professional.price,
    priceId: PLANS.professional.priceId,
    description: "Most popular for ongoing therapy needs.",
    features: PLANS.professional.features,
    popular: true,
  },
  {
    name: PLANS.premium.name,
    price: PLANS.premium.price,
    priceId: PLANS.premium.priceId,
    description: "Complete therapy solution with human support.",
    features: PLANS.premium.features,
    popular: false,
  },
]

export function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useGsapFadeIn(sectionRef);

  return (
    <section ref={sectionRef} className="flex flex-col items-center justify-center min-h-full py-12 px-4 bg-background">
      <h1 className="text-4xl font-bold mb-2 text-primary">Pricing Plans</h1>
      <p className="mb-10 text-lg text-foreground/80 text-center max-w-2xl">
        Choose the plan that fits your needs. Upgrade, downgrade, or cancel anytime.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {plans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} />
        ))}
      </div>
    </section>
    
  )
}