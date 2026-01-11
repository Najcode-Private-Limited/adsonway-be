const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger/index');

const app = express();

/* ---------------- Routes imports ---------------- */
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const agentRoutes = require('./routes/agent');

/* ---------------- Middleware ---------------- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- Swagger Documentation ---------------- */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* ---------------- Routes ---------------- */
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/payment-method', require('./routes/payment_method'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/user', require('./routes/user'));
app.use('/api/top-up-request', require('./routes/top_up_request'));

/* ---------------- Health Check ---------------- */
app.get('/', (_req, res) => {
   return res.status(200).json({ message: 'API is running' });
});

module.exports = app;
