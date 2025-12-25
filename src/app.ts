import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './config/swagger/swagger-output.json';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/users/:id', (req, res) => {
   res.json({ id: req.params.id });
});

app.post('/api/users', (req, res) => {
   res.json(req.body);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (_req, res) => {
   res.send('API is running');
});

export default app;
