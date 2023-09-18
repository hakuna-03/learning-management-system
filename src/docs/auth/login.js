module.exports = {
  post: {
    tags: ["auth"],
    description: "This endpoint logs in a user.",
    parameters: [],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "email",
                description: "email address",
                example: "test@gmail.com",
              },
              password: {
                type: "string",
                description: "user's password",
                example: "password",
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: "The user has been logged in successfully.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "user's name",
                  example: "Mohammed",
                },
                token: {
                  type: "string",
                  description: "user's access token",
                  example: "$jfdklasjkdlsa.....",
                },
                role: {
                  type: "string",
                  description: "user's role",
                  example: "S",
                  enum: ["S", "P", "A"],
                },
              },
            },
          },
        },
      },
      400: {
        description: "validation failed",
      },
      401: {
        description: "incorrect email or password.",
      },
    },
  },
};
