# 🚀 E-commerce API

Welcome to the E-commerce API project! This API is designed for managing products, user accounts, and order processing.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/rathak18/ecommerce-api.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd ecommerce-api
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Create a `.env` file in the project root and add your environment variables:**

    ```dotenv
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/ecommerce
    SECRET_KEY=mysecretkey
    ```

## Usage

1. **Start the API:**

    ```bash
    npm start
    ```

    The API will be available at [http://localhost:3000](http://localhost:3000).

2. **Use your preferred API testing tool (e.g., Postman) to interact with the API.**

## API Endpoints

### Products

- **GET /api/products:** Get all products.
- **GET /api/products/:id:** Get product by ID.
- **POST /api/products:** Create a new product.
- **PUT /api/products/:id:** Update product by ID.
- **DELETE /api/products/:id:** Delete product by ID.

### Users

- **POST /api/users/register:** Register a new user.
- **POST /api/users/login:** Login and get JWT token.
- **GET /api/users/profile:** Get user profile (requires authentication).

### Orders

- **POST /api/orders:** Place a new order (requires authentication).
- **GET /api/orders/:id:** Get order by ID (requires authentication).
- **PUT /api/orders/:id:** Update order status by ID (requires authentication).
- **GET /api/orders/history/:userId:** Get order history for a specific user (requires authentication).

## Architecture

### Technology Stack

- **Node.js:** Utilized for its asynchronous, event-driven architecture.
- **MongoDB:** Chosen for its flexibility with JSON-like documents and seamless integration with Node.js.

### MVC Architecture

- **Models:** Structured data storage represented by ProductModel, UserModel, and OrderModel.
- **Views:** API endpoints handling client requests.
- **Controllers:** Business logic encapsulated in controllers, promoting separation of concerns.

### Authentication and Authorization

- JWT (JSON Web Tokens) employed for secure user access.
- Registration, login, and profile management handled with JWT tokens.

### Database Design

- MongoDB collections designed to capture relationships:
  - Product: Represents product information, including reviews and ratings.
  - User: Stores user data with hashed passwords.
  - Order: Captures order details and references users and products.

### Error Handling and Validation

- Validation middleware ensures data integrity.
- Centralized error handling to provide consistent and informative responses.

### Additional Considerations

- Scalability designed with potential future growth and increased traffic in mind.
- Security best practices implemented for secure data storage, transmission, and user authentication.

## Contributing

Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
