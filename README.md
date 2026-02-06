# SynChef - Real-Time Recipe Execution & Global Gastronomy

## 🍳 Project Overview
SynChef is an innovative recipe application that focuses on **Real-Time Execution** and **Global Gastronomy**. Unlike traditional recipe apps that make you scroll through long blog posts, SynChef provides a streamlined cooking experience with parallel timers, cultural insights, and dynamic ingredient scaling.

## ✨ Key Features

### 1. Adaptive Timer System
- **Parallel Timers**: Tracks multiple cooking tasks simultaneously
- Smart alerts to help you start tasks at the right time
- All components finish cooking together

### 2. Global "Flavor Map"
- Interactive 3D globe interface
- Select continents (Asia, Europe, Americas, etc.)
- Explore traditional ingredients by country
- Learn authentic cooking procedures

### 3. Dynamic Ingredient Scaling
- Automatically recalculates ingredients based on servings (Pax)
- Adjusts cooking times accordingly
- Backend logic ensures perfect proportions

### 4. Progressive Step-by-Step UI
- **Focus Mode**: One instruction at a time
- Prevents information overload
- Clean, intuitive navigation

### 5. User-Centric UI/UX
- Eye-catching design and animations
- Simple interface for users 20+
- Accessible and easy to understand

## 🏗️ Project Structure

```
IT342_G5_Batawang_Lab1/
├── backend/          # Spring Boot API
├── web/             # ReactJS Web Application
├── mobile/          # Mobile App (Future)
├── docs/            # Documentation & Diagrams
├── README.md        # This file
└── TASK_CHECKLIST.md # Progress Tracker
```

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.x
- **Database**: MySQL
- **Security**: Spring Security with JWT
- **Password Encryption**: BCrypt
- **Build Tool**: Maven

### Web Application
- **Framework**: ReactJS 18.x
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3 / Tailwind CSS

### Mobile Application (Future)
- TBD (Next Lab Session)

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- MySQL 8.0 or higher
- Maven 3.8+

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Configure MySQL database in `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/synchef_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Run the application:
```bash
mvn spring-boot:run
```

Backend will start on `http://localhost:8080`

### Web Application Setup

1. Navigate to web folder:
```bash
cd web
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Web app will start on `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### User Management
- `GET /api/user/me` - Get current user profile (Protected)

## 📚 Documentation

All project documentation, diagrams, and FRS are located in the `/docs` folder:
- Entity Relationship Diagram (ERD)
- UML Diagrams
- Functional Requirements Specification (FRS)
- UI Screenshots

## 👥 Team

**Group 5 - Batawang**
- Course: IT342
- Lab: 1
- Session: User Registration and Authentication

## 📝 License

This project is created for educational purposes as part of IT342 coursework.

## 🔗 Repository

GitHub: [IT342_G5_Batawang_Lab1](https://github.com/your-username/IT342_G5_Batawang_Lab1)

---

**Note**: Mobile application will be implemented in the next laboratory session.
