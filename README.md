# Indian Dishes Explorer 🍽️

A modern React frontend for exploring Indian cuisine dishes with advanced search, filtering, and dish suggestion capabilities. Built with React, TypeScript, and Fluent UI.

---

## 📚 Table of Contents

- [Features](#features-✨)
- [Tech Stack](#tech-stack-💻)
- [Installation](#installation-⚙️)
- [Configuration](#configuration-⚙️)
- [Running the App](#running-the-app-🚀)
- [Connecting to Backend](#connecting-to-backend-🔌)

---

## Features ✨

### Core Features
- 🍛 **Dish Browser** – View all dishes in a paginated table
- 🔍 **Advanced Search** – Search by name, ingredients, or region with auto-suggest
- 🎛️ **Smart Filters** – Filter by diet type, flavor profile
- 📊 **Sorting** – Sort by name, prep time, cook time, etc.

### Dish Details
- ℹ️ **Comprehensive Info** – View all dish attributes including ingredients, preparation time, and origin
- 🖱️ **Quick Navigation** – Click any dish name to view details

### Smart Suggestions
- 🧑‍🍳 **Ingredient-Based Suggestions** – Find dishes you can make with available ingredients

### Bonus Features
- 🔐 **Authentication** – Login flow with JWT
- 💾 **Persistent State** – Browser storage remembers your session and preferences
- 📱 **Responsive Design** – Works on all device sizes

---

## Tech Stack 💻

### Core
- React
- TypeScript
- Fluent UI
- React Router 6

### State Management
- Redux Toolkit
- React Context API

### API Client
- Axios

---

## Installation ⚙️

Clone the repository:

```bash
git clone https://github.com/yourusername/indian-dishes-explorer.git
cd indian-dishes-explorer
Install dependencies:

bash
npm install
Set up environment:

bash
cp .env.example .env

## Configuration ⚙️
Edit the .env file:

.env
REACT_APP_API_BASE_URL=http://localhost:3000/api
REACT_APP_ENV=development

## Running the App 🚀
Start development server:

bash
npm start
Runs the app in development mode at http://localhost:3000.

Connecting to Backend 🔌
This frontend is designed to work with the Indian Cuisine Explorer API.
Set the REACT_APP_API_BASE_URL in .env file to point to backend API.