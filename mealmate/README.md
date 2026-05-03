# 🍽️ MealMate — AI-Powered Meal Planner

An AI-powered weekly meal planner and grocery list builder built with React + Vite.

## Video Demo
https://youtu.be/KFwTVsF-jbI

## Overview
MealMate generates a personalized weekly meal plan based on your dietary preferences
using the Spoonacular API. It builds a smart grocery list, shows full recipe details,
and uses the Anthropic Claude API for ingredient substitution suggestions.

## Technologies
- React 18 + TypeScript + Vite
- Tailwind CSS v4
- Spoonacular API (meal plans + recipes)
- Anthropic Claude API (AI features)

## Setup

### 1. Clone and install
git clone https://git.cs.vt.edu/hitaishi/mealmate.git
cd mealmate
npm install

### 2. Add API keys
Copy .env.example to .env and fill in your keys:
VITE_SPOONACULAR_KEY=your_key_here
VITE_ANTHROPIC_KEY=your_key_here  (optional — needed for AI features only)

Get a free Spoonacular key at: https://spoonacular.com/food-api
Get a Claude key at: https://console.anthropic.com

### 3. Run
npm run dev
Open http://localhost:5173

## Project Structure
src/
├── components/   UI components
├── hooks/        Custom React hooks
├── utils/        API and data utilities
├── App.tsx       Root component
└── index.css     Global styles + Tailwind config

## Author
Hitaishi Posanpeta