import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";
import "./database";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

/* app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationsRoutes);
 */

/* app.get("/", (request, response) => {
  return response.json({ message: "Hello World!" });
});

app.post("/course", (request, response) => {
  const { name } = request.body;
  return response.json({ name });
}); */

app.listen(3333, () => console.log("Server is running!"));
