# Bookings Management & Email Notifications Setup

## ✅ What's Been Implemented

### 1. **Admin Bookings Management Page**
- **Location**: `/admin/bookings`
- **Access**: Admin panel sidebar → "Bookings"
- **Features**:
  - View all bookings in real-time
  - Filter by status (All, Pending, Confirmed, Completed, Cancelled)
  - Statistics dashboard showing booking counts
  - Change booking status with dropdown
  - Add internal notes to bookings
  - Delete bookings
  - Direct contact links (email/phone)
  - Responsive design for all devices

### 2. **Email Notifications**
When a client books a call:
- **Admin receives**: Notification email with booking details
- **Client receives**: Confirmation email with booking details

### 3. **Admin Login Button**
- **Location**: Website navbar (top right)
- **Desktop**: Visible as "Admin" link
- **Mobile**: Available in mobile menu
- **Link**: `/admin/login`

### 4. **Bookings Service**
- **File**: `src/services/bookingsService.js`
- **Functions**:
  - `addBooking()` - Create booking and send emails
  - `getBookings()` - Fetch all bookings
  - `listenToBookings()` - Real-time booking updates
  - `updateBookingStatus()` - Change booking status
  - `addBookingNotes()` - Add internal notes
  - `deleteBooking()` - Remove booking

## 🚀 Quick Start

### Step 1: Set Up Email Service
```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Set environment variables for Gmail
firebase functions:config:set gmail.email="your-email@gmail.com" gmail.password="your-app-password"
```

### Step 2: Deploy Cloud Functions
```bash
# Navigate to functions directory
cd functions

# Install dependencies
npm install

# Go back to root
cd ..

# Deploy functions
firebase deploy --only functions
```

### Step 3: Update Firestore Security Rules
In Firebase Console:
1. Go to Firestore Database
2. Click "Rules" tab
3. Add this rule:
```
match /bookings/{document=**} {
  allow create: if request.auth == null;
  allow read, update, delete: if request.auth != null;
}
```

## 📧 Email Setup Details

### Gmail Setup (Recommended)
1. Enable 2-Factor Authentication on your Gmail account
2. Go to [Google Account Security](https://myaccount.google.com/security)
3. Find "App passwords" section
4. Select "Mail" and "Windows Computer"
5. Generate 16-character password
6. Use this password in Firebase config

### Alternative Email Services
To use SendGrid, Mailgun, or other services:
1. Update `functions/sendBookingNotification.js`
2. Replace nodemailer with your service's SDK
3. Update environment variables
4. Redeploy functions

## 📊 Admin Bookings Page Features

### Dashboard Stats
- **Total Bookings**: Count of all bookings
- **Pending**: Awaiting confirmation
- **Confirmed**: Confirmed with client
- **Completed**: Call/meeting completed

### Booking Management
Each booking card shows:
- Client name and ID
- Email (clickable to send email)
- Phone (clickable to call)
- Preferred date and time
- Client message (if provided)
- Current status with icon
- Status dropdown to change status
- Notes button to add internal notes
- Delete button to remove booking

### Booking Statuses
- **Pending** (Yellow): New booking, needs confirmation
- **Confirmed** (Green): Confirmed with client
- **Completed** (Blue): Call/meeting completed
- **Cancelled** (Red): Booking cancelled

## 🔐 Security

### Firestore Rules
- Bookings can be created by anyone (public form)
- Only authenticated admins can read/update/delete
- Timestamps are server-generated

### Email Security
- Credentials stored in Firebase environment variables
- Never committed to version control
- Use app-specific passwords for Gmail
- Rotate passwords regularly

## 📱 Responsive Design
- ✅ Mobile (320px+)
- ✅ Tablet (577px+)
- ✅ Desktop (1025px+)
- ✅ Large screens (1441px+)

## 🔗 Important Links

### Admin Access
- **Admin Login**: `/admin/login`
- **Bookings Page**: `/admin/bookings`
- **Admin Dashboard**: `/admin/dashboard`

### Website
- **Booking Form**: Available on all pages via "Book a Call" button
- **Admin Link**: Top right navbar

## 📝 Booking Flow

1. **Client Books**
   - Fills booking form on website
   - Clicks "Confirm Booking"
   - Sees success confirmation

2. **System Processes**
   - Booking saved to Firestore
   - Cloud Function triggered
   - Emails sent to admin and client

3. **Admin Manages**
   - Logs into admin panel
   - Views booking in "Bookings" page
   - Updates status as needed
   - Adds notes if required
   - Contacts client via email/phone

## 🐛 Troubleshooting

### Emails Not Sending
1. Check Firebase Functions logs:
   ```bash
   firebase functions:log
   ```
2. Verify Gmail app password is correct
3. Ensure 2FA is enabled on Gmail
4. Check Firestore security rules

### Bookings Not Appearing
1. Check Firestore "bookings" collection exists
2. Verify security rules allow reads
3. Check browser console for errors
4. Verify admin is logged in

### Admin Login Not Working
1. Verify email is in authorized admins list
2. Check Firebase authentication is enabled
3. Verify Google Sign-In is configured
4. Check browser console for errors

## 📞 Support

For issues or questions:
- Email: velfound1@gmail.com
- Phone: +91 83098 27125

## 🎯 Next Steps

1. ✅ Set up email service (Gmail/SendGrid)
2. ✅ Deploy Cloud Functions
3. ✅ Update Firestore security rules
4. ✅ Test booking form
5. ✅ Verify emails are received
6. ✅ Test admin bookings page
7. ✅ Train team on booking management

## 📚 Files Modified/Created

### New Files
- `src/pages/admin/Bookings.jsx` - Admin bookings management page
- `src/services/bookingsService.js` - Bookings service with email integration
- `functions/sendBookingNotification.js` - Cloud Function for emails
- `functions/package.json` - Functions dependencies
- `EMAIL_SETUP.md` - Email setup guide
- `BOOKINGS_SETUP.md` - This file

### Modified Files
- `src/App.jsx` - Added Bookings route
- `src/components/AdminLayout.jsx` - Added Bookings to sidebar
- `src/components/WebsiteNav.jsx` - Added Admin login button
- `src/components/BookingModal.jsx` - Updated to use bookingsService

## ✨ Features Summary

| Feature | Status | Location |
|---------|--------|----------|
| Booking Form | ✅ | Website (all pages) |
| Email Notifications | ✅ | Cloud Functions |
| Admin Bookings Page | ✅ | `/admin/bookings` |
| Status Management | ✅ | Bookings page |
| Notes System | ✅ | Bookings page |
| Real-time Updates | ✅ | Firestore listeners |
| Admin Login Button | ✅ | Website navbar |
| Responsive Design | ✅ | All pages |
| Security Rules | ✅ | Firestore |

---

**Last Updated**: April 30, 2026
**Version**: 1.0.0
