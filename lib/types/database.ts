export interface UserAccess {
  id: string
  email: string
  access_valid_until: string
  stripe_customer_id: string | null
  stripe_checkout_session_id: string | null
  created_at: string
  updated_at: string
}

export interface CalculatorUsage {
  id: string
  email: string | null
  calculator_type: string
  accessed_at: string
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

export interface EmailLog {
  id: string
  email: string
  email_type: string
  subject: string
  sent_at: string
  status: 'sent' | 'failed' | 'bounced'
  error_message: string | null
  metadata: Record<string, any> | null
}

export interface AIGeneratedContent {
  id: string
  content_type: string
  period: string
  country: string
  title: string | null
  content: string
  status: 'pending' | 'approved' | 'rejected'
  reviewed_at: string | null
  reviewed_by: string | null
  metadata: Record<string, any> | null
  created_at: string
  updated_at: string
}
