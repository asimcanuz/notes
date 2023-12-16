import mongoose from "mongoose";
const MONGODB_URI = "mongodb://127.0.0.1:27017/Notez";

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
console.log("aloo");
db.on('connecting', () => {
    console.log('Connecting to MongoDB...');
});

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

export default db;
