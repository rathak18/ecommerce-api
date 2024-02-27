# 🚀 E-commerce API

Welcome to the E-commerce API project! This API is designed for managing products, user accounts, and order processing.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/ecommerce-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd ecommerce-api
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the project root and add your environment variables:

    ```dotenv
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/ecommerce
    SECRET_KEY=mysecretkey
    ```

## Usage

1. Start the API:

    ```bash
    npm start
    ```

    The API will be available at [http://localhost:3000](http://localhost:3000).

2. Use your preferred API testing tool (e.g., Postman) to interact with the API.

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

## Contributing

Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
