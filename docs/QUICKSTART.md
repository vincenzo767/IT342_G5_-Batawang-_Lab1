# 🚀 Quick Start Guide - Run SynChef Now!

This is the simplest way to get SynChef running on your machine.

---

## Prerequisites Check

Before starting, ensure you have:

```bash
# Check Java (should be 17+)
java -version

# Check Node.js (should be 18+)
node --version

# Check PostgreSQL is installed
psql --version
```

If any are missing, go to:
- Java: https://adoptium.net/
- Node.js: https://nodejs.org/
- PostgreSQL: https://www.postgresql.org/download/

---

## 3-Step Setup

### Step 1: Setup Database (5 minutes)

```bash
# Start PostgreSQL service
# Windows: Search for "Services" app and start "postgresql-x64-14"
# macOS: brew services start postgresql
# Linux: sudo systemctl start postgresql

# Create database
psql -U postgres -c "CREATE DATABASE synchef_db;" 2>/dev/null || echo "Database may already exist"

# Verify connection
psql -U postgres -d synchef_db -c "SELECT 1;" 2>/dev/null && echo "✅ Database ready!" || echo "⚠️ Database connection issue"
```

### Step 2: Start Backend (30 seconds)

```bash
cd SynChef/backend

# Run (select one method):

# Method 1: Maven (easiest if you have Maven)
mvn spring-boot:run

# Method 2: Java (if Maven not installed)
# First build once: mvn clean install -DskipTests
# Then run: java -jar target/synchef-backend-1.0.0.jar

# Method 3: IDE
# Open in IntelliJ/Eclipse → Right-click SynChefApplication.java → Run
```

✅ **Backend is ready when you see**: `Started SynChefApplication in X.XXXs`

### Step 3: Start Frontend (20 seconds)

```bash
cd SynChef/frontend

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev
```

✅ **Frontend is ready when you see**: `Local: http://localhost:5173/`

---

## 🎉 You're Done!

**Open your browser:** http://localhost:5173

You should see:
- 🏠 Home page with recipe grid
- 🌍 Flavor Map button
- 🔓 Login button

---

## Try These Features

### 1. Register & Login
1. Click "Login" button (top right)
2. Click "Sign up" link
3. Enter any name, email, username, password
4. Click "Sign Up"
5. Now see your name in top right instead of "Login"

### 2. Browse Recipes
1. Click "Home" button
2. See recipe cards displayed
3. Click any recipe to view details

### 3. Filter Recipes
1. On Home page, find category buttons
2. Click "Breakfast", "Lunch", "Dinner" etc.
3. Recipe list updates instantly

### 4. Search Recipes
1. Find search box at top of recipe list
2. Type "pasta", "chicken", "salad"
3. Results filter in real-time
4. Clear search box to reset

### 5. Explore Flavor Map
1. Click "Flavor Map" button
2. See 3D rotating globe
3. Click continent buttons to filter countries
4. Click country to view recipes from that country

### 6. Logout
1. Click your name in top right
2. Click "Logout" button
3. Now see "Login" button again

---

## Troubleshooting

### "Can't connect to database"
```bash
# Start PostgreSQL
# Windows: Open Services app, find postgresql, click Start
# macOS: brew services start postgresql
# Linux: sudo systemctl start postgresql

# Create database if not exists
psql -U postgres -c "CREATE DATABASE synchef_db;"
```

### "Port 8080 already in use"
```bash
# Change backend port in backend/src/main/resources/application.properties
# Find: server.port=8080
# Change to: server.port=8081
```

### "Port 5173 already in use"
```bash
# Change frontend port
npm run dev -- --port 5174
```

### "Blank page or errors in browser"
1. Open browser DevTools (F12 or Cmd+Option+I)
2. Check Console tab for error messages
3. Check Network tab → see if requests to localhost:8080 succeed
4. Make sure backend is running

### "npm: command not found"
- Node.js not installed properly
- Install from: https://nodejs.org/
- Restart terminal after installation

### "mvn: command not found"
- Maven not installed
- Option 1: Install Maven from https://maven.apache.org/
- Option 2: Use IDE built-in Maven
- Option 3: Build once with IDE, then run JAR directly

---

## Common Commands

```bash
# Backend
cd backend
mvn clean install                    # Build project
mvn spring-boot:run                  # Run server
mvn test                             # Run tests

# Frontend
cd frontend
npm install                          # Install dependencies
npm run dev                          # Start dev server
npm run build                        # Build for production
npm test                             # Run tests
```

---

## What's Working?

✅ **Authentication**
- Register with email/username/password
- Login with same credentials
- See logged-in status in Navigation

✅ **Recipe Discovery**
- View all recipes on Home page
- Filter by meal category (6 categories)
- Search by recipe name or keywords
- Click recipe to see details

✅ **Flavor Map**
- 3D rotating globe
- Select continents to filter countries
- View recipes by country
- Visual country flag and description

✅ **User Experience**
- Beautiful gradient UI
- Smooth animations
- Responsive mobile design
- Error messages for validation

---

## What's Optional?

⭐ **Google Login** (optional, adds social login)
1. Create Google Cloud project
2. Get OAuth Client ID
3. Add to frontend/.env.local: `VITE_GOOGLE_CLIENT_ID=your_id`
4. Google login button on login page will work

See `SETUP_GUIDE.md` for full Google OAuth setup instructions.

---

## Next Steps

1. **Read the full README.md** for complete feature overview
2. **Check FEATURES_COMPLETED.md** for detailed implementation info
3. **See SETUP_GUIDE.md** for advanced configuration (Google OAuth, etc.)
4. **Customize the app** - Change colors, add more recipes, etc.

---

## Need Help?

### Check these files:
- `SETUP_GUIDE.md` - Detailed setup with troubleshooting
- `FEATURES_COMPLETED.md` - What's been implemented
- `README.md` - Project overview
- `PROJECT_STRUCTURE.md` - File organization

### Common Issues:
- Database not running → Check PostgreSQL service
- Backend not starting → Check Java version (needs 17+)
- Frontend errors → Check browser console (F12)
- Port conflicts → Change port number in config

---

## 📝 Summary

| Component | Port | Status |
|-----------|------|--------|
| Frontend | 5173 | ✅ Ready |
| Backend | 8080 | ✅ Ready |
| Database | 5432 | ✅ Ready |

**All three must be running for full functionality!**

---

## 🎉 You're All Set!

Open http://localhost:5173 in your browser and enjoy SynChef!

**Happy Cooking! 🍳**

---

*For detailed setup, see SETUP_GUIDE.md*
*For what's implemented, see FEATURES_COMPLETED.md*
*For questions, check README.md*
