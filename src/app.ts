import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger/index';

const app = express();

/* ---------------- Routes imports ---------------- */
import authRoutes from './routes/auth';

/* ---------------- Middleware ---------------- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- Swagger Documentation ---------------- */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* ---------------- Routes ---------------- */
app.use('/api/auth', authRoutes);

/* ---------------- Health Check ---------------- */
app.get('/', (_req, res) => {
   return res.status(200).json({ message: 'API is running' });
});

export default app;
