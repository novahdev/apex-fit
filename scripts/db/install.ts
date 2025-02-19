import { Pool } from 'pg';
import { getSchema } from './get-schema';

const run = async () => {
    process.loadEnvFile(".env");
    const schemaBase = await getSchema({ test: true });
    const poll = new Pool();
    await poll.query(schemaBase);
    return;
}

run()
.then(() => {
    console.log("Base de datos instalada correctamente");
    process.exit(0);
})
.catch((err) => {
    console.error("Error al instalar la base de datos", err.message);
    process.exit(1);
});