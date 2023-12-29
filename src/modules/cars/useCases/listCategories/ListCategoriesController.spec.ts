import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("List Categories Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS (id, name, email, password, "isAdmin", driver_license, created_at)
    values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'XXXXXX', 'now()')
    `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });


  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions")
      .send({
        email: "admin@rentx.com.br",
        password: "admin"
      });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category 01 Supertest",
        description: "Category 01 Supertest"
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    await request(app)
      .post("/categories")
      .send({
        name: "Category 02 Supertest",
        description: "Category 02 Supertest"
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[1].name).toEqual("Category 02 Supertest");

  });


});