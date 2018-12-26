const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
const _firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
_firestore.settings(settings);

const createNotification = notification => {
  return admin
    .firestore()
    .collection("notifications")
    .add(notification)
    .then(doc => console.log("Notification added", doc));
};

exports.projectCreated = functions.firestore
  .document("projects/{projectId}")
  .onCreate(doc => {
    const project = doc.data();
    const notification = {
      content: "added a new post",
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    };
    return createNotification(notification);
  });

exports.projectDeleted = functions.firestore
  .document("projects/{projectId}")
  .onDelete((snap, context) => {
    const prevDoc = snap.data();
    console.log(prevDoc);
    const notification = {
      content: "deleted a post",
      user: `${prevDoc.authorFirstName} ${prevDoc.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    };
    return createNotification(notification);
  });

exports.projectEdited = functions.firestore
  .document("projects/{projectId}")
  .onUpdate((change, context) => {
    const newDoc = change.after.data();
    console.log(newDoc);
    const notification = {
      content: "edited a post",
      user: `${newDoc.authorFirstName} ${newDoc.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    };
    return createNotification(notification);
  });

exports.userDocCreated = functions.firestore
  .document("users/{userId}")
  .onCreate(doc => {
    const userDoc = doc.data();
    const notification = {
      content: "joined the team",
      user: `${userDoc.firstName} ${userDoc.lastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    };
    return createNotification(notification);
  });

exports.userCreated = functions.auth.user().onCreate(user => {
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .get()
    .then(doc => {
      const newUser = doc.data();
      console.log(newUser);
    });
});

exports.userDeleted = functions.auth.user().onDelete(user => {
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .delete()
    .then(doc => {
      console.log(`User ${user.displayName} deleted`);
    });
});

exports.userDocDeleted = functions.firestore
  .document("users/{userId}")
  .onDelete((snap, context) => {
    const userDoc = snap.data();
    console.log(userDoc);
    const notification = {
      content: "left the team",
      user: `${userDoc.firstName} ${userDoc.lastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    };
    return createNotification(notification);
  });
