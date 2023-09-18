/* eslint-disable import/newline-after-import */
/*global beforeAll,describe,it,expect,jest*/
const request = require('supertest');
const bcrypt = require("bcrypt");
const app = require('../app');

jest.mock("bcrypt");
const db = require("../services/auth-service");
jest.mock = require("../config/db")
const userServices = require("../services/auth-service");
// jest.mock("../services/auth-service");

const User = require("../models/user-model");
jest.mock("../models/user-model");
const ApiError = require("../utils/api-error");


function delay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
}

beforeAll(async () => {
  await delay();
});

describe("login", () => {
  it("should return a 401 error if the email or password is invalid",async ()=>{
    
    const response = await request(app).post('/login').send({email:"Invalid_email",password:"password"})
    expect(response.status).toBe(400);

  })
})

/*

describe("login", () => {
  it("should return a 401 error if the email or password is invalid", async () => {
    User.login.mockResolvedValue(null);

    const req = {
      body: { email: "invalid_email@gmail.com", password: "password" },
    };
    const res = {
      body: {},
      json: (object) => {
        this.body = object;
      },
    };
    const next = jest.fn();

    await login(req, res, next);

    expect(res.status).toBe(401);
    expect(next).toHaveBeenCalledWith(
      new ApiError("Incorrect email or password", 401)
    );
  });

  it("should return a 401 error if the password is incorrect", async () => {
    const user = {
      email: "test@example.com",
      password: "correct_password",
    };

    const req = {
      body: {
        email: user.email,
        password: "wrong_password",
      },
    };

    const res = new Response();
    const next = jest.fn();

    bcrypt.compare.mockReturnValue(false);
    await login(req, res, next);

    expect(next).toHaveBeenCalledWith(
      new ApiError("Incorrect email or password", 401)
    );
  });

  it("should return a 200 status code and token and the user data if the email and password are valid", async () => {
    const user = {
      email: "test@gmail.com",
      password: "correct_password",
      name: "test",
      role: "S",
    };
    const req = {
      body: {
        email: user.email,
        password: user.password,
      },
    };

    const res = new Response();
    const next = jest.fn();
    await login(req, res, next);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      token: expect.any(String),
      name: user.name,
      role: user.role,
    });
  });
});

*/
