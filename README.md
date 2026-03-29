# 🚀 VectorShift Pipeline Builder

A visual, drag-and-drop pipeline builder for designing AI workflows using a graph-based interface — similar to Zapier or LangChain, but more flexible and developer-friendly.

---

## 📌 Overview

VectorShift Pipeline Builder allows users to create and execute data pipelines by connecting nodes in a visual canvas. Each node represents a specific operation such as input handling, API calls, LLM interaction, or data transformation.

The system ensures that all pipelines are valid **Directed Acyclic Graphs (DAGs)**, meaning they can be executed without circular dependencies.

---

## 🎯 Features

### 🧩 Visual Pipeline Builder
- Drag-and-drop nodes onto a canvas
- Connect nodes using edges to define data flow
- Real-time node and edge tracking

### ♻️ Reusable Node Architecture
- All nodes are built using a common `BaseNode` component
- Consistent styling and behavior
- Dynamic handles for flexible connections

### 🧠 Smart Text Node
- Auto-resizing input field
- Detects `{{variable}}` patterns automatically
- Dynamically creates input handles for variables

### 🔍 DAG Validation
- Backend validates pipelines using **Kahn’s Algorithm**
- Ensures no cycles exist in the graph
- Guarantees execution feasibility

### 🎨 Modern UI
- Dark-themed interface
- Color-coded node types
- Smooth hover animations
- Organized node palette toolbar

---

## 🏗️ Tech Stack

| Layer       | Technology            |
|------------|----------------------|
| Frontend   | React + ReactFlow    |
| State Mgmt | Zustand              |
| Backend    | Python + FastAPI     |

---

## 🧱 Node Types

| Node Type     | Description |
|--------------|------------|
| **Input**     | Entry point for text or file data |
| **Output**    | Displays final result |
| **LLM**       | Sends prompts to a language model |
| **Text**      | Template node with `{{variable}}` support |
| **API**       | Makes HTTP requests (GET, POST, etc.) |
| **Math**      | Performs arithmetic operations |
| **Filter**    | Routes data based on conditions |
| **Condition** | Implements if/else branching |
| **Logger**    | Logs data for debugging |

---

## ⚙️ How It Works

1. Drag nodes onto the canvas  
2. Connect nodes to define data flow  
3. Configure each node’s parameters  
4. Submit pipeline to backend  
5. Backend validates DAG structure  
6. If valid → ready for execution 🚀  

---
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
### Frontend URL: http://localhost:3000

### Docker build
```bash
docker-compose up --build
```
### Project Structure
```bash
D:\Project\files\
│
├── docker-compose.yaml
│
├── vectorshift-backend\
│   ├── Dockerfile
│   ├── .dockerignore
│   └── main.py
│
└── vectorshift-frontend\
    ├── Dockerfile
    ├── .dockerignore
    ├── package.json
    ├── package-lock.json
    ├── public\
    │   ├── index.html
    │   ├── favicon.ico
    │   ├── manifest.json
    │   └── robots.txt
    └── src\
        ├── App.js
        ├── index.js
        ├── index.css
        ├── store.js
        ├── ui.js
        ├── toolbar.js
        ├── draggableNode.js
        ├── submit.js
        └── nodes\
            ├── BaseNode.js
            ├── inputNode.js
            ├── outputNode.js
            ├── llmNode.js
            ├── textNode.js
            ├── apiNode.js
            ├── mathNode.js
            ├── filterNode.js
            ├── conditionNode.js
            └── loggerNode.js
```
### Video: https://drive.google.com/file/d/1lVwWuYwOntMoJc1pFMjy1t63eV2ps0cK/view?usp=sharing

