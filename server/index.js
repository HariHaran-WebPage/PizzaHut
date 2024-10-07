// Import necessary modules
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { pizzaRouter } from "./routes/pizza.js";

// Initialize the app and load environment variables
const app = express();
dotenv.config();

// Middleware
app.use(cors()); // Third-party middleware for CORS
app.use(express.json()); // Middleware to parse JSON

// Get environment variables
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set
const MONGO_URL = process.env.MONGO_URL; // MongoDB connection string

// MongoDB connection
async function createConnection() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("MongoDB is connected successfully.");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process if MongoDB connection fails
  }
}

// Create MongoDB client and export it for use in routes
export const client = await createConnection();

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.use("/users", userRouter);
app.use("/pizzas", pizzaRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
