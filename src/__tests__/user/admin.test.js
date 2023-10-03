/* eslint-disable import/newline-after-import */
/*global test,jest,expect,beforeAll */

const adminServices = require("../../services/admin-service");
jest.mock("../../models/user-model");
const User = require("../../models/user-model");
jest.spyOn(User, "getUsersByRole").mockResolvedValue([
    {
        user_id: 6,
        name: "student",
        email: "student@gmail.com",
        collage_id: "20230120",
        enrollment_date: "2023-09-29T22:00:00.000Z"
      }
]);

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

beforeAll(async () => {
  await delay(100);
});

test("/admin/users - getUsersByRole", async () => {
  const req = { query: { role: "student" } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();
  await adminServices.getUsers(req, res, next);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    data: [
      {
        name: expect.any(String),
        user_id: expect.any(Number),
        email: expect.any(String),
        collage_id: expect.any(String),
        enrollment_date: expect.any(String),
      },
    ],
  });
});
