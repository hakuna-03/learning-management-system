module.exports = {
  get: {
    tags: ["admin"],
    description: "show users list to admin based on role query",
    parameters: [
      {
        name: "role",
        in: "query",
        required: true,
        description: "user's role",
        schema: {
          type: "string",
          example: "student",
        },
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      200: {
        description: "A list of users has the same role",
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
                      user_id: {
                        type: "integer",
                        example: 3,
                      },
                      name: {
                        type: "string",
                        example: "Eman Mohammed",
                      },
                      email: {
                        type: "string",
                        example: "example@gmail.com",
                      },
                      collage_id: {
                        type: "string",
                        example: "20230120",
                      },
                      enrollment_data: {
                        type: "date",
                        example: "2023/10/01",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      400: {
        description: "role is required",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "server error",
      },
    },
  },
};
