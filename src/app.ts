import express, { Application } from "express";
import router from "./routers/userRouter";
// import { initializeFirebaseApp } from "./lib/firebase";
class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    // this.connectToDB();
  }

  private config(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/api", router);
  }

  // private connectToDB(): void {
  //   initializeFirebaseApp();
  // }
}

export default new App().app;
