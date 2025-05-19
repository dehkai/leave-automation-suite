# 🌟 Digital Leave Automation System

**A modern HR solution for DHL's Digital Automation Challenge 2.0**  
[![React](https://img.shields.io/badge/React-19.0.1-%2361DAFB)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-%233ECF8E)](https://supabase.com/)
[![UiPath](https://img.shields.io/badge/UiPath-2025-%23FF5C0D)](https://www.uipath.com/)



## 📌 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Setup](#-setup)
- [Project Structure](#-project-structure)
- [UiPath Integration](#-uipath-integration)
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
- React.js 19 (Vite)
- Shadcn UI

**Backend**  
- Supabase (PostgreSQL Database + Auth)

**Automation**  
- UiPath Studio 2025
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

### 🤖 UiPath Integration

**Workflow Overview**  
1. Read Excel Data from Google Drive  
2. Validate Entries (Check for duplicates)  
3. Submit to Web Portal via API  
4. Handle Errors with screenshots  
5. Send Status Email to HR  

**Required Activities**  
- `Read Range` (Excel)  
- `Type Into` (Enter data)
- `Click` (Submit data)  
- `Try Catch` (Error handling)  
- `Send Outlook Mail` (Notifications)

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
└──utils/              # Utility functions          
    
```
## 📬 Contact

For support, questions, or collaboration opportunities:

**Developer**: Yap Deh Kai  
**Email**: ydk1421@gmail.com   
**GitHub**: [github.com/dehkai](https://github.com/dehkai)  
**LinkedIn**: [linkedin.com/in/yapdehkai](https://linkedin.com/in/yapdehkai)  
**University**: Universiti Teknologi Malaysia  

[![Email](https://img.shields.io/badge/Email-Contact%20Me-red)](mailto:ydk1421@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://linkedin.com/in/yapdehkai)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-lightgrey)](https://github.com/dehkai)

