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
7. [Security Implementation](#security-implementation)

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

## 7. Security Implementation

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

---

## 8. Testing Guide

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

---

## 9. Future Enhancements (Lab 2+)

- Mobile application (Android/iOS)
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

## 10. Conclusion

This document covers the complete implementation of the User Registration and Authentication system for SynChef. The system includes:

- ✅ Backend API with Spring Boot
- ✅ MySQL database integration
- ✅ BCrypt password encryption
- ✅ JWT authentication
- ✅ ReactJS web application
- ✅ Register, Login, and Dashboard pages
- ✅ Protected routes
- ✅ Logout functionality

All requirements for Lab 1 have been successfully implemented.

---

**Document Version:** 1.0  
**Last Updated:** February 6, 2026  
**Authors:** Group 5 - Batawang  
**Course:** IT342
