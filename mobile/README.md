# SynChef Mobile (Android Studio Iguana)

Native Android XML app for SynChef under `mobile/`.

## Tech
- Kotlin
- XML layouts (no Compose)
- Retrofit + Gson
- No AppCompat (activities extend `ComponentActivity`)

## Implemented Screens
- Login
- Register
- Dashboard
- Profile
- Settings
- Logout

## Open in Android Studio Iguana
1. Open the `mobile` folder as a project.
2. Let Gradle sync.
3. Run the `app` module on emulator/device.

## Backend URL
- Default API base URL in app: `http://10.0.2.2:8080/api`
	- `10.0.2.2` maps host machine localhost for Android emulator.
