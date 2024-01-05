# My Cryptos Project Documentation 🚀

## Project Overview

The My Cryptos project is a web application built using React, SCSS, Vite, and various packages for chart visualization such as d3-scale, d3-shape, and Chart.js. The project utilizes Axios for handling API requests to gather cryptocurrency information. Additionally, Redux Toolkit is employed for state management, and React Router Dom facilitates seamless navigation within the application.

### Technologies Used 🛠️

- **Frontend:**
  - React
  - SCSS
  - Vite
  - Redux Toolkit
  - React Router Dom
  - Chart Visualization: Chart.js, d3-scale, d3-shape

- **Backend:**
  - Firebase
    - Authentication: Google provider, Email and Password
    - Database: Firestore

- **Testing:**
  - Unit Testing: vitest
  - End-to-End Testing: Cypress

## Features 🌟

### 1. User Authentication 🔐

The project incorporates Firebase for user authentication, providing users with the option to sign in using Google or email/password credentials. Additionally, the application offers functionality for password reset via email and email verification for an enhanced user experience.

### 2. User Data Storage 💾

User-specific data, such as favorite cryptocurrencies, is stored in Firestore. This ensures that users can access their preferred cryptocurrencies across sessions.

### 3. Responsive Design and Animations 🎨

The design of the application is responsive, ensuring a seamless experience across various devices. Animations are incorporated to enhance the user interface and provide a visually appealing experience.

### 4. Dark and Light Mode 🌓

The application supports both dark and light modes, allowing users to customize their visual experience based on their preferences.

### 5. Chart Visualization 📊

The project leverages popular chart visualization libraries, including d3-scale, d3-shape, and Chart.js, to present cryptocurrency data in an informative and visually appealing manner.

### 6. Search and Filters 🔍

Users can search for specific cryptocurrencies using a search bar. Additionally, filters are provided to allow users to refine their cryptocurrency data based on specific criteria.

### 7. API Integration with Axios 🌐

Various APIs are integrated into the application using Axios to fetch real-time cryptocurrency information. This ensures that users have access to up-to-date data and market trends.

### 8. File Structure and Code Organization 📂

The project is structured to facilitate easy navigation and maintainability. Props, custom hooks, and other React best practices are employed to ensure a clean and organized codebase.

## Testing 🧪

The project uses `vitest` for unit testing and `Cypress` for end-to-end testing to ensure robust code quality and functionality.

## Getting Started 🚀

Follow these steps to set up and run the Crypto Cryptocurrency project locally:

1. Clone the repository: `git clone [repository_url]`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Conclusion 🎉

The Crypto Cryptocurrency project combines a variety of technologies to deliver a feature-rich web application. Whether you are a cryptocurrency enthusiast or a casual user, the responsive design, intuitive navigation, and real-time data visualization contribute to a seamless and enjoyable user experience. Feel free to explore the codebase and customize the project to meet your specific requirements.
