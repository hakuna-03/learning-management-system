module.exports = {
  get: {
    tags: ["professor"],
    description: "This endpoint get all professor course classes",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "A single professor id",
        schema: {
          $ref: "#/components/schemas/id",
        },
      },
      { $ref: "#/components/schemas/bearerAuth" },
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
                      spring: {
                        type: "string",
                        example: "fall",
                      },
                      year: {
                        type: "integer",
                        example: 5,
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
