import { Request, Response } from "express";

class UserController {
  public getUsers(req: Request, res: Response): void {
    res.send("Get all users");
  }

  public createUser(req: Request, res: Response): void {
    res.send("Create a user");
  }
}

export default UserController;
