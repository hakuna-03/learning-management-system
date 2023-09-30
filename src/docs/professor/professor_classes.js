module.exports = {
  get: {
    tags: ["professor"],
    description: "This endpoint get all professor course classes",
    parameters: [
      {
        name: "Authorization",
        in: "header",
        required: true,
        description: "JWT access token",
        schema:{
          type: "string",
        }
      },
    ],

    responses: {
      200: {
        description: "All professor classes",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      class_id: {
                        type: "integer",
                        example: 3,
                      },
                      name: {
                        type: "string",
                        example: "oop",
                      },
                      code: {
                        type: "string",
                        example: "OOP301",
                      },
                      description: {
                        type: "string",
                        example: "Object Oriented Programming coure",
                      },
                      semester: {
                        type: "string",
                        example: "fall",
                      },
                      year: {
                        type: "integer",
                        example: 2021,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      401: {
        description: "You are not authorized",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UnauthorizedError",
            },
          },
        },
      },
      500: {
        description: "server error",
      },
    },
  },
};
