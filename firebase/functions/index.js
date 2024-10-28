const express = require("express");
const app = express();
const bodyparser = require('body-parser');
const getUserById = require("./routes/getUserById");
const postUserConversationAnalysis = require("./routes/postUserConversationAnalysis");
const createUser = require("./routes/createUser");
const getConversationsByIds = require("./routes/getConversationsByIds")
const cors = require('cors');
const functions = require('firebase-functions');


app.use(bodyparser.json()); // Middleware to parse JSON bodies
app.use(cors({ origin: true})); // Replace with your frontend URL


getUserById(app)
postUserConversationAnalysis(app)
createUser(app)
getConversationsByIds(app)

app.get('/', (req, res) => {
  console.log(req.body)
  res.send('Hello World from express!');
});

// Start the Express server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

exports.api = functions.https.onRequest(app);

