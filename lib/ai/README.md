# AI Content Generation System

This system uses OpenAI API for batch generation of explanatory texts and macro-level summaries.

## Features

- **Batch generation only** - No real-time user prompts
- **Low temperature** (0.2) - Deterministic, review-ready output
- **Cached and stored** - All content stored in Supabase
- **Review-ready** - Content has 'pending' status until approved
- **Deterministic** - Same inputs produce consistent outputs

## Usage

### Generate Quarterly Content

Run the batch generation script:

```bash
npm run generate-quarterly-ai-content
```

This will:
1. Fetch latest economic data
2. Generate AI content using OpenAI API
3. Store content in database with 'pending' status
4. Content must be reviewed and approved before use

### Review and Approve Content

Content is stored with `status: 'pending'` and must be reviewed before use in emails.

To approve content, use the `approveAIContent()` function or update directly in Supabase:

```sql
UPDATE ai_generated_content 
SET status = 'approved', 
    reviewed_at = NOW(), 
    reviewed_by = 'admin'
WHERE id = 'content-id';
```

### Content Types

- `quarterly_summary` - Quarterly economic summary (includes inflation and M2 trends)
- `purchasing_power_explanation` - Explanation of purchasing power impact

### Integration with Emails

The quarterly email system automatically uses approved AI content if available, falling back to template content if not.

## Configuration

### Environment Variables

- `OPENAI_API_KEY` - Required: Your OpenAI API key
- `OPENAI_MODEL` - Optional: Model to use (default: `gpt-4o-mini`)
- Temperature is hardcoded to `0.2` for deterministic output

### Model Selection

- **gpt-4o-mini** (default) - Cost-effective, good quality
- **gpt-4o** - Higher quality, more expensive
- **gpt-3.5-turbo** - Cheaper, lower quality

## Content Storage

All generated content is stored in `ai_generated_content` table with:
- `content_type` - Type of content
- `period` - Period (YYYY-Q1, YYYY-Q2, YYYY-Q3, YYYY-Q4 format)
- `country` - Country code
- `content` - Generated text
- `status` - 'pending', 'approved', or 'rejected'
- `metadata` - Stores prompt, model, temperature, economic data, etc.

## Workflow

1. **Generate** - Run batch generation script quarterly
2. **Review** - Review generated content in database
3. **Approve** - Approve content that meets quality standards
4. **Use** - Approved content is automatically used in emails

## Quality Control

- Low temperature (0.2) ensures deterministic output
- System prompts enforce neutral, data-driven tone
- Content is review-ready before use
- Metadata tracks generation parameters for audit

## Cost Management

- Uses cost-effective model by default (gpt-4o-mini)
- Max tokens limited to 2000
- Batch generation only (no real-time calls)
- Content cached and reused

## Customization

Edit `lib/ai/openai-client.ts` to:
- Adjust system prompts
- Change temperature (not recommended - affects determinism)
- Modify content types
- Add new generation functions
