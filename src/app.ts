import express, { Application } from "express";
import router from "./routers/userRouter";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/api", router);
  }
}

export default new App().app;
