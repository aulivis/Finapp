/**
 * Script to send quarterly update emails manually
 * 
 * Usage:
 *   npm run send-quarterly-email
 * 
 * This script can be run manually or scheduled via cron
 */

import { sendQuarterlyUpdateEmails } from '../lib/email/quarterly-update'

async function main() {
  console.log('Starting quarterly email send...')
  console.log(`Time: ${new Date().toISOString()}`)
  
  const result = await sendQuarterlyUpdateEmails()
  
  console.log('\n=== Results ===')
  console.log(`Sent: ${result.sent}`)
  console.log(`Failed: ${result.failed}`)
  
  if (result.errors.length > 0) {
    console.log('\nErrors:')
    result.errors.forEach(({ email, error }) => {
      console.log(`  - ${email}: ${error}`)
    })
  }
  
  if (result.sent === 0 && result.failed === 0) {
    console.log('\nNo emails were sent. This might be because:')
    console.log('  - Quarterly email was already sent this quarter')
    console.log('  - No users with valid access found')
  }
}

// Run if executed directly
if (require.main === module) {
  main()
    .then(() => {
      console.log('\nScript completed successfully')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\nScript failed:', error)
      process.exit(1)
    })
}

export { main as sendQuarterlyEmail }
