import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

export const connectToMongoDB = async () => {
   try {
      const connection = await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB', connection.connection.host);
   } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
   }
};
