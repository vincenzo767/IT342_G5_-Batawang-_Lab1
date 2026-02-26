package com.synchef.mobile

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import com.synchef.mobile.data.AuthRepository
import com.synchef.mobile.data.LoginRequest
import com.synchef.mobile.data.NetworkModule
import com.synchef.mobile.data.SessionManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch

class LoginActivity : Activity() {

    private lateinit var sessionManager: SessionManager
    private val repository = AuthRepository(NetworkModule.authApi)
    private val screenJob = Job()
    private val uiScope = CoroutineScope(Dispatchers.Main + screenJob)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        sessionManager = SessionManager(this)
        if (sessionManager.isLoggedIn()) {
            startActivity(Intent(this, DashboardActivity::class.java))
            finish()
            return
        }

        setContentView(R.layout.activity_login)

        val etEmailOrUsername = findViewById<EditText>(R.id.etEmailOrUsername)
        val etPassword = findViewById<EditText>(R.id.etPassword)
        val tvError = findViewById<TextView>(R.id.tvError)
        val btnLogin = findViewById<Button>(R.id.btnLogin)
        val tvGoToRegister = findViewById<TextView>(R.id.tvGoToRegister)

        btnLogin.setOnClickListener {
            val emailOrUsername = etEmailOrUsername.text.toString().trim()
            val password = etPassword.text.toString().trim()

            tvError.visibility = View.GONE

            if (emailOrUsername.isBlank() || password.isBlank()) {
                tvError.text = "Email/username and password are required"
                tvError.visibility = View.VISIBLE
                return@setOnClickListener
            }

            btnLogin.isEnabled = false
            btnLogin.text = "Signing In..."

            uiScope.launch {
                val result = repository.login(LoginRequest(emailOrUsername, password))
                btnLogin.isEnabled = true
                btnLogin.text = "Sign In"

                result.onSuccess { auth ->
                    sessionManager.saveAuth(auth)
                    startActivity(Intent(this@LoginActivity, DashboardActivity::class.java))
                    finish()
                }.onFailure { err ->
                    tvError.text = err.message ?: "Login failed"
                    tvError.visibility = View.VISIBLE
                }
            }
        }

        tvGoToRegister.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        screenJob.cancel()
    }
}
