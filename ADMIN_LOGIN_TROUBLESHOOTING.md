# Admin Login Troubleshooting Guide

## Issue: Sign-In Stuck on Loading

If you're experiencing a stuck loading state when trying to sign in with Google, follow these steps:

### Step 1: Check Firebase Console Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `velfound-d7c7d`
3. Go to **Authentication** → **Sign-in method**
4. Ensure **Google** is enabled (should show "Enabled" status)
5. If not enabled, click Google and enable it

### Step 2: Configure OAuth Consent Screen

1. In Firebase Console, go to **Authentication** → **Settings** → **Authorized domains**
2. Add your domain:
   - For local development: `localhost:5173`
   - For production: `your-domain.com`

### Step 3: Check Browser Console for Errors

1. Open your browser's Developer Tools (F12 or Cmd+Option+I)
2. Go to **Console** tab
3. Try signing in again
4. Look for error messages like:
   - `CORS error` - Domain not authorized
   - `popup_closed_by_user` - User closed the popup
   - `auth/operation-not-supported-in-this-environment` - Firebase not initialized

### Step 4: Clear Browser Cache

1. Clear all cookies and cache for your domain
2. Close and reopen the browser
3. Try signing in again

### Step 5: Check Firestore Security Rules

1. Go to **Firestore Database** → **Rules**
2. Ensure the `admins` collection allows writes:
```
match /admins/{document=**} {
  allow create, read, update, delete: if request.auth != null;
}
```

### Step 6: Verify Authorized Admin Email

The authorized admin email must be in the list:
- `velfound1@gmail.com`
- `akshath.tumkur@velfound.com`
- `sahil.ranakoti@velfound.com`
- `jayanth.karthik@velfound.com`
- `vikas.reddy@velfound.com`
- `nishanth.konakondu@velfound.com`
- `varshith@velfound.com`
- `gudipati.srinadh@velfound.com`

If your email is not in this list, contact the administrator to add it.

### Step 7: Check Network Tab

1. Open Developer Tools → **Network** tab
2. Try signing in
3. Look for failed requests to:
   - `identitytoolkit.googleapis.com`
   - `securetoken.googleapis.com`
4. If these fail, there's a network/CORS issue

### Step 8: Try Incognito Mode

1. Open an incognito/private window
2. Try signing in
3. If it works in incognito, your browser cache is the issue
4. Clear cache and try again in normal mode

## Common Error Messages

### "Email is not authorized"
- Your email is not in the authorized admins list
- Contact administrator to add your email

### "CORS error"
- Your domain is not authorized in Firebase
- Add your domain to Firebase Console → Authentication → Authorized domains

### "popup_closed_by_user"
- You closed the Google sign-in popup
- Try again and complete the sign-in process

### "auth/operation-not-supported-in-this-environment"
- Firebase is not properly initialized
- Check that `src/config/firebase.js` has correct credentials
- Ensure Firebase is imported in `src/App.jsx`

## Debug Mode

To enable detailed logging:

1. Open browser Developer Tools (F12)
2. Go to **Console** tab
3. You'll see detailed logs like:
   - "Starting Google Sign-In..."
   - "User signed in: email@example.com"
   - "User authorized, creating/updating admin document..."
   - "Admin sign-in successful"

## Still Having Issues?

1. **Check Firebase Project ID**: Should be `velfound-d7c7d`
2. **Verify API Keys**: Check `src/config/firebase.js` has correct credentials
3. **Check Network**: Ensure you have internet connection
4. **Try Different Browser**: Test in Chrome, Firefox, Safari
5. **Contact Support**: Email velfound1@gmail.com with:
   - Your email address
   - Error message from console
   - Browser and OS information
   - Steps you've already tried

## Quick Checklist

- [ ] Google Sign-In enabled in Firebase Console
- [ ] Your domain added to Authorized domains
- [ ] Your email in authorized admins list
- [ ] Browser cache cleared
- [ ] Firestore security rules updated
- [ ] No CORS errors in console
- [ ] Firebase credentials correct in `firebase.js`
- [ ] Internet connection working

## For Developers

To add more debugging:

1. Open `src/services/adminAuthService.js`
2. Check the console logs during sign-in
3. Look for specific error points
4. Check `src/context/AdminAuthContext.jsx` for context-level errors
5. Verify `src/pages/AdminLogin.jsx` is displaying error messages

---

**Last Updated**: April 30, 2026
