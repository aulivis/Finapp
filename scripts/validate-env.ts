#!/usr/bin/env tsx
/**
 * Environment variable validation script
 * Run this before deployment to ensure all required variables are set
 */

import { validateEnv } from '../lib/utils/env'

try {
  validateEnv()
  console.log('✅ All required environment variables are set')
  process.exit(0)
} catch (error) {
  console.error('❌ Environment validation failed:')
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
}
