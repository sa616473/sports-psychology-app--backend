const {db} = require("../firebase");

// Define the API endpoint to get a user by ID

function getUserById(app) {
    app.post("/getUserById", async (req, res) => {
    const {userId} = req.body;

    if (!userId) {
        return res.status(400).json({
        error: "invalid-argument",
        message: "The request must contain a userId",
        });
    }

    try {
        // Fetch the user document from Firestore
        const userRef = db.collection("users").doc(userId);
        const userDoc = await userRef.get();

        // Check if the user document exists
        if (!userDoc.exists) {
        return res.status(404).json({
            error: "not-found",
            message: `No user found with ID: ${userId}`,
        });
        }

        // Return the user data
        res.status(200).json({user: userDoc.data()});
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
        error: "internal",
        message: "Unable to fetch user data",
        });
    }
    });
};

module.exports = getUserById;
