# Authentication System Setup Guide

## Overview
This document outlines the complete authentication system implemented for DocuSort AI, including Login, Signup, and routing.

## Installation

### 1. Install Dependencies
First, install the required packages:

```bash
npm install
```

This will install `react-router-dom` and all other dependencies specified in `package.json`.

## Features Implemented

### 1. **Login Page** (`src/components/Auth/LoginPage.tsx`)
- Clean, modern UI with glassmorphic design
- Email and password input fields
- Password visibility toggle
- Remember me checkbox
- Forgot password link
- Social login option (Google)
- Form validation
- Loading state with spinner
- Error message display
- Smooth animations with Framer Motion
- Redirect to signup page

**Features:**
- Email validation
- Password strength checking (minimum 6 characters)
- Error handling with user-friendly messages
- Simulated API call (1.5s delay)
- User data stored in localStorage

### 2. **Signup Page** (`src/components/Auth/SignupPage.tsx`)
- Full name, email, password, and confirm password fields
- Password strength indicator (weak/medium/strong)
- Password match validation
- Terms of Service agreement checkbox
- Social signup option (Google)
- Form validation
- Loading state
- Error handling
- Smooth animations

**Features:**
- Full name validation
- Email validation
- Password strength indicator with color coding
- Real-time password match feedback
- Terms agreement requirement
- Simulated API call (1.5s delay)
- User data stored in localStorage

### 3. **Routing System** (`src/App.tsx`)
Complete routing implementation with protected routes:

**Public Routes:**
- `/login` - Login page
- `/signup` - Signup page

**Protected Routes:**
- `/dashboard` - Main dashboard (requires authentication)
- `/` - Root path (redirects to dashboard if authenticated, login if not)

**Route Protection:**
- Automatic redirection to login for unauthenticated users
- Automatic redirection to dashboard for authenticated users
- Catch-all route for undefined paths

### 4. **Enhanced Header** (`src/components/Layout/EnhancedHeader.tsx`)
Updated with authentication features:
- Dynamic user display (shows user initial or name)
- User menu with profile options
- Logout functionality
- Automatic localStorage sync

## User Flow

### First Time User (Signup)
1. User lands on `/login` page
2. Clicks "Sign up" link
3. Fills signup form with full name, email, password
4. Confirms password and agrees to terms
5. Clicks "Create Account"
6. User data saved to localStorage
7. Redirected to `/dashboard`

### Returning User (Login)
1. User lands on `/login` page
2. Enters email and password
3. Clicks "Sign In"
4. User data saved to localStorage
5. Redirected to `/dashboard`

### Logout
1. User clicks profile avatar in header
2. Opens user menu
3. Clicks "Sign Out"
4. User data cleared from localStorage
5. Redirected to `/login`

## Color Palette Used

The authentication pages follow the existing color scheme:
- **Primary:** Black (#000000)
- **Background:** White with subtle gradients
- **Accents:** Black with opacity variations
- **Text:** Black for primary, gray for secondary
- **Borders:** Black with 10% opacity

## Data Structure

### User Object (localStorage)
```typescript
interface User {
  email: string;
  fullName?: string;
  isAuthenticated: boolean;
}
```

Example stored data:
```json
{
  "email": "user@example.com",
  "fullName": "John Doe",
  "isAuthenticated": true
}
```

## Form Validation Rules

### Login Form
- Email: Valid email format required
- Password: Minimum 6 characters

### Signup Form
- Full Name: Required, non-empty
- Email: Valid email format required
- Password: Minimum 8 characters
- Confirm Password: Must match password field
- Terms: Must be checked

## Styling & Components

### Technologies Used
- **React 19.1.1** - UI framework
- **React Router DOM 6.20.0** - Routing
- **Framer Motion 12.23.12** - Animations
- **Lucide React 0.344.0** - Icons
- **Tailwind CSS 3.4.1** - Styling

### Key UI Components
- Glassmorphic cards with backdrop blur
- Animated background elements
- Smooth page transitions
- Loading spinners
- Password strength indicators
- Error message displays
- Form validation feedback

## Development

### Running the Application
```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Building for Production
```bash
npm run build
```

## Security Notes

⚠️ **Important:** This is a demo implementation. For production:

1. **Backend Authentication:**
   - Implement proper backend API for authentication
   - Use JWT tokens or sessions
   - Never store passwords in localStorage

2. **Password Security:**
   - Hash passwords on the backend
   - Use HTTPS for all communications
   - Implement rate limiting on login attempts

3. **Data Storage:**
   - Consider using secure cookies instead of localStorage
   - Implement token refresh mechanism
   - Add CSRF protection

4. **Form Security:**
   - Implement CAPTCHA for signup
   - Add email verification
   - Implement password reset flow

## Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] Social login integration (Google, GitHub)
- [ ] User profile management
- [ ] Session management
- [ ] Remember me functionality
- [ ] Account recovery options

## Troubleshooting

### React Router not found
If you see "Cannot find module 'react-router-dom'":
```bash
npm install react-router-dom
```

### Authentication not persisting
Check browser localStorage:
1. Open DevTools (F12)
2. Go to Application > Local Storage
3. Verify user data is stored

### Redirect loops
- Clear localStorage and try again
- Check browser console for errors
- Verify routes are correctly configured

## File Structure
```
src/
├── components/
│   ├── Auth/
│   │   ├── LoginPage.tsx
│   │   └── SignupPage.tsx
│   ├── Layout/
│   │   └── EnhancedHeader.tsx (updated)
│   └── ... (other components)
├── App.tsx (updated with routing)
└── ... (other files)
```

## Support

For issues or questions about the authentication system, refer to:
- React Router Documentation: https://reactrouter.com/
- Framer Motion: https://www.framer.com/motion/
- Tailwind CSS: https://tailwindcss.com/
