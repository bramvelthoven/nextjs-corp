import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
}

export const PRICE_IDS = {
  starter: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID!,
  professional: process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_PRICE_ID!,
  premium: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID!,
} as const

export const PLANS = {
  starter: {
    name: 'Starter',
    price: 29,
    priceId: PRICE_IDS.starter,
    features: [
      'Access to AI therapy chat',
      'Basic mood tracking',
      'Limited sessions per month',
      'Email support'
    ]
  },
  professional: {
    name: 'Professional', 
    price: 59,
    priceId: PRICE_IDS.professional,
    features: [
      'Unlimited AI therapy sessions',
      'Advanced mood tracking & analytics',
      'Access to human therapists',
      'Priority support',
      'Custom therapy plans'
    ]
  },
  premium: {
    name: 'Premium',
    price: 99,
    priceId: PRICE_IDS.premium,
    features: [
      'Everything in Professional',
      'Weekly 1-on-1 video sessions',
      '24/7 crisis support',
      'Family therapy access',
      'Custom therapy resources'
    ]
  }
} as const