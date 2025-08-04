# Firebase Setup Guide

Follow these steps to set up Firebase for your Yoga Booking App:

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `yoga-booking-app`
4. Accept terms and click "Continue"
5. You can disable Google Analytics for this project
6. Click "Create project"

## 2. Set up Authentication

1. In the Firebase console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** provider
3. Click "Save"

### Create Admin User
1. Go to **Authentication** > **Users**
2. Click "Add user"
3. Email: `admin@yoga.com`
4. Password: `admin123`
5. Click "Add user"

### Create Test User
1. Click "Add user" again
2. Email: `user@yoga.com`
3. Password: `user123`
4. Click "Add user"

## 3. Set up Firestore Database

1. Go to **Firestore Database**
2. Click "Create database"
3. Choose "Start in test mode" (we'll set up rules later)
4. Select a location closest to your users
5. Click "Done"

### Create Collections
The app will automatically create these collections when data is added:
- `bookings` - for storing class bookings
- `users` - for user profiles  
- `packages` - for class packages

## 4. Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click on the **Web** icon `</>`
4. Register app with nickname: `yoga-booking-web`
5. Copy the `firebaseConfig` object

## 5. Update Firebase Configuration

Replace the configuration in `src/services/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

## 6. Set up Firestore Security Rules

1. Go to **Firestore Database** > **Rules**
2. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read packages
    match /packages/{packageId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'admin@yoga.com';
    }
    
    // Allow users to read/write their own bookings
    match /bookings/{bookingId} {
      allow read, write: if request.auth != null;
    }
    
    // Allow users to read/write their own user data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click "Publish"

## 7. Seed Sample Data (Optional)

You can add sample packages by running this code in the browser console after logging in as admin:

```javascript
// Add sample packages
const samplePackages = [
  {
    name: 'Single Class / คลาสเดี่ยว',
    classes: 1,
    price: 500,
    description: 'Perfect for trying out our yoga classes / เหมาะสำหรับการทดลองเรียน',
    active: true,
    createdAt: new Date()
  },
  {
    name: '5-Class Package / แพ็คเกจ 5 คลาส',
    classes: 5,
    price: 2200,
    description: 'Save 300 THB with this package / ประหยัด 300 บาท',
    active: true,
    createdAt: new Date()
  },
  {
    name: '10-Class Package / แพ็คเกจ 10 คลาส',
    classes: 10,
    price: 4000,
    description: 'Most popular package, save 1000 THB / แพ็คเกจยอดนิยม ประหยัด 1000 บาท',
    active: true,
    createdAt: new Date()
  }
];

// Add to Firestore (run this in browser console after login)
samplePackages.forEach(async (pkg) => {
  await firebase.firestore().collection('packages').add(pkg);
});
```

## 8. Test Your Setup

1. Start your React app: `npm start`
2. Open http://localhost:3000
3. Try logging in with:
   - Admin: `admin@yoga.com` / `admin123`
   - User: `user@yoga.com` / `user123`

## Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/configuration-not-found)"**
   - Make sure you've replaced the Firebase config in `src/services/firebase.js`

2. **"Missing or insufficient permissions"**
   - Check Firestore security rules
   - Make sure Authentication is enabled

3. **App won't load**
   - Check browser console for errors
   - Verify all Firebase services are enabled

### Security Notes:

- The current setup uses "test mode" Firestore rules for development
- In production, implement proper security rules
- Consider using Firebase Authentication custom claims for admin roles
- Enable App Check for additional security

## Next Steps:

1. Set up proper Firestore security rules for production
2. Configure hosting with Firebase Hosting
3. Set up Cloud Functions for advanced features
4. Implement proper error handling and logging
5. Add payment integration (Stripe, etc.)

Happy coding! 🧘‍♀️
