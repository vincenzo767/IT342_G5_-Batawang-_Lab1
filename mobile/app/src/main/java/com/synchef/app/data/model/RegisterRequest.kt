package com.synchef.app.data.model

data class RegisterRequest(
    val username: String,
    val email: String,
    val password: String,
    val fullName: String?,
    val phoneNumber: String?
)
