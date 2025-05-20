"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { useGsapFadeIn } from "@/components/hooks/useGsapFadeIn"

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Get started with basic features.",
    features: [
      "Access to basic therapy tools",
      "Limited chat with AI therapist",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19/mo",
    description: "Unlock advanced features and priority support.",
    features: [
      "Everything in Starter",
      "Unlimited AI therapy sessions",
      "1:1 chat with licensed therapist (2/month)",
      "Personalized progress tracking",
      "Priority email support",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Premium",
    price: "$49/mo",
    description: "Full access for individuals who want the best support.",
    features: [
      "Everything in Pro",
      "Unlimited 1:1 therapist sessions",
      "Video calls with therapists",
      "Personalized therapy plans",
      "Direct therapist messaging",
      "24/7 priority support",
    ],
    cta: "Go Premium",
    popular: false,
  },
]

export function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useGsapFadeIn(sectionRef);

  return (
    <section ref={sectionRef} className="flex flex-col items-center justify-center min-h-full py-12 px-4 bg-[color-background]">
      <h1 className="text-4xl font-bold mb-2 text-[color-primary]">Pricing Plans</h1>
      <p className="mb-10 text-lg text-[color-foreground]/80 text-center max-w-2xl">
        Choose the plan that fits your needs. Upgrade, downgrade, or cancel anytime.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col justify-between border-2 transition-all duration-200 hover:border-secondary-accent ${
              plan.popular
                ? "border-[color-primary] shadow-lg scale-105"
                : "border-border"
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                {plan.name}
                {plan.popular && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-[color-primary] text-[color-primary-foreground]">
                    Most Popular
                  </span>
                )}
              </CardTitle>
              <div className="mt-4 text-4xl font-bold text-[color-primary]">{plan.price}</div>
              <div className="mt-2 text-[color-foreground]/70 text-base">{plan.description}</div>
            </CardHeader>
            <CardContent>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-[color-foreground]">
                    <span className="inline-block w-2 h-2 rounded-full bg-[color-primary]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full mt-4 ${
                  plan.popular
                    ? "bg-[color-primary] text-[color-primary-foreground] hover:bg-[color-primary]/90"
                    : "border border-[color-primary] text-[color-primary] bg-transparent hover:bg-[color-primary]/10"
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
    
  )
}