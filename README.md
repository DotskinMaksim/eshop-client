# Dotshop Web API and Client Project

This README provides an overview of the **Dotskin Web API and Client Project**, alongside a structured guide for developing new features. The document includes API details, client structure, and a roadmap for feature development.

- Back-end [GitHub Repo](https://github.com/DotskinMaksim/eshop-api)
- Unit-tests [GitHub Repo](https://github.com/DotskinMaksim/site-testing-scripts/tree/main/Cypress/dotshop-testing)

---
## Table of Contents

## Table of Contents

1. [Project Overview](#project-overview)
2. [Backend API Features](#backend-api-features)
3. [Frontend Client Features](#frontend-client-features)
4. [Development Workflow: Feature Development Process](#development-workflow-feature-development-process)
5. [API Usage](#api-usage)
6. [Client Setup](#client-setup)
7. [Technology Stack](#technology-stack)
8. [Contribution Guidelines](#contribution-guidelines)
9. [License](#license)
---
## Project Overview
This project is an e-commerce platform that allows users to browse products, manage their shopping cart, and make purchases while maintaining a detailed order history linked to their user account. It is designed with a seamless user experience for selecting and purchasing products, including sorting by categories, quantity adjustment, and a fully integrated payment module via API.

## Backend API Features:
### 1. **Full Database Integration**
   - **User Management**: 
     - Operations for adding, updating, and deleting users in the database.
     - User data includes username, email, password (hashed and securely stored), and authentication details.
     - Ability to fetch a list of all users or filter users based on specific criteria (e.g., order history, total payment amount).

   - **Product Management**:
     - Operations for adding, updating, and deleting products in the database.
     - Each product can include fields like name, price, description, image, and category.
     - Tax calculation is integrated for product prices, displaying the final price including tax.
     - Products can be filtered and displayed by categories.

   - **Order Management**:
     - Ability to create, update, and delete orders.
     - Orders include detailed information such as product list, quantities, total price, and status.
     - Tax is calculated and included in the total price of the order.

### 2. **Authentication & Security**
   - **User Authentication**:
     - Registration and login system using JWT (JSON Web Tokens) for secure authentication.
     - Passwords are hashed and stored securely using modern algorithms (e.g., bcrypt).
     - Password strength verification to ensure user passwords are secure (e.g., minimum length, special characters, etc.).
     - The system checks for existing users to prevent duplicate accounts with the same email or username.

   - **Password Security**:
     - Strong password policies enforced during registration and password change operations (e.g., minimum length, complexity).
     - Secure password hashing ensures user data protection in the database.

### 3. **Order and Payment Handling**
   - **Order Creation**:
     - Users can place an order by adding products to their cart, providing necessary details (address, payment method), and submitting the order.
     - The backend manages the creation of new orders, including calculating totals, applying taxes, and ensuring the accuracy of order details.

   - **Payment Integration**:
     - The backend communicates with an external payment API to handle transactions (e.g., Stripe, PayPal).
     - After the user proceeds with the checkout, the backend generates a payment link or token and returns it to the frontend for user redirection to the payment gateway.
     - The payment gateway processes the payment, and the backend updates the order status upon successful payment confirmation.

   - **Fetching Users and Order Data**:
     - Admins can retrieve all users or filter them based on specific criteria such as total payment amounts.
     - The backend also allows fetching detailed order history for each user, showing items purchased, payment status, and order details.

### 4. **API Integration**
   - The backend exposes RESTful APIs for handling:
     - User authentication (login, registration, password management).
     - Product management (add, update, delete, retrieve).
     - Order management (place order, view orders, update order).
     - Payment handling (generate payment link, confirm payment).

   - **Payment Link Generation**:
     - The backend can interact with a payment service (e.g., Stripe or PayPal) through its API to generate a unique payment link.
     - Once payment is processed, the backend updates the order status to reflect successful payment, ensuring consistency between the frontend and backend.

### 5. **Database Transactions and Operations**
   - All database operations are performed with full support for transactions, ensuring atomicity and consistency of data.
   - The backend ensures data integrity, especially when handling multiple operations like creating an order, updating product stock, or managing user accounts.

### 6. **Advanced Error Handling**
   - The backend includes detailed error handling to ensure smooth operation:
     - Validation errors (e.g., missing fields, invalid data).
     - Authentication errors (e.g., invalid credentials, expired tokens).
     - Payment errors (e.g., transaction failures, payment gateway errors).
     - Order-related errors (e.g., out of stock, order not found).
   
   - Each error is handled gracefully, providing clear feedback to the frontend for a better user experience.
### 7. ** Interface Multi-language Integration (English, Russian, Estonian)**
   - **i18n Implementation**:
     - The frontend supports three languages: **English**, **Russian**, and **Estonian**.
     - Language selection is available for users, allowing them to switch between languages easily.
     - The frontend uses the **i18n** library to manage translations and provide a seamless experience across different languages.
     - Translations are dynamically loaded and applied based on the user's language preference, ensuring the UI elements (buttons, titles, labels, etc.) are displayed in the selected language.

   - **Language Support**:
     - Each language has its own set of translation files that are loaded according to the user's selection. These files contain key-value pairs for all UI elements.
     - The supported languages include:
       - **English**: Default language.
       - **Russian**: For Russian-speaking users.
       - **Estonian**: For Estonian-speaking users.

   - **User Experience**:
     - Language selection is intuitive and easy to switch. The chosen language is stored in the user's preferences, ensuring consistency across sessions.
     - All text, including form labels, buttons, tooltips, and error messages, is localized based on the selected language.

## Frontend Client Features:
### 1. **Product Selection**
   - Users can browse a variety of products displayed on the platform.
   - The products can be filtered and sorted by different categories, allowing easy navigation and finding the desired items.
   - Each product has details like name, description, price, and an image to help users make informed decisions.

### 2. **Shopping Cart Management**
   - Users can add products to the cart with the ability to adjust quantities.
   - The cart displays the total price, considering the quantity of each product.
   - Items in the cart can be easily updated or removed, allowing users to modify their order before checkout.

### 3. **User Authentication**
   - Users are required to sign up and log in to their account in order to access the shopping cart and place orders.
   - Authentication ensures a secure and personalized shopping experience.
   - Once logged in, users can view their order history, including the status of previous orders, details of the items purchased, and payment status.

### 4. **Order Placement**
   - After reviewing the cart, users can proceed to checkout and place an order.
   - The platform allows users to confirm their order details before submitting the final request.
   - Order details, such as items, quantities, total cost, and payment method, are stored and available for review.

### 5. **Payment Integration**
   - The system is integrated with a separate payment module via an API, allowing secure and reliable transactions.
   - Users can select from various payment methods (credit card, PayPal, etc.) during checkout.
   - After a successful transaction, the order is processed, and the user is notified.

### 6. **Order History**
   - Users can view their order history, with detailed information about each order, including products ordered, payment status, and timestamps.
   - Order history is securely stored in the user’s account and accessible at any time for reference.

### 7. **User-Friendly Interface**
   - The platform offers a smooth and responsive interface that works across devices.
   - Clear visual cues and interactive elements guide users through the entire shopping process, from product selection to checkout.
### 8. **Data Multi-language Integration (English, Russian, Estonian)**
- **Database-driven Translations**:
     - The backend stores all product and category names, descriptions, and other translatable content in the database in multiple languages.
     - For each product, category, or other translatable entity, there are separate fields for each language (English, Russian, Estonian).
     - The backend dynamically retrieves the correct translation based on the user's language selection and returns it in the response for the frontend.

   - **Example Database Structure**:
     - Products and categories are stored with language-specific fields:
       ```sql
      CREATE TABLE `Products` (
	  `Id` int(11) NOT NULL,
	  `Name` longtext NOT NULL,
	  `PricePerUnit` double NOT NULL,
	  `AmountInStock` double NOT NULL,
	  `Unit` longtext NOT NULL,
	  `CategoryId` int(11) NOT NULL,
	  `HasBottle` tinyint(1) NOT NULL,
	  `IsActive` tinyint(1) NOT NULL,
	  `ImageUrl` longtext NOT NULL,
	  `NameEn` longtext NOT NULL,
	  `NameEt` longtext NOT NULL,
	  `NameRu` longtext NOT NULL
)
       ```
     - When a user requests product data, the backend queries the database and retrieves the appropriate translation for the selected language.

   - **Dynamic Translation Handling**:
     - When the user requests a product or category, the backend identifies the user's language preference and fetches the corresponding translation from the database.
     - This ensures that product details, category names, and descriptions are displayed in the correct language, without the need for hardcoding or static translation files.


---

## Development Workflow: Feature Development Process

### 1. **Idea and Requirement Analysis**

This project aims to develop an e-commerce platform where users can browse, select, and purchase products online. Key features and requirements include:

#### **User Features**
   - **Product Browsing**: Users can view products by category, with sorting and filtering options.
   - **Cart Management**: Users can add, remove, and adjust quantities of products in their cart.
   - **Order Placement**: Users can checkout, finalize their order, and make payments.
   - **Order History**: Users can view details of past orders.

#### **Authentication and Security**
   - Users can register, login, and reset passwords securely.
   - Password strength validation and session management will ensure secure access.

#### **Payment Integration**
   - The platform will integrate with an external payment gateway via API, returning a payment link to the frontend.

#### **Multi-Language Support**
   - The platform supports **English**, **Russian**, and **Estonian** using i18n for the frontend and database-stored translations for product and category details.

#### **Database Design**
   - The database will store user, product, category, and order data, including multi-language support for products.

#### **Key Technologies**
   - **Frontend**: React with i18n.
   - **Backend**: ASP.NET Core, MySQL database using MS Entity framework.
   - **Authentication**: JWT for secure login.
   - **Payment**: Integrated third-party payment gateway.

### 2. **Technical Analysis and Evaluation**

To ensure the successful development of the e-commerce platform, a thorough technical analysis is required. This includes:

#### **Technical Requirements**
   - **Frontend**: React will be used for the user interface, leveraging i18n for language support.
   - **Backend**: ASP.NET Core will handle the API and business logic, with MySQL as the database.
   - **Authentication**: JWT tokens will secure user authentication and session management.
   - **Payment Integration**: A third-party payment gateway will be integrated via API for payment processing.
   - **Multi-Language Support**: i18n in the frontend, with database-stored translations for product and category data in English, Russian, and Estonian.

#### **Development Effort and Timeline**
   - Frontend development (React + i18n integration): 3-4 weeks
   - Backend development (API, Authentication, Payment Gateway Integration): 4-5 weeks
   - Database design and multi-language setup: 2-3 weeks
   - Testing and deployment: 2 weeks

#### **Impact on Architecture**
   - The introduction of multi-language support will require modifications to both the frontend and backend.
   - Integration with the third-party payment gateway needs careful testing for security and reliability.

#### **Team Approval**
   - The development plan, technical stack, and timeline will be presented to the team for approval, ensuring all aspects align with project goals and resource availability.



### 3. **Design and Prototyping**

For this project, the design approach focuses on simplicity and modularity:

#### **UI/UX Design**
   - The user interface (UI) is designed to be clean and intuitive, ensuring a smooth experience for users.
   - The primary design tool used is `styled-components` to create styled components, allowing for easy theming and customization.

#### **Modular Styling**
   - Styling is kept modular and maintainable, with each page or feature having its own dedicated CSS file. For example, `LoginPage.Module.css` is used for the login page styling.
   - Custom styles are created in separate, well-organized module files, ensuring scalability and ease of maintenance.

#### **Technical Specification Document**
   - A detailed technical specification document will be created, outlining the layout, components, and interactions of each page, as well as the styling guidelines and color schemes.

#### **Prototyping and User Testing**
   - Prototypes will be developed using wireframes to visualize the user flow and interactions.
   - If necessary, user testing will be conducted to validate the design and make improvements based on feedback.

This approach ensures that the design is functional, easy to navigate, and aligned with user needs.

### 4. **Planning and Prioritization**

#### **Feature Breakdown into Subtasks**
The project can be divided into several key features, each with its own set of sub-tasks to facilitate a smooth development process. Here is a breakdown:

1. **User Authentication and Security**
   - **Subtasks**:
     - Implement user registration with password strength validation.
     - Implement login functionality with JWT-based authentication.
     - Password reset functionality.
     - Implement session management and user logout.

2. **Product and Category Management**
   - **Subtasks**:
     - Set up the database for products and categories with multi-language support.
     - Create product listing and detail pages, including filtering and sorting options.
     - Develop the backend for adding, updating, and deleting products and categories.
     - Integrate product search functionality.

3. **Shopping Cart and Order Management**
   - **Subtasks**:
     - Implement cart functionality (add, remove, and adjust quantities of products).
     - Develop the checkout process (user inputs, order confirmation, payment redirection).
     - Create an order history page to display past orders.

4. **Payment Gateway Integration**
   - **Subtasks**:
     - Integrate third-party payment API to process transactions.
     - Implement secure payment link generation and redirection to the frontend.

5. **Multi-Language Support**
   - **Subtasks**:
     - Integrate i18n for frontend translations (English, Russian, Estonian).
     - Ensure that product and category translations are stored in the database and are dynamically rendered based on user language preference.

6. **UI/UX Design and Styling**
   - **Subtasks**:
     - Develop basic UI wireframes and prototypes.
     - Implement responsive layout using styled-components and modular CSS files.
     - Create specific page designs (Login, Registration, Cart, Order History, etc.).

7. **Backend and Database Setup**
   - **Subtasks**:
     - Set up the MySQL database schema (users, products, orders, categories, etc.).
     - Implement CRUD operations for managing users, products, orders, and categories.
     - Ensure proper relations and foreign key constraints in the database.

8. **Testing and Debugging**
   - **Subtasks**:
     - Unit testing for frontend components.
     - Integration testing for payment gateway, cart, and order management.
     - Cross-browser and responsiveness testing.

#### **Task Prioritization**
To ensure efficient development and avoid bottlenecks, tasks will be prioritized based on their dependencies and impact on the overall product:

1. **High Priority**:
   - **User Authentication**: Essential for securing the platform and enabling user registration and login.
   - **Product Management**: Core functionality for the e-commerce platform to allow users to view and purchase products.
   - **Payment Integration**: Without payment functionality, users cannot complete transactions.

2. **Medium Priority**:
   - **Cart and Order Management**: While necessary for completing orders, these features depend on the product catalog and user authentication.
   - **Multi-Language Support**: Adds value but can be implemented once core features are functional.

3. **Low Priority**:
   - **UI/UX Design**: While important for user experience, the core functionality should be developed first. Design can be iterated as features are built.
   - **Testing and Debugging**: While important throughout the development process, testing becomes a focus as major features are completed.

By focusing on core functionality first (authentication, product management, payment integration), and progressively building up additional features (cart, order management, multi-language support), the project ensures smooth development and early delivery of critical features.

### 4. **Development Process**

- **Code Writing and Testing**: The development process began with the creation of the API, focusing on implementing all core endpoints. This was followed by the development of the frontend, which included key pages such as login, registration, product browsing, and cart management. The payment module was integrated after the basic functionalities were in place. The final step involved adding multilingual support for the platform.
  
- **Version Control and Commits**: Git was used for version control, and GitHub hosted the project repositories. Each task or feature was developed in a separate branch, allowing for organized progress and easier collaboration. Regular commits were made to document changes and keep the project up to date.

- **Coding Standards**: Code was written following established coding standards, ensuring readability, maintainability, and consistency throughout the project. This included the use of proper indentation, descriptive variable names, and the organization of code into modular components for both the backend and frontend.

- **Testing**: Each feature was thoroughly tested, and adjustments were made based on test results. Testing was done both manually and through automated unit tests where applicable. The payment gateway integration was thoroughly tested to ensure transactions were secure and functional.

### 6. **Testing**

- **Unit and Integration Testing**: For the testing phase, Cypress was used to write and execute end-to-end tests. Cypress tests were stored in a separate repository dedicated to testing, ensuring proper isolation from the main application code. The tests covered key features such as user registration, login, product management, cart functionality, and payment integration.

- **Test Results**: All test results were saved and documented, providing insights into the functionality and reliability of the application. The Cypress testing repository included not only the tests themselves but also logs of test runs, which allowed the team to monitor progress and ensure the application met quality standards.

[Unit tests](https://github.com/DotskinMaksim/site-testing-scripts/tree/main/Cypress/dotshop-testing)

### 7. **Code Review**

#### 1. `ApplicationDbContext` Class

##### Strengths:
- Well-organized and clear in terms of handling database context.
- Defining `DbSet<T>` properties for each entity is standard and effective.

##### Suggestions:
- **Nullable types for reference navigation properties**: Since `User` has navigation properties to `Order`, it's good practice to define them as `List<Order>?` (nullable list). Even if it’s not null in most cases, this can help with clarity and ensure nullability is respected in EF Core.

    ```csharp
    public List<Order>? Orders { get; set; }
    ```

---

#### 2. `User` Model

##### Strengths:
- The `HashPassword` method is clean and correctly uses `SHA256` for password hashing.
- The constructor initializes `UserName`, `Email`, and `PasswordHash` correctly.

##### Suggestions:
- **Password Hashing**: Using `SHA256` for password hashing is not recommended for secure password storage. Instead, use more secure algorithms such as `bcrypt`, `PBKDF2`, or `Argon2`. Libraries like `Microsoft.AspNetCore.Identity` use `PBKDF2` internally.

    Example with `PBKDF2`:
    ```csharp
    using (var hmac = new HMACSHA256())
    {
        var passwordBytes = Encoding.UTF8.GetBytes(password);
        var hashedBytes = hmac.ComputeHash(passwordBytes);
        return Convert.ToBase64String(hashedBytes);
    }
    ```

- **Security Concerns**: Password hashing should include a salt, which is missing in your code. A salt helps prevent rainbow table attacks.

- **Empty Constructor**: The default constructor `public User() {}` is not necessary if you're not using it elsewhere in the code. It's good practice to remove unused constructors for clarity.

---

#### 3. `ProductsController`

##### Strengths:
- The use of query parameters to filter and paginate products (`category`, `offset`, `limit`) is effective for a REST API.
- Efficiently handling edge cases, such as when no `limit` is provided, or `limit <= 0`.
- The use of `TaxCalculator` to calculate tax is well-integrated.

##### Suggestions:
- **Magic Numbers**: The price adjustment for bottles (`item.PricePerUnit += 0.10`) is a "magic number" and should be replaced with a constant or configuration setting to make it more maintainable.

    ```csharp
    private const double BottlePriceAdjustment = 0.10;
    if (item.HasBottle)
    {
        item.PricePerUnit += BottlePriceAdjustment;
    }
    ```

- **Separation of Concerns**: The logic inside the `Get()` method could be refactored to make it more readable and reusable. Specifically, the filtering, tax calculation, and bottle price adjustment could be extracted into separate private methods.

    ```csharp
    private IQueryable<Product> ApplyCategoryFilter(IQueryable<Product> query, string category)
    {
        if (!string.IsNullOrEmpty(category))
        {
            query = query.Where(p => p.Category.NameEn == category);
        }
        return query;
    }

    private List<Product> ApplyTax(List<Product> products)
    {
        if (withTax)
        {
            foreach (var item in products)
            {
                item.PricePerUnit = TaxCalculator.GetWithTax(item.PricePerUnit);
                item.PricePerUnit = Math.Round(item.PricePerUnit, 2);
            }
        }
        return products;
    }
    ```

- **Error Handling**: It’s good to handle potential database errors, such as when products cannot be saved due to foreign key constraints (e.g., invalid `categoryId`), or when a delete operation tries to delete a non-existent product. Currently, error handling is sparse, and adding more checks for these cases would improve the robustness of the API.

- **POST Method**: The `Add()` method for adding a product directly from query parameters can be improved. For better clarity and flexibility, consider accepting a `Product` object in the request body instead of query parameters.

    ```csharp
    [HttpPost]
    public async Task<ActionResult<Product>> Add([FromBody] Product product)
    {
        // Validation and business logic here
    }
    ```

    This would also align better with standard REST practices.

- **CRUD Method Consistency**: For consistency, ensure that your `Update()` method (with the `PUT` HTTP method) returns a proper `404 Not Found` response when the product is not found. It does this currently, but always ensure this consistency across all CRUD methods.

---

#### 4. Other Potential Improvements

- **Validation and Error Handling**: Ensure that all endpoints, especially those like `POST`, `PUT`, and `DELETE`, perform proper validation and error handling. For example, when updating or deleting a product, validate that the necessary data (e.g., product ID) is present and that the operation is legitimate.
  
- **Logging**: Implement logging for critical operations, such as adding, updating, or deleting products. This can help with debugging and monitoring the API in production environments.

- **Async/Await Best Practices**: You're using async/await correctly in most places. However, when working with database queries, always ensure that you await calls that can be potentially long-running, like `ToListAsync()`, `FindAsync()`, or `SaveChangesAsync()`, as you're doing in your code.

- **Pagination**: The implementation of pagination in `Get()` is correct but could be enhanced with more flexible options (like sorting). Also, you might want to validate the `offset` and `limit` values more strictly to avoid potential issues, such as negative values or excessively high values.

---

#### Summary of Key Areas for Improvement:
- Switch to a more secure password hashing algorithm (e.g., `bcrypt`, `PBKDF2`, `Argon2`).
- Avoid magic numbers by using constants or configurations.
- Refactor logic in the `ProductsController` to improve readability and reusability (separate concerns into methods).
- Ensure proper validation and error handling in API endpoints.
- Improve clarity in API methods by accepting `Product` objects in the body rather than query parameters.

By implementing these improvements, your code will be more maintainable, secure, and aligned with best practices.



### Project Retrospective

#### Project Outcomes

As a result of working on the project, a functional web application was developed that performs all of its main tasks. We successfully implemented the following features:

- User registration and authentication using JWT tokens.
- Product management (adding, deleting, editing).
- Product categorization with filtering by category.
- Simple order processing with cost calculation and tax application.
  
The backend was built using ASP.NET Core and Entity Framework Core, and React.js was used for the frontend. MySQL was set up for data storage, and the main entities (users, products, orders, and categories) were properly connected.

#### What Went Well

1. **API is stable**: All core requests, such as adding and deleting products, fetching category and product lists, work correctly. Errors are handled properly, and all requests are executed with necessary constraints.
2. **Registration and authentication**: User registration and login via JWT tokens were successfully implemented and tested. User password security is ensured with hashing.
3. **Core business logic**: Features for working with products and orders, as well as category filtering, provide the basic functionality of an e-commerce store.

#### Areas for Improvement

1. **Product search**: Currently, the system does not provide a search function for products. In the future, we would like to add the ability to search by name, price, and other product attributes.
   
2. **Frontend optimization**:
   - The logic in `app.js` has grown, and the project now requires improving the code structure on the client side. It is recommended to refactor the application logic into separate files and components to improve readability and maintainability.
   - Moving forward, it would be useful to implement a more advanced architecture for state management, such as Redux or Context API, to optimize application state handling.

3. **Performance**: Although the application works correctly, as the database grows and the number of users increases, performance optimization might be necessary, especially for working with large datasets (e.g., improving pagination or using database indexes).

4. **Testing**: More comprehensive unit and integration tests should be added for both the backend and frontend to prevent bugs as development progresses.

#### Future Plans

1. **Product search**: Implement search functionality with filtering by various criteria (category, price, name).
2. **Frontend refactoring**: Move logic from `app.js` to separate components, improve the project structure, and possibly integrate Redux for state management.
3. **Performance optimization**: Work on improving the application’s response time, such as adding caching or optimizing database queries.
4. **Testing and CI/CD**: Set up automated testing and CI/CD pipeline integration to ensure the application’s stability.

#### Conclusion

The project has met its core objectives and is a stable, functional solution for e-commerce. Going forward, the focus should be on improving search functionality, refactoring code, and enhancing testing to ensure scalability and ease of maintenance.

---

## API Usage

### Authentication Endpoints
1. **Register a New User**
   - **POST** `/api/auth/register`
   - Request Body:
     ```json
     {
       "userName": "exampleUser",
       "password": "examplePassword",
       "email": "example@example.com"
     }
     ```
2. **Login**
   - **POST** `/api/auth/login`
   - Request Body:
     ```json
     {
       "userName": "exampleUser",
       "password": "examplePassword"
     }
     ```

### Product Endpoints
1. **Get Products**
   - **GET** `/api/products`
   - Query Parameters:
     - `category` (string): Filter by category.
     - `offset` (int): Skip results.
     - `limit` (int): Maximum results to return.
     - `withTax` (bool): Include tax in prices.
     - `withBottlePrice` (bool): Include bottle deposit price.
2. **Add Product**
   - **POST** `/api/products`
   - Query Parameters:
     - `name`, `pricePerUnit`, `isActive`, `unit`, `hasBottle`, `imageUrl`, `amountInStock`, `categoryId`.

## Client Setup
1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start development server**:
```bash
npm start
 ```

3. **Build for production**:
```bash
npm run build
```
## Technology Stack


	•	Backend: ASP.NET Core 8.0, Entity Framework Core 9.0, Pomelo MySQL
	•	Frontend: React
	•	Database: MySQL
	•	Testing: Postman, Unit Testsб Cypress

## Contribution Guidelines

	•	Follow the feature development process outlined above.
	•	Use meaningful commit messages.
	•	Ensure all new features are fully tested and documented.
	•	Participate in code reviews to maintain code quality.

## License

This project is open-source. Feel free to contribute!

