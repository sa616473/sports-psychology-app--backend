var admin = require("firebase-admin");

var serviceAccount = require("./sports-psychology-73806-firebase-adminsdk-xma1l-83c125c3f3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Initialize Firestore and Auth services
const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
