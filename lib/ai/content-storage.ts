/**
 * Functions for storing and retrieving AI-generated content
 */

import { supabaseAdmin } from '@/lib/supabase/server'
import { AIGeneratedContent } from '@/lib/types/database'

/**
 * Get AI-generated content for a specific period and type
 */
export async function getAIContent(
  contentType: string,
  period: string,
  country: string = 'HU'
): Promise<AIGeneratedContent | null> {
  const { data, error } = await supabaseAdmin
    .from('ai_generated_content')
    .select('*')
    .eq('content_type', contentType)
    .eq('period', period)
    .eq('country', country)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

/**
 * Get approved AI-generated content (for use in emails)
 */
export async function getApprovedAIContent(
  contentType: string,
  period: string,
  country: string = 'HU'
): Promise<AIGeneratedContent | null> {
  const { data, error } = await supabaseAdmin
    .from('ai_generated_content')
    .select('*')
    .eq('content_type', contentType)
    .eq('period', period)
    .eq('country', country)
    .eq('status', 'approved')
    .single()

  if (error || !data) {
    return null
  }

  return data
}

/**
 * Store AI-generated content
 */
export async function storeAIContent(
  contentType: string,
  period: string,
  content: string,
  title: string | null,
  metadata: Record<string, any>,
  country: string = 'HU'
): Promise<AIGeneratedContent> {
  const { data, error } = await supabaseAdmin
    .from('ai_generated_content')
    .upsert({
      content_type: contentType,
      period,
      country,
      title,
      content,
      status: 'pending', // Default to pending for review
      metadata,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'content_type,period,country',
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Error storing AI content: ${error.message}`)
  }

  return data
}

/**
 * Approve AI-generated content
 */
export async function approveAIContent(
  id: string,
  reviewedBy?: string
): Promise<void> {
  const { error } = await supabaseAdmin
    .from('ai_generated_content')
    .update({
      status: 'approved',
      reviewed_at: new Date().toISOString(),
      reviewed_by: reviewedBy || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    throw new Error(`Error approving AI content: ${error.message}`)
  }
}

/**
 * Reject AI-generated content
 */
export async function rejectAIContent(
  id: string,
  reviewedBy?: string
): Promise<void> {
  const { error } = await supabaseAdmin
    .from('ai_generated_content')
    .update({
      status: 'rejected',
      reviewed_at: new Date().toISOString(),
      reviewed_by: reviewedBy || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    throw new Error(`Error rejecting AI content: ${error.message}`)
  }
}

/**
 * Get pending content for review
 */
export async function getPendingContent(): Promise<AIGeneratedContent[]> {
  const { data, error } = await supabaseAdmin
    .from('ai_generated_content')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  if (error || !data) {
    return []
  }

  return data
}
