const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URL) {
            console.error("MongoDB connection failed", { message: "MONGO_URL is not set in environment (.env)" });
            return;
        }
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed", { message: error.message });
    }
};

module.exports = connectDB;