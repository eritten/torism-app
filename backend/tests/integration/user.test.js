const app = require("../../index");
const client = require("supertest")(app);

describe("User specific endpoints", () => {
    const data = { email: "elton@gmail.com", password: "Gyau12356$", userType: "torist" };
    test('should return 201 if account is created successfully', async () => {
        const response = await client.post("/auth/register")
            .send(data); // Await the request
        expect(response.status).toBe(201); // Assert the status code

    });

    test("return 200 code when user is authenticated", () => {
        const response = client.post("/auth/login")
            .send(data);
        expect(response.status).toBe(200);
    });

});