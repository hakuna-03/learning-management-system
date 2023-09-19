/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/newline-after-import */
/*global beforeAll,afterAll,describe,it,expect,jest*/


jest.mock("bcrypt");
const bcrypt = require("bcrypt");
const mockBcrypt = jest.spyOn(bcrypt, "compare");

const services = require("../../services/auth-service");
console.log(services);
// const { login } = require("../../services/auth-service");

jest.mock("../../models/user-model");
const User = require("../../models/user-model");
const mockLoginDB = jest.spyOn(User, "login");

const ApiError = require("../../utils/api-error");

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
  it("should return a 401 error if the email or password is incorrect", async () => {
    const res = {};
    const req = {};
    const next = jest.fn();

    req.body = {
      email: "does_not_exist_email@gmail.com",
      password: "password",
    };
    const loginMockMethod = jest.fn(async () => null);
    mockLoginDB.mockImplementation(loginMockMethod);
    await services.login(req, res, next);
    expect(mockLoginDB).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(
      new ApiError("Incorrect email or password", 401)
    );
  });

  it("should return a 401 stauts code if the password is incorrect", async () => {
    const res = {};
    const req = {
      body: {
        email: "test@gmail.com",
        password: "invalid_password",
      },
    };
    const next = jest.fn();

    const loginMockMethod = jest.fn(async () => {
      const data = {
        email: "test@gmail.com",
        password: "password",
      };
      return data;
    });
    mockLoginDB.mockImplementation(loginMockMethod);

    const bcryptMockMethod = jest.fn(async () => false);
    mockBcrypt.mockImplementation(bcryptMockMethod);

    await services.login(req, res, next);
    expect(mockLoginDB).toHaveBeenCalledTimes(2);
    expect(mockBcrypt).toHaveBeenCalledTimes(1);
    // expect(next).toHaveBeenCalledWith(
    //   new ApiError("Incorrect email or password", 401)
    // );
  });
  it("should return a 200 stauts code if  password and email are correct", async () => {
    const res = { status: jest.fn(), json: jest.fn() };
    const req = {
      body: {
        email: "test@gmail.com",
        password: "password",
      },
    };
    const next = jest.fn();

    const loginMockMethod = jest.fn(async () => {
      const data = {
        email: "test@gmail.com",
        password: "password",
      };
      return data;
    });
    mockLoginDB.mockImplementation(loginMockMethod);

    const bcryptMockMethod = jest.fn(async () => true);
    mockBcrypt.mockImplementation(bcryptMockMethod);

    await services.login(req, res, next);

    // expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({
    //   token: expect.any(String),
    //   name: expect.any(String),
    //   role: expect.any(String),
    // });
  });
});

afterAll(() => {
  jest.clearAllMocks();
});
