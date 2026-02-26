package com.synchef.mobile.data

import com.google.gson.Gson
import retrofit2.Response

class AuthRepository(private val api: AuthApi) {
    private val gson = Gson()

    suspend fun login(request: LoginRequest): Result<AuthResponse> {
        return handleResponse(api.login(request))
    }

    suspend fun register(request: RegisterRequest): Result<AuthResponse> {
        return handleResponse(api.register(request))
    }

    private fun handleResponse(response: Response<AuthResponse>): Result<AuthResponse> {
        if (response.isSuccessful) {
            val body = response.body()
            if (body != null) return Result.success(body)
            return Result.failure(Exception("Empty response from server"))
        }

        val errorBody = response.errorBody()?.string()
        val message = try {
            gson.fromJson(errorBody, ErrorResponse::class.java)?.message
        } catch (_: Exception) {
            null
        }

        return Result.failure(Exception(message ?: "Request failed with code ${response.code()}"))
    }
}
