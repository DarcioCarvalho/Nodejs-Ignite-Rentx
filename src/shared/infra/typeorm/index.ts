import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

export default async (host = "database_ignite"): Promise<Connection> => {

  return getConnectionOptions().then(options => {
    const newOptions = options as IOptions;
    newOptions.host = host;
    return createConnection({
      ...options
    });
  });
}

/*

getConnectionOptions().then(options => {
  const newOptions = options as IOptions;
  newOptions.host = 'database_ignite';
  createConnection({
    ...options
  });
}); */


//createConnection();

/* import { AppDataSource } from "./data-source"

AppDataSource.setOptions({ host: "database_ignite" }).initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.log("Error during Data Source initialization", err)
  })
 */