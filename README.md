# [E-commerce Platform] - Build Your Own Store

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)  
[![React](https://img.shields.io/badge/React-v18-blue)](https://reactjs.org/)  
[![Supabase](https://img.shields.io/badge/Supabase-backend-green)](https://supabase.com/)  
[![Vite](https://img.shields.io/badge/Vite-5.2-yellow)](https://vitejs.dev/)

## 🌟 Introduction

**E-commerce Platform** is a comprehensive web application that allows users to create, manage, and personalize their online stores. Built with cutting-edge technologies like **React**, **Supabase**, **Redux Toolkit**, and **React Query**, it delivers high performance, responsive design, and a seamless user experience.

This platform is packed with features for store owners and customers, such as real-time chat, product inventory charts, and interactive product reviews.

---

## 🚀 Features

### 🛒 **Store Management**

- Create, edit, and delete your online store.
- Add, edit, and remove products.
- Visualize inventory data using **interactive charts** for better management.

### 📊 **Product Interactions**

- Comment on products with the ability to reply to comments.
- Rate products and view aggregate ratings.

### 💬 **Real-Time Chat**

- Real-time messaging between store owners, clients, or other users.
- **User Activity Status:** View the online/offline status of the user you're chatting with.

### 👤 **User Profile Management**

- Login/logout via email or Google authentication.
- Update user details, including **username, password, and avatar**.

### ⚡ **Performance and State Management**

- **Global State:** Managed with **Redux Toolkit** to handle Supabase logic seamlessly.
- **Remote State:** Managed with **React Query** for efficient caching and real-time updates.
- Custom hooks for modular and reusable logic.

### 🎨 **Design and Animations**

- Fully responsive design using **Tailwind CSS**.
- Engaging animations powered by **Framer Motion** for smooth transitions.

### 💳 **Stripe Payment Integration**

- **Modern and Secure:** Provides a seamless and safe checkout experience.
- **Real-Time Updates:** Automatically reduces inventory stock after successful purchases.
- # **User-Friendly Design:** Ensures an intuitive and smooth payment process.

### 💳 **Stripe Payment Integration**

- **Modern and Secure:** Provides a seamless and safe checkout experience.
- **Real-Time Updates:** Automatically reduces inventory stock after successful purchases.
- **User-Friendly Design:** Ensures an intuitive and smooth payment process.

## 🛠️ Technologies Used

### Core Frameworks and Tools

- **React.js** - Frontend library for building user interfaces.
- **Vite** - High-performance build tool for fast development.

### Backend and State Management

- **Supabase** - Backend-as-a-service for authentication, real-time database, and storage.
- **Redux Toolkit** - Centralized global state management.
- **React Query** - Efficient remote state management with data caching.

### UI and Styling

- **Tailwind CSS** - Modern utility-first styling framework.
- **Framer Motion** - For smooth and dynamic animations.
- **MUI (Material UI)** - Prebuilt components for enhanced UI design.

### Utilities and Add-ons

- **React Hook Form** - Managing form state and validation.
- **Chart.js** - Interactive inventory management charts.
- **Swiper** - Advanced slider for product carousels.

### DevTools and Testing

- **ESLint** - Linting tool for maintaining code quality.
- **Prettier** - Ensures consistent code formatting.
- **Vite Plugin ESLint** - Integrates ESLint directly with Vite.

---

## 📂 Project Structure

```plaintext
src/
├── assets/          # Static assets (images, icons, fonts, etc.)
├── components/      # Reusable UI components
├── features/        # Feature-specific logic (e.g., Redux slices, React Query hooks)
├── pages/           # Complete pages (e.g., Dashboard, Login, Product Listing)
├── services/        # API handling and Supabase integration
├── utils/           # Utility functions and helpers
├── App.tsx          # Main application entry point
└── main.tsx         # Starting point with Vite integration and rendering
```

---

## 📦 Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bakerAllozi/e-commerce-react-Final-version-

   ```

2. **Navigate to the project directory:**

   ```bash
   cd ecommerce-platform
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Configure Environment Variables:**  
   Create a `.env` file and add the following keys:

   ```plaintext
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 🎥 Screenshots

- **Dashboard with Inventory Charts:**  
  ![Dashboard Screenshot](/public/read/Vite%20+%20React%20-%20Google%20Chrome%2011_21_2024%209_14_45%20PM.png)
  ![Dashboard Screenshot2](/public/read/Vite%20+%20React%20-%20Google%20Chrome%2011_21_2024%209_15_13%20PM.png)
  ![Dashboard Screenshot3](/public/more/Vite%20+%20React%20-%20Google%20Chrome%2011_21_2024%209_28_11%20PM.png)

  - **more about store**  
    ![Cart](/public/more/Vite%20+%20React%20-%20Google%20Chrome%2011_21_2024%209_28_55%20PM.png)
    ![checkout](/public/more/Vite%20+%20React%20-%20Google%20Chrome%2011_21_2024%209_29_55%20PM.png)
    ![searcher](/public/more/Vite%20+%20React%20-%20Google%20Chrome%2011_21_2024%209_30_12%20PM.png)
    ![login](/public/more/Vite%20+%20React%20-%20Google%20Chrome%2011_21_2024%209_30_58%20PM.png)

- **Product Comments and Replies:**  
  ![Comments Screenshot](/public//read/Vite%20+%20React%20-%20Google%20Chrome%2011_21_2024%209_14_24%20PM.png)
  ![Comments Screenshot2](/public//read/Vite%20+%20React%20-%20Google%20Chrome%2011_21_2024%209_15_58%20PM.png)

- **Real-Time Chat:**  
  ![Chat Screenshot](/public/read/Vite%20+%20React%20-%20Google%20Chrome%2011_21_2024%209_16_20%20PM.png)

---

## 🧑‍💻 Developer

- **baker Allozi** - [GitHub Profile](https://github.com/bakerAllozi)
