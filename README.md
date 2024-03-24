# GitHub Repo Finder

This project let users to search a github user and display his/her repositories in a list. Once the user find the username searched, he/she can filter the list of their repositories by name or programming language to find the ones is interested in. 

Clicking on the repository resulted will take the user to GitHub to explore each of the repositories found and the user profile.


## 🚀 How to run the project?

*Step 1: Clone the repository*

```bash
git clone https://github.com/clmirabent/repo-finder
```

*Step 2: Run 'npm install' in the base folder to install the dependencies*

```bash
npm install
```
*Step 3: Run in the terminal to start the server*

```bash
npm run dev
```


## 🔖 How to run the test suite

Run in  the terminal:

```bash
npm run test
```
## 🔖 How to run the Storybook for components

Run in  the terminal:
```bash
npm run storybook
```

## Built with:

- React JS 
- Typescript
- MaterialUI
- GraphQL
- graphql.js: GitHub GraphQL API client for browsers and Node
- React-Hot-Toast
- Storybook
- Infinite scroll library
- Vitest
- Testing library


## 💡 Future improvements

- Improve the error handling by providing more informative error messages
- Integrate OAuth for user authentication 
- Add the functionality to sort by last updated and name
- Add more test for the components:
    - `RepoFilterComponent`:
        - Whenever no language only all language option is available
        - No need to test SearchBar used here since it is already test 
        - No need to test selector since 3rd Party library
    - `InfiniteScroll`:
        - No need to test InfiniteScroll component used there since it is 3rd Party Library
- Add E2E test
