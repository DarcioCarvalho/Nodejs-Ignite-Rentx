import { createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

getConnectionOptions().then(options => {
  const newOptions = options as IOptions;
  newOptions.host = 'database_ignite';
  createConnection({
    ...options
  });
});


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