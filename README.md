# React Planner

[![build passing](https://img.shields.io/appveyor/ci/sudiptog81/react-planner.svg?logo=appveyor&style=flat-square)](https://github.com/sudiptog81/react-planner) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/sudiptog81/react-planner/issues) [![Dependency Status](https://img.shields.io/david/sudiptog81/react-planner.svg?style=flat-square)](https://david-dm.org/sudiptog81/react-planner) [![devDependencies Status](https://img.shields.io/david/dev/sudiptog81/react-planner.svg?style=flat-square)](https://david-dm.org/sudiptog81/react-planner?type=dev)

> Planning app for teams. This React app uses Materialize, React Router, Redux, Firebase, Thunk, Google Analytics and Moment.

## Quick Start

### Configuration

Create a new Firebase project in your Firebase console. Enable E-Mail and Password Authentication from the Authentication section.

Enable Cloud Firestore for the project. Copy the script from the console and edit `temp-firebase.js` in `src/config` according to the format given below, and then rename it to `firebase.js`.

```js
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "xxxxx",
  authDomain: "xxxxx.firebaseapp.com",
  databaseURL: "https://xxxxx.firebaseio.com",
  projectId: "xxxxx",
  storageBucket: "xxxxx.appspot.com",
  messagingSenderId: "xxxxx"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
```

> Edit the CSS and JSX files to customize the colours.

Enable Cloud Functions and intiialize the Firebase project in the cloned directory.

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialise the Firebase project
firebase init
# Enter build when asked about public directory
# Enable functions and hosting
# Say yes to Rewrite URLs prompt
```

Deploy the functions in order for actions in Live Development Server to work correctly by running `firebase deploy --only functions`.

### Running the app

For development, you can make use of the Live Development Server.

```bash
# Install Dependencies
npm install

# Start a Live Development Server
npm start
```

For production, run the following commands in a terminal.

```bash
# Build the React app
npm run build

# Deploy the app
firebase deploy
```

## Author

### Sudipto Ghosh

Portfolio: [sudipto.ghosh.pro](https://sudipto.ghosh.pro)

This app is provided under the MIT License.
