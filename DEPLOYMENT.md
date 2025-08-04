# Deployment Guide

## Local Development

### Prerequisites
- Node.js 12+ 
- npm or yarn
- Firebase account

### Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Follow [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) to configure Firebase
4. Start development server: `npm start`
5. Open http://localhost:3000

## Firebase Hosting Deployment

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase Hosting
```bash
firebase init hosting
```

Select:
- Use an existing project: your-project-id
- Public directory: `build`
- Configure as SPA: `Yes`
- Set up automatic builds: `No`

### 4. Build and Deploy
```bash
npm run build
firebase deploy --only hosting
```

## Environment Variables

Create `.env` file for local development:
```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=your-app-id
```

## Production Considerations

### Security
- Set up proper Firestore security rules
- Enable Firebase App Check
- Use environment variables for sensitive config
- Implement proper user roles and permissions

### Performance
- Enable Firebase Performance Monitoring
- Optimize bundle size with code splitting
- Implement service worker for offline support
- Use Firebase Hosting CDN

### Monitoring
- Set up Firebase Analytics
- Enable Crashlytics for error tracking
- Monitor Firebase usage and costs
- Set up alerts for high usage

## Scaling Considerations

### Database
- Implement pagination for large datasets
- Use Firebase Cloud Functions for complex operations
- Consider composite indexes for complex queries
- Monitor Firestore costs and optimize queries

### Authentication
- Implement proper session management
- Consider multi-factor authentication
- Set up password policies
- Monitor authentication events

### Features to Add
- Email notifications (using Cloud Functions + SendGrid)
- SMS notifications for booking confirmations
- Real-time updates using Firestore listeners
- Payment integration (Stripe, PayPal)
- Calendar integration
- Instructor management system
- Class scheduling automation
- Reporting and analytics dashboard

## Cost Optimization

### Firebase Costs
- Monitor Firestore reads/writes
- Optimize query patterns
- Use offline persistence
- Implement proper caching strategies

### Hosting Costs
- Enable gzip compression
- Optimize images and assets
- Use appropriate caching headers
- Monitor bandwidth usage
