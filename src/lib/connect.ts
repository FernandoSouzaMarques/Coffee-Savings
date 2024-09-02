import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => console.info('Conectado ao PostgreSQL'))
  .catch((err: Error) => console.error('Erro de conexão com PostgreSQL:', err));

export default client;