import { Router } from "express";
// import UserController from "../controllers/userController";
// import userController from "../controllers/userController";
import UserController from "../controllers/userController";

const router = Router();
const userController = new UserController();

router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);

export default router;
