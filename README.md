# [Pokedex](https://pokedex-abbas.vercel.app/)

Explore the world of Pokemon with the Pokedex App! This application leverages the [Pokeapi](https://pokeapi.co/) to fetch information about various Pokemon species. With features like pagination, a search bar, and individual Pokemon profiles, you can seamlessly navigate through the Pokemon universe. The app is built using React, Axios for API requests, React Router DOM for navigation, and styled with Tailwind CSS for a visually appealing experience.

## Features:

- **Fetch Pokemon Data:**
  - Utilizes the PokeAPI and `axios` to fetch data about Pokemon, including their names, types, and images.

- **Pagination:**
  - Navigate through different pages to explore a vast array of Pokemon species.

- **Search Pokemon:**
  - Not able to find your favourite pokemon. Use the search bar to find the Pokemon by name. The app dynamically updates the displayed Pokemon based on your search query.

- **React Router for Navigation:**
  - Uses `react-router-dom` for seamless navigation and to manage different views within the app.

- **Tailwind CSS Styling:**
  - The application is styled using `tailwind-css`, providing a clean and visually appealing interface.


## Getting Started

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/AbbasRuder/Pokedex.git
cd Pokedex
npm install
```

Then, start the development server:

```bash
npm run dev
```

The app will be available at http://localhost:5173.


## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


