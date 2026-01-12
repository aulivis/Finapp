export interface NewsletterSubscriber {
  id: string
  email: string
  subscribed_at: string
  unsubscribed_at: string | null
  is_active: boolean
}

export interface MacroData {
  id: string
  country: string
  year: number
  inflation_rate: number
  interest_rate: number | null
  m2_growth: number | null
  source: string
  created_at: string
  updated_at: string
}

