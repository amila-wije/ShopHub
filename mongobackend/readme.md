# Shoes & Ratings API (Express + Node.js + MongoDB)

## Features

Add shoes
Fetch all shoes
Fetch shoe by ID with all ratings
Add ratings to a shoe
Automatically updates average rating

## Install & Setup

npm install

Create a `.env` file:
MONGO_URI=""
PORT=5000

Run the server:
node server.js

## #API Endpoints

## 1.Create Shoe

### **POST** `http://localhost:5000/api/ratings/api/shoes`

#### Request Body (JSON)

json
{
"name": "Air Max 90",
"brand": "Nike",
"price": 12000,
"sizes": [38, 39, 40, 41],
"images": [""],
"description": "Running shoe"
}

---

## 2. **Get All Shoes**

### **GET** `http://localhost:5000/api/ratings/api/shoes`

---

## 3. **Get Single Shoe + Ratings**

### **GET** `http://localhost:5000/api/ratings/api/shoes/:id`

GET /api/shoes/678a1234bcf0d21a77899f01

---

## 4. **Add Rating to Shoe**

### **POST** `http://localhost:5000/api/ratings/api/ratings`

#### Request Body (JSON)

{
"shoeId": "678a1234bcf0d21a77899f01",
"userName": "Amila",
"rating": 5,
"review": "Very good quality!"
}
