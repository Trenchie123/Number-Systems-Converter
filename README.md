# No. Systems - Number Systems Converter

> A cross-platform mobile application for converting and learning different number systems (Binary, Octal, Decimal, Hexadecimal), built with React Native and Expo.

---

## 📱 Mobile Application Downloads

| Platform | Download Link | File Format | Notes |
| :--- | :--- | :--- | :--- |
| **iOS** | [Download iOS Simulator Build](https://expo.dev/artifacts/eas/z8oo0zOj9CO3F_jN1MSlB64CnxfETPDLO5-iVuaZSKw.tar.gz) | `.tar.gz` | Built for iOS Simulator / [Appetize.io](https://appetize.io) |
| **Android** | [Download Android Build](INSERT_YOUR_ANDROID_APK_URL_HERE) | `.apk` | Installable directly on Android devices / emulators |

---

## 🚀 Step-by-Step Installation & Setup

### 1. Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Git](https://git-scm.com/)
- [Expo Go](https://expo.dev/go) app installed on your Android or iOS device (optional, for physical testing)

---

### 2. Terminal Commands & Execution

Run all of these commands in your terminal or PowerShell from start to finish:

```bash
# Step 2.1: Clone the Repository
git clone [https://github.com/Trenchie123/Number-Systems-Converter.git](https://github.com/Trenchie123/Number-Systems-Converter.git)
cd Number-Systems-Converter

# Step 2.2: Install Project Dependencies
npm install

# Step 2.3: Start the Local Development Server
npx expo start

# Step 2.4: Run on Android Emulator (Optional)
npx expo run:android

# Step 2.5: Run on iOS Simulator (Optional, macOS only)
npx expo run:ios

# Step 2.6: Trigger Cloud Builds via EAS (Optional)
npx eas build --platform android
npx eas build --platform ios --profile preview
