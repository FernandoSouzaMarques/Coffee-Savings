import { Client, Pool } from "pg";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client
  .connect()
  .then(() => console.info("Conectado ao PostgreSQL"))
  .catch((err: Error) => console.error("Erro de conexão com PostgreSQL:", err));

const trx = new Pool({
  connectionString: process.env.DATABASE_URL,
});

trx.connect();

export { client, trx };
