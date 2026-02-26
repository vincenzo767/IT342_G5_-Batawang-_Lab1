package com.synchef.mobile

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import com.synchef.mobile.data.SessionManager

class DashboardActivity : Activity() {

    private lateinit var sessionManager: SessionManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard)

        sessionManager = SessionManager(this)
        val user = sessionManager.getUser()

        if (user == null) {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
            return
        }

        val tvWelcome = findViewById<TextView>(R.id.tvWelcome)
        val btnProfile = findViewById<Button>(R.id.btnProfile)
        val btnSettings = findViewById<Button>(R.id.btnSettings)
        val btnLogout = findViewById<Button>(R.id.btnLogout)

        tvWelcome.text = "Welcome, ${user.fullName}"

        btnProfile.setOnClickListener {
            startActivity(Intent(this, ProfileActivity::class.java))
        }

        btnSettings.setOnClickListener {
            startActivity(Intent(this, SettingsActivity::class.java))
        }

        btnLogout.setOnClickListener {
            sessionManager.clear()
            startActivity(Intent(this, LoginActivity::class.java))
            finishAffinity()
        }
    }
}
