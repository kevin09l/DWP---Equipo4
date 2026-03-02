import { jest } from '@jest/globals';
import * as authService from "../services/auth.service.js";
import * as authModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

jest.mock("../models/user.model.js");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("Auth service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("throws if required fields are missing", async () => {
      await expect(authService.register({})).rejects.toBeInstanceOf(ApiError);
    });

    it("throws when email already exists", async () => {
      authModel.findByEmailOrMeter.mockResolvedValue({ email: "a@b.com" });
      await expect(
        authService.register({
          name: "foo",
          email: "a@b.com",
          address: "x",
          water_meter: "123",
          password: "pwd"
        })
      ).rejects.toThrow(/correo/i);
    });

    it("returns id when registration succeeds", async () => {
      authModel.findByEmailOrMeter.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashed");
      authModel.createUser.mockResolvedValue(42);

      const id = await authService.register({
        name: "foo",
        email: "a@b.com",
        address: "x",
        water_meter: "123",
        password: "pwd"
      });
      expect(id).toBe(42);
    });
  });

  describe("login", () => {
    const fakeUser = { id: 1, password: "hash", role: "user", is_active: true };
    it("rejects invalid credentials", async () => {
      authModel.findByEmail.mockResolvedValue(null);
      await expect(authService.login("x", "y")).rejects.toBeInstanceOf(ApiError);

      authModel.findByEmail.mockResolvedValue(fakeUser);
      bcrypt.compare.mockResolvedValue(false);
      await expect(authService.login("x", "y")).rejects.toBeInstanceOf(ApiError);
    });

    it("rejects disabled user", async () => {
      authModel.findByEmail.mockResolvedValue({ ...fakeUser, is_active: false });
      bcrypt.compare.mockResolvedValue(true);
      await expect(authService.login("x", "y")).rejects.toBeInstanceOf(ApiError);
    });

    it("returns tokens and user for valid login", async () => {
      authModel.findByEmail.mockResolvedValue(fakeUser);
      bcrypt.compare.mockResolvedValue(true);
      process.env.JWT_ACCESS_SECRET = "a";
      process.env.JWT_REFRESH_SECRET = "b";
      process.env.ACCESS_EXPIRES = "1h";
      process.env.REFRESH_EXPIRES = "7d";
      jwt.sign.mockReturnValue("token");
      authModel.saveRefreshToken.mockResolvedValue();

      const result = await authService.login("x", "y");
      expect(result.accessToken).toBe("token");
      expect(result.refreshToken).toBe("token");
      expect(result.user).toHaveProperty("id", fakeUser.id);
    });
  });
});
