# SynChef - Complete Setup Guide

## 📋 Prerequisites Checklist

Before you begin, ensure you have the following installed:

- [ ] **Java Development Kit (JDK) 17 or higher**
  - Download: https://www.oracle.com/java/technologies/downloads/
  - Verify: `java -version`

- [ ] **Apache Maven 3.8+**
  - Download: https://maven.apache.org/download.cgi
  - Verify: `mvn -version`

- [ ] **Node.js 18+ and npm**
  - Download: https://nodejs.org/
  - Verify: `node -version` and `npm -version`

- [ ] **PostgreSQL 14+**
  - Download: https://www.postgresql.org/download/
  - Verify: `psql --version`

- [ ] **Git**
  - Download: https://git-scm.com/downloads
  - Verify: `git --version`

- [ ] **Docker (Optional - for containerized deployment)**
  - Download: https://www.docker.com/products/docker-desktop

## 🗄️ Database Setup

### Option 1: Local PostgreSQL

1. **Start PostgreSQL Service**
   ```bash
   # Windows (Command Prompt as Admin)
   net start postgresql-x64-14
   
   # macOS
   brew services start postgresql
   
   # Linux
   sudo systemctl start postgresql
   ```

2. **Create Database**
   ```bash
   # Open PostgreSQL shell
   psql -U postgres
   
   # Create database and user
   CREATE DATABASE synchef_db;
   CREATE USER synchef_user WITH PASSWORD 'synchef_password';
   GRANT ALL PRIVILEGES ON DATABASE synchef_db TO synchef_user;
   \q
   ```

3. **Update Configuration**
   
   Edit `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/synchef_db
   spring.datasource.username=synchef_user
   spring.datasource.password=synchef_password
   ```

### Option 2: Docker PostgreSQL

```bash
docker run --name synchef-postgres \
  -e POSTGRES_DB=synchef_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:14-alpine
```

## 🔧 Backend Setup (Spring Boot)

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
mvn clean install
```

This will:
- Download all Maven dependencies
- Compile the Java code
- Run tests (if any)
- Package the application

### Step 3: Configure AI (Optional)

If you want AI features, get an OpenAI API key:

1. Visit: https://platform.openai.com/api-keys
2. Create a new API key
3. Update `application.properties`:
   ```properties
   spring.ai.openai.api-key=sk-your-actual-api-key-here
   ```

   **OR** create a `.env` file:
   ```env
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

### Step 4: Run the Backend
```bash
mvn spring-boot:run
```

**Expected Output:**
```
Started SynChefApplication in X.XXX seconds
Tomcat started on port(s): 8080 (http)
```

**Verify Backend:**
- Open browser: http://localhost:8080/api/countries
- You should see JSON data with countries

## 🎨 Frontend Setup (React + TypeScript)

### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- React & React DOM
- TypeScript
- Redux Toolkit
- React Router
- Framer Motion
- Three.js & React Three Fiber
- Axios
- And more...

### Step 3: Start Development Server
```bash
npm run dev
```

**Expected Output:**
```
VITE v5.0.12  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

**Verify Frontend:**
- Open browser: http://localhost:3000
- You should see the SynChef homepage

## 🐳 Docker Deployment (Alternative)

### Using Docker Compose

1. **Create Environment File**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

2. **Build and Start All Services**
   ```bash
   docker-compose up -d
   ```

   This will start:
   - PostgreSQL on port 5432
   - Backend API on port 8080
   - Frontend on port 3000

3. **View Logs**
   ```bash
   docker-compose logs -f
   ```

4. **Stop Services**
   ```bash
   docker-compose down
   ```

## ✅ Verification Steps

### 1. Backend Health Check
```bash
curl http://localhost:8080/api/countries
```

Expected: JSON array of countries

### 2. Database Connection
Check backend logs for:
```
HHH000490: Using JtaPlatform implementation
Initialized JPA EntityManagerFactory
```

### 3. Frontend Connection
- Visit http://localhost:3000
- Click on "Explore Global Flavor Map"
- You should see the 3D globe with country markers

### 4. WebSocket Connection
- Start cooking a recipe
- Start a timer
- Timer should update in real-time

## 🔧 Troubleshooting

### Backend Issues

**Problem:** Port 8080 already in use
```
Error: Port 8080 is already in use
```
**Solution:** Change port in `application.properties`:
```properties
server.port=8081
```

**Problem:** Database connection failed
```
Error: Connection to localhost:5432 refused
```
**Solution:** 
- Ensure PostgreSQL is running
- Verify credentials in `application.properties`
- Check firewall settings

**Problem:** Maven build fails
```
Error: JAVA_HOME is not set
```
**Solution:** Set JAVA_HOME environment variable:
```bash
# Windows
set JAVA_HOME=C:\Program Files\Java\jdk-17

# macOS/Linux
export JAVA_HOME=/usr/lib/jvm/java-17
```

### Frontend Issues

**Problem:** npm install fails
```
Error: EACCES: permission denied
```
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Install with legacy peer deps
npm install --legacy-peer-deps
```

**Problem:** Cannot connect to backend
```
Error: Network Error
```
**Solution:** 
- Ensure backend is running on port 8080
- Check Vite proxy configuration in `vite.config.ts`
- Disable CORS browser extensions

**Problem:** Three.js rendering issues
```
Error: WebGL not supported
```
**Solution:** 
- Update graphics drivers
- Use a WebGL-compatible browser (Chrome, Firefox, Edge)

## 📊 Database Seeding

The application automatically seeds sample data on first run:
- 8 countries across different continents
- 7 categories (Main Course, Vegan, Dessert, etc.)
- Sample ingredients
- Sample recipe (Adobong Sitaw from Philippines)

To add more recipes, use the API or database directly.

## 🎯 Next Steps

After successful setup:

1. **Explore the Application**
   - Browse recipes by country
   - Try scaling ingredients
   - Test the parallel timer system
   - Enter Focus Mode for cooking

2. **Add More Recipes**
   - Use the POST endpoint: `/api/recipes`
   - Add ingredients and steps
   - Include timer information

3. **Customize Styling**
   - Modify CSS files in `frontend/src/`
   - Adjust color schemes
   - Change animations

4. **Deploy to Production**
   - Build backend: `mvn clean package`
   - Build frontend: `npm run build`
   - Deploy to your hosting service

## 📚 Additional Resources

- **Spring Boot Documentation**: https://spring.io/projects/spring-boot
- **React Documentation**: https://react.dev/
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **Three.js Examples**: https://threejs.org/examples/

## 🆘 Getting Help

If you encounter issues:

1. Check the console logs (backend and frontend)
2. Review this setup guide
3. Check existing GitHub issues
4. Create a new issue with:
   - Error message
   - Steps to reproduce
   - System information
   - Log files

## 🎉 Success Checklist

- [ ] PostgreSQL running and accessible
- [ ] Backend running on port 8080
- [ ] Frontend running on port 3000
- [ ] Can view homepage
- [ ] Can navigate to Flavor Map
- [ ] 3D globe renders correctly
- [ ] Can view recipe details
- [ ] Timer system works in cooking mode
- [ ] Ingredient scaling updates correctly

---

**Congratulations! 🎊 SynChef is now running on your system!**

Start exploring global cuisines and enjoy the cooking experience!
