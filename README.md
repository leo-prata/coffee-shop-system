# Welcome to Cafe Leblanc!

The Coffee Shop system is designed to facilitate the management of a coffee shop's operations through a RESTful API. 
The system's backend is developed in TypeScript and utilizes Prisma as an ORM for interacting with a PostgreSQL database.
On the frontend side, the application leverages TypeScript along with React and Next.js, that adds powerful features such as server-side rendering (SSR), automatic code splitting, and seamless client-side navigation through its 
routing capabilities. 
This integration allows for fast page loads and a smooth user experience, crucial for managing orders, products, and categories in a coffee shop environment.

## User Management
The application begins with user registration, where new users can sign up by providing their name, email, and password. Upon registration, the system stores these details in the database, recording the user's creation timestamp (created_at). Users are required to authenticate themselves via a login route (POST /session), where the provided credentials are verified against the stored data. Successful authentication returns a token, allowing users to access protected routes that require authentication, such as managing orders and products.

## Product and Category Management
The system categorizes products to organize the coffee shop's offerings efficiently. Each product belongs to a specific category (Category). Categories are created using the POST /category route and can be listed using GET /category. Products (Product) are defined with attributes like name, price, description, and an optional banner image (banner). These are associated with a category (category_id) and can be managed through routes like POST /product for creation and GET /category/product to retrieve products from a specific category.

## Order Processing
Customers can place orders within the system, which are represented as individual entries in the Order table. Each order includes details such as the table number (table), current status (status), and whether it's a draft (draft). Orders are created using POST /order and can be managed through several actions:

- Adding items (POST /order/add) associates a product (product_id) with an order (order_id), specifying the quantity (amount).
- Removing items (DELETE /order/remove) removes specified items from an order.
- Marking an order as sent (PUT /order/send) updates its status to indicate it's been dispatched for preparation or delivery.
- Completing an order (PUT /order/finish) changes its status to denote successful fulfillment.
- Order and Product Relationships
- Items within an order (Item) reflect specific products selected by customers. Each item tracks its quantity (amount) and maintains relationships with both an order (order_id) and a product (product_id). This structure allows for efficient tracking and management of orders, ensuring accurate fulfillment and inventory management within the coffee shop.
