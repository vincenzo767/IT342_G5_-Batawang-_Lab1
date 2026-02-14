# SynChef Android App

## 📱 Android Mobile Application

This is the Android mobile implementation of SynChef using Kotlin and XML layouts.

### ✅ Implemented Features
- User Registration
- User Login with JWT authentication
- Dashboard/Profile screen (protected)
- Logout functionality
- Connection to Spring Boot backend

### 🛠 Technology Stack
- **Language**: Kotlin
- **UI**: XML Layouts with Material Design
- **Architecture**: Activity-based
- **Networking**: Retrofit 2 + OkHttp
- **Data Storage**: DataStore (for JWT token)
- **Async**: Kotlin Coroutines

### 📦 Dependencies
- AndroidX Core & AppCompat
- Material Components
- Retrofit 2 & Gson Converter
- OkHttp Logging Interceptor
- Kotlin Coroutines
- DataStore Preferences
- ViewBinding

### 🎨 UI Design
The mobile app follows the same visual style as the web application:
- **Primary Color**: Purple/Indigo (#6366F1)
- **Secondary Color**: Yellow (#FCD34D)
- **Card-based layouts with rounded corners**
- **Material Design components**

### 🔐 Authentication Flow
1. **MainActivity** - Landing page with Login/Register buttons
2. **RegisterActivity** - User registration form
3. **LoginActivity** - User login form
4. **DashboardActivity** - Protected user profile page

### 🌐 API Configuration
- **Base URL**: `http://10.0.2.2:8080/api/` (Android Emulator)
- **Endpoints**:
  - POST `/auth/register`
  - POST `/auth/login`
  - POST `/auth/logout`
  - GET `/user/me` (protected)

### 🚀 Running the App

#### Prerequisites
- Android Studio Hedgehog or later
- JDK 8 or later
- Android SDK 24+ (Android 7.0+)

#### Steps
1. Open the `mobile` folder in Android Studio
2. Wait for Gradle sync to complete
3. Ensure backend is running on `localhost:8080`
4. Run the app on an emulator or physical device

#### For Physical Device
Update the API base URL in `RetrofitClient.kt`:
```kotlin
private const val BASE_URL = "http://<YOUR_COMPUTER_IP>:8080/api/"
```

### 📝 Important Notes

#### Launcher Icons
The app uses adaptive icons (XML-based). For production, you should add PNG launcher icons:
- `ic_launcher.png` in `mipmap-mdpi/`, `mipmap-hdpi/`, `mipmap-xhdpi/`, `mipmap-xxhdpi/`, `mipmap-xxxhdpi/`
- `ic_launcher_round.png` in the same directories

You can generate these using Android Studio's Image Asset Studio:
1. Right-click `res` folder → New → Image Asset
2. Select Icon Type: Launcher Icons
3. Configure your icon (use 🍳 chef hat emoji or custom design)
4. Click Next → Finish

### 🐛 Troubleshooting

#### Cannot connect to backend
- Ensure backend is running
- For emulator, use `http://10.0.2.2:8080`
- For physical device, use your computer's IP address
- Check firewall settings

#### Build errors
- Clean project: `Build → Clean Project`
- Rebuild: `Build → Rebuild Project`
- Invalidate caches: `File → Invalidate Caches → Invalidate and Restart`

---

**Ready for Android Studio!** 🎉
