import { Client } from 'pg';

const connect = new Client({
  connectionString: process.env.DATABASE_URL,
});

connect.connect()
  .then(() => console.info('Conectado ao PostgreSQL'))
  .catch((err: Error) => console.error('Erro de conexão com PostgreSQL:', err));

export default connect;