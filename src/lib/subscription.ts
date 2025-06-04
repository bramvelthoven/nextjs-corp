import { createClient } from '@/lib/supabase/server'
import { UserProfile } from '@/types/profile'

export async function checkSubscription(userId: string): Promise<{
  hasAccess: boolean
  subscription: UserProfile['subscription_status']
  plan: UserProfile['subscription_plan']
}> {
  const supabase = await createClient()
  
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('subscription_status, subscription_plan')
    .eq('user_id', userId)
    .single()

  if (!profile) {
    return { hasAccess: false, subscription: null, plan: 'free' }
  }

  // Free plan always has access to basic features
  if (!profile.subscription_status || profile.subscription_plan === 'free') {
    return { hasAccess: true, subscription: null, plan: 'free' }
  }

  // Check if paid subscription is active
  const hasAccess = profile.subscription_status === 'active'
  
  return {
    hasAccess,
    subscription: profile.subscription_status,
    plan: profile.subscription_plan || 'free'
  }
}

export function getFeatureAccess(plan: UserProfile['subscription_plan']) {
  switch (plan) {
    case 'premium':
      return {
        aiChatLimit: null, // unlimited
        humanTherapist: true,
        videoSessions: true,
        prioritySupport: true,
        customPlans: true,
        familyTherapy: true,
        crisisSupport: true
      }
    case 'professional':
      return {
        aiChatLimit: null, // unlimited
        humanTherapist: true,
        videoSessions: false,
        prioritySupport: true,
        customPlans: true,
        familyTherapy: false,
        crisisSupport: false
      }
    case 'starter':
      return {
        aiChatLimit: 100, // per month
        humanTherapist: false,
        videoSessions: false,
        prioritySupport: false,
        customPlans: false,
        familyTherapy: false,
        crisisSupport: false
      }
    case 'free':
    default:
      return {
        aiChatLimit: 5, // per month
        humanTherapist: false,
        videoSessions: false,
        prioritySupport: false,
        customPlans: false,
        familyTherapy: false,
        crisisSupport: false
      }
  }
}