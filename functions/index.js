const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: `${functions.config().smtp.server}`,
  port: 465,
  secure: true,
  auth: {
    user: `${functions.config().smtp.user}`,
    pass: `${functions.config().smtp.pass}`
  }
});

admin.initializeApp(functions.config().firebase);
const _firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
_firestore.settings(settings);

const createNotification = notification => {
  return admin
    .firestore()
    .collection("notifications")
    .add(notification)
    .then(doc => {
      console.log("Notification added", doc);
    });
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
    let mailOptions = {
      from: `${functions.config().mail.from}`,
      to: `${functions.config().mail.to}`,
      subject: `React Planner: ${notification.user} ${notification.content}`,
      html: `<style>@import url('https://fonts.googleapis.com/css?family=Pacifico');h2{font-family:'Pacifico',sans-serif;text-transform:uppercase;margin:0;}</style><h2 style='text-transform:uppercase;margin:0'>React Planner</h2><hr><p><strong>User</strong>: ${
        notification.user
      }</p><p><strong>Title</strong>: ${
        project.title
      }</p><p><strong>Content</strong>: ${
        project.content
      }.</p><p>Regards,<br><strong>React Planner</strong><br>plan.ghosh.pro</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
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
    let mailOptions = {
      from: `${functions.config().mail.from}`,
      to: `${functions.config().mail.to}`,
      subject: `React Planner: ${notification.user} ${notification.content}`,
      html: `<style>@import url('https://fonts.googleapis.com/css?family=Pacifico');h2{font-family:'Pacifico',sans-serif;text-transform:uppercase;margin:0;}</style><h2 style='text-transform:uppercase;margin:0'>React Planner</h2><hr><p><strong>User</strong>: ${
        notification.user
      }</p><p><strong>Title</strong>: ${
        prevDoc.title
      }</p><p><strong>Content</strong>: ${
        prevDoc.content
      }.</p><p>Regards,<br><strong>React Planner</strong><br>plan.ghosh.pro</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
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
    let mailOptions = {
      from: `${functions.config().mail.from}`,
      to: `${functions.config().mail.to}`,
      subject: `React Planner: ${notification.user} ${notification.content}`,
      html: `<style>@import url('https://fonts.googleapis.com/css?family=Pacifico');h2{font-family:'Pacifico',sans-serif;text-transform:uppercase;margin:0;}</style><h2 style='text-transform:uppercase;margin:0'>React Planner</h2><hr><p><strong>User</strong>: ${
        notification.user
      }</p><p><strong>Title</strong>: ${
        newDoc.title
      }</p><p><strong>Content</strong>: ${
        newDoc.content
      }.</p><p>Regards,<br><strong>React Planner</strong><br>plan.ghosh.pro</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
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
    let mailOptions = {
      from: `${functions.config().mail.from}`,
      to: `${functions.config().mail.to}`,
      subject: `React Planner: ${notification.user} ${notification.content}`,
      html: `<style>@import url('https://fonts.googleapis.com/css?family=Pacifico');h2{font-family:'Pacifico',sans-serif;text-transform:uppercase;margin:0;}</style><h2 style='text-transform:uppercase;margin:0'>React Planner</h2><hr><p>New user just joined React Planner.<br><strong>User</strong>: ${
        notification.user
      }</p><p>Regards,<br><strong>React Planner</strong><br>plan.ghosh.pro</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
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
    let mailOptions = {
      from: `${functions.config().mail.from}`,
      to: `${functions.config().mail.to}`,
      subject: `React Planner: ${notification.user} ${notification.content}`,
      html: `<style>@import url('https://fonts.googleapis.com/css?family=Pacifico');h2{font-family:'Pacifico',sans-serif;text-transform:uppercase;margin:0;}</style><h2 style='text-transform:uppercase;margin:0'>React Planner</h2><hr><p>Existing user just left React Planner.<br><strong>User</strong>: ${
        notification.user
      }</p><p>Regards,<br><strong>React Planner</strong><br>plan.ghosh.pro</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
    return createNotification(notification);
  });
