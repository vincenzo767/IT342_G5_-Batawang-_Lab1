package com.synchef.app

import android.app.Application
import com.synchef.app.data.TokenManager
import com.synchef.app.data.network.RetrofitClient
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.launch

class SynChefApp : Application() {
    
    val tokenManager by lazy { TokenManager(this) }
    private val applicationScope = CoroutineScope(SupervisorJob() + Dispatchers.Main)
    
    override fun onCreate() {
        super.onCreate()
        
        // Set up token provider for Retrofit
        RetrofitClient.setTokenProvider {
            var token: String? = null
            applicationScope.launch {
                token = tokenManager.token.firstOrNull()
            }
            token
        }
    }
}
