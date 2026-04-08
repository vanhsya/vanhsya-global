## 24/7 Availability (No Laptop Dependency)

This website runs on Netlify. Once deployed, it does not depend on any local machine being online.

### Required DNS State (Stop “Your connection is not private”)

Your root/apex domain must not point to Vercel.

- In Namecheap, remove:
  - `A @ -> 76.76.21.21` (Vercel)
- Keep Netlify apex:
  - `A @ -> 75.2.60.5`
  - `A @ -> 99.83.190.102`
- Keep a single `www` CNAME to the active Netlify site:
  - `CNAME www -> vanhsya-website1.netlify.app`

After DNS propagation, Chrome should stop showing “Your connection is not private”.

## Monitoring & Alerts

### Health Endpoint

Use:
- `GET /api/health`

Recommended alert rule:
- Alert if status is not `200` for 2–3 consecutive checks.

### Uptime Monitoring (Recommended)

Configure an uptime monitor (UptimeRobot / Better Stack / StatusCake):
- URL: `https://vanhsya.com/api/health`
- Interval: 1–5 minutes
- Alert channels: Email + WhatsApp/SMS

## Incident Runbook

### Site Down / SSL Error

1. Check DNS:
   - Ensure `vanhsya.com` no longer resolves to `76.76.21.21`.
2. Check Netlify deploy status:
   - Roll back to the last known-good deploy if needed.
3. Check `https://vanhsya.com/api/health`:
   - If it fails, review Netlify function logs for `/api/health` and dependent endpoints.

### Webmail Certificate Warning

If you see a browser warning when logging in to email using a branded subdomain (like `mail.vanhsya.com`), it is usually a certificate hostname mismatch from the email provider.

Recommended fix:
- Use `https://mail.privateemail.com/` for webmail login.
- In Namecheap, you can add URL redirects:
  - `mail` -> `https://mail.privateemail.com/`
  - `webmail` -> `https://mail.privateemail.com/`

### AI Concierge “Offline Mode”

The concierge auto-detects whether AI is configured using `/api/health`.

To enable full AI responses:
- Set `OPENAI_API_KEY` in Netlify site environment variables.
- Optional: set `OPENAI_MODEL`.

## Backups

### Code

- Source is backed up in GitHub.
- Every deploy is recoverable via Netlify deploy rollback.

### Form/Lead Data

If using Netlify’s storage for submissions, export submissions periodically from the Netlify dashboard as part of your ops routine.

## Deployment Checklist

Before merge to `main`:
- `npm run lint`
- `npm test`
- `npm run build`

After deploy:
- Verify `GET /api/health` returns `200`.
- Smoke test: `/`, `/ai-tools`, `/contact`, `/countries`, `/ai-tools/document-verification`.
