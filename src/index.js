import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import rootReducer from "./store/reducers/rootReducer";
import firebase from "./config/firebase";
import ReactGA from "react-ga";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(firebase, {
      attachAuthIsReady: true,
      useFirestoreForProfile: true,
      userProfile: "users"
    }),
    reduxFirestore(firebase)
  )
);

store.firebaseAuthIsReady.then(() => {
  ReactGA.initialize("UA-53663434-11");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});

serviceWorker.register();
