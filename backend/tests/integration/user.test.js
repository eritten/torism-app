const app = require("../../index");
const client = require("supertest")(app);

describe("User specific endpoints", () => {
    test('should return 201 if account is created successfully', async () => {
        const data = { email: "kwame@gmail.com", password: "Gyau12356$", userType: "torist" };
        const response = await client.post("/api/register")
            .send(data); // Await the request
        console.log("code:" + response.text)
        expect(response.status).toBe(201); // Assert the status code
    });
    test("return 200 status is the user is authenticated", () => {
        
    });
});
