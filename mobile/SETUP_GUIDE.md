# 🚀 SynChef Mobile App - Quick Start Guide

## Overview
The SynChef Android mobile app has been successfully implemented with full authentication features matching the web application.

---

## ✅ What's Been Implemented

### Backend (Spring Boot)
- ✅ Consistent API responses with `ApiResponse<T>` wrapper
- ✅ POST `/api/auth/logout` endpoint
- ✅ Global exception handler for validation errors
- ✅ Improved error messages

### Mobile App (Android - Kotlin)
- ✅ **MainActivity** - Landing page with Login/Register buttons
- ✅ **RegisterActivity** - User registration with validation
- ✅ **LoginActivity** - User authentication
- ✅ **DashboardActivity** - Protected profile page
- ✅ JWT token storage using DataStore
- ✅ Retrofit + OkHttp for API calls
- ✅ Material Design UI matching web app style
- ✅ Logout functionality
- ✅ Protected routes

---

## 📋 Prerequisites

1. **Android Studio** (Hedgehog 2023.1.1 or later)
   - Download: https://developer.android.com/studio

2. **JDK 8 or later**
   - Usually comes with Android Studio

3. **Android SDK**
   - API 24 (Android 7.0) minimum
   - API 34 (Android 14) target
   - Install via Android Studio SDK Manager

4. **Backend Running**
   - Spring Boot backend must be running on `localhost:8080`

---

## 🛠 Setup Instructions

### Step 1: Open Project in Android Studio

1. Launch **Android Studio**
2. Click **Open** (or File → Open)
3. Navigate to: `C:\Users\Admin\Desktop\SynChef\IT342_G5_-Batawang-_Lab1\mobile`
4. Click **OK**

### Step 2: Wait for Gradle Sync

- Android Studio will automatically sync Gradle
- This may take 2-5 minutes on first open
- Watch the bottom status bar for progress
- If sync fails, click "Try Again"

### Step 3: Start Backend Server

```bash
# Open terminal in backend folder
cd backend
mvn spring-boot:run
```

**Verify backend is running:**
- Open browser: http://localhost:8080/api/auth/test
- Should see: `{"success":true,"message":"Auth API is working!","data":"ok",...}`

### Step 4: Run the App

**Option A: Using Android Emulator**
1. Click **Device Manager** (phone icon in top-right)
2. Create a device if none exists:
   - Click **Create Device**
   - Select **Phone → Pixel 5**
   - Select **System Image → API 34** (download if needed)
   - Click **Finish**
3. Click ▶️ **Run** button (or Shift+F10)
4. Select your emulator
5. Wait for app to launch

**Option B: Using Physical Device**
1. Enable **Developer Options** on phone:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
2. Enable **USB Debugging**:
   - Settings → Developer Options → USB Debugging
3. Connect phone via USB
4. Allow USB debugging prompt
5. Click ▶️ **Run** button
6. Select your device

**For Physical Device - Update API URL:**
1. Find your computer's IP address:
   ```bash
   # Windows
   ipconfig
   # Look for "IPv4 Address" (usually 192.168.x.x)
   ```
2. Edit `mobile/app/src/main/java/com/synchef/app/data/network/RetrofitClient.kt`:
   ```kotlin
   private const val BASE_URL = "http://192.168.1.100:8080/api/"  // Your IP
   ```
3. Rebuild and run

---

## 🧪 Testing the App

### Test Scenario 1: Register New User
1. Launch app → Should see MainActivity
2. Tap **"Create Account"**
3. Fill in:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `test123`
   - Confirm Password: `test123`
4. Tap **"Create Account"** button
5. ✅ Should navigate to Dashboard
6. ✅ Should see profile with entered info

### Test Scenario 2: Login
1. From MainActivity, tap **"Login"**
2. Enter credentials:
   - Username: `testuser`
   - Password: `test123`
3. Tap **"Login"** button
4. ✅ Should navigate to Dashboard
5. ✅ Profile should display correctly

### Test Scenario 3: Token Persistence
1. Login to app
2. Press Home button (app goes to background)
3. Force close app
4. Reopen app
5. ✅ Should automatically go to Dashboard (token persisted)

### Test Scenario 4: Logout
1. In Dashboard, tap **"Logout"** button
2. ✅ Should return to MainActivity
3. Close and reopen app
4. ✅ Should stay on MainActivity (token cleared)

### Test Scenario 5: Error Handling
1. Try wrong password
   - ✅ Should show error message
2. Try registering existing username
   - ✅ Should show "Username is already taken!"
3. Stop backend server
   - ✅ Should show network error

---

## 🎨 UI Screens Preview

### 1. MainActivity (Landing)
- Purple gradient background
- Chef emoji logo 🍳
- "SynChef" title
- Yellow "Login" button
- White transparent "Create Account" button

### 2. Register Screen
- Purple gradient background
- White card with rounded corners
- Input fields: Username, Email, Full Name, Phone, Password, Confirm Password
- Yellow "Create Account" button
- Link to Login screen
- Scrollable for smaller screens

### 3. Login Screen
- Purple gradient background
- White card
- "Welcome Back" heading
- Input fields: Username, Password
- Password visibility toggle
- Yellow "Login" button
- Link to Register screen

