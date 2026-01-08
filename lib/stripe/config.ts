import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
  maxNetworkRetries: 2,
  timeout: 20000,
})

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || ''

if (!STRIPE_PRICE_ID) {
  console.warn('STRIPE_PRICE_ID is not set. Stripe checkout will not work.')
}
