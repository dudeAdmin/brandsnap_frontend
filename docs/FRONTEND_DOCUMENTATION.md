# BrandSnap Frontend - Complete Beginner's Guide 🚀

Welcome to the BrandSnap frontend! This guide is designed for complete beginners who want to understand how the frontend works. We'll explain everything step-by-step, from what each file does to how the application flows.

## 📚 Table of Contents

1. [What is BrandSnap?](#what-is-brandsnap)
2. [What You Need to Know First](#what-you-need-to-know-first)
3. [Getting Started](#getting-started)
4. [Understanding the Project Structure](#understanding-the-project-structure)
5. [How the Application Works](#how-the-application-works)
6. [Key Concepts Explained](#key-concepts-explained)
7. [Step-by-Step Code Walkthrough](#step-by-step-code-walkthrough)
8. [Common Tasks](#common-tasks)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 What is BrandSnap?

BrandSnap is a **web application** that helps users create marketing materials using AI. Think of it like Canva, but powered by artificial intelligence!

**What can users do?**

- Create an account and log in
- Organize work into "Projects" (like folders)
- Create "Campaigns" inside projects (like sub-folders)
- Generate marketing images using AI
- View and manage all their created assets

**Example User Journey:**

```
1. User visits website → Sees landing page
2. Clicks "Login" → Enters credentials or uses Google
3. Sees Dashboard → Shows all their projects
4. Clicks a project → Sees all campaigns in that project
5. Clicks a campaign → Can generate new marketing images
6. Types a prompt → AI generates an image
7. Downloads or views the image
```

---

## 📖 What You Need to Know First

Before diving in, here are some basic concepts you should understand:

### 1. **What is React?**

React is a JavaScript library for building user interfaces. Think of it as LEGO blocks for websites:

- Each piece (component) is reusable
- You combine pieces to build complex pages
- When data changes, React automatically updates the page

### 2. **What is a Component?**

A component is a piece of UI that you can reuse. For example:

```jsx
// This is a Button component
function Button() {
  return <button>Click Me</button>;
}

// You can use it multiple times
<Button />
<Button />
<Button />
```

### 3. **What is JSX?**

JSX lets you write HTML-like code in JavaScript:

```jsx
// This looks like HTML but it's actually JavaScript!
const element = <h1>Hello, World!</h1>;
```

### 4. **What is State?**

State is data that can change over time. When state changes, React re-renders the component:

```jsx
const [count, setCount] = useState(0); // count starts at 0
setCount(5); // Now count is 5, and the page updates!
```

### 5. **What is an API?**

An API (Application Programming Interface) is how the frontend talks to the backend:

```
Frontend: "Hey backend, give me all projects for user #5"
Backend: "Here you go: [Project 1, Project 2, Project 3]"
Frontend: "Thanks! I'll display them now."
```

---

## 🚀 Getting Started

### Prerequisites

Before you start, make sure you have these installed:

1. **Node.js** (version 18 or higher)

   - Download from: https://nodejs.org/
   - Check if installed: Open terminal and type `node --version`

2. **npm** (comes with Node.js)

   - Check if installed: `npm --version`

3. **A Code Editor** (we recommend VS Code)
   - Download from: https://code.visualstudio.com/

### Installation Steps

1. **Open your terminal** and navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. **Install all dependencies** (this downloads all the libraries we need):

   ```bash
   npm install
   ```

   > 💡 **What does this do?** It reads `package.json` and downloads all the packages listed there into a `node_modules` folder.

3. **Set up environment variables**:

   ```bash
   # Copy the example file
   cp .env.example .env

   # Open .env and add your values
   ```

   Your `.env` file should look like this:

   ```
   VITE_API_URL=http://localhost:8080
   VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

   You should see:

   ```
   VITE v6.0.1  ready in 500 ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

5. **Open your browser** and go to `http://localhost:5173/`

🎉 **Congratulations!** You're now running the BrandSnap frontend!

---

## 📁 Understanding the Project Structure

Let's explore what each folder and file does:

```
frontend/
├── public/                 # Static files (images, icons)
│   └── vite.svg           # Vite logo
│
├── src/                   # Source code (where you'll work)
│   ├── assets/           # Images and icons used in the app
│   │   └── react.svg
│   │
│   ├── components/       # Reusable UI pieces
│   │   ├── Footer.jsx           # Footer shown on every page
│   │   ├── ImageModal.jsx       # Popup to view images full-screen
│   │   ├── Loader.jsx           # Loading spinner
│   │   ├── Navbar.jsx           # Navigation bar at the top
│   │   └── PromptSelector.jsx   # Helper to choose AI prompts
│   │
│   ├── context/          # Global state management
│   │   ├── AuthContext.jsx      # Manages user login/logout
│   │   └── LoadingContext.jsx   # Manages loading states
│   │
│   ├── pages/            # Full page components
│   │   ├── LandingPage.jsx      # Home page (/)
│   │   ├── Login.jsx            # Login page (/login)
│   │   ├── Dashboard.jsx        # User dashboard (/dashboard)
│   │   ├── ProjectView.jsx      # Single project view
│   │   └── CampaignView.jsx     # Single campaign view
│   │
│   ├── config/           # Configuration files
│   │   └── api.js               # Axios setup for API calls
│   │
│   ├── utils/            # Helper functions
│   │   └── csrf.js              # Security token handling
│   │
│   ├── App.jsx           # Main app component (routes)
│   ├── App.css           # App-specific styles
│   ├── main.jsx          # Entry point (starts the app)
│   └── index.css         # Global styles + Tailwind
│
├── index.html            # HTML template
├── package.json          # Project dependencies and scripts
├── vite.config.js        # Vite build tool configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── .env                  # Environment variables (secrets)
```

### 🔑 Key Files Explained

| File           | What It Does                  | When You'd Edit It         |
| -------------- | ----------------------------- | -------------------------- |
| `main.jsx`     | Starts the entire application | Almost never               |
| `App.jsx`      | Defines all routes (URLs)     | When adding new pages      |
| `package.json` | Lists all dependencies        | When adding new libraries  |
| `.env`         | Stores secrets and config     | When changing API URL      |
| `index.css`    | Global styles                 | When changing overall look |

---

## 🔄 How the Application Works

Let's trace what happens when a user visits BrandSnap:

### 1. **Application Startup** (`main.jsx`)

```jsx
// main.jsx - This is where everything begins!

import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";

// 1. Get the root HTML element (from index.html)
// 2. Wrap App with Google OAuth provider
// 3. Render the App component
createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);
```

**What's happening here?**

1. React finds the `<div id="root">` in `index.html`
2. It wraps our app with Google OAuth (for "Sign in with Google")
3. It renders the `App` component inside that div

---

### 2. **App Component** (`App.jsx`)

```jsx
// App.jsx - The main orchestrator

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Manages login state */}
      <LoadingProvider>
        {" "}
        {/* Manages loading states */}
        <Router>
          {" "}
          {/* Enables navigation */}
          <Routes>
            {" "}
            {/* Defines all pages */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* ... more routes */}
          </Routes>
        </Router>
      </LoadingProvider>
    </AuthProvider>
  );
}
```

**What's happening here?**

1. **AuthProvider**: Wraps everything so any component can check if user is logged in
2. **LoadingProvider**: Manages loading spinners across the app
3. **Router**: Enables navigation (clicking links changes the page without reloading)
4. **Routes**: Maps URLs to components (like a table of contents)

---

### 3. **Route Protection**

BrandSnap has two types of routes:

#### **Public Routes** (anyone can access)

```jsx
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // If loading, show spinner
  if (loading) return <Loader text="Authenticating..." />;

  // If user is logged in, redirect to dashboard
  // Otherwise, show the page
  return user ? <Navigate to="/dashboard" /> : children;
};
```

**Used for:**

- Landing page (`/`)
- Login page (`/login`)

**Why?** If you're already logged in, you don't need to see the login page!

---

#### **Private Routes** (only logged-in users)

```jsx
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // If loading, show spinner
  if (loading) return <Loader text="Authenticating..." />;

  // If user is NOT logged in, redirect to login
  // Otherwise, show the page
  return user ? children : <Navigate to="/login" />;
};
```

**Used for:**

- Dashboard (`/dashboard`)
- Project view (`/project/:projectId`)
- Campaign view (`/campaign/:campaignId`)

**Why?** You need to be logged in to see your projects!

---

### 4. **Authentication Flow** (`AuthContext.jsx`)

The `AuthContext` is like a security guard for your app. It manages:

- Who is logged in
- Login/logout functions
- Storing authentication tokens

```jsx
// Simplified AuthContext

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (on page load)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (username, password) => {
    const response = await api.post("/api/auth/login", {
      username,
      password,
    });

    const { accessToken, ...userData } = response.data;

    // Save to localStorage (persists across page refreshes)
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth in any component
export const useAuth = () => useContext(AuthContext);
```

**How to use it in a component:**

```jsx
function MyComponent() {
  const { user, login, logout } = useAuth();

  if (user) {
    return <div>Welcome, {user.username}!</div>;
  }

  return <button onClick={() => login("john", "password123")}>Login</button>;
}
```

---

### 5. **API Communication** (`config/api.js`)

This file sets up Axios (a library for making HTTP requests):

```jsx
// config/api.js

import axios from "axios";

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: Automatically add auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
```

**What's an interceptor?**
Think of it as a checkpoint. Before every API request:

1. Check if there's a token in localStorage
2. If yes, attach it to the request headers
3. Send the request

**Why is this useful?**
You don't have to manually add the token to every API call!

```jsx
// Without interceptor (tedious!)
const response = await axios.get("/api/projects", {
  headers: { Authorization: `Bearer ${token}` },
});

// With interceptor (automatic!)
const response = await api.get("/api/projects");
```

---

## 🧩 Key Concepts Explained

### 1. **React Hooks**

Hooks are special functions that let you use React features. Here are the most common ones:

#### `useState` - Managing State

```jsx
import { useState } from "react";

function Counter() {
  // Declare state variable 'count' with initial value 0
  // setCount is the function to update it
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**When to use:** When you need data that can change (form inputs, toggles, counters, etc.)

---

#### `useEffect` - Side Effects

```jsx
import { useEffect, useState } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // This runs when the component mounts or userId changes
  useEffect(() => {
    // Fetch user data from API
    api.get(`/api/users/${userId}`).then((response) => setUser(response.data));
  }, [userId]); // Dependencies array

  if (!user) return <div>Loading...</div>;

  return <div>Welcome, {user.name}!</div>;
}
```

**When to use:**

- Fetching data from an API
- Setting up subscriptions
- Manually changing the DOM
- Running code when component mounts/unmounts

**Dependency Array:**

- `[]` - Run once when component mounts
- `[userId]` - Run when component mounts AND when userId changes
- No array - Run after every render (usually not what you want!)

---

#### `useContext` - Accessing Context

```jsx
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function Header() {
  // Access the auth context
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <span>Welcome, {user.username}</span>
      <button onClick={logout}>Logout</button>
    </header>
  );
}

// Or use the custom hook (cleaner!)
import { useAuth } from "./context/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  // ... same as above
}
```

**When to use:** When you need to access global state (like user info, theme, language)

---

### 2. **React Router**

React Router enables navigation without page reloads.

#### Basic Routing

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
```

#### Navigation

```jsx
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();

  return (
    <nav>
      {/* Declarative navigation */}
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>

      {/* Programmatic navigation */}
      <button onClick={() => navigate("/contact")}>Contact Us</button>
    </nav>
  );
}
```

#### URL Parameters

```jsx
import { useParams } from "react-router-dom";

// Route definition
<Route path="/project/:projectId" element={<ProjectView />} />;

// In ProjectView component
function ProjectView() {
  const { projectId } = useParams();
  // If URL is /project/123, projectId will be "123"

  return <div>Viewing project {projectId}</div>;
}
```

---

### 3. **Tailwind CSS**

Tailwind is a utility-first CSS framework. Instead of writing CSS, you use pre-made classes:

```jsx
// Traditional CSS
<div className="my-box">Hello</div>

/* styles.css */
.my-box {
  background-color: blue;
  color: white;
  padding: 16px;
  border-radius: 8px;
}

// Tailwind CSS (no separate CSS file needed!)
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hello
</div>
```

**Common Tailwind Classes:**

| Class               | What It Does    | Example                                  |
| ------------------- | --------------- | ---------------------------------------- |
| `bg-blue-500`       | Blue background | `<div className="bg-blue-500">`          |
| `text-white`        | White text      | `<p className="text-white">`             |
| `p-4`               | Padding (1rem)  | `<div className="p-4">`                  |
| `m-4`               | Margin (1rem)   | `<div className="m-4">`                  |
| `rounded-lg`        | Rounded corners | `<div className="rounded-lg">`           |
| `flex`              | Flexbox layout  | `<div className="flex">`                 |
| `grid`              | Grid layout     | `<div className="grid">`                 |
| `hover:bg-blue-700` | Hover effect    | `<button className="hover:bg-blue-700">` |

**Responsive Design:**

```jsx
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* 
    - Mobile: full width (w-full)
    - Tablet: half width (md:w-1/2)
    - Desktop: one-third width (lg:w-1/3)
  */}
</div>
```

---

### 4. **Async/Await and Promises**

When fetching data from APIs, operations are asynchronous (they take time).

#### Promises (old way)

```jsx
api
  .get("/api/projects")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

#### Async/Await (modern way)

```jsx
async function fetchProjects() {
  try {
    const response = await api.get("/api/projects");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

**In React components:**

```jsx
function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/projects");
        setProjects(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  );
}
```

---

## 🚶 Step-by-Step Code Walkthrough

Let's walk through a complete user flow: **Logging in and viewing projects**

### Step 1: User Visits Login Page

**File:** `src/pages/Login.jsx`

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  // State for form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Get auth functions and navigation
  const { login, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Handle traditional login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(""); // Clear previous errors

    try {
      if (isRegistering) {
        // Register new user
        const result = await register({ username, password });
        if (result.success) {
          // Auto-login after registration
          await login(username, password);
          navigate("/dashboard");
        } else {
          setError(result.message);
        }
      } else {
        // Login existing user
        const result = await login(username, password);
        if (result.success) {
          navigate("/dashboard");
        } else {
          setError(result.message);
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  // Handle Google login
  const handleGoogleSuccess = async (credentialResponse) => {
    const result = await loginWithGoogle(credentialResponse.credential);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">
          {isRegistering ? "Register" : "Login"}
        </h2>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        {/* Toggle between login and register */}
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full mt-4 text-blue-500 hover:underline"
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>

        {/* Google login */}
        <div className="mt-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google login failed")}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
```

**What's happening:**

1. User enters username and password
2. Clicks "Login" button
3. `handleSubmit` is called
4. Calls `login()` from AuthContext
5. If successful, navigates to `/dashboard`
6. If error, displays error message

---

### Step 2: AuthContext Handles Login

**File:** `src/context/AuthContext.jsx`

```jsx
const login = async (username, password) => {
  try {
    // 1. Send login request to backend
    const response = await api.post("/api/auth/login", {
      username,
      password,
    });

    // 2. Extract token and user data from response
    const { accessToken, ...userData } = response.data;

    // 3. Save to localStorage (persists across page refreshes)
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));

    // 4. Update state (triggers re-render)
    setUser(userData);

    // 5. Return success
    return { success: true };
  } catch (error) {
    // 6. Return error message
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }
};
```

**What's happening:**

1. Sends POST request to `/api/auth/login` with credentials
2. Backend validates and returns JWT token + user data
3. Saves token and user to localStorage
4. Updates `user` state (this makes `useAuth()` return the logged-in user)
5. All components using `useAuth()` re-render with new user data

---

### Step 3: User is Redirected to Dashboard

**File:** `src/pages/Dashboard.jsx`

```jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../config/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");

  // Fetch projects when component mounts
  useEffect(() => {
    fetchProjects();
  }, []); // Empty array = run once on mount

  // Fetch all projects for this user
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/projects?userId=${user.id}`);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new project
  const createProject = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/api/projects?userId=${user.id}`, {
        title: newProjectTitle,
        description: newProjectDesc,
      });

      // Clear form
      setNewProjectTitle("");
      setNewProjectDesc("");

      // Refresh project list
      fetchProjects();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  // Delete a project
  const deleteProject = async (projectId, e) => {
    e.stopPropagation(); // Don't trigger project click

    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await api.delete(`/api/projects/${projectId}`);
        fetchProjects(); // Refresh list
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  // Navigate to project view
  const openProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Projects</h1>

        {/* Create new project form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
          <form onSubmit={createProject} className="space-y-4">
            <input
              type="text"
              placeholder="Project Title"
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              placeholder="Project Description"
              value={newProjectDesc}
              onChange={(e) => setNewProjectDesc(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Create Project
            </button>
          </form>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => openProject(project.id)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition"
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={(e) => deleteProject(project.id, e)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No projects yet. Create your first project above!
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
```

**What's happening:**

1. Component mounts → `useEffect` runs → `fetchProjects()` is called
2. API request sent to `/api/projects?userId=5`
3. Backend returns array of projects
4. `setProjects()` updates state
5. Component re-renders with project data
6. Projects are displayed in a grid

**User interactions:**

- **Create project:** Fill form → Submit → API call → Refresh list
- **Click project:** Navigate to `/project/:projectId`
- **Delete project:** Click delete → Confirm → API call → Refresh list

---

## 🛠️ Common Tasks

### Task 1: Adding a New Page

Let's add a "Profile" page where users can edit their information.

**Step 1: Create the component**

Create `src/pages/Profile.jsx`:

```jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../config/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setUsername(user.username || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(`/api/users/${user.id}`, {
        email,
        username,
      });

      setUser(response.data);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
          {message && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
```

**Step 2: Add route to App.jsx**

```jsx
// Add import
import Profile from "./pages/Profile";

// Add route inside <Routes>
<Route
  path="/profile"
  element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  }
/>;
```

**Step 3: Add link in Navbar**

```jsx
// In Navbar.jsx
import { Link } from "react-router-dom";

<Link to="/profile" className="text-blue-500 hover:underline">
  Profile
</Link>;
```

Done! Now users can navigate to `/profile` and edit their information.

---

### Task 2: Adding a New Component

Let's create a reusable "Card" component.

**Step 1: Create the component**

Create `src/components/Card.jsx`:

```jsx
function Card({ title, description, children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
    >
      {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      {children}
    </div>
  );
}

export default Card;
```

**Step 2: Use it in Dashboard**

```jsx
import Card from "../components/Card";

// Replace the project div with:
<Card
  title={project.title}
  description={project.description}
  onClick={() => openProject(project.id)}
>
  <div className="flex justify-between items-center">
    <span className="text-sm text-gray-500">
      {new Date(project.createdAt).toLocaleDateString()}
    </span>
    <button
      onClick={(e) => deleteProject(project.id, e)}
      className="text-red-500 hover:text-red-700"
    >
      Delete
    </button>
  </div>
</Card>;
```

Now you have a reusable Card component!

---

### Task 3: Making an API Call

Let's fetch user statistics.

```jsx
function UserStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/users/${user.id}/stats`);
        setStats(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  if (loading) return <div>Loading stats...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stats) return null;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <div className="text-2xl font-bold">{stats.projectCount}</div>
        <div className="text-gray-600">Projects</div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <div className="text-2xl font-bold">{stats.campaignCount}</div>
        <div className="text-gray-600">Campaigns</div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <div className="text-2xl font-bold">{stats.assetCount}</div>
        <div className="text-gray-600">Assets</div>
      </div>
    </div>
  );
}
```

---

### Task 4: Form Validation

Let's add validation to the login form.

```jsx
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return; // Don't submit if validation fails
    }

    // Proceed with login...
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full p-2 border rounded ${
            errors.username ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full p-2 border rounded ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
```

---

## 🐛 Troubleshooting

### Problem: "Module not found" error

**Error:**

```
Error: Cannot find module './components/MyComponent'
```

**Solution:**

1. Check the file path is correct
2. Check the file extension (`.jsx` vs `.js`)
3. Check the import statement matches the export:

   ```jsx
   // MyComponent.jsx
   export default MyComponent; // default export

   // Importing
   import MyComponent from "./components/MyComponent"; // ✅
   import { MyComponent } from "./components/MyComponent"; // ❌
   ```

---

### Problem: Component not re-rendering

**Issue:** You updated state but the component doesn't show the change.

**Common causes:**

1. **Mutating state directly:**

   ```jsx
   // ❌ Wrong
   const [items, setItems] = useState([1, 2, 3]);
   items.push(4); // Mutating directly!

   // ✅ Correct
   setItems([...items, 4]); // Create new array
   ```

2. **Not using the setter function:**

   ```jsx
   // ❌ Wrong
   const [count, setCount] = useState(0);
   count = 5; // Direct assignment!

   // ✅ Correct
   setCount(5); // Use setter
   ```

---

### Problem: Infinite loop with useEffect

**Error:** Browser freezes, console shows thousands of logs.

**Cause:** Missing or incorrect dependency array.

```jsx
// ❌ Wrong - runs after every render
useEffect(() => {
  setCount(count + 1); // This triggers a re-render!
}); // No dependency array

// ✅ Correct - runs only once
useEffect(() => {
  fetchData();
}, []); // Empty array = run once
```

---

### Problem: API calls failing

**Error:**

```
Error: Network Error
```

**Checklist:**

1. Is the backend running? Check `http://localhost:8080`
2. Is the API URL correct in `.env`?
   ```
   VITE_API_URL=http://localhost:8080
   ```
3. Is CORS configured on the backend?
4. Check the browser console for detailed error messages
5. Check the Network tab in DevTools

---

### Problem: "user is null" error

**Error:**

```
TypeError: Cannot read property 'id' of null
```

**Cause:** Trying to access user data before it's loaded.

**Solution:** Add a loading check:

```jsx
function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;

  // Now safe to use user.id
  return <div>Welcome, {user.username}!</div>;
}
```

---

### Problem: Styles not applying

**Checklist:**

1. Is Tailwind imported in `index.css`?
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
2. Is `index.css` imported in `main.jsx`?
   ```jsx
   import "./index.css";
   ```
3. Are you using the correct class names?
4. Check browser DevTools to see if classes are applied

---

Happy coding! 🚀