### 4. Dashboard Screen
- Purple top bar with "SynChef Dashboard" title
- Yellow "Logout" button in header
- White profile card with:
  - Purple circular avatar with initials
  - Full name and @username
  - User ID, Email, Phone
  - Member since date
  - Yellow "Active" status badge

---

## 🐛 Troubleshooting

### Problem: "Cannot connect to backend"
**Solutions:**
- ✅ Ensure backend is running (`mvn spring-boot:run`)
- ✅ For emulator, URL should be `http://10.0.2.2:8080`
- ✅ For physical device, use computer's IP address
- ✅ Check Windows Firewall allows port 8080
- ✅ Try: `curl http://localhost:8080/api/auth/test`

### Problem: "Gradle sync failed"
**Solutions:**
- ✅ Check internet connection
- ✅ File → Invalidate Caches → Invalidate and Restart
- ✅ Delete `.gradle` folder and sync again
- ✅ Update Gradle version if prompted

### Problem: "App crashes on launch"
**Solutions:**
- ✅ Check Logcat for errors (View → Tool Windows → Logcat)
- ✅ Clean project: Build → Clean Project
- ✅ Rebuild: Build → Rebuild Project
- ✅ Uninstall app from device and reinstall

### Problem: "Cannot resolve symbols"
**Solutions:**
- ✅ Wait for Gradle sync to complete
- ✅ Build → Make Project
- ✅ File → Sync Project with Gradle Files

### Problem: "ViewBinding not found"
**Solutions:**
- ✅ Ensure `viewBinding = true` in `app/build.gradle`
- ✅ Clean and rebuild project
- ✅ Imports should be: `import com.synchef.app.databinding.ActivityMainBinding`

---

## 📁 Project Structure

```
mobile/
├── app/
│   ├── src/main/
│   │   ├── java/com/synchef/app/
│   │   │   ├── SynChefApp.kt              # Application class
│   │   │   ├── data/
│   │   │   │   ├── TokenManager.kt        # JWT storage (DataStore)
│   │   │   │   ├── model/
│   │   │   │   │   ├── ApiResponse.kt     # API response wrapper
│   │   │   │   │   ├── User.kt            # User model
│   │   │   │   │   ├── AuthResponse.kt    # Auth response
│   │   │   │   │   ├── LoginRequest.kt
│   │   │   │   │   └── RegisterRequest.kt
│   │   │   │   └── network/
│   │   │   │       ├── ApiService.kt      # Retrofit API interface
│   │   │   │       ├── AuthInterceptor.kt # JWT interceptor
│   │   │   │       └── RetrofitClient.kt  # Retrofit setup
│   │   │   └── ui/
│   │   │       ├── MainActivity.kt        # Landing page
│   │   │       ├── RegisterActivity.kt    # Registration
│   │   │       ├── LoginActivity.kt       # Login
│   │   │       └── DashboardActivity.kt   # Profile (protected)
│   │   ├── res/
│   │   │   ├── layout/                    # XML layouts
│   │   │   ├── values/                    # Colors, strings, styles
│   │   │   ├── drawable/                  # Backgrounds, icons
│   │   │   └── mipmap*/                   # Launcher icons
│   │   └── AndroidManifest.xml            # App configuration
│   ├── build.gradle                       # App dependencies
│   └── proguard-rules.pro                 # ProGuard config
├── build.gradle                           # Project build config
├── settings.gradle                        # Module settings
└── README.md                              # Mobile app documentation
```

---

## 🔑 Key Features

### API Integration
- Base URL: `http://10.0.2.2:8080/api/` (emulator)
- Retrofit 2 + OkHttp + Gson
- Automatic JWT token attachment
- Request/response logging

### Token Management
- Secure storage with DataStore
- Auto-attach to API requests
- Persistence across app restarts
- Cleared on logout

### UI/UX
- Material Design Components
- Match web app colors
- Responsive layouts
- Loading states
- Error messages
- Form validation

### Security
- JWT authentication
- Protected routes
- Token expiration handling
- Password visibility toggle
- HTTPS-ready

---

## 📝 API Endpoints Used

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/auth/register` | No | User registration |
| POST | `/auth/login` | No | User login |
| POST | `/auth/logout` | No | User logout |
| GET | `/user/me` | Yes | Get current user |

---

## ✨ Next Steps

1. **Take Screenshots**
   - Run app on emulator
   - Navigate through all screens
   - Capture for FRS documentation

2. **Test Thoroughly**
   - Test all scenarios above
   - Verify error handling
   - Check token persistence

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: Add Android mobile app with authentication"
   git push origin main
   ```

4. **Update Documentation**
   - Add screenshots to FRS
   - Export FRS.md to PDF
   - Update commit hashes in TASK_CHECKLIST.md

---

## 🎉 Success!

Your Android mobile app is now ready to run! The app connects to the same backend as the web application and provides the same authentication features with a native mobile experience.

**Key Achievements:**
- ✅ Full authentication flow (Register, Login, Logout)
- ✅ Protected routes with JWT
- ✅ Material Design UI matching web
- ✅ Secure token storage
- ✅ Error handling
- ✅ Production-ready structure

**Happy Testing! 🚀**
