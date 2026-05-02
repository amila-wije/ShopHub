# ShopHub 

An AI-powered e-commerce assistant that allows users to search and discover shoes using natural language. Built with React, Node.js, MongoDB, and OpenRouter, this application transforms traditional product browsing into an interactive conversational experience.

Instead of manually filtering products, users can simply type queries like:

> "Nike shoes under 10000"  
> "Best rated running shoes"

The chatbot understands the request, queries the database, and returns results with rich UI components.

---

## 🚀 Features

- 💬 Natural language product search  
- 🧠 AI-powered query understanding (OpenRouter)  
- 🛍️ Product cards (image, price, sizes, ratings)  
- 🖼️ Markdown image rendering  
- ⭐ Visual rating system  
- ⚡ Real-time chat interface  
- 🔍 Smart filtering (brand, price, size, rating)  
- 🌐 Full-stack integration  

---

## 🏗️ Tech Stack

### Frontend
- React (TanStack Router)
- Tailwind CSS
- React Markdown

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### AI Integration
- OpenRouter API (LLM-based query parsing)

---

## 📸 Screenshots

_

How It Works
 - User enters a natural language query
 - Example: "Nike shoes under 8000"
 - Backend sends query to AI (OpenRouter)
 - AI extracts structured filters:
         -brand
         -maxPrice
         -size
         -rating
 -MongoDB is queried using these filters
 -Results are enriched with ratings
 -Frontend displays:
    -Chat response
    -Product cards (image, price, sizes, rating)clone https://github.com/your-username/ai-shoe-chatbot.git
    -ai-chatbot
