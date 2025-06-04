# Stripe Setup Guide

## Environment Variables

Add these to your `.env.local` file:

```bash
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (create these in your Stripe Dashboard)
NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PROFESSIONAL_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID=price_...
```

## Stripe Dashboard Setup

### 1. Create Products and Prices

In your Stripe Dashboard, create these products:

**Starter Plan**
- Name: Starter
- Price: €29/month (recurring)
- Copy the Price ID to `NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID`

**Professional Plan**
- Name: Professional  
- Price: €59/month (recurring)
- Copy the Price ID to `NEXT_PUBLIC_STRIPE_PROFESSIONAL_PRICE_ID`

**Premium Plan**
- Name: Premium
- Price: €99/month (recurring)
- Copy the Price ID to `NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID`

### 2. Setup Webhooks

1. Go to Developers > Webhooks in Stripe Dashboard
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

## Database Schema Updates

Add these columns to your `user_profiles` table:

```sql
ALTER TABLE user_profiles ADD COLUMN subscription_id TEXT;
ALTER TABLE user_profiles ADD COLUMN subscription_status TEXT;
ALTER TABLE user_profiles ADD COLUMN subscription_plan TEXT DEFAULT 'free';
ALTER TABLE user_profiles ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE user_profiles ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
```

## Testing

1. Use Stripe test mode with test cards:
   - Success: `4242 4242 4242 4242`
   - Declined: `4000 0000 0000 0002`

2. Test the flow:
   - Go to `/pricing`
   - Click on a paid plan
   - Complete checkout with test card
   - Verify webhook receives events
   - Check user can access dashboard

## Production Deployment

1. Replace test keys with live keys
2. Update webhook endpoint to production URL
3. Test with real payment methods
4. Monitor webhook delivery in Stripe Dashboard