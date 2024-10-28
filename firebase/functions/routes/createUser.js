const { db } = require('../firebase'); // Import the Firestore instance


function createUser(app) {
app.post('/createUser', async (req, res) => {
    const { userId, name, email } = req.body;

    // Validate that userId is provided
    if (!userId) {
        return res.status(400).json({
        error: 'invalid-argument',
        message: 'userId is required',
        });
    }

    try {
        // Define the user document structure
        const userDoc = {
        userId,
        name: name || null, // Optional field
        email: email || null, // Optional field
        userConversationAnalysisIds: [], // Initialize as an empty array
        };

        // Add the user document to Firestore in the "users" collection
        await db.collection('users').doc(userId).set(userDoc);

        // Send success response
        res.status(201).json({
        message: 'User successfully created in Firestore',
        user: userDoc,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
        error: 'internal',
        message: 'Unable to create user in Firestore',
        });
    }
    });
}

module.exports = createUser;
