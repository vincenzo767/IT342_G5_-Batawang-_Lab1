package com.synchef.mobile

import android.app.Activity
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import com.synchef.mobile.data.SessionManager

class ProfileActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        val sessionManager = SessionManager(this)
        val user = sessionManager.getUser()

        val tvFullName = findViewById<TextView>(R.id.tvFullName)
        val tvEmail = findViewById<TextView>(R.id.tvEmail)
        val tvUsername = findViewById<TextView>(R.id.tvUsername)
        val btnBack = findViewById<Button>(R.id.btnBack)

        tvFullName.text = user?.fullName ?: "Not available"
        tvEmail.text = user?.email ?: "Not available"
        tvUsername.text = user?.username ?: "Not available"

        btnBack.setOnClickListener { finish() }
    }
}
