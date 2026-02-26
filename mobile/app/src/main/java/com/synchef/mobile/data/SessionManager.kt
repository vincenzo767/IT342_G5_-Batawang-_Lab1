package com.synchef.mobile.data

import android.content.Context
import com.google.gson.Gson

class SessionManager(context: Context) {
    private val prefs = context.getSharedPreferences("synchef_session", Context.MODE_PRIVATE)
    private val gson = Gson()

    fun saveAuth(response: AuthResponse) {
        prefs.edit()
            .putString("token", response.token)
            .putString("user", gson.toJson(response))
            .apply()
    }

    fun getUser(): AuthResponse? {
        val userJson = prefs.getString("user", null) ?: return null
        return gson.fromJson(userJson, AuthResponse::class.java)
    }

    fun getToken(): String? = prefs.getString("token", null)

    fun isLoggedIn(): Boolean = !getToken().isNullOrBlank()

    fun clear() {
        prefs.edit().clear().apply()
    }

    fun saveSettings(unitSystem: String, skillLevel: String, reminders: Boolean) {
        prefs.edit()
            .putString("unitSystem", unitSystem)
            .putString("skillLevel", skillLevel)
            .putBoolean("reminders", reminders)
            .apply()
    }

    fun getUnitSystem(): String = prefs.getString("unitSystem", "METRIC") ?: "METRIC"
    fun getSkillLevel(): String = prefs.getString("skillLevel", "BEGINNER") ?: "BEGINNER"
    fun getReminders(): Boolean = prefs.getBoolean("reminders", true)
}
