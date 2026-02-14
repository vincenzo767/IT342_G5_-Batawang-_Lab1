package com.synchef.app.data.model

data class User(
    val id: Long,
    val username: String,
    val email: String,
    val fullName: String?,
    val phoneNumber: String?,
    val createdAt: String?,
    val isActive: Boolean
)
