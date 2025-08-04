# Yoga Booking App

A modern yoga class booking web application built with React.js and Firebase.

## Features

### 🧘‍♀️ User Features
- **Class Booking**: Book yoga classes with real-time availability
- **Time Slots**: Two daily sessions (9:00 AM & 11:00 AM)
- **Capacity Management**: 20 spots per time slot
- **Multiple Payment Options**: Credit card or package purchase
- **Multi-language Support**: Thai and English interface

### 👩‍💼 Admin Features  
- **Dashboard**: Overview of bookings and revenue
- **Booking Management**: View and manage all bookings
- **Real-time Statistics**: Today's bookings, monthly revenue
- **User Management**: Handle customer information

### 💳 Payment System
- **Credit Card Payment**: Secure card processing simulation
- **Package System**: Buy multiple classes in advance
- **Pricing**: ฿500 per single class

## Tech Stack

- **Frontend**: React.js 17
- **Backend**: Firebase (Firestore, Authentication)
- **Styling**: Custom CSS with gradient designs
- **Internationalization**: React i18next
- **Routing**: React Router v6

## Getting Started

### Prerequisites
- Node.js 14 or higher
- Firebase project setup

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd yoga-booking-app
```

2. Install dependencies
```bash
npm install
```

3. Configure Firebase
- Create a Firebase project at https://firebase.google.com
- Enable Authentication and Firestore
- Copy your Firebase config to `src/services/firebase.js`

4. Start the development server
```bash
npm start
```

### Firebase Setup

1. **Authentication**: Enable Email/Password authentication
2. **Firestore**: Create collections:
   - `bookings` - for storing class bookings
   - `users` - for user profiles
   - `packages` - for class packages

3. **Security Rules**: Configure Firestore rules for proper access control

### Demo Accounts

For testing purposes, create these accounts in Firebase Authentication:
- **Admin**: admin@yoga.com / admin123
- **User**: user@yoga.com / user123

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js
│   ├── Login.js
│   ├── DatePicker.js
│   ├── TimeSlotSelector.js
│   └── PaymentForm.js
├── pages/              # Main application pages
│   ├── BookingPage.js
│   └── AdminDashboard.js
├── contexts/           # React Context providers
│   ├── AuthContext.js
│   └── BookingContext.js
├── services/           # Firebase and API services
│   ├── firebase.js
│   └── bookingService.js
├── i18n/              # Internationalization
│   └── index.js
└── App.js             # Main application component
```

## Features Implementation

### 🎯 Booking System
- Real-time availability checking
- Date range validation (30 days advance booking)
- Time slot capacity management
- Automatic booking confirmation

### 💰 Payment Integration
- Credit card form validation
- Package selection system
- Payment processing simulation
- Receipt generation

### 🌐 Multi-language Support
- Thai and English languages
- Dynamic language switching
- Localized date/time formatting
- Cultural-appropriate UI elements

### 🔐 Security
- Firebase Authentication
- Protected routes
- Admin role checking
- Secure data access patterns

## Database Schema

### Bookings Collection
```javascript
{
  id: "auto-generated",
  date: Timestamp,
  timeSlot: "09:00" | "11:00",
  userInfo: {
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  },
  status: "confirmed" | "cancelled",
  amount: number,
  paymentMethod: "card" | "package",
  packageId: string?, // if paid with package
  createdAt: Timestamp
}
```

### Packages Collection
```javascript
{
  id: "auto-generated",
  name: string,
  classes: number,
  price: number,
  description: string,
  createdAt: Timestamp
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please contact [your-email@example.com]
# iwillcodeforu
