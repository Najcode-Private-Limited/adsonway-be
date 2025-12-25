const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger/index');

const app = express();

/* ---------------- Routes imports ---------------- */
const authRoutes = require('./routes/auth');

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

module.exports = app;
