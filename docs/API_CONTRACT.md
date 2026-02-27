# 5.0 API CONTRACT & COMMUNICATION

## 5.1 API Standards

| Aspect | Specification |
|--------|---------------|
| **Base URL** | `https://[server_hostname]/[api]/api/v1` |
| **Format** | JSON for all requests/responses |
| **Authentication** | Bearer token (JWT) in Authorization header |

---

## Response Structure

All API responses follow a standardized structure:

```json
{
  "success": boolean,
  "data": object|null,
  "error": {
    "code": string,
    "message": string,
    "details": object|null
  },
  "timestamp": string
}
```

### Response Fields

- **success**: Boolean indicating whether the request was successful
- **data**: Contains the response data when successful, `null` on error
- **error**: Object containing error information (only present when `success: false`)
  - **code**: Error code identifier (e.g., "AUTH-001")
  - **message**: Human-readable error message
  - **details**: Additional error details (optional)
- **timestamp**: ISO 8601 timestamp of the response

---

## 5.2 Endpoint Specifications

### Authentication Endpoints

#### User Registration

| Field | Value |
|-------|-------|
| **Description** | User Registration |
| **API URL** | `/auth/register` |
| **HTTP Request Method** | POST |
| **Format** | JSON for all requests/responses |
| **Authentication** | None |

**Request Payload:**
```json
{
  "email": <email>,
  "password": <password>,
  "firstname": <firstname>,
  "lastname": <lastname>
}
```

**Response Structure:**
```json
{
  "success": boolean,
  "data": {
    "user": {
      "email": <email>,
      "firstname": <firstname>,
      "lastname": <lastname>
    },
    "accessToken": <token>,
    "refreshToken": <token>
  },
  "error": {
    "code": string,
    "message": string,
    "details": object|null
  },
  "timestamp": string
}
```

---

#### User Login

| Field | Value |
|-------|-------|
| **Description** | User Login |
| **API URL** | `/auth/login` |
| **HTTP Method** | POST |
| **Format** | JSON for all requests/responses |
| **Authentication** | None |

**Request Payload:**
```json
{
  "email": <email>,
  "password": <password>
}
```

**Response Structure:**
```json
{
  "success": boolean,
  "data": {
    "user": {
      "email": <email>,
      "firstname": <firstname>,
      "lastname": <lastname>,
      "role": <role>
    },
    "accessToken": <token>,
    "refreshToken": <token>
  },
  "error": {
    "code": string,
    "message": string,
    "details": object|null
  },
  "timestamp": string
}
```

---

## 5.3 Error Handling

### HTTP Status Codes

- **200 OK** - Successful request
- **201 Created** - Resource created
- **400 Bad Request** - Invalid input
- **401 Unauthorized** - Authentication required/failed
- **403 Forbidden** - Insufficient permissions
- **404 Not Found** - Resource doesn't exist
- **409 Conflict** - Duplicate resource
- **500 Internal Server Error** - Server error

---

### Error Code Examples

#### Example 1: Authentication Error
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "AUTH-001",
    "message": "Invalid credentials",
    "details": "Email or password is incorrect"
  },
  "timestamp": "2024-01-28T10:30:00Z"
}
```

#### Example 2: Validation Error
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALID-001",
    "message": "Validation failed",
    "details": {
      "email": "Email is required",
      "password": "Must be at least 8 characters"
    }
  },
  "timestamp": "2024-01-28T10:30:00Z"
}
```

---

### Common Error Codes

- **AUTH-001**: Invalid credentials
- **AUTH-002**: Token expired
- **AUTH-003**: Insufficient permissions
- **VALID-001**: Validation failed
- **DB-001**: Resource not found
- **DB-002**: Duplicate entry
- **BUSINESS-001**: Insufficient stock
- **SYSTEM-001**: Internal server error

---

## API Usage Guidelines

### Authentication Flow

1. **Register** or **Login** to receive JWT tokens
2. Include the access token in subsequent requests:
   ```
   Authorization: Bearer <accessToken>
   ```
3. When access token expires, use the refresh token to obtain a new one

### Request Headers

All authenticated requests must include:
```
Content-Type: application/json
Authorization: Bearer <accessToken>
```

### Rate Limiting

- Standard rate limit: 100 requests per minute per user
- Exceeded limit returns HTTP 429 (Too Many Requests)

### Versioning

- API version is specified in the base URL: `/api/v1`
- Breaking changes will increment the version number
- Deprecated versions will be supported for 6 months after new version release

---

## Best Practices

1. **Always check the `success` field** before processing the response
2. **Handle errors gracefully** by checking the error code and displaying appropriate messages
3. **Store tokens securely** - never expose JWT tokens in client-side code or logs
4. **Refresh tokens proactively** - refresh access tokens before they expire
5. **Validate input** on the client side before sending requests to reduce unnecessary API calls
6. **Use HTTPS** for all API communications in production
7. **Implement retry logic** with exponential backoff for transient errors (5xx status codes)
8. **Log request/response** for debugging, but sanitize sensitive information

---

## Security Considerations

1. **JWT Tokens**
   - Access tokens are short-lived (15-60 minutes)
   - Refresh tokens are long-lived (7-30 days)
   - Tokens are signed using secure algorithms

2. **Password Security**
   - Passwords are hashed using bcrypt with 12 salt rounds
   - Minimum password length: 8 characters
   - Password complexity requirements enforced

3. **HTTPS/TLS**
   - All API communications must use HTTPS in production
   - TLS 1.2 or higher required

4. **CORS**
   - Cross-Origin Resource Sharing is configured for approved domains only
   - Credentials are required for cross-origin requests

---

## Support & Resources

- API Base URL (Development): `http://localhost:8080/api/v1`
- API Base URL (Production): `https://synchef.example.com/api/v1`
- Documentation: `/docs`
- API Status: `/health`
