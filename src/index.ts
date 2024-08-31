import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from './database/DataSource';
import jogadorRoutes from './routes/JogadorRoutes';
import timeRoutes from './routes/TimeRoutes';
import swaggerDocument from '../swagger/swagger.json';  

const app = express();
app.use(express.json());

// Rotas
app.use('/api', jogadorRoutes);
app.use('/api', timeRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Inicialização do banco de dados
AppDataSource.initialize()
    .then(() => {
        console.log('Banco de dados conectado');
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((error) => console.log('Erro ao conectar ao banco de dados', error));
