# HisabKitab - Smart Todo & Finance Manager

HisabKitab is a React Native mobile application designed to help users manage their daily tasks efficiently. It features a clean, modern UI inspired by minimalist designs and is powered by **Firebase** for backend services and **Redux Toolkit** for state management.

## 📱 Features

### 🔐 User Authentication
* **Sign Up:** Secure user registration with email and password.
* **Log In:** Seamless login experience with persistent session management.
* **Validation:** Real-time form validation (email format, password matching).
* **Security:** Powered by Firebase Authentication.

### ✅ Todo List Management
* **Create Tasks:** Add new tasks with a title, detailed description, priority level, date, and deadline.
* **Priority System:** Categorize tasks as High (Red), Medium (Orange), or Low (Green) priority.
* **Date Picker:** Interactive calendar integration for selecting dates.
* **Real-time Sync:** All tasks are synced instantly across devices using Cloud Firestore.
* **Task Completion:** Toggle tasks as "Done" with a visual strikethrough effect.
* **Persistent Storage:** Data remains available even after restarting the app.

---

## 🛠 Tech Stack

* **Framework:** [React Native](https://reactnative.dev/) (CLI)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
* **Backend:** [Firebase](https://firebase.google.com/) (Auth & Firestore)
* **Navigation:** [React Navigation](https://reactnavigation.org/) (Stack)
* **UI Components:** Custom components inspired by Pinterest minimalist designs.
* **Icons:** React Native Vector Icons (MaterialCommunityIcons).

---

## 📂 Folder Structure

The project follows a scalable and modular folder structure:

```text
src/
  ├── components/        # Reusable UI components (buttons, inputs, cards)
  │   ├── AddTaskModal.tsx
  │   ├── CustomInput.tsx
  │   ├── MainButton.tsx
  │   ├── ScreenWrapper.tsx
  │   └── TaskItem.tsx
  │
  ├── navigation/        # Navigation configuration
  │   └── AuthNavigator.tsx
  │
  ├── redux/             # Global state management
  │   ├── authSlice.ts   # Authentication logic (Login/Signup)
  │   ├── todoSlice.ts   # Todo CRUD operations
  │   └── store.ts       # Redux store configuration
  │
  ├── screens/           # Main application screens
  │   ├── HomeScreen.tsx
  │   ├── LoginScreen.tsx
  │   └── SignupScreen.tsx
  │
  ├── theme/             # Styling constants
  │   └── colors.ts
  │
  └── types/             # TypeScript interfaces
      └── task.ts

```

## Getting Started
- Prerequisites
    + Node.js & npm/yarn
    + React Native CLI environment setup  (Android Studio / Xcode)
    + A Firebase Project

#### Installation
1. Clone the repository

```Bash 
git clone [https://github.com/your-username/HisabKitab.git](https://github.com/your-username/HisabKitab.git)
cd HisabKitab
```

2. Install Dependencies
```Bash 
    npm install
    # or
    yarn install
```

3. Install iOS Pods (Mac only)
```Bash 
cd ios && pod install && cd ..
```

4. Firebase Setup
- Create a project on the Firebase Console.
- Android: Download google-services.json and place it in android/app/.
- iOS: Download GoogleService-Info.plist and add it to your Xcode project.
- Enable Authentication (Email/Password provider).
- Enable Cloud Firestore (Create database in test mode).

5. Run The App 
+ Android
```Bash
npx react-native run-android
```

+ IOS
```Bash
npx react-native run-ios
```

## User Flow
1. Registration:
    + User opens the app and lands on the Sign Up screen (default).
    + User enters Email, Password, and Confirmation.
    + On success -> Firebase creates an account -> User is redirected to Home.

2. Login:
    + Existing users navigate to Log In.
    + On success -> Redux updates auth state -> App switches to Home Stack.

3. Dashboard (Home):
    + User sees a list of tasks fetched from Firestore.
    + Clicking the "+" Floating Action Button opens the "Add Task" modal.
    + User fills in details (Title, Priority, Date) and saves.
    + The new task appears instantly in the list.

## UI Reference

The User Interface was designed with a focus on freshness and simplicity, using a Green monochromatic color palette (#AEEEC2, #1E5E20) to evoke a sense of productivity and calm.

- Reference: Minimalist mobile form designs found on Pinterest.
- Key Elements: Rounded corners, soft shadows, and card-based layouts.

## State Management (Redux)
We use Redux Toolkit to manage global state, keeping the UI consistent with the backend.
+ authSlice: Handles user sessions (user, isLoading, error). It listens to Firebase's onAuthStateChanged to keep users logged in even after restarting the app.
+ todoSlice: Handles task data.
    - fetchTasks: Async thunk to pull data from Firestore.
    - addTask: Pushes new task to Firestore and updates local state.
    - toggleTask: Updates the isCompleted status in real-time.