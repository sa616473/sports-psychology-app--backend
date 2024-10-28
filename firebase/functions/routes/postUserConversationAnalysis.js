const { db } = require('../firebase');
const admin = require("firebase-admin");

// API to add sentiment analysis data to Firestore

function postUserConversationAnalysis(app) {
app.post('/addUserConversationAnalysis', async (req, res) => {
  const { userId, analysisData } = req.body;

  // Validate userId
  if (!userId) {
    return res.status(400).json({
      error: 'invalid-argument',
      message: 'userId is required',
    });
  }

  // Validate analysisData structure
  const { score, comparative, calculation, tokens, positive, negative, timestamp } = analysisData;
  if (
    typeof score !== 'number' ||
    typeof comparative !== 'number' ||
    !Array.isArray(calculation) ||
    !Array.isArray(tokens) ||
    !Array.isArray(positive) ||
    !Array.isArray(negative) ||
    !timestamp
  ) {
    return res.status(400).json({
      error: 'invalid-data',
      message: 'Invalid analysisData format',
    });
  }

  try {
    // Add analysisData to Firestore under the user_conversation_analysis collection
    const docRef = await db.collection('user_conversation_analysis').add({
      userId,
      score,
      comparative,
      calculation,
      tokens,
      positive,
      negative,
      timestamp,
    });

    // Update the user's document with the new conversation analysis ID
    await db.collection('users').doc(userId).update({
        userConversationAnalysisIds: admin.firestore.FieldValue.arrayUnion(docRef.id),
    });
    // Send success response
    res.status(200).json({
      message: 'Data successfully added to Firestore',
      documentId: docRef.id,
    });
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({
      error: 'internal',
      message: 'Unable to add data to Firestore',
    });
  }
});
}
module.exports = postUserConversationAnalysis;
