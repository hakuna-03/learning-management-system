const app = require("./app");

const server = app.listen(process.env.PORT, () => {
  console.log("server is running");
});

process.on("unhandledRejection", (err) => {
  server.close(() => {
    console.log(`UnhandleRejection Errors: ${err}, Shutting down....`);
    process.exit(1);
  });
});
