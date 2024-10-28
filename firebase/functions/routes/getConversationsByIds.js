const { db } = require('../firebase');


function getConversationsByIds(app) {

    app.post('/getConversationsByIds', async (req, res) => {
        const { conversationIds } = req.body;
      
        // Validate that conversationIds is provided and is an array
        if (!Array.isArray(conversationIds) || conversationIds.length === 0) {
          return res.status(400).json({
            error: 'invalid-argument',
            message: 'conversationIds must be a non-empty array',
          });
        }
      
        try {
          // Fetch each conversation document by ID
          const conversationPromises = conversationIds.map((id) =>
            db.collection('user_conversation_analysis').doc(id).get()
          );
      
          // Resolve all promises to get conversation data
          const conversationSnapshots = await Promise.all(conversationPromises);
      
          // Filter out any non-existing documents and format the results
          const conversations = conversationSnapshots
            .filter((doc) => doc.exists)
            .map((doc) => ({ id: doc.id, ...doc.data() }));
      
          // Send response with the conversations data
          res.status(200).json({
            message: 'Conversations successfully retrieved',
            conversations,
          });
        } catch (error) {
          console.error('Error fetching conversations:', error);
          res.status(500).json({
            error: 'internal',
            message: 'Unable to retrieve conversations from Firestore',
          });
        }
      });

}

module.exports = getConversationsByIds;
