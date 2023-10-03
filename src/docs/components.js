module.exports = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      id: {
        type: "integer",
        description: "An id of a resource",
        example: 5,
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
