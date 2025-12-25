import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectToMongoDB } from './config/mongo_db';

const PORT = process.env.PORT || 5000;

/* ---------------- Database Connection Function ---------------- */
(async () => {
   await connectToMongoDB();
})();

/* ---------------- Server Running Function ---------------- */
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
