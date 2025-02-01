# Recruitesy - A Recruitment Management System

---

## 📌 Project Overview
Recruitesy is a full-fledged web application designed to streamline the recruitment process within an organization. It replaces traditional Excel-based candidate tracking with a modern, secure, and efficient digital solution. The system ensures that only authorized hiring team members can manage candidate applications, conduct interviews, and finalize selections.

## ❓ Problem Statement & Solution
### 🔴 Problem:
Recruiting candidates via Excel sheets is inefficient, prone to errors, and lacks proper access control.

### ✅ Solution:
Recruitesy provides a web-based solution that:
- 🚀 **Automates candidate tracking** within the hiring process.
- 🔐 **Enhances security** using authentication and audit trails.
- 🖥 **Provides an intuitive interface** for managing candidate data efficiently.

---

## 🛠 Tech Stack
| Component        | Technology Used |
|-----------------|----------------|
| **Frontend**    | Next.js (TypeScript), Tailwind CSS, Framer Motion |
| **Backend**     | Node.js, Express.js |
| **Database**    | MongoDB |
| **Authentication** | NextAuth/Auth.js (Google & GitHub OAuth) |
| **Styling**     | Tailwind CSS, shadcn (for buttons) |
| **Containerization** | Docker |

---

## 📊 System Architecture & Flowchart
Below is a visual representation of the workflow of Recruitesy.

 To be Posted Soon

---

## ⚙️ Functionality Breakdown
### 1️⃣ Authentication & Authorization
- 🔑 Only valid users (hiring team) can log in using their company email via Google or GitHub.
- 🔍 Authentication is used to track data changes and ensure security.

### 2️⃣ Candidate Registration
- 📝 Companies share a unique registration form link with candidates.
- 📂 Candidates fill out the form, and their data is stored in MongoDB.

### 3️⃣ Job Domain & Attendance
- 📌 The dashboard displays different job profiles.
- ✅ Candidates are marked present before appearing in the interview list.

### 4️⃣ Interview Process & Selection
- 🗂 Candidate details (name, email, resume, LinkedIn profile, etc.) are accessible.
- 🎯 Hiring managers can mark candidates as "Selected" or "Interviewed".
- 📄 The "Selected" candidates move to a separate section.

### 5️⃣ Offer Letters & Communication
- ✉️ Hiring managers can send offer letters to selected candidates.
- 📊 Email tracking ensures transparency.

---

## 🔒 Security & Data Protection
- **Authentication** ensures only authorized users can modify data.
- **Audit Logs** store details of users making changes.
- **Database Protection** prevents unauthorized access.

---

## 📥 Installation & Setup Guide
### 🛠 Prerequisites:
- ⚡ Node.js installed
- 🐳 Docker installed
- ☁️ MongoDB Atlas setup

### 📌 Steps to Run Locally:
1️⃣ Clone the repository.
2️⃣ Install dependencies: `npm install`
3️⃣ Set up environment variables.
4️⃣ Run the development server: `npm run dev`
5️⃣ Access the app at `http://localhost:3000`

### 🐳 Docker Setup:
1️⃣ Build the Docker image: `docker build -t recruitesy .`
2️⃣ Run the container: `docker run -p 3000:3000 recruitesy`

---

## 🖼 Screenshots
 To be Posted Soon

---

## 🤝 Contribution & License
- 💡 Open-source contributions are welcome.
- 📜 License details will be added here.
