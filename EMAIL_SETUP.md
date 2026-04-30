# Email Notifications Setup Guide

## Overview
The Velfound platform now sends email notifications when new bookings are received. This guide explains how to set up the email functionality.

## Prerequisites
- Firebase project with Cloud Functions enabled
- Gmail account (or other email service)
- Firebase CLI installed

## Setup Steps

### 1. Enable Cloud Functions
```bash
firebase init functions
```

### 2. Set Up Gmail App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication if not already enabled
3. Go to "App passwords" section
4. Select "Mail" and "Windows Computer" (or your device)
5. Generate an app password
6. Copy the 16-character password

### 3. Set Environment Variables
```bash
firebase functions:config:set gmail.email="your-email@gmail.com" gmail.password="your-app-password"
```

### 4. Deploy Cloud Functions
```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

### 5. Update Firestore Security Rules
Add the following rule to allow bookings collection writes:
```
match /bookings/{document=**} {
  allow create: if request.auth == null;
  allow read, update, delete: if request.auth != null;
}
```

## How It Works

### When a Booking is Created:
1. User fills out the booking form on the website
2. Booking data is saved to Firestore
3. Cloud Function is triggered
4. Two emails are sent:
   - **Admin Email**: Notification with booking details
   - **Client Email**: Confirmation email with booking details

### Email Contents

**Admin Notification:**
- Client name, email, phone
- Preferred date and time
- Client message (if provided)
- Link to admin panel

**Client Confirmation:**
- Booking confirmation
- Booking details
- Contact information
- Instructions for rescheduling

## Admin Bookings Management

### Access the Bookings Page
1. Log in to admin panel at `/admin/login`
2. Click "Bookings" in the sidebar
3. View all bookings with filters

### Manage Bookings
- **Change Status**: Update booking status (Pending, Confirmed, Completed, Cancelled)
- **Add Notes**: Add internal notes about the booking
- **Delete**: Remove booking from system
- **Contact**: Click email/phone to contact client directly

### Booking Statuses
- **Pending**: New booking, awaiting confirmation
- **Confirmed**: Booking confirmed with client
- **Completed**: Call/meeting completed
- **Cancelled**: Booking cancelled

## Troubleshooting

### Emails Not Sending
1. Check Firebase Functions logs: `firebase functions:log`
2. Verify Gmail app password is correct
3. Ensure 2FA is enabled on Gmail account
4. Check Firestore security rules allow bookings collection

### Function Deployment Issues
1. Ensure Node.js 18+ is installed
2. Check Firebase CLI is up to date: `firebase --version`
3. Verify Firebase project is set correctly: `firebase use --list`

## Alternative Email Services

To use a different email service (SendGrid, Mailgun, etc.):

1. Update `functions/sendBookingNotification.js`
2. Replace nodemailer configuration with your service's SDK
3. Update environment variables
4. Redeploy functions

## Security Notes

- Never commit email credentials to version control
- Use Firebase environment variables for sensitive data
- Restrict Cloud Function access to authorized users
- Regularly rotate app passwords
- Monitor function logs for errors

## Support

For issues or questions, contact: velfound1@gmail.com
