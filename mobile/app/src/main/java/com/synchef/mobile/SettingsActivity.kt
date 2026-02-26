package com.synchef.mobile

import android.app.Activity
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.CheckBox
import android.widget.Spinner
import android.widget.Toast
import com.synchef.mobile.data.SessionManager

class SettingsActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_settings)

        val sessionManager = SessionManager(this)

        val spUnitSystem = findViewById<Spinner>(R.id.spUnitSystem)
        val spSkillLevel = findViewById<Spinner>(R.id.spSkillLevel)
        val cbReminders = findViewById<CheckBox>(R.id.cbReminders)
        val btnSave = findViewById<Button>(R.id.btnSave)
        val btnBack = findViewById<Button>(R.id.btnBack)

        val units = listOf("METRIC", "IMPERIAL")
        val levels = listOf("BEGINNER", "INTERMEDIATE", "ADVANCED")

        spUnitSystem.adapter = ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, units)
        spSkillLevel.adapter = ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, levels)

        val currentUnit = sessionManager.getUnitSystem()
        val currentLevel = sessionManager.getSkillLevel()

        spUnitSystem.setSelection(units.indexOf(currentUnit).coerceAtLeast(0))
        spSkillLevel.setSelection(levels.indexOf(currentLevel).coerceAtLeast(0))
        cbReminders.isChecked = sessionManager.getReminders()

        btnSave.setOnClickListener {
            sessionManager.saveSettings(
                unitSystem = spUnitSystem.selectedItem.toString(),
                skillLevel = spSkillLevel.selectedItem.toString(),
                reminders = cbReminders.isChecked
            )
            Toast.makeText(this, "Settings saved", Toast.LENGTH_SHORT).show()
        }

        btnBack.setOnClickListener {
            finish()
        }
    }
}
