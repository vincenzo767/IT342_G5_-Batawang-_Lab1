package com.synchef.app.ui

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.synchef.app.R
import com.synchef.app.SynChefApp
import com.synchef.app.data.network.RetrofitClient
import com.synchef.app.databinding.ActivityDashboardBinding
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class DashboardActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityDashboardBinding
    private lateinit var tokenManager: com.synchef.app.data.TokenManager
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDashboardBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        tokenManager = (application as SynChefApp).tokenManager
        
        binding.logoutButton.setOnClickListener {
            performLogout()
        }
        
        loadUserProfile()
    }
    
    private fun loadUserProfile() {
        binding.loadingIndicator.visibility = View.VISIBLE
        
        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.getCurrentUser()
                
                if (response.isSuccessful && response.body()?.success == true) {
                    val user = response.body()?.data
                    if (user != null) {
                        // Set avatar initials
                        val initials = getInitials(user.fullName ?: user.username)
                        binding.avatarText.text = initials
                        
                        // Set profile information
                        binding.fullNameText.text = user.fullName ?: user.username
                        binding.usernameText.text = "@${user.username}"
                        binding.userIdText.text = "#${user.id}"
                        binding.usernameDetailText.text = user.username
                        binding.emailText.text = user.email
                        binding.fullNameDetailText.text = user.fullName ?: getString(R.string.not_provided)
                        binding.phoneText.text = user.phoneNumber ?: getString(R.string.not_provided)
                        binding.createdAtText.text = formatDate(user.createdAt)
                        
                        // Set status
                        binding.statusText.text = if (user.isActive) {
                            getString(R.string.active)
                        } else {
                            getString(R.string.inactive)
                        }
                        
                        binding.loadingIndicator.visibility = View.GONE
                    }
                } else {
                    Toast.makeText(this@DashboardActivity, "Failed to load profile", Toast.LENGTH_SHORT).show()
                    navigateToLogin()
                }
            } catch (e: Exception) {
                Toast.makeText(this@DashboardActivity, "Error: ${e.message}", Toast.LENGTH_SHORT).show()
                navigateToLogin()
            }
        }
    }
    
    private fun performLogout() {
        lifecycleScope.launch {
            try {
                RetrofitClient.apiService.logout()
            } catch (e: Exception) {
                // Ignore logout API errors
            } finally {
                tokenManager.clearToken()
                navigateToLogin()
            }
        }
    }
    
    private fun navigateToLogin() {
        val intent = Intent(this, MainActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
        finish()
    }
    
    private fun getInitials(name: String): String {
        return if (name.contains(" ")) {
            name.split(" ")
                .take(2)
                .mapNotNull { it.firstOrNull()?.uppercase() }
                .joinToString("")
        } else {
            name.take(2).uppercase()
        }
    }
    
    private fun formatDate(dateString: String?): String {
        if (dateString == null) return "N/A"
        
        return try {
            val inputFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())
            val outputFormat = SimpleDateFormat("MMMM d, yyyy 'at' h:mm a", Locale.getDefault())
            val date = inputFormat.parse(dateString)
            if (date != null) outputFormat.format(date) else "N/A"
        } catch (e: Exception) {
            dateString
        }
    }
}
