# Medicine Reminder Email Notifications Setup

## Overview

This system sends automated email reminders to patients for their scheduled medicines using an external cron service.

## How It Works

1. **API Endpoint**: `/api/medicine-reminder/send-notifications`
2. **Trigger**: External cron service calls this API every 5 minutes
3. **Logic**: 
   - Finds active reminders (within date range, not taken)
   - Filters reminders due within ±5 minutes of current time
   - Sends email to patient with medicine details
4. **Security**: Requires Bearer token authentication

## Local Testing

### 1. Add a Test Reminder

1. Login as a patient
2. Go to Dashboard → Medicine Reminders
3. Add a reminder with time = current time + 2 minutes
4. Example: If now is 14:30, set time to 14:32

### 2. Run Test Script

```bash
# Make sure dev server is running
npm run dev

# In another terminal, wait until the reminder time
./test-notifications.sh
```

### 3. Expected Response

```json
{
  "message": "Notification process completed",
  "total": 1,
  "sent": 1,
  "failed": 0,
  "timestamp": "2025-01-15T14:32:00.000Z"
}
```

### 4. Check Email

Check your inbox for the reminder email.

## Production Setup with External Cron

### Option A: cron-job.org (Free, Recommended)

1. **Sign up**: https://cron-job.org/en/signup.php
2. **Create Cronjob**:
   - Title: `MediScript Medicine Reminders`
   - URL: `https://your-domain.vercel.app/api/medicine-reminder/send-notifications`
   - Schedule: `*/5 * * * *` (every 5 minutes)
   - Request Method: `POST`
   - Headers:
     ```
     Authorization: Bearer mediscript-cron-secret-2026
     Content-Type: application/json
     ```
3. **Save and Enable**

### Option B: EasyCron (Free tier available)

1. **Sign up**: https://www.easycron.com/user/register
2. **Create Cron Job**:
   - URL: `https://your-domain.vercel.app/api/medicine-reminder/send-notifications`
   - Cron Expression: `*/5 * * * *`
   - HTTP Method: `POST`
   - HTTP Headers:
     ```
     Authorization: Bearer mediscript-cron-secret-2026
     ```
3. **Enable the job**

### Option C: UptimeRobot (Free monitoring + cron)

1. **Sign up**: https://uptimerobot.com/
2. **Add Monitor**:
   - Monitor Type: HTTP(s)
   - URL: `https://your-domain.vercel.app/api/medicine-reminder/send-notifications`
   - Monitoring Interval: 5 minutes
   - Custom HTTP Headers:
     ```
     Authorization: Bearer mediscript-cron-secret-2026
     ```

## Environment Variables

### Development (.env)
```env
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
CRON_API_KEY="mediscript-cron-secret-2026"
NEXTAUTH_URL="http://localhost:3000"
```

### Production (Vercel)
Add these in Vercel Dashboard → Settings → Environment Variables:
- `EMAIL_USER`
- `EMAIL_PASS`
- `CRON_API_KEY`
- `NEXTAUTH_URL` (your production URL)

## Security Notes

1. **API Key**: Change `CRON_API_KEY` to a strong random string in production
2. **HTTPS Only**: External cron should only call HTTPS URLs in production
3. **Rate Limiting**: API checks authorization before processing
4. **Email Validation**: Only sends to verified user emails from database

## Email Template

The email includes:
- Patient name
- Medicine name, dosage, time, frequency
- Link to dashboard to mark as taken
- Professional styling with MediScript-E branding

## Troubleshooting

### No emails received
1. Check EMAIL_USER and EMAIL_PASS are correct
2. Verify Gmail App Password is valid
3. Check spam folder
4. Review API logs in Vercel

### Wrong timing
1. Verify server timezone (Vercel uses UTC)
2. Adjust reminder times accordingly
3. Check cron schedule is `*/5 * * * *`

### Authorization errors
1. Verify CRON_API_KEY matches in .env and cron service
2. Check Authorization header format: `Bearer YOUR_KEY`

## Manual Testing Commands

### Test with curl
```bash
curl -X POST http://localhost:3000/api/medicine-reminder/send-notifications \
  -H "Authorization: Bearer mediscript-cron-secret-2026" \
  -H "Content-Type: application/json"
```

### Test unauthorized access (should fail)
```bash
curl -X POST http://localhost:3000/api/medicine-reminder/send-notifications \
  -H "Content-Type: application/json"
```

## Monitoring

Check cron service dashboard for:
- Execution history
- Success/failure rates
- Response times
- Error logs

## Cost

All recommended services have free tiers:
- **cron-job.org**: Free forever (with ads)
- **EasyCron**: 20 free jobs
- **UptimeRobot**: 50 free monitors

## Future Enhancements

- SMS notifications (Twilio integration)
- Push notifications (Firebase)
- Customizable reminder intervals
- Snooze functionality
- Multiple reminders per medicine
