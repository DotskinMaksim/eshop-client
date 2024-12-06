# Dotshop Web API and Client Project

This README provides an overview of the **Dotskin Web API and Client Project**, alongside a structured guide for developing new features. The document includes API details, client structure, and a roadmap for feature development.

- Back-end [GitHub Repo](https://github.com/DotskinMaksim/eshop-api)

---

## Project Overview

This project consists of a **backend API** built with ASP.NET Core and Entity Framework Core and a **frontend client** developed using React. It supports product and category management, authentication, and basic e-commerce functionality like orders.

### Backend API Features:
1. **Products**:
   - CRUD operations.
   - Filter, sort, and pagination for product lists.
   - Price modifications (e.g., adding tax or bottle price).
2. **Categories**:
   - Retrieve category lists with multilingual support.
3. **Authentication**:
   - User registration and login with secure password hashing.
4. **Utility Endpoints**:
   - Delete all products.
   - Deactivate all products.
   - Retrieve the most expensive product.
5. **Order Management**:
   - Data model includes orders and order items.

### Frontend Client Features:
1. **Product Listing**:
   - Displays paginated products with images and titles.
   - Filters products by category.
2. **Product Details**:
   - Provides detailed information on selected products.
3. **Cart Functionality**:
   - Supports adding items, adjusting quantities, and calculating totals.
4. **Order and Payment Integration**:
   - Redirects users to a payment link and processes orders after successful payments.

---

## Development Workflow: Feature Development Process

### 1. **Idea and Requirement Analysis**
- Collect ideas from the team and users.
- Define the business goals and value of the feature.
- Identify the target audience and user scenarios.
- Analyze market demands and competitor solutions.

### 2. **Technical Analysis and Evaluation**
- Define technical requirements.
- Estimate development effort and timelines.
- Assess impact on existing architecture and dependencies.
- Approve the development plan with the team.

### 3. **Design and Prototyping**
- Create UI/UX designs, wireframes, and prototypes.
- Develop a technical specification document.
- Test prototypes with users (if necessary).

### 4. **Planning and Prioritization**
- Break down the feature into smaller tasks.
- Set task priorities based on dependencies and impact.
- Add tasks to the backlog and plan sprints (if using Scrum).

### 5. **Development**
- Write and test the code.
- Make regular commits and maintain version control.
- Adhere to coding standards and team guidelines.

### 6. **Testing**
- Write unit and integration tests.
- Conduct manual and automated testing.
- Test UI and functionality thoroughly.
- Perform performance and security testing.

### 7. **Code Review**
- Conduct internal code reviews to find errors and suggest improvements.
- Address feedback and refine the feature accordingly.

### 8. **Documentation**
- Write technical documentation for developers.
- Update user documentation (guides, FAQs, instructions).
- Revise API documentation (if applicable).

### 9. **Pre-Release Testing**
- Test on a staging environment.
- Conduct smoke testing and UAT (user acceptance testing).

### 10. **Release**
- Prepare the release version.
- Deploy updates to the production environment.
- Monitor the deployment process and resolve any issues promptly.

### 11. **Monitoring and Support**
- Monitor performance metrics and logs post-release.
- Collect user feedback.
- Fix bugs and implement enhancements.

### 12. **Retrospective**
- Analyze the work completed.
- Identify areas for improvement in the development process.
- Discuss lessons learned during feature implementation.

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

### Client Setup
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
Technology Stack

	•	Backend: ASP.NET Core 8.0, Entity Framework Core 9.0, Pomelo MySQL
	•	Frontend: React
	•	Database: MySQL
	•	Testing: Postman, Unit Tests

Contribution Guidelines

	•	Follow the feature development process outlined above.
	•	Use meaningful commit messages.
	•	Ensure all new features are fully tested and documented.
	•	Participate in code reviews to maintain code quality.

License

This project is open-source. Feel free to contribute!

