# React + TypeScript + Tailwind CSS with Vite Setup Guide

This guide will walk you through the process of creating a React application using TypeScript and Tailwind CSS with Vite.

## Prerequisites

- Node.js (version 14 or later)
- npm (comes with Node.js)

## Step 1: Create a New Vite Project

1. Open your terminal or command prompt.
2. Run the following command to create a new Vite project:

```bash
   npm create vite@latest my-todo-app -- --template react-ts
   or 
   npm create vite@latest
   yes > project-name > react > typescript
```

## Step 2:  Install Tailwind CSS
<h2>Install Tailwind CSS and its dependencies:</h2>

```bash
    npm install -D tailwindcss postcss autoprefixer
```
Initialize Tailwind CSS:

```bash                                    
npx tailwindcss init -p
```
This command creates two files: tailwind.config.js and postcss.config.js.

Configure your tailwind.config.js file to include the paths to your template files:

```bash
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
Add the Tailwind directives to your CSS file. Open src/index.css and replace its content with the following:

```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Step 3:  Run Code
```bash
npm run dev
```