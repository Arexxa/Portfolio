# Getting Started
A template for react project created with create-react-app. <br />
Bundles with:
1. Tailwind
2. Eslint Airbnb for Javascript

## Requirements
- Node16 (16.15.1)

## Available Scripts
In the project directory, you can run:

### `yarn install`
Project setup

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn lint`
### `yarn lint-fix`

- Code Styling / Linting
- Javascript use [eslint-config-airbnb](https://github.com/airbnb/javascript)

#### Install Prettier (VS Code)
1. Search for [prettier code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) in extensions 
2. Install

#### Make VSCode to auto format on save
1. File > Preferences > settings
2. Edit in settings.json
3. Add the following to settings.json
```
"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[js]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "css.lint.unknownAtRules": "ignore",
  "eslint.alwaysShowStatus": true,
  "editor.formatOnSave": true,
  "eslint.autoFixOnSave": true
```

