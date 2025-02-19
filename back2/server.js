import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import taxRoutes from "./routes/taxRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydata",{
      useNewUrlParser: true,
      useUnifiedTopology: true
    
    });
    console.log("wow , MongoDB Connected");
  } catch (error) {
    console.error("Bad, MongoDB Connection Error:", error);
    process.exit(1); 
  }
};

connectDB();

app.use("/api/tax", taxRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Wow, Server is  running on port ${PORT}`));
