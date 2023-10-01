module.exports = {
  components: {
    schemas: {
      id: {
        type: "integer",
        description: "An id of a resource",
        example: 5,
      },

      bearerAuth: {
        name: "Authorization",
        in: "header",
        required: true,
        description: "JWT access token",
        type: "string",
      },

      Error: {
        type: "object",
        properties: {
          status: {
            type: "string",
            description: "Error status description",
            example: "fail",
          },
          message: {
            type: "string",
            description: "Error message",
            example: "error example message",
          },
        },
      },
      UnauthorizedError: {
        type: "object",
        properties: {
          status: {
            type: "string",
            description: "Error status description",
            example: "fail",
          },
          message: {
            type: "string",
            description: "Error message",
            example: "Invalid token please login again..",
          },
        },
      },
    },
  },
};
