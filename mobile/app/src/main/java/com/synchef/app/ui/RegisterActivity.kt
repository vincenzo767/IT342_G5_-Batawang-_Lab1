package com.synchef.app.ui

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.synchef.app.R
import com.synchef.app.SynChefApp
import com.synchef.app.data.model.RegisterRequest
import com.synchef.app.data.network.RetrofitClient
import com.synchef.app.databinding.ActivityRegisterBinding
import kotlinx.coroutines.launch

class RegisterActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityRegisterBinding
    private lateinit var tokenManager: com.synchef.app.data.TokenManager
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        tokenManager = (application as SynChefApp).tokenManager
        
        binding.registerButton.setOnClickListener {
            val username = binding.usernameInput.text.toString().trim()
            val email = binding.emailInput.text.toString().trim()
            val fullName = binding.fullNameInput.text.toString().trim()
            val phoneNumber = binding.phoneInput.text.toString().trim()
            val password = binding.passwordInput.text.toString().trim()
            val confirmPassword = binding.confirmPasswordInput.text.toString().trim()
            
            // Validation
            if (username.isEmpty() || email.isEmpty() || password.isEmpty()) {
                showError(getString(R.string.fill_required_fields))
                return@setOnClickListener
            }
            
            if (password != confirmPassword) {
                showError(getString(R.string.passwords_not_match))
                return@setOnClickListener
            }
            
            if (password.length < 6) {
                showError(getString(R.string.password_min_length))
                return@setOnClickListener
            }
            
            performRegister(username, email, password, fullName, phoneNumber)
        }
        
        binding.loginLink.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }
    
    private fun performRegister(
        username: String,
        email: String,
        password: String,
        fullName: String,
        phoneNumber: String
    ) {
        binding.registerButton.isEnabled = false
        binding.errorText.visibility = View.GONE
        
        lifecycleScope.launch {
            try {
                val request = RegisterRequest(
                    username = username,
                    email = email,
                    password = password,
                    fullName = fullName.ifEmpty { null },
                    phoneNumber = phoneNumber.ifEmpty { null }
                )
                
                val response = RetrofitClient.apiService.register(request)
                
                if (response.isSuccessful && response.body()?.success == true) {
                    val token = response.body()?.data?.token
                    if (token != null) {
                        tokenManager.saveToken(token)
                        navigateToDashboard()
                    } else {
                        showError("Registration failed: No token received")
                    }
                } else {
                    val errorMsg = response.body()?.message ?: "Registration failed"
                    showError(errorMsg)
                }
            } catch (e: Exception) {
                showError("Network error: ${e.message}")
            } finally {
                binding.registerButton.isEnabled = true
            }
        }
    }
    
    private fun showError(message: String) {
        binding.errorText.text = message
        binding.errorText.visibility = View.VISIBLE
    }
    
    private fun navigateToDashboard() {
        val intent = Intent(this, DashboardActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
        finish()
    }
}
