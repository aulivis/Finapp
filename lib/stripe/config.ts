import Stripe from 'stripe'

let stripeInstance: Stripe | null = null

function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
      maxNetworkRetries: 2,
      timeout: 20000,
    })
  }
  return stripeInstance
}

// Lazy initialization - only creates Stripe instance when accessed at runtime
// This prevents build-time errors when environment variables are not set
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const instance = getStripe()
    const value = instance[prop as keyof Stripe]
    if (typeof value === 'function') {
      return value.bind(instance)
    }
    return value
  }
}) as Stripe

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || ''

if (!STRIPE_PRICE_ID && process.env.NODE_ENV !== 'production') {
  console.warn('STRIPE_PRICE_ID is not set. Stripe checkout will not work.')
}
