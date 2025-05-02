# 🌟 Digital Leave Automation System

**A modern HR solution for DHL's Digital Automation Challenge 2.0**  
[![React](https://img.shields.io/badge/React-18.2-%2361DAFB)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.38-%233ECF8E)](https://supabase.com/)
[![UiPath](https://img.shields.io/badge/UiPath-2023-%23FF5C0D)](https://www.uipath.com/)



## 📌 Table of Contents
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Setup](#-setup)
- [Project Structure](#-project-structure)
- [UiPath Integration](#-uipath-integration)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Challenge Submission](#-challenge-submission)
- [Contact](#-contact)

## ✨ Features

### Web Application
✅ **Employee Leave Portal** with React.js  
✅ **Real-time Database** with Supabase  
✅ **Smart Form Validation** (Date checks, required fields)  
✅ **Interactive Calendar View** (Color-coded by leave type)  
✅ **Bulk Approval/Rejection** for HR admins  
✅ **Responsive Design** works on desktop & mobile  

### Automation Features
🤖 **Excel-to-Web Automation** via UiPath  
📧 **Automatic Email Notifications** (Success/Failure reports)  
🔄 **Duplicate Prevention** (Employee ID + Date validation)  
📸 **Error Screenshot Capture** for troubleshooting  
📊 **Detailed Processing Reports** with success/failure counts  

## 🛠 Tech Stack

**Frontend**  
- React.js 18 (Vite)
- Material-UI (MUI)

**Backend**  
- Supabase (PostgreSQL Database + Auth)

**Automation**  
- UiPath Studio 2023
- REFramework 

## 🚀 Setup

### Prerequisites
- Node.js v18+
- npm v9+
- Supabase account
- Google Drive account (for sample Excel)

### Installation
1. Clone repository:
   ```bash
   git clone https://github.com/dehkai/leave-automation-suite.git
   cd leave-automation-suite

2. Install dependencies:
   ```bash
   npm install

3. Configure environment variables:
   ```bash
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Configure environment variables:
   ```bash
   npm run dev

### 📂 Project Structure
   ```bash
   src/
   ├── api/                # Supabase API clients
   ├── assets/             # Images, fonts
   ├── components/         # Reusable components
   │   ├── auth/          # Auth components
   │   ├── leaves/        # Leave-specific components
   │   └── ui/            # Generic UI components
   ├── contexts/           # React contexts
   ├── hooks/              # Custom hooks
   ├── pages/              # Application views
   ├── styles/             # Global styles
   ├── utils/              # Utility functions
   └── uipath/             # Automation workflows
       ├── Main.xaml       # Main workflow
       ├── ErrorHandler.xaml
       └── config/        # Configuration files
