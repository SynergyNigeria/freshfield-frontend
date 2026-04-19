# Frontend Deployment Checklist

## Pre-Launch Checklist

### [ ] Environment Setup
- [ ] Copy `.env.example` to `.env.local`
- [ ] Set correct `NEXT_PUBLIC_API_URL` pointing to backend
- [ ] Verify backend is accessible from frontend URL
- [ ] Test CORS headers from browser console

### [ ] Dependencies
- [ ] Run `npm install` successfully
- [ ] No vulnerability warnings in `npm audit`
- [ ] All packages are up to date

### [ ] Testing
- [ ] Test registration page functionality
- [ ] Test login process
- [ ] Verify token storage in localStorage
- [ ] Test dashboard loads after login
- [ ] Test navigation between pages
- [ ] Verify logout clears token
- [ ] Test wallet page loads
- [ ] Test portfolio page loads
- [ ] Test buy crypto page loads
- [ ] Verify protected routes redirect to login

### [ ] Performance
- [ ] Run `npm run build` successfully
- [ ] Check build output size
- [ ] Verify no console errors
- [ ] Test page load times
- [ ] Check responsive design on mobile

### [ ] Browser Compatibility
- [ ] Test on Chrome/Edge
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on mobile browsers

## Running Locally

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Create environment file
# Copy .env.example to .env.local and configure
copy .env.example .env.local

# Or create manually:
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

# 4. Start development server
npm run dev

# 5. Open browser
# http://localhost:3000
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Build and analyze
npm run build -- --analyze

# Clear cache
rm -rf .next
```

## Deployment Options

### Vercel (Recommended for Next.js)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL=https://your-api-domain/api`
4. Deploy

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Manual Server (Ubuntu/Linux)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone your-repo
cd frontend
npm install
npm run build

# Using PM2 for process management
npm install -g pm2
pm2 start "npm start" --name "freshfield-frontend"
pm2 startup
pm2 save
```

## Environment Variables

### Development
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Production
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

## Testing Endpoints

### Check API connectivity
```bash
curl http://localhost:8000/api/auth/login/
```

### Test from browser console
```javascript
// Check if API is accessible
fetch('http://localhost:8000/api/auth/login/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'test',
    password: 'test'
  })
}).then(r => r.json()).then(console.log)
```

## Performance Optimization

### Image Optimization
```javascript
import Image from 'next/image'
// Use next/image for automatic optimization
```

### Code Splitting
- Automatic with Next.js page routes
- Manual with dynamic imports

### Caching
- Static assets cached by default
- Configure cache headers in `next.config.js`

### Analytics
Add your analytics provider:
```javascript
// In layout.tsx
import { Analytics } from '@vercel/analytics/react'

// Then in component:
<Analytics />
```

## Monitoring

### Error Tracking
- Integrate Sentry for production errors
- Monitor API response times
- Track user authentication flow

### Performance Monitoring
- Use Lighthouse for performance audits
- Monitor Core Web Vitals
- Set up error alerts

## Troubleshooting

### Blank page or 404
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
npm start
```

### API Connection Issues
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify backend is running
- Check CORS errors in browser console
- Verify firewall rules

### Token Issues
- Check localStorage in DevTools
- Verify token is sent in Authorization header
- Check token expiry
- Clear localStorage and re-login

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run build
```

## Security Checklist

- [ ] Remove console.logs in production
- [ ] Never commit `.env.local`
- [ ] Use HTTPS in production
- [ ] Verify API has proper CORS
- [ ] Implement CSRF protection if needed
- [ ] Regular dependency updates
- [ ] Security headers configured

## Production Checklist

- [ ] API URL points to production backend
- [ ] Build completes successfully
- [ ] No console errors/warnings
- [ ] All pages load correctly
- [ ] Authentication flow works
- [ ] Database transactions process correctly
- [ ] Loading states work properly
- [ ] Error messages display correctly
- [ ] Responsive design verified
- [ ] Performance acceptable

## Support

For Next.js-specific issues:
- Official Docs: https://nextjs.org/docs
- GitHub Issues: https://github.com/vercel/next.js/issues
- Stack Overflow: Tag `next.js`

For deployment help:
- Vercel Docs: https://vercel.com/docs
- Docker Docs: https://docs.docker.com
