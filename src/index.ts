import express, { Request, Response } from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import flash from "express-flash";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import session from "express-session";

import mongoose from "mongoose";

import router from "./router";

dotenv.config();

const app = express();

// Use express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-session-secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Parse cookies
app.use(flash());

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Use express-ejs-layouts middleware
app.use(ejsLayouts);

// Set the layout file (layout.ejs)
app.set("layout", "layout");

// Serve static files from the 'public' directory
app.use(express.static("public"));

app.use(express.json());

const MONGODB_URI = "mongodb://127.0.0.1:27017/Notez";

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
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

app.get("/", (req: Request, res: Response) => {
  res.render("index", {
    title: "Home",
    message: "Hello, TypeScript with Express and EJS!",
  });
});

// Use the router index for other paths
app.use("/", router);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
