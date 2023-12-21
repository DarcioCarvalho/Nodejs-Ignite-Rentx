import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import { AppError } from "./errors/AppError";
import swaggerFile from "./swagger.json";
import "./database";
import "./shared/container";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  });
});

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
