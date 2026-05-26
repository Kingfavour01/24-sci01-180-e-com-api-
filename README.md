# Product Catalog API

A simple CRUD REST API built with Node.js and Express.js that uses a local JSON file as a mock database.

## How it was Made

### Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Storage**: Local JSON file (data/products.json) using the s (File System) module.

### Architecture
- **Middleware**: Used xpress.json() to parse incoming JSON request bodies.
- **Data Management**:
    - **Reading**: s.readFileSync is used to pull the JSON array from the disk into memory.
    - **Writing**: s.writeFileSync is used to persist changes back to the JSON file after Create, Update, or Delete operations.
- **Routing**: Structured under /api/v1/products to follow API versioning best practices.
- **ID Handling**: New products are assigned IDs by finding the maximum existing ID and adding 1.

---

## Tutorial: Running and Testing

### 1. Installation & Startup
1. Clone the repository.
2. Install dependencies:
   `ash
   npm install
   `
3. Start the server:
   `ash
   node app.js
   `
   The server will start on http://localhost:8000.

### 2. Testing with Postman

#### A. Get All Products
- **Method**: GET
- **URL**: http://localhost:8000/api/v1/products
- **Expected Result**: A list of all products in the JSON file.

#### B. Create a Product
- **Method**: POST
- **URL**: http://localhost:8000/api/v1/products
- **Body** (Select aw and JSON):
  `json
  {
     name: Mechanical Keyboard,
    price: 89.99,
    description: RGB tactile keyboard
  }
  `
- **Expected Result**: Status 201 Created with the new product including its id.

#### C. Update a Product
- **Method**: PATCH
- **URL**: http://localhost:8000/api/v1/products/1 (Replace 1 with an existing ID)
- **Body** (Select aw and JSON):
  `json
  {
    price: 899.99
  }
  `
- **Expected Result**: Status 200 OK with the updated product object.

#### D. Delete a Product
- **Method**: DELETE
- **URL**: http://localhost:8000/api/v1/products/1 (Replace 1 with an existing ID)
- **Expected Result**: Status 204 No Content.
