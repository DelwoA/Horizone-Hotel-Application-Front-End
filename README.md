# Horizone: AI-Powered Hotel Booking Platform

Horizone is a cutting-edge hotel booking platform that leverages AI to enhance the travel experience. We've reimagined the way travelers find and book accommodations by combining traditional search functionality with advanced semantic search powered by vector embeddings.
<br><br>


## 🧩 Problem Statement

Traditional hotel booking platforms rely heavily on exact keyword matching and rigid filtering systems, which often fail to capture the true intent behind a traveler's search. Users are forced to adapt their queries to match the platform's search logic rather than expressing their needs naturally. This leads to suboptimal search results, longer booking times, and ultimately, a frustrating user experience.
<br><br>


## 💡 Our Solution

Horizone addresses these challenges by implementing a sophisticated AI-powered search system that understands the semantic meaning behind user queries. Our platform allows users to search for accommodations using natural language descriptions (e.g., "peaceful beachfront hotel with ocean views") and delivers highly relevant results through vector similarity search.
<br><br>


## 🚀 Core Features

* **AI-Powered Semantic Search**: Find the perfect accommodation using natural language descriptions instead of just keywords.
* **Secure Authentication**: User-friendly sign-up and sign-in processes powered by Clerk for enhanced security.
* **Comprehensive Hotel Listings**: Detailed hotel information including location, pricing, ratings, and rich descriptions.
* **Smart Filtering**: Traditional filtering and sorting options complement our AI search for maximum flexibility.
* **Streamlined Booking Process**: Easy-to-use booking system with clear confirmation and management.
* **Secure Payment Processing**: Integrated with Stripe for safe and reliable payment processing.
* **Responsive Design**: Beautiful, intuitive interface that works seamlessly across devices.
* **Role-Based Access Control**: Special administrative features for hotel owners and platform administrators.
<br><br>


## ⚙️ Technical Implementation

Horizone is built using a modern tech stack:

* **Frontend**: React with Redux for state management, styled with Tailwind CSS and Shadcn UI components.
* **Backend**: Express.js with TypeScript for type safety.
* **Database**: MongoDB with Mongoose for data modeling.
* **AI Integration**: OpenAI embeddings with MongoDB Atlas Vector Search for semantic search capabilities.
* **Authentication**: Clerk for secure user management.
* **Payments**: Stripe integration for processing bookings.
<br><br>


## 🌟 Impact

* Horizone transforms the hotel booking experience by making it more intuitive and efficient.
* By understanding the true intent behind user queries, our platform helps travelers find exactly what they're looking for with less time and effort.
* For hotel owners, our platform provides greater visibility and better matching with the right guests, leading to increased booking rates and customer satisfaction.
* This project demonstrates how AI can be thoughtfully integrated into everyday applications to solve real user problems while maintaining a focus on security, performance, and user experience.
<br><br>


👉 **You can access the back-end repository of this project here: [Horizone Hotel Application – Back-End](https://github.com/DelwoA/Horizone-Hotel-Application-Back-End)**
<br><br><br><br>

---

<br>

# Horizone Hotels – Project Front-end Setup Guide

This guide walks you through setting up **Clerk Authentication** in the **Horizone Hotels** frontend application. By the end, you'll have a fully integrated sign-in system ready to use.
<br><br>

## 📁 Project Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/DelwoA/Horizone-Hotel-Application-Front-End.git
   ```

2. **Open the Project in Your Code Editor**

   * Preferably use **VS Code** or **Cursor**.
   * Open a terminal inside the editor.

3. **Install Dependencies**

   ```bash
   npm i
   ```

   This will create the `node_modules` folder with all necessary packages.
<br><br><br>


## 🔐 Setting Up Clerk

1. **Go to [Clerk](https://clerk.com)**

   * Sign up for a new account or log in if you already have one.

2. **Create an Application**

   * Click on **Create Application**.
   * Enter a name (e.g., `Horizone Hotels`).
   * Toggle ON desired authentication methods (e.g., Email, Google, Apple).

   ![Setting up Clerk, step 1](https://github.com/user-attachments/assets/28feacce-cd7c-4756-9929-acdadc0778bc)

3. **Choose Framework**

   * Select **React** from the setup options.

   ![Setting up Clerk, step 2](https://github.com/user-attachments/assets/fdf53ff5-d9e4-4bb9-96a9-04b3ae7ed8fd)

4. **Continue to Quickstart**

   * Scroll down and click **Continue to view the Clerk API Keys**.

   ![Setting up Clerk, step 3](https://github.com/user-attachments/assets/c020d9d5-f9dc-46bc-83a1-0533338f8003)

5. **Set Clerk API Keys**

   * On the next screen, you’ll see a section titled `Set your Clerk API keys`.
   * Copy the value of `VITE_CLERK_PUBLISHABLE_KEY` only (do not copy the secret key).

   ![Setting up Clerk, step 3](https://github.com/user-attachments/assets/abe21c9e-6774-440b-a952-f39656c0953d)
<br><br><br>


## ⚙️ Environment Configuration

1. **Create an `.env` File**

   * In the root of your project directory, create a new file named `.env`.

2. **Add the Clerk Publishable Key**

   * Paste the copied key into the `.env` file like below:

   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

<br><br>


## 🚀 Run the Project

Start the development server with:

```bash
npm run dev
```

Visit your app at `http://localhost:5173` and sign up to create your first user!

📸 *Insert screenshot here (first user creation preview)*
<br><br><br>


## 📌 Notes

* Never commit your **`.env`** file to GitHub.
* Only the **publishable key** should be used in frontend code. Keep the **secret key** private.
<br><br><br>


Happy Coding! 🚀
