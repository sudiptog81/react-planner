import ReactGA from "react-ga";
const createProject = project => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async call to the database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("projects")
      .add({
        ...project,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId,
        timestamp: new Date()
      })
      .then(() => {
        dispatch({ type: "CREATE_PROJECT", project });
        ReactGA.event({
          category: "Post",
          action: "Created Post"
        });
      })
      .catch(err => {
        dispatch({ type: "CREATE_PROJECT_ERROR", err });
      });
  };
};

export const deleteProject = docId => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async call to the database
    const firestore = getFirestore();
    firestore
      .collection("projects")
      .doc(docId)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_PROJECT", docId });
        ReactGA.event({
          category: "Post",
          action: "Deleted Post"
        });
      })
      .catch(err => {
        dispatch({ type: "DELETE_PROJECT_ERROR", err });
      });
  };
};

export const editProject = (docId, project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async call to the database
    const firestore = getFirestore();
    firestore
      .collection("projects")
      .doc(docId)
      .update(project)
      .then(() => {
        dispatch({ type: "EDIT_PROJECT", docId });
        ReactGA.event({
          category: "Post",
          action: "Edited Post"
        });
      })
      .catch(err => {
        dispatch({ type: "EDIT_PROJECT_ERROR", err });
      });
  };
};

export default createProject;
