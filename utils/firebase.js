var admin = require("firebase-admin");

var serviceAccount = require("./donation-app-c7736-firebase-adminsdk-vhucs-18db2d14a3.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
 
})

module.exports.admin = admin