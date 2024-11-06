# Pokedex Project

### "Pokedex"
This project is a Pokedex application that leverages a public PokeAPI to display a list of Pokémon, allow users to view details for each Pokémon, and filter and sort the list based on type. The app is built using Redux Toolkit for state management, ensuring a smooth user experience with infinite loading, search, and filtering functionality.

***************************

## Deploy ##

* [https://massaracsh7.github.io/pokedex/](https://massaracsh7.github.io/pokedex/)

***************************

## About the Project

- **Home Page**
  - **Pokémon List:** Search queries are saved in the Redux store.
  - **Search by Name:** Users can search for specific Pokémon by entering a name.
  - **Filter by Type:** Users can filter the list based on Pokémon types (e.g., Fire, Water, Ground).

- **Pokémon Detail Page:** 
   - **Detailed Information:** When a Pokémon is selected, a dedicated page displays comprehensive information, including name, weight, height, abilities, photo, and base stats.
   
- **State Management with Redux:**
  - **Favorites Management:** Users can add Pokémon to a favorites list, which is stored in Redux and displayed on a separate page.
  - **Remove from Favorites:** Allows users to remove Pokémon from their favorites list, with the state updated in real-time across the application.


## Stack
- **React** 
- **TypeScript**
- **Vite**
- **ESLint**
- **Prettier**

## Setting up

1. Clone this repo: 
   ```bash
   $ git clone https://github.com/massaracsh7/pokedex.git

2. Go to the downloaded folder:

   ```bash
   $ cd pokedex

3. Install dependencies:

   ```bash
   $ npm install

4. Run the app in the development mode:

   ```bash
   $ npm run dev

5. Open http://localhost:5173 to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Available Scripts

- **npm run build**: Script to build the app for production to the build folder. Your app is ready to be deployed!
- **npm run preview**: Script to start a local web server that serves the built solution for previewing.
- **npm run lint**: Script to launch the ESLint runner in the interactive watch mode.
- **npm run format**: Script to format and make your code nice and readable using Prettier.
- **npm run prepare:** Script to launch Husky installation, it's launched during the global installation.