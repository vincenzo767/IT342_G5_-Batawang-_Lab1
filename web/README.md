# SynChef Web Application

ReactJS web application for SynChef with user authentication and profile management.

## Tech Stack
- React 18.2
- React Router v6
- Axios for API calls
- Context API for state management

## Prerequisites
- Node.js 18+
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Backend URL

The app is configured to connect to the backend at `http://localhost:8080`.

If your backend runs on a different port, update the `API_URL` in `src/services/api.js`:

```javascript
const API_URL = 'http://localhost:YOUR_PORT/api';
```

### 3. Run Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Features

### Authentication
- **User Registration**: Create new account with username, email, and password
- **User Login**: Authenticate with username and password
- **JWT Token Storage**: Secure token storage in localStorage
- **Protected Routes**: Dashboard accessible only to authenticated users

### Pages

#### Register Page (`/register`)
- Form fields:
  - Username (required)
  - Email (required)
  - Full Name (optional)
  - Phone Number (optional)
  - Password (required, min 6 chars)
  - Confirm Password (required)
- Password validation
- Error handling
- Redirect to login

#### Login Page (`/login`)
- Form fields:
  - Username (required)
  - Password (required)
- JWT token management
- Error handling
- Redirect to dashboard

#### Dashboard Page (`/dashboard`)
- User profile display
- Avatar with initials
- User information:
  - User ID
  - Username
  - Email
  - Full Name
  - Phone Number
  - Member Since (formatted date)
  - Account Status
- Logout functionality

## Project Structure

```
web/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── PrivateRoute.js     # Protected route wrapper
│   ├── context/
│   │   └── AuthContext.js       # Authentication state management
│   ├── pages/
│   │   ├── Register.js          # Registration page
│   │   ├── Login.js             # Login page
│   │   └── Dashboard.js         # User dashboard/profile
│   ├── services/
│   │   └── api.js               # API configuration and calls
│   ├── App.js                   # Main app component with routing
│   ├── index.js                 # Entry point
│   └── index.css                # Global styles
└── package.json
```

## API Integration

### Authentication Endpoints

```javascript
// Register
POST /api/auth/register
Body: { username, email, password, fullName, phoneNumber }
Response: { token, id, username, email, fullName }

// Login
POST /api/auth/login
Body: { username, password }
Response: { token, id, username, email, fullName }

// Get Current User (Protected)
GET /api/user/me
Headers: { Authorization: "Bearer <token>" }
Response: { id, username, email, fullName, phoneNumber, createdAt, isActive }
```

## State Management

Uses React Context API for global authentication state:

- `AuthProvider`: Wraps the entire app
- `useAuth()`: Hook to access auth state and functions
- Functions:
  - `register(userData)`
  - `login(credentials)`
  - `logout()`
  - `loadUser()`

## Styling

- Modern gradient design (purple to blue)
- Responsive layout
- Card-based UI
- Smooth animations
- Mobile-friendly

### Key Design Features
- Gradient backgrounds
- Box shadows for depth
- Rounded corners
- Hover effects
- Loading states
- Error alerts

## Security Features

- JWT token authentication
- Protected routes
- Automatic token refresh on page reload
- Token stored in localStorage
- Authorization header in API requests

## Testing the Application

### 1. Register a New User
1. Go to `http://localhost:3000/register`
2. Fill in the form
3. Click "Register"
4. Should redirect to dashboard

### 2. Login
1. Go to `http://localhost:3000/login`
2. Enter credentials
3. Click "Login"
4. Should redirect to dashboard

### 3. View Profile
1. After login, view your profile information
2. See avatar with initials
3. View all user details

### 4. Logout
1. Click "Logout" button in dashboard
2. Should redirect to login page
3. Dashboard should be inaccessible

## Troubleshooting

### CORS Errors
- Ensure backend has CORS configured for `http://localhost:3000`
- Check backend `SecurityConfig.java`

### Connection Refused
- Ensure backend is running on port 8080
- Check `API_URL` in `src/services/api.js`

### Token Issues
- Clear localStorage: `localStorage.clear()`
- Re-login to get new token

### Build Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Production Build

```bash
npm run build
```

Creates optimized production build in `build/` folder.

## Environment Variables (Optional)

Create `.env` file for configuration:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

Then use in code:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
```

## License
Educational Project - IT342 Lab 1
