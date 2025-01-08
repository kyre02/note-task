import mongoose from 'mongoose';
import env from 'dotenv';

env.config();
export const connectDb = async () => {
  const db = process.env.DATABASE_URI;
  
  if (!db) {
    console.error("Database URI is not provided");
    process.exit(1);
  }
  await mongoose.connect(db)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to database: ", error.message);
  })
}