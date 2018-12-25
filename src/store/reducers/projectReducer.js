const initState = {
  projects: []
};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      console.log("Created Project", action.project);
      return state;
    case "CREATE_PROJECT_ERROR":
      console.log("Error", action.err);
      return state;
    case "DELETE_PROJECT":
      console.log("Deleted Project", action.docId);
      return state;
    case "DELETE_PROJECT_ERROR":
      console.log("Error", action.err);
      return state;
    case "EDIT_PROJECT":
      console.log("Edited Project", action.docId);
      return state;
    case "EDIT_PROJECT_ERROR":
      console.log("Error", action.err);
      return state;
    default:
      return state;
  }
};

export default projectReducer;
