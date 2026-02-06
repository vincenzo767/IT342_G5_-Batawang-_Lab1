# SynChef Backend

Spring Boot backend API for SynChef application with user authentication and authorization.

## Tech Stack
- Spring Boot 3.2.2
- Spring Security with JWT
- Spring Data JPA
- MySQL Database
- BCrypt Password Encryption
- Maven

## Prerequisites
- Java 17+
- MySQL 8.0+
- Maven 3.8+

## Setup Instructions

### 1. Database Configuration

Create MySQL database:
```sql
CREATE DATABASE synchef_db;
```

Update credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/synchef_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 2. Build and Run

```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "phoneNumber": "09123456789"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**
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

### User

#### Get Current User (Protected)
```http
GET /api/user/me
Authorization: Bearer {token}
```

**Response:**
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

## Security Features

- **Password Encryption**: BCrypt with salt
- **JWT Authentication**: Token-based authentication
- **Protected Routes**: Endpoints secured with Spring Security
- **CORS Configuration**: Configured for web application
- **Session Management**: Stateless session policy

## Database Schema

### User Table
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
    is_active BOOLEAN DEFAULT TRUE
);
```

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","email":"john@example.com","password":"password123","fullName":"John Doe"}'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","password":"password123"}'
```

### Get Current User
```bash
curl -X GET http://localhost:8080/api/user/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Project Structure
```
backend/
├── src/main/java/com/synchef/
│   ├── SynChefApplication.java
│   ├── config/
│   │   └── SecurityConfig.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   └── UserController.java
│   ├── dto/
│   │   ├── AuthResponse.java
│   │   ├── LoginRequest.java
│   │   ├── MessageResponse.java
│   │   ├── RegisterRequest.java
│   │   └── UserResponse.java
│   ├── model/
│   │   └── User.java
│   ├── repository/
│   │   └── UserRepository.java
│   ├── security/
│   │   ├── CustomUserDetailsService.java
│   │   ├── JwtAuthenticationFilter.java
│   │   └── JwtTokenProvider.java
│   └── service/
│       ├── AuthService.java
│       └── UserService.java
└── src/main/resources/
    └── application.properties
```

## Development

To run in development mode with auto-reload:
```bash
mvn spring-boot:run -Dspring-boot.run.fork=false
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Ensure MySQL is running
   - Check database credentials
   - Verify database exists

2. **Port Already in Use**
   - Change port in application.properties: `server.port=8081`

3. **JWT Token Issues**
   - Check token expiration
   - Verify JWT secret is properly configured
   - Ensure Authorization header format: `Bearer {token}`

## License
Educational Project - IT342 Lab 1
