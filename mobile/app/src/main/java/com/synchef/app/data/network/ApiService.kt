package com.synchef.app.data.network

import com.synchef.app.data.model.*
import retrofit2.Response
import retrofit2.http.*

interface ApiService {
    
    @POST("auth/register")
    suspend fun register(@Body request: RegisterRequest): Response<ApiResponse<AuthResponse>>
    
    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): Response<ApiResponse<AuthResponse>>
    
    @POST("auth/logout")
    suspend fun logout(): Response<ApiResponse<Void>>
    
    @GET("user/me")
    suspend fun getCurrentUser(): Response<ApiResponse<User>>
}
