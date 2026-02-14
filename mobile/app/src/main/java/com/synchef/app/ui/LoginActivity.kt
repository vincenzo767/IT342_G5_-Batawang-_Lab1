package com.synchef.app.ui

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.synchef.app.R
import com.synchef.app.SynChefApp
import com.synchef.app.data.model.LoginRequest
import com.synchef.app.data.network.RetrofitClient
import com.synchef.app.databinding.ActivityLoginBinding
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityLoginBinding
    private lateinit var tokenManager: com.synchef.app.data.TokenManager
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        tokenManager = (application as SynChefApp).tokenManager
        
        binding.loginButton.setOnClickListener {
            val username = binding.usernameInput.text.toString().trim()
            val password = binding.passwordInput.text.toString().trim()
            
            if (username.isEmpty() || password.isEmpty()) {
                showError(getString(R.string.fill_required_fields))
                return@setOnClickListener
            }
            
            performLogin(username, password)
        }
        
        binding.registerLink.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
            finish()
        }
    }
    
    private fun performLogin(username: String, password: String) {
        binding.loginButton.isEnabled = false
        binding.errorText.visibility = View.GONE
        
        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.login(
                    LoginRequest(username, password)
                )
                
                if (response.isSuccessful && response.body()?.success == true) {
                    val token = response.body()?.data?.token
                    if (token != null) {
                        tokenManager.saveToken(token)
                        navigateToDashboard()
                    } else {
                        showError("Login failed: No token received")
                    }
                } else {
                    val errorMsg = response.body()?.message ?: "Invalid username or password"
                    showError(errorMsg)
                }
            } catch (e: Exception) {
                showError("Network error: ${e.message}")
            } finally {
                binding.loginButton.isEnabled = true
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
