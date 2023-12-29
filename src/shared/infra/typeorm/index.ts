import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = "database_ignite"): Promise<Connection> => {

  return getConnectionOptions().then(options => {

    return createConnection(
      Object.assign(options, {
        host: process.env.NODE_ENV === "test" ? "localhost" : host,
        database:
          process.env.NODE_ENV === "test"
            ? "rentx_test"
            : options.database
      })
    );

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