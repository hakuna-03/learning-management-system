/* eslint-disable import/order */
/* eslint-disable import/newline-after-import */
/*global test, beforeAll,expect,jest*/
const professorServices = require("../../services/professor-service");
jest.mock("../../models/user-model");
const User = require("../../models/user-model");
jest.spyOn(User, "getProfessorClasses").mockResolvedValue([
  {
    name: "oop",
    code: "OOP301",
    description: "Object Oriented Programming coure",
    semester: "fall",
    year: 2021,
  },
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

test("/professors/classes", async () => {
  const req = { user: { user_id: 4 } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();
  await professorServices.getProfessorClasses(req, res, next);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    data: [
      {
        name: expect.any(String),
        code: expect.any(String),
        description: expect.any(String),
        semester: expect.any(String),
        year: expect.any(Number),
      },
    ],
  });
});
