import ReactGA from "react-ga";
import M from "materialize-css";

const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        ReactGA.event({
          category: "User",
          action: "Signed In"
        });
        let user = firebase.auth().currentUser;
        if (user && !user.emailVerified) {
          user.sendEmailVerification();
          M.toast({ html: "Verification email sent" });
        }
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
        switch (err.code) {
          case "auth/invalid-email":
            M.toast({ html: "Invalid email", classes: "red darken-1" });
            break;
          case "auth/weak-password":
            M.toast({ html: "Weak password", classes: "red darken-1" });
            break;
          case "auth/wrong-password":
            M.toast({ html: "Wrong password", classes: "red darken-1" });
            break;
          case "auth/user-not-found":
            M.toast({
              html: "Account not found",
              classes: "red darken-1"
            });
            break;
          default:
            console.log(err);
            M.toast({ html: `${err}`, classes: "red darken-1" });
            break;
        }
      });
  };
};

export default signIn;

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    ReactGA.event({
      category: "User",
      action: "Signed Out"
    });
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        if (newUser.lastName && newUser.firstName) {
          return firestore
            .collection("users")
            .doc(resp.user.uid)
            .set({
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              initials: newUser.firstName[0] + newUser.lastName[0]
            });
        } else {
          return firestore
            .collection("users")
            .doc(resp.user.uid)
            .set({
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              initials: newUser.firstName[0] + newUser.firstName[1]
            });
        }
      })
      .then(() => {
        ReactGA.event({
          category: "User",
          action: "Signed Up"
        });
        let user = firebase.auth().currentUser;
        if (user && !user.emailVerified) user.sendEmailVerification();
        dispatch({ type: "SIGNUP_SUCCESS" });
        M.toast({ html: "Verification email sent" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
        switch (err.code) {
          case "auth/invalid-email":
            M.toast({ html: "Invalid email", classes: "red darken-1" });
            break;
          case "auth/weak-password":
            M.toast({ html: "Weak password", classes: "red darken-1" });
            break;
          default:
            M.toast({
              html: `${err}`,
              classes: "red darken-1"
            });
            break;
        }
      });
  };
};

export const forgotPassword = user => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .sendPasswordResetEmail(user)
      .then(() => {
        dispatch({ type: "RESET_SUCCESS" });
        M.toast({ html: "Password Reset email sent" });
      })
      .catch(err => {
        dispatch({ type: "RESET_ERROR", err });
        M.toast({
          html: "Password Reset email not sent",
          classes: "red darken-1"
        });
      });
  };
};

export const deleteAccount = (user, creds) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    var userAuth = firebase.auth().currentUser;
    var credentials = firebase.auth.EmailAuthProvider.credential(
      userAuth.email,
      creds.password
    );
    userAuth
      .reauthenticateAndRetrieveDataWithCredential(credentials)
      .then(() => {
        console.log("Reauthenticated");
        userAuth.delete();
      })
      .then(() => {
        console.log("Deleted", userAuth.email);
        dispatch({ type: "DELETEAC_SUCCESS" });
        M.toast({ html: "Account deleted" });
      })
      .catch(err => {
        dispatch({ type: "DELETEAC_ERROR", err });
        switch (err.code) {
          case "auth/wrong-password":
            M.toast({
              html: "Wrong password",
              classes: "red darken-1"
            });
            break;
          default:
            console.log(err);
            M.toast({ html: `${err}`, classes: "red darken-1" });
            break;
        }
      });
  };
};
