import { Router } from "express";
// import UserController from "../controllers/userController";
// import userController from "../controllers/userController";
import UserController from "../controllers/userController";
import cors from "cors";

const router = Router();
const userController = new UserController();

const corsOptions = {
  origin: "https://localhost:3001",
  optionsSuccessStatus: 200,
};

router.get("/users", userController.getUsers.bind(userController));
router.post("/users", userController.createUser.bind(userController));
router.post(
  "/users/login",
  userController.findUserByEmail.bind(userController)
);

export default router;
