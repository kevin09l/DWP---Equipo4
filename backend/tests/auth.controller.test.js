import { jest } from '@jest/globals';
import request from "supertest";
import app from "../app.js";
import * as authService from "../services/auth.service.js";

jest.mock("../services/auth.service.js");

describe("Auth routes", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("POST /api/auth/register", () => {
    it("returns 201 on success", async () => {
      authService.register.mockResolvedValue(99);
      const res = await request(app).post("/api/auth/register").send({
        name: "n",
        email: "e",
        address: "a",
        water_meter: "w",
        password: "p"
      });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body.data).toHaveProperty("userId", 99);
    });

    it("propagates service errors", async () => {
      authService.register.mockRejectedValue(new Error("fail"));
      const res = await request(app).post("/api/auth/register").send({});
      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
    });
  });

  describe("POST /api/auth/login", () => {
    it("sets cookie and returns tokens", async () => {
      authService.login.mockResolvedValue({
        accessToken: "a",
        refreshToken: "r",
        user: { id: 1 }
      });
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "e", password: "p" });
      expect(res.status).toBe(200);
      expect(res.headers['set-cookie']).toBeDefined();
      expect(res.body.data.accessToken).toBe("a");
    });
  });
});
