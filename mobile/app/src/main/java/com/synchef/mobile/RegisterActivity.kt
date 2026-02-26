package com.synchef.mobile

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import com.synchef.mobile.data.AuthRepository
import com.synchef.mobile.data.NetworkModule
import com.synchef.mobile.data.RegisterRequest
import com.synchef.mobile.data.SessionManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch

class RegisterActivity : Activity() {

    private lateinit var sessionManager: SessionManager
    private val repository = AuthRepository(NetworkModule.authApi)
    private val screenJob = Job()
    private val uiScope = CoroutineScope(Dispatchers.Main + screenJob)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        sessionManager = SessionManager(this)

        val etFullName = findViewById<EditText>(R.id.etFullName)
        val etEmail = findViewById<EditText>(R.id.etEmail)
        val etUsername = findViewById<EditText>(R.id.etUsername)
        val etPassword = findViewById<EditText>(R.id.etPassword)
        val etConfirmPassword = findViewById<EditText>(R.id.etConfirmPassword)
        val tvError = findViewById<TextView>(R.id.tvError)
        val btnRegister = findViewById<Button>(R.id.btnRegister)
        val tvGoToLogin = findViewById<TextView>(R.id.tvGoToLogin)

        btnRegister.setOnClickListener {
            val fullName = etFullName.text.toString().trim()
            val email = etEmail.text.toString().trim()
            val username = etUsername.text.toString().trim()
            val password = etPassword.text.toString().trim()
            val confirmPassword = etConfirmPassword.text.toString().trim()

            tvError.visibility = View.GONE

            if (fullName.isBlank() || email.isBlank() || username.isBlank() || password.isBlank() || confirmPassword.isBlank()) {
                tvError.text = "All fields are required"
                tvError.visibility = View.VISIBLE
                return@setOnClickListener
            }

            if (password != confirmPassword) {
                tvError.text = "Passwords do not match"
                tvError.visibility = View.VISIBLE
                return@setOnClickListener
            }

            btnRegister.isEnabled = false
            btnRegister.text = "Creating..."

            uiScope.launch {
                val result = repository.register(
                    RegisterRequest(
                        email = email,
                        username = username,
                        password = password,
                        confirmPassword = confirmPassword,
                        fullName = fullName
                    )
                )

                btnRegister.isEnabled = true
                btnRegister.text = "Create Account"

                result.onSuccess { auth ->
                    sessionManager.saveAuth(auth)
                    startActivity(Intent(this@RegisterActivity, DashboardActivity::class.java))
                    finishAffinity()
                }.onFailure { err ->
                    tvError.text = err.message ?: "Registration failed"
                    tvError.visibility = View.VISIBLE
                }
            }
        }

        tvGoToLogin.setOnClickListener {
            finish()
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        screenJob.cancel()
    }
}
