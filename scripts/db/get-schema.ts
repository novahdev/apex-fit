import { createReadStream, readFileSync } from "node:fs";
import { join } from "path";
import * as fastCSV from 'fast-csv';
import { hash } from "argon2";

interface Row {
    [key: string]: string | number;
}

async function convertCsvToJson(rutaCsv: string, delimiter?: "," | ";"): Promise<Row[]> {
    const resultados: Row[] = [];

    const leerCsv = new Promise<void>((resolve, reject) => {
        createReadStream(rutaCsv)
        .pipe(fastCSV.parse({ headers: true, delimiter }))
        .on('data', (row: Row) => resultados.push(row) )
        .on('end', () => resolve())
        .on('error', (error) => reject(error));
    });

    await leerCsv;

    return resultados;
}

export const getSchema = async (config?: { onlySchema?: boolean, test?: boolean }) => {
    let schema = readFileSync(join('data', 'schema.postgres.sql'), 'utf8').toString();
    
    if (config.onlySchema) {
        return schema;
    }
    
    // Países
    schema += "\n\n-- Países\n";
    const countries = await convertCsvToJson(join('data', 'csv/countries.csv'), ",");
    countries.forEach(country => {
        if ((country["iso2"] as string).length > 2){
            console.log(country)
        }
        schema += `INSERT INTO data_countries (code, name, phone_code) VALUES ('${country["iso2"]}', '${country["name"]}', '${country.phone_code}');\n`;
    });

    // Departamentos
    schema += "\n\n-- Departamentos\n";
    const states = await convertCsvToJson(join('data', 'csv/co-location-departments.csv'), ";");
    states.forEach(state => {
        schema += `INSERT INTO data_countries_states (code, name, country) VALUES ('${state["code"]}', '${state["name"]}', 'CO');\n`;
    });

    // Ciudades
    schema += "\n\n-- Ciudades\n";
    const cities = await convertCsvToJson(join('data', 'csv/co-location-cities.csv'), ";");
    cities.forEach(city => {
        schema += `INSERT INTO data_countries_cities (code, name, state_code) VALUES ('${city["code"]}', '${city["name"]}', '${(city["code"] as string).substring(0, 2)}');\n`;
    });

    if (config.test){
        schema += "\n\n-- Usuarios de prueba\n";
        const users = await convertCsvToJson(join('data', 'csv/users-test.csv'), ";");
        await Promise.all(users.map(async user => {
            const values = {
                id: `'${crypto.randomUUID()}'`,
                username: `'${user.username}'`,
                status: "'ACTIVE'",
                alias: `'${user.alias}'`,
                email: `'${user.email}'`,
                password: `'${await hash(user.password as string)}'`,
                role: `'${user.role}'`,
                name: `'${user.name}'`,
                last_name: `'${user.lastName}'`,
                sex: `'${user.sex}'`,
                weight: user.weight,
                tall: user.tall,
                birthdate:`'${user.birthdate}'`,
                category: `'${user.category}'`,
                nationality: "'CO'",
                city: "'95001'",
                state: "'05'",
                country: "'CO'",
            }
            schema += `INSERT INTO users (${Object.keys(values).join(", ")}) VALUES(${Object.values(values).join(', ')});\n`;
        }));
    }

    return schema;
}
