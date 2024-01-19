import dotenv from 'dotenv'
import { createPool, Pool } from 'mysql2/promise';
import { createDatabaseTables } from '../../scripts/generateFakeData';

dotenv.config();

export const pool: Pool = createPool({
  host: process.env.MYSQL_DB_HOST || "localhost",
  user: process.env.MYSQL_DB_USER || "root",
  password: process.env.MYSQL_ROOT_PASSWORD || "Petroleo1524",
  database: process.env.MYSQL_DB_NAME || "hotel",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const checkDatabaseConnection = async () => {
  try {
   
    const connection = await pool.getConnection();
    
    console.log('Conexão bem-sucedida com o banco de dados!');

    if (connection) await createDatabaseTables();

    connection.release();
  } catch (error) {
  
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

checkDatabaseConnection();