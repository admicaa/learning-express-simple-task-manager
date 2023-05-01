import express from "express";
import connector from "./database/connector.js";
import RouteServiceProvider from "./providers/RouteServiceProvider.js";
import notFound from "./app/middlewares/notFound.js";
import errorHandlerMiddleware from "./app/middlewares/errorHandler.js";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.server.use(notFound);
    this.server.use(errorHandlerMiddleware);
  }

  middlewares() {
    this.server.use(express.static("public"));
    this.server.use(express.json());
  }

  routes() {
    new RouteServiceProvider(this.server);
  }
}

var server = new App().server;

var port = process.env.PORT || 3000;

connector
  .mongo()
  .then((result) => {
    server.listen(port, () => {
      console.log(
        `Started Express server at port ${port} \n you can run it clicking this link http://localhost:${port}`
      );
    });
  })
  .catch((err) => {
    console.error(`Failed to connect to DB ${err}`);
  });
