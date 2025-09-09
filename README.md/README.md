## MERN Stack Intern Assignment

This is a mini-project built using the MERN stack (MongoDB, Express, React, Node.js) to demonstrate understanding of key web development concepts.

### Project Objective

The primary goals of this project are to implement:

  - **Authentication:** Secure user sign-up and login with hashed passwords and JSON Web Tokens (JWT).
  - **Role-Based Access Control:** Differentiate between two user roles: `Admin` and `Student`.
  - **Dashboard CRUD:** Provide a dashboard interface for managing data based on the user's role.
      - **Admin Dashboard:** Allows `Admin` users to perform full CRUD (Create, Read, Update, Delete) operations on student records.
      - **Student Dashboard:** Allows `Student` users to view and update only their own profile.

### Core Technologies

  - **Frontend:** React.js, React Router, Axios
  - **Backend:** Node.js, Express.js
  - **Database:** MongoDB (via Mongoose ODM)
  - **Authentication:** JWT for tokens and `bcrypt` for password hashing

### Features Implemented

  - **User Management:** Sign-up and login pages for new and existing users.
  - **Secure Authentication:** Passwords are securely stored using `bcrypt`, and user sessions are managed with JWTs.
  - **Protected Routes:** Dashboards are accessible only to logged-in users with the correct role.
  - **Student Entity:** A student entity is defined with fields for `Name`, `Email`, `Course`.
  - **APIs:**
      - Public APIs for user registration and authentication.
      - Role-protected APIs for Admin (CRUD on students) and Student (view/update own profile).

### Getting Started

To run this project, you need to have Node.js and npm installed.

**1. Clone the Repository:**

```bash
git clone https://github.com/Shravyareddy81/MERN-Intern-Assignment.git
cd MERN-Intern-Assignment
```

**2. Backend Setup:**

  - Navigate to the `server` directory.
    ```bash
    cd server
    ```
  - Install dependencies.
    ```bash
    npm install
    ```
  - Create a `.env` file and add your MongoDB connection string and a JWT secret.
    ```
    MONGO_URI = "mongodb+srv://shravyareddy1121_db_user:jNA7oUuCYSFOBtp8@mern-intern-cluster.vifswnw.mongodb.net/mern_assignment?                retryWrites=true&w=majority&appName=MERN-Intern-Cluster"
    JWT_SECRET = "some_secret_random_string"
    ```
  - Start the backend server.
    ```bash
    node server.js
    ```

**3. Frontend Setup:**

  - Open a new terminal and navigate to the `client` directory.
    ```bash
    cd client
    ```
  - Install dependencies.
    ```bash
    npm install
    ```
  - Start the frontend development server.
    ```bash
    npm run dev
    ```

The application should now be running. You can access it at `http://localhost:5173`.