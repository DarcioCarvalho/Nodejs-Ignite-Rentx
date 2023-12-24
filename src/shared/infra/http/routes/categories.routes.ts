import { Router } from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import multer from "multer";

import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { GetCategoryByNameController } from "@modules/cars/useCases/getCategoryByName/GetCategoryByNameController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();
const getCategoryByNameController = new GetCategoryByNameController();

categoriesRoutes.post("/", ensureAuthenticated, ensureAuthenticated, createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.get("/:name", getCategoryByNameController.handle);

categoriesRoutes.post("/import", ensureAuthenticated, ensureAuthenticated, upload.single("file"), importCategoryController.handle);

export { categoriesRoutes };
