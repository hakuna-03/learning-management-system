/* eslint-disable import/order */
/* eslint-disable import/newline-after-import */
/*global beforeAll,afterEach,describe,it,expect,jest*/

jest.mock("../../utils/create-token");
const createToken = require("../../utils/create-token");
jest.spyOn({ createToken }, "createToken").mockReturnValue("$hashedToken");

jest.mock("bcrypt");
const bcrypt = require("bcrypt");
const mockBcrypt = jest.spyOn(bcrypt, "compare");

jest.mock("../../models/user-model");
const User = require("../../models/user-model");
const mockLoginDB = jest.spyOn(User, "login");

const services = require("../../services/auth-service");
const ApiError = require("../../utils/api-error");

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

beforeAll(async () => {
  await delay(200);
});

const next = jest.fn();

describe("login : ", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a 401 error if the email is incorrect", async () => {
    const res = {};
    const req = {
      body: {
        email: "does_not_exist_email@gmail.com",
        password: "password",
      },
    };

    mockLoginDB.mockResolvedValue(null);
    await services.login(req, res, next);

    expect(mockLoginDB).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(
      new ApiError("Incorrect email or password", 401)
    );
  });

  it("should return a 401 error if the password is incorrect", async () => {
    const res = {};
    const req = {
      body: {
        email: "test@gmail.com",
        password: "invalid_password",
      },
    };

    mockLoginDB.mockResolvedValue({
      email: "test@gmail.com",
      password: "password",
    });
    mockBcrypt.mockResolvedValue(false);

    await services.login(req, res, next);
    expect(mockLoginDB).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(
      new ApiError("Incorrect email or password", 401)
    );
  });

  it("should return a 200 stauts code, token, role, and name if password and email are correct", async () => {
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const req = {
      body: {
        email: "test@gmail.com",
        password: "password",
      },
    };

    mockLoginDB.mockResolvedValue({
      name: "test",
      role: "strudent",
      user_id: 1,
    });

    const bcryptMockMethod = jest.fn(async () => true);
    mockBcrypt.mockImplementation(bcryptMockMethod);

    await services.login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: expect.any(String),
      name: expect.any(String),
      role: expect.any(String),
    });
  });
});
