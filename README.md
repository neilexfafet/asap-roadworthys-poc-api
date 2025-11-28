# Car Repair Shop - Proof of Concept API

This document provides an overview of the Car Repair Shop Proof of Concept (POC) API, detailing its purpose, architecture, and development process.

---

## What was built

This project is a backend API for "ASAP Roadworthys," designed as a Car Repair Shop Proof of Concept (POC) to validate the core functionalities of a the trials task.

The key components are:
*   **A RESTful API**: Built with Node.js, it exposes endpoints for managing inspections, customers, and vehicles.
*   **Supabase Integration**: The API leverages Supabase as its backend-as-a-service platform. This includes:
    *   **Database**: Using Supabase's PostgreSQL database for data persistence.
    *   **Authentication**: Handling user sign-up, sign-in, and securing API endpoints.\

## Reasoning behind your approach

The primary goal was to rapidly develop a functional backend to prove the concept's viability. The technology choices reflect this goal:

*   **Node.js**: Chosen for its vast ecosystem, performance, and the team's familiarity with JavaScript/TypeScript, allowing for quick development.
*   **Supabase**: Selected to accelerate backend development significantly. By abstracting away the complexities of database management, authentication, and real-time services, we could focus on the core business logic of the application. The `@supabase/postgrest-js` library provides a convenient and powerful way to interact with the database directly from the API.
*   **Proof of Concept (POC) Scope**: The project was intentionally kept as a POC to test the SeviceM8 API Integration (mainly retrieving forms) inside the system.

## Assumptions made

During the development of this POC, several assumptions were made:

1.  **Supabase as the Backend**: It was assumed that Supabase would meet all the immediate needs for the database and authentication.
2.  **Standard Data Models**: The database schema (e.g., for users, bookings, vehicles, messages) was based on a standard interpretation of what trial task would require.
3.  **Development Environment**: The use of tools like `nodemon` for auto-reloading and `dotenv` for environment variable management was assumed to be sufficient for the development workflow.
4.  **Security**: Basic security measures, such as environment variables for secrets and Supabase's built-in authentication, were deemed adequate for a non-production POC.

## Potential improvements

While this POC successfully demonstrates the core concept, several areas could be improved for a production-ready application:

*   **Robust Error Handling**: Implement a more comprehensive error handling and logging strategy to better diagnose issues in a live environment.
*   **Input Validation**: Add strict input validation for all API endpoints to ensure data integrity and improve security.
*   **Comprehensive Testing**: Develop a full suite of unit, integration, and end-to-end tests to ensure the API is reliable and bug-free.
*   **Scalability**: For a production load, review database queries, implement caching strategies, and consider a more scalable server architecture (e.g., containerization with Docker, serverless functions).
*   **API Documentation**: Generate formal API documentation (e.g., using Swagger/OpenAPI) to make it easier for frontend developers or other services to consume the API.

## How AI assisted your workflow

AI, specifically a coding assistant like Gemini Code Assist and Github Co-pilot, played a significant role in accelerating the development of this project:

*   **Code Generation**: It assisted in quickly scaffolding boilerplate code for API endpoints, database interactions using the Supabase client, and utility functions.
*   **Debugging**: When encountering errors, I could paste code snippets and error messages to get explanations and potential solutions, which significantly reduced troubleshooting time.
*   **Learning & Exploration**: It provided quick examples and explanations for libraries like `@supabase/postgrest-js`, helping me understand and implement features without extensive searching through documentation.
*   **Documentation**: As demonstrated here, it helped in generating structured and well-written documentation, such as this `ReadMe.md` file, based on high-level requirements.

Overall, AI acted as a pair programmer, accelerating development, improving code quality, and assisting with tasks beyond just writing code.



## Technical Requirements

To run this project locally, you will need the following:

*   **Node.js**: (v23.X or later recommended)
*   **yarn**: For managing project dependencies.
*   **A Supabase Account**: To set up the database and authentication backend.

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd asap-roadworthys-poc-api
    ```

2.  **Install dependencies:**
    ```bash
    yarn install
    ```

3.  **Set up your Supabase project:**
    *   Go to [Supabase](https://supabase.com/) and create a new project.
    *   In your project settings, navigate to the **API** section.
    *   Find your Project URL and your `anon` public key.

4.  **Configure environment variables:**
    *   Create a `.env` file in the root of the project.
    ```
    API_URL=YOUR_API_DEVELOPMENT_SERVER_URL
    ```

    *   Add your Supabase credentials to the `.env` file as follows:
    ```
    SUPABASE_URL=YOUR_SUPABASE_URL
    SUPABASE_KEY=YOUR_SUPABASE_ANON_KEY
    ```

    *   Run the ff command to retrieve JWT Secret Key and put the response here:
    * command: `console.log(require('crypto').randomBytes(64).toString('hex'))`
    ```
    JWT_SECRET=COMMAND_RESULT
    ```

    *   Add your ServiceM8 credentials to the `.env` file as follows:
    ```
    SERVICEM8_TOKEN=API_KEY
    SERVICEM8_CLIENT_ID=APP_ID
    SERVICEM8_CLIENT_SECRET=APP_SECRET
    ```

5.  **Run the application:**
    *   The project uses `nodemon` for development, which will automatically restart the server when file changes are detected.
    ```bash
    yarn dev
    ```

The API server should now be running on your local machine.