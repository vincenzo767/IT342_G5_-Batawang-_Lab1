# SynChef - Functional Requirements Specification (FRS)

**Project**: SynChef - Real-Time Recipe Execution & Global Gastronomy  
**Course**: IT342  
**Group**: Group 5 - Batawang  
**Lab**: Session 1 - User Registration and Authentication  
**Date**: February 6, 2026

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Database Design](#database-design)
4. [UML Diagrams](#uml-diagrams)
5. [API Specifications](#api-specifications)
6. [Web Application Screenshots](#web-application-screenshots)
7. [Mobile Application Screenshots](#mobile-application-screenshots)
8. [Security Implementation](#security-implementation)

---

## 1. Project Overview

### 1.1 Introduction
SynChef is an innovative recipe application that focuses on **Real-Time Execution** and **Global Gastronomy**. This document covers the implementation of the User Registration and Authentication system.

### 1.2 Key Features (Lab 1 Scope)
- User Registration with validation
- User Login with JWT authentication
- Password encryption using BCrypt
- Protected user profile endpoint
- Dashboard/Profile page
- Logout functionality
- **Mobile application (Android)** with same features

### 1.3 Technology Stack

**Backend:**
- Spring Boot 3.2.2
- Spring Security with JWT
- MySQL Database
- BCrypt Password Encryption

**Web Application:**
- ReactJS 18.2
- React Router v6
- Axios HTTP Client
- Context API for State Management

**Mobile Application:**
- Kotlin (Android)
- XML Layouts with Material Design
- Retrofit 2 + OkHttp
- DataStore for token storage
- Kotlin Coroutines

---

## 2. System Architecture

### 2.1 Architecture Diagram

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────┐
│                 │         │                  │         │             │
│  React Web App  │────────▶│  Spring Boot API │────────▶│   MySQL     │
│  (Port 3000)    │  HTTP   │   (Port 8080)    │  JDBC   │  Database   │
│                 │◀────────│                  │◀────────│             │
└─────────────────┘         └──────────────────┘         └─────────────┘
       │                             │
       │                             │
       ▼                             ▼
   JWT Token                   BCrypt Password
   localStorage                  Encryption
```

### 2.2 Component Architecture

**Frontend Components:**
- Authentication Context (Global State)
- Register Page
- Login Page
- Dashboard/Profile Page
- Private Route Component
- API Service Layer

**Backend Components:**
- Controllers (AuthController, UserController)
- Services (AuthService, UserService)
- Repositories (UserRepository)
- Security (JWT Filter, SecurityConfig)
- Models (User Entity)
- DTOs (Request/Response Objects)

---

## 3. Database Design

### 3.1 Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────┐
│                   USERS                     │
├─────────────────────────────────────────────┤
│ PK │ id            │ BIGINT AUTO_INCREMENT  │
│    │ username      │ VARCHAR(50) UNIQUE     │
│    │ email         │ VARCHAR(100) UNIQUE    │
│    │ password      │ VARCHAR(255)           │
│    │ full_name     │ VARCHAR(100)           │
│    │ phone_number  │ VARCHAR(20)            │
│    │ created_at    │ TIMESTAMP              │
│    │ updated_at    │ TIMESTAMP              │
│    │ is_active     │ BOOLEAN DEFAULT TRUE   │
└─────────────────────────────────────────────┘
```

### 3.2 Database Schema (SQL)

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    
    INDEX idx_username (username),
    INDEX idx_email (email)
);
```

### 3.3 Database Configuration

**Database Name:** `synchef_db`  
**Connection URL:** `jdbc:mysql://localhost:3306/synchef_db`  
**Driver:** `com.mysql.cj.jdbc.Driver`  
**Hibernate DDL:** `update` (auto-create/update tables)

---

## 4. UML Diagrams

### 4.1 Class Diagram

```
┌─────────────────────────┐
│      User Entity        │
├─────────────────────────┤
│ - id: Long              │
│ - username: String      │
│ - email: String         │
│ - password: String      │
│ - fullName: String      │
│ - phoneNumber: String   │
│ - createdAt: DateTime   │
│ - updatedAt: DateTime   │
│ - isActive: Boolean     │
└─────────────────────────┘
           │
           │ 1
           ▼
┌─────────────────────────┐
│   UserRepository        │
├─────────────────────────┤
│ + findByUsername()      │
│ + findByEmail()         │
│ + existsByUsername()    │
│ + existsByEmail()       │
└─────────────────────────┘
           │
           │ uses
           ▼
┌─────────────────────────┐
│     AuthService         │
├─────────────────────────┤
│ + register()            │
│ + login()               │
└─────────────────────────┘
           │
           │ uses
           ▼
┌─────────────────────────┐
│   AuthController        │
├─────────────────────────┤
│ + POST /register        │
│ + POST /login           │
└─────────────────────────┘
```

### 4.2 Sequence Diagram - User Registration

```
User          Web App       AuthController    AuthService    UserRepository    Database
 │                │                │               │                │              │
 │  Fill Form     │                │               │                │              │
 │───────────────▶│                │               │                │              │
 │                │                │               │                │              │
 │  Submit        │                │               │                │              │
 │───────────────▶│                │               │                │              │
 │                │                │               │                │              │
 │                │ POST /register │               │                │              │
 │                │───────────────▶│               │                │              │
 │                │                │  register()   │                │              │
 │                │                │──────────────▶│                │              │
 │                │                │               │ existsByUsername()           │
 │                │                │               │───────────────▶│              │
 │                │                │               │                │  Query       │
 │                │                │               │                │─────────────▶│
 │                │                │               │                │◀─────────────│
 │                │                │               │◀───────────────│              │
 │                │                │               │ save(user)     │              │
 │                │                │               │───────────────▶│              │
 │                │                │               │                │  Insert      │
 │                │                │               │                │─────────────▶│
 │                │                │               │                │◀─────────────│
 │                │                │               │◀───────────────│              │
 │                │                │ JWT Token     │                │              │
 │                │                │◀──────────────│                │              │
 │                │  Response      │               │                │              │
 │                │◀───────────────│               │                │              │
 │  Redirect      │                │               │                │              │
 │◀───────────────│                │               │                │              │
```

### 4.3 Sequence Diagram - User Login

```
User          Web App       AuthController    AuthService    UserRepository    Database
 │                │                │               │                │              │
 │  Enter Creds   │                │               │                │              │
 │───────────────▶│                │               │                │              │
 │                │                │               │                │              │
 │  Submit        │                │               │                │              │
 │───────────────▶│                │               │                │              │
 │                │                │               │                │              │
 │                │  POST /login   │               │                │              │
 │                │───────────────▶│               │                │              │
 │                │                │   login()     │                │              │
 │                │                │──────────────▶│                │              │
 │                │                │               │ findByUsername()             │
 │                │                │               │───────────────▶│              │
 │                │                │               │                │  Query       │
 │                │                │               │                │─────────────▶│
 │                │                │               │                │◀─────────────│
 │                │                │               │◀───────────────│              │
 │                │                │               │                │              │
 │                │                │  Verify Password (BCrypt)      │              │
 │                │                │               │                │              │
 │                │                │ JWT Token     │                │              │
 │                │                │◀──────────────│                │              │
 │                │  Response      │               │                │              │
 │                │◀───────────────│               │                │              │
 │  Store Token   │                │               │                │              │
 │  Redirect      │                │               │                │              │
 │◀───────────────│                │               │                │              │
```

### 4.4 Use Case Diagram

```
                    ┌─────────────────────┐
                    │     SynChef System  │
                    └─────────────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
    ┌─────────┐        ┌─────────┐        ┌─────────┐
    │ Register│        │  Login  │        │  View   │
    │ Account │        │         │        │ Profile │
    └─────────┘        └─────────┘        └─────────┘
         │                   │                   │
         │                   │                   │
         └───────────────────┴───────────────────┘
                             │
                             │
                        ┌────────┐
                        │  User  │
                        └────────┘
```

---

## 5. API Specifications

### 5.1 Authentication Endpoints

#### 5.1.1 Register User

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "phoneNumber": "09123456789"
}
```

**Success Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "fullName": "John Doe"
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Username is already taken!"
}
```

#### 5.1.2 Login User

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Success Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "fullName": "John Doe"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "Invalid username or password"
}
```

### 5.2 User Endpoints

#### 5.2.1 Get Current User (Protected)

**Endpoint:** `GET /api/user/me`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200 OK):**
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "fullName": "John Doe",
  "phoneNumber": "09123456789",
  "createdAt": "2026-02-06T10:30:00",
  "isActive": true
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "Unauthorized"
}
```

---

## 6. Web Application Screenshots

### 6.1 Register Page

**URL:** `http://localhost:3000/register`

**Features:**
- Username input field (required)
- Email input field (required)
- Full Name input field (optional)
- Phone Number input field (optional)
- Password input field (required, min 6 chars)
- Confirm Password input field (required)
- Submit button
- Link to Login page
- Error message display
- Form validation

**Design:**
- Purple gradient background
- White card with shadow
- SynChef logo with emoji
- Smooth animations
- Responsive layout

### 6.2 Login Page

**URL:** `http://localhost:3000/login`

**Features:**
- Username input field (required)
- Password input field (required)
- Submit button
- Link to Register page
- Error message display
- Loading state

**Design:**
- Purple gradient background
- White card with shadow
- Welcome message
- Hover effects on button
- Mobile-friendly

### 6.3 Dashboard/Profile Page

**URL:** `http://localhost:3000/dashboard`

**Features:**
- Header with SynChef logo
- Logout button
- Profile card with:
  - Avatar with user initials
  - Username display
  - User ID
  - Email address
  - Full name
  - Phone number
  - Member since date
  - Account status badge
- Responsive grid layout

**Design:**
- Purple gradient background
- White cards with shadows
- Profile avatar with gradient
- Status badge (green for active)
- Formatted dates
- Grid layout for profile details

### 6.4 Logout Functionality

**Features:**
- Logout button in dashboard header
- Clears JWT token from localStorage
- Redirects to login page
- Removes user from context
- Dashboard becomes inaccessible

---

## 7. Mobile Application Screenshots

### 7.1 Overview

The Android mobile application is implemented using **Kotlin** with **XML layouts** and follows the same visual design as the web application.

**Technology Stack:**
- Language: Kotlin
- UI: XML Layouts with Material Design Components
- Architecture: Activity-based with MVVM patterns
- Networking: Retrofit 2 + OkHttp + Gson
- Storage: DataStore (for JWT token)
- Async: Kotlin Coroutines

**Package:** `com.synchef.app`  
**Min SDK:** 24 (Android 7.0)  
**Target SDK:** 34 (Android 14)

### 7.2 MainActivity (Landing Page)

**Features:**
- SynChef logo and branding
- "Login" button
- "Create Account" button
- Purple gradient background
- Checks for existing JWT token on startup
- Auto-redirects to Dashboard if logged in

**Design:**
- Full-screen purple gradient (#6366F1)
- Chef emoji logo 🍳
- Yellow primary button (#FCD34D)
- White transparent secondary button
- Center-aligned content

### 7.3 Register Screen

**Features:**
- Username input (required)
- Email input (required, validated)
- Full Name input (optional)
- Phone Number input (optional)
- Password input (required, min 6 chars)
- Confirm Password input (required)
- "Create Account" button
- Link to Login screen
- Error message display
- Form validation

**Design:**
- Purple gradient background
- White card with rounded corners (24dp radius)
- Material Design text input fields
- Password visibility toggle
- Yellow submit button
- Scrollable layout for smaller screens

**API Integration:**
- POST `/api/auth/register`
- Stores JWT token in DataStore
- Navigates to Dashboard on success

### 7.4 Login Screen

**Features:**
- Username input (required)
- Password input (required)
- "Login" button
- Link to Register screen
- Error message display
- Loading state

**Design:**
- Purple gradient background
- White card with rounded corners
- Material input fields with icons
- Password visibility toggle
- Yellow login button
- "Welcome Back" heading

**API Integration:**
- POST `/api/auth/login`
- Saves JWT token in DataStore
- Redirects to Dashboard on success
- Shows error for invalid credentials

### 7.5 Dashboard Screen (Protected)

**Features:**
- Top bar with "SynChef Dashboard" title
- Logout button in header
- Profile card with:
  - Circular avatar with user initials
  - Full name and username
  - User ID
  - Username
  - Email address
  - Full name
  - Phone number
  - Member since date
  - Account status badge
- Scroll view for long content
- Loading indicator

**Design:**
- Purple top bar with white text
- Gray background (#F3F4F6)
- White profile card with shadow
- Purple circular avatar
- Yellow status badge
- Clean typography hierarchy
- Organized information layout

**API Integration:**
- GET `/api/user/me` (with JWT token in header)
- POST `/api/auth/logout`
- Displays user profile data
- Clears token and redirects to Main on logout

### 7.6 Key Mobile Features

**JWT Token Management:**
- Stored securely using AndroidX DataStore
- Automatically attached to API requests via AuthInterceptor
- Persists across app restarts
- Cleared on logout

**Navigation Flow:**
```
MainActivity (check token)
    ├─ Has token → Dashboard
    └─ No token → Login/Register
         ├─ Login → Dashboard
         └─ Register → Dashboard
              └─ Logout → MainActivity
```

**Protected Routes:**
- Dashboard activity requires valid JWT token
- Token verified on each API call
- Invalid/expired token redirects to MainActivity

**Error Handling:**
- Network errors displayed to user
- Form validation before API calls
- Invalid credentials show error message
- API errors parsed and displayed

**Responsive Design:**
- Works on all screen sizes (phones & tablets)
- ScrollView for smaller screens
- Adaptive text sizing
- Material Design guidelines followed

### 7.7 API Configuration

**Base URL:** `http://10.0.2.2:8080/api/`  
(Android Emulator uses `10.0.2.2` to access host machine's localhost)

**For Physical Device:**
Update `RetrofitClient.kt`:
```kotlin
private const val BASE_URL = "http://YOUR_COMPUTER_IP:8080/api/"
```

**Endpoints Used:**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /user/me` - Get current user (requires JWT)

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer {JWT_TOKEN}
```

### 7.8 Build Configuration

**Gradle Dependencies:**
```gradle
// AndroidX
implementation 'androidx.core:core-ktx:1.12.0'
implementation 'androidx.appcompat:appcompat:1.6.1'
implementation 'com.google.android.material:material:1.11.0'

// Networking
implementation 'com.squareup.retrofit2:retrofit:2.9.0'
implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
implementation 'com.squareup.okhttp3:logging-interceptor:4.12.0'

// Coroutines
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3'

// DataStore
implementation 'androidx.datastore:datastore-preferences:1.0.0'
```

**AndroidManifest Permissions:**
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### 7.9 Running the Mobile App

**Prerequisites:**
1. Android Studio Hedgehog or later
2. JDK 8+
3. Android Emulator or physical device
4. Backend running on localhost:8080

**Steps:**
1. Open `mobile` folder in Android Studio
2. Wait for Gradle sync to complete
3. Select emulator or device
4. Click Run ▶️
5. App will launch on selected device

**Troubleshooting:**
- If cannot connect to backend, ensure backend is running
- For physical device, update BASE_URL with computer's IP
- Check firewall allows connections on port 8080

---

## 8. Security Implementation

### 7.1 Password Security

**BCrypt Encryption:**
- Passwords are hashed using BCrypt algorithm
- Salt rounds: 10 (default)
- Passwords are NEVER stored in plain text
- One-way encryption (cannot be decrypted)

**Example:**
```
Plain Password: "password123"
BCrypt Hash: "$2a$10$N9qo8uLOickgx2ZMRZoMye..."
```

### 7.2 JWT Authentication

**Token Structure:**
- Header: Algorithm (HS256)
- Payload: Username, Issued At, Expiration
- Signature: HMAC SHA256

**Token Configuration:**
- Secret Key: Stored in application.properties
- Expiration: 24 hours (86400000 ms)
- Type: Bearer token

**Token Flow:**
1. User logs in with credentials
2. Backend verifies username/password
3. Backend generates JWT token
4. Frontend stores token in localStorage
5. Frontend sends token in Authorization header
6. Backend validates token on protected routes

### 7.3 CORS Configuration

**Allowed Origins:** `http://localhost:3000`  
**Allowed Methods:** GET, POST, PUT, DELETE, OPTIONS  
**Allowed Headers:** *  
**Allow Credentials:** true

### 7.4 Protected Routes

**Backend:**
- `/api/auth/**` - Public
- `/api/user/me` - Requires JWT token

**Frontend:**
- `/register` - Public
- `/login` - Public
- `/dashboard` - Protected (requires authentication)

### 7.5 Security Best Practices Implemented

✅ Password encryption with BCrypt  
✅ JWT-based stateless authentication  
✅ CORS configuration  
✅ Protected API endpoints  
✅ Token validation on each request  
✅ Secure password minimum length (6 chars)  
✅ Input validation on both frontend and backend  
✅ SQL injection prevention (JPA/Hibernate)  
✅ XSS prevention (React escapes by default)  
✅ Secure token storage (localStorage for web, DataStore for mobile)  
✅ HTTPS-ready configuration (for production)  
✅ Logout endpoint to clear server-side context

---

## 9. Testing Guide

### 8.1 Backend Testing

**Start Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Test Endpoints with cURL:**

Register:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"test123"}'
```

Login:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
```

Get User Profile:
```bash
curl -X GET http://localhost:8080/api/user/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 8.2 Web Application Testing

**Start Web App:**
```bash
cd web
npm install
npm start
```

**Test Scenarios:**

1. **Register New User:**
   - Navigate to http://localhost:3000/register
   - Fill in all fields
   - Click Register
   - Should redirect to dashboard

2. **Login Existing User:**
   - Navigate to http://localhost:3000/login
   - Enter credentials
   - Click Login
   - Should redirect to dashboard

3. **View Profile:**
   - After login, view profile information
   - Verify all user details are displayed
   - Check avatar shows correct initials

4. **Logout:**
   - Click Logout button
   - Should redirect to login
   - Try accessing /dashboard - should redirect to login

5. **Protected Route:**
   - Without logging in, try to access /dashboard directly
   - Should redirect to login page

### 8.3 Mobile Application Testing

**Start Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Run Mobile App:**
1. Open Android Studio
2. Open `mobile` folder as project
3. Wait for Gradle sync
4. Run on emulator or device

**Test Scenarios:**

1. **First Launch:**
   - Should show MainActivity with Login/Register buttons
   - Click Register to test registration
   - Click Login to test login

2. **Register New User:**
   - Tap "Create Account"
   - Fill in username, email, password
   - Optional: add full name and phone
   - Tap "Create Account" button
   - Should navigate to Dashboard
   - Profile should show entered information

3. **Login Existing User:**
   - From MainActivity, tap "Login"
   - Enter username and password
   - Tap "Login" button
   - Should navigate to Dashboard
   - Verify profile information is correct

4. **View Profile:**
   - In Dashboard, verify all fields:
     - Avatar shows correct initials
     - Username, email, full name displayed
     - Phone number (or "Not provided")
     - Member since date formatted correctly
     - Status badge shows "Active"

5. **Logout:**
   - Tap "Logout" button in top bar
   - Should return to MainActivity
   - Close and reopen app - should stay on MainActivity (token cleared)

6. **Token Persistence:**
   - Login to app
   - Close app completely
   - Reopen app
   - Should automatically go to Dashboard (token persisted)

7. **Protected Route:**
   - Without logging in, observe MainActivity
   - Cannot access Dashboard without token
   - After logout, Dashboard is inaccessible

8. **Error Handling:**
   - Try wrong credentials - should show error
   - Try registering with existing username - should show error
   - Turn off backend - should show network error

---

## 10. Future Enhancements (Lab 2+)

- ~~Mobile application (Android/iOS)~~ ✅ **Completed in this session**
- Recipe CRUD operations
- Adaptive Timer System
- Global Flavor Map (3D globe)
- Dynamic Ingredient Scaling
- Focus Mode for recipes
- Recipe search and filtering
- User favorites and ratings
- Social features (share recipes)
- Image upload for recipes

---

## 11. Conclusion

This document covers the complete implementation of the User Registration and Authentication system for SynChef. The system includes:

- ✅ Backend API with Spring Boot
- ✅ MySQL database integration
- ✅ BCrypt password encryption
- ✅ JWT authentication with logout endpoint
- ✅ Improved API responses with ApiResponse wrapper
- ✅ Global exception handling
- ✅ ReactJS web application
- ✅ **Android mobile application (Kotlin + XML)**
- ✅ Register, Login, and Dashboard pages (Web & Mobile)
- ✅ Protected routes
- ✅ Logout functionality
- ✅ Token persistence (localStorage for web, DataStore for mobile)

**Platforms Implemented:**
1. **Backend**: Spring Boot REST API
2. **Web**: ReactJS Single Page Application
3. **Mobile**: Android Native App (Kotlin)

All requirements for the session have been successfully implemented. Both web and mobile applications connect to the same backend API and share the same authentication flow.

---

**Document Version:** 2.0  
**Last Updated:** February 14, 2026  
**Authors:** Group 5 - Batawang  
**Course:** IT342
