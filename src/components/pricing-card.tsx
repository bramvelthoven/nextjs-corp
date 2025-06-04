'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getStripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface PricingCardProps {
  plan: {
    name: string
    price: number | 'Free'
    priceId?: string
    description: string
    features: string[]
    popular?: boolean
    isFree?: boolean
  }
}

export function PricingCard({ plan }: PricingCardProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubscribe = async () => {
    try {
      setLoading(true)

      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        router.push('/auth/login')
        return
      }

      // If it's the free plan, redirect to dashboard
      if (plan.isFree) {
        router.push('/dashboard')
        return
      }

      if (!plan.priceId) {
        throw new Error('Price ID not found')
      }

      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.priceId,
        }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      // Redirect to Stripe Checkout
      const stripe = await getStripe()
      await stripe?.redirectToCheckout({ sessionId })

    } catch (error) {
      console.error('Error:', error)
      alert('Er is een fout opgetreden. Probeer het opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      className={`flex flex-col justify-between border-2 transition-all duration-200 hover:border-secondary-accent ${
        plan.popular
          ? "border-primary shadow-lg scale-105"
          : "border-border"
      }`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          {plan.name}
          {plan.popular && (
            <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
              Most Popular
            </span>
          )}
        </CardTitle>
        <div className="mt-4 text-4xl font-bold text-primary">
          {typeof plan.price === 'number' ? `€${plan.price}/mo` : plan.price}
        </div>
        <div className="mt-2 text-foreground/70 text-base">{plan.description}</div>
      </CardHeader>
      <CardContent>
        <ul className="mt-4 space-y-2">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-foreground">
              <span className="inline-block w-2 h-2 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full mt-4"
          variant={plan.popular ? "default" : "outline"}
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? 'Loading...' : (plan.isFree ? 'Get Started' : 'Subscribe')}
        </Button>
      </CardFooter>
    </Card>
  )
}