# SynChef - Setup Guide

Complete guide to set up and run the SynChef application.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Java**: JDK 17 or higher
- **Maven**: 3.8 or higher
- **Node.js**: 18 or higher
- **MySQL**: 8.0 or higher
- **Git**: For version control

## Step-by-Step Setup

### 1. Database Setup

#### Create MySQL Database

```sql
-- Login to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE synchef_db;

-- Verify database creation
SHOW DATABASES;

-- Exit MySQL
exit;
```

#### Update Database Credentials (if needed)

If your MySQL credentials are different, update the configuration:

**File**: `backend/src/main/resources/application.properties`

```properties
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
```

### 2. Backend Setup

#### Navigate to Backend Folder

```bash
cd backend
```

#### Install Dependencies and Build

```bash
mvn clean install
```

#### Run the Backend

```bash
mvn spring-boot:run
```

The backend will start on **http://localhost:8080**

#### Verify Backend is Running

Open browser and navigate to:
```
http://localhost:8080/api/auth/test
```

You should see:
```json
{
  "message": "Auth API is working!"
}
```

### 3. Web Application Setup

#### Navigate to Web Folder

Open a new terminal window:

```bash
cd web
```

#### Install Dependencies

```bash
npm install
```

This will install all required packages (React, React Router, Axios, etc.)

#### Run the Web Application

```bash
npm start
```

The web app will start on **http://localhost:3000** and automatically open in your browser.

### 4. Test the Application

#### Register a New User

1. Navigate to `http://localhost:3000/register`
2. Fill in the registration form:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `test123`
   - Full Name: `Test User`
   - Phone: `09123456789`
3. Click **Register**
4. You should be redirected to the dashboard

#### Login with Existing User

1. Navigate to `http://localhost:3000/login`
2. Enter credentials:
   - Username: `testuser`
   - Password: `test123`
3. Click **Login**
4. You should be redirected to the dashboard

#### View Profile

After logging in, you'll see your profile with:
- User avatar with initials
- Username and email
- Full name and phone number
- Member since date
- Account status

#### Logout

Click the **Logout** button in the dashboard header to log out.

## Directory Structure

```
IT342_G5_Batawang_Lab1/
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── README.md
├── web/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── mobile/
│   └── README.md (empty for now)
├── docs/
│   ├── FRS.md
│   └── README.md
├── README.md
└── TASK_CHECKLIST.md
```

## Troubleshooting

### Backend Issues

#### Port 8080 Already in Use

Change the port in `application.properties`:
```properties
server.port=8081
```

Then update the web app API URL in `web/src/services/api.js`:
```javascript
const API_URL = 'http://localhost:8081/api';
```

#### Database Connection Failed

- Ensure MySQL is running:
  ```bash
  # Windows (as admin)
  net start MySQL80
  
  # macOS/Linux
  sudo systemctl start mysql
  ```

- Verify credentials in `application.properties`
- Ensure database `synchef_db` exists

#### Maven Build Errors

```bash
# Clean and rebuild
mvn clean
mvn install -U
```

### Web Application Issues

#### npm install Errors

```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### CORS Errors

Ensure backend is running and CORS is configured for `http://localhost:3000` in `SecurityConfig.java`

#### Connection Refused

- Ensure backend is running on port 8080
- Check browser console for errors
- Verify API URL in `web/src/services/api.js`

### Common Errors

#### "JWT Token is Invalid"

- Token might be expired (24 hour expiration)
- Clear localStorage and login again
- Check JWT secret in `application.properties`

#### "Username Already Exists"

- Username must be unique
- Try a different username or login with existing credentials

## Development Tips

### Auto-Restart Backend

The backend uses Spring Boot DevTools for automatic restart on file changes.

### Hot Module Replacement (Web)

React development server automatically reloads on file changes.

### Database Inspection

View database contents:
```sql
mysql -u root -p
USE synchef_db;
SELECT * FROM users;
```

### API Testing with cURL

**Register:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"apitest","email":"api@test.com","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"apitest","password":"test123"}'
```

**Get Profile (replace TOKEN):**
```bash
curl -X GET http://localhost:8080/api/user/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Next Steps

After completing Lab 1:

1. Take screenshots of the web application
2. Add screenshots to the `docs/` folder
3. Update `docs/FRS.md` with screenshot references
4. Convert FRS to PDF
5. Commit all changes to GitHub
6. Update `TASK_CHECKLIST.md` with commit hashes
7. Submit GitHub repository link

## Support

For issues or questions:
- Check the README files in each folder
- Review the FRS documentation
- Check application logs
- Verify all prerequisites are installed

---

**Good luck with your project! 🚀**
