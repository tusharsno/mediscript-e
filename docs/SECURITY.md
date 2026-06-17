# Security Policy

## 🔒 Security Best Practices

### Environment Variables
- **NEVER** commit `.env` files to version control
- Use strong, randomly generated secrets for `NEXTAUTH_SECRET` and `CRON_API_KEY`
- Rotate secrets regularly in production
- Use different credentials for development and production

### Authentication
- Passwords are hashed using bcryptjs with salt rounds of 10
- Minimum password length: 6 characters (consider increasing to 8+ for production)
- JWT sessions expire after 30 days
- OAuth users (Google/GitHub) don't have passwords

### API Security
- All sensitive endpoints require authentication
- Role-based access control (RBAC) implemented
- Admin endpoints restricted to ADMIN role only
- Input validation on all API routes
- CSRF protection via NextAuth

### Database Security
- SSL enabled for database connections in production
- Connection pooling configured (max 5 connections)
- Prepared statements via Prisma (prevents SQL injection)
- Cascade deletes configured for data integrity

### File Upload Security
- File type validation (only images and PDFs allowed)
- File size limit: 5MB maximum
- Files stored in Supabase Storage with public access
- Consider implementing virus scanning for production

### Headers Security
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## 🚨 Reporting Security Issues

If you discover a security vulnerability, please email: **security@mediscript.com**

**DO NOT** create public GitHub issues for security vulnerabilities.

## ✅ Security Checklist for Production

- [ ] Change all default credentials
- [ ] Use strong, unique secrets
- [ ] Enable HTTPS/SSL
- [ ] Configure proper CORS policies
- [ ] Set up rate limiting
- [ ] Enable database backups
- [ ] Configure monitoring and logging
- [ ] Review and update dependencies regularly
- [ ] Implement proper error handling (don't expose sensitive info)
- [ ] Set up security headers
- [ ] Configure Content Security Policy (CSP)
- [ ] Enable two-factor authentication for admin accounts
- [ ] Regular security audits

## 🔄 Dependency Updates

Run these commands regularly to keep dependencies secure:

```bash
npm audit
npm audit fix
npm outdated
```

## 📝 Security Improvements Made

1. ✅ Environment variable validation
2. ✅ Input validation on all forms
3. ✅ Email format validation
4. ✅ Password strength requirements
5. ✅ Role validation (prevent ADMIN registration)
6. ✅ Date validation (prevent past dates)
7. ✅ File upload validation (type and size)
8. ✅ Patient existence validation
9. ✅ OAuth user password handling
10. ✅ Security headers configuration
11. ✅ SSL configuration for production
12. ✅ Removed hardcoded secrets

## 🛡️ Additional Recommendations

### For Production Deployment:

1. **Rate Limiting**: Implement rate limiting on API routes
   - Consider using `express-rate-limit` or Vercel's built-in rate limiting

2. **CAPTCHA**: Add CAPTCHA to registration and contact forms
   - Prevents automated bot attacks

3. **Email Verification**: Implement email verification for new accounts
   - Ensures valid email addresses

4. **Two-Factor Authentication**: Add 2FA for sensitive accounts
   - Especially for ADMIN and DOCTOR roles

5. **Audit Logging**: Log all sensitive operations
   - Track who did what and when

6. **Data Encryption**: Encrypt sensitive data at rest
   - Consider encrypting medical records and prescriptions

7. **Session Management**: Implement session invalidation
   - Allow users to log out from all devices

8. **API Key Rotation**: Rotate API keys regularly
   - Especially CRON_API_KEY

9. **Backup Strategy**: Implement automated backups
   - Regular database backups with encryption

10. **Monitoring**: Set up security monitoring
    - Alert on suspicious activities

## 📚 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [Prisma Security](https://www.prisma.io/docs/guides/security)
- [NextAuth Security](https://next-auth.js.org/configuration/options#security)
