# ⚙️ Setup Guide — VectorShift Pipeline Builder

This guide will help you set up and run the **VectorShift Pipeline Builder** locally.

---

## 📋 Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Python** (v3.8 or higher)
- **pip**

---

## 📦 1. Clone the Repository

```bash
git clone https://github.com/YashIsTheBest247/VectorShift.git
cd VectorShift
cd Files
```
### Backend Setup
```bash
cd vectorshift-backend
pip install fastapi uvicorn
uvicorn main:app --reload
```
### Backend URL: http://127.0.0.1:8000

### Frontend Setup
```bash
cd vectorshift-frontend
npm install
npm start
```
