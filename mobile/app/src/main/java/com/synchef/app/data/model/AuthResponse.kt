package com.synchef.app.data.model

data class AuthResponse(
    val token: String,
    val type: String,
    val id: Long,
    val username: String,
    val email: String,
    val fullName: String?
)
