import { Request, Response } from "express";
import { addDoc, collection, getDocs, setDoc } from "firebase/firestore";
import { musicUserAccountDatabase } from "../lib/firebase";
interface UserInterface {
  username: string;
  password: string;
  email: string;
}

class UserController {
  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const accountsPool = collection(musicUserAccountDatabase, "users");
      const accountSnapshot = await getDocs(accountsPool);
      const accountList = accountSnapshot.docs.map((doc) => doc.data());
      res.status(200).json(accountList);
    } catch (error) {
      console.error(`Failed when fetching all user accounts !\n----> ${error}`);
      res.status(500).json({
        message: "Failed to fetch user accounts",
      });
    }
  }

  public async createUser(req: Request, res: Response): Promise<any> {
    try {
      const signedUpAcc: UserInterface = req.body;
      const docRef = await addDoc(
        collection(musicUserAccountDatabase, "users"),
        signedUpAcc
      );
      console.log(`Created a new account successfully !\nID : ${docRef.id}`);
      res.status(200).json({
        success: true,
        message: "Signed up a new account successfully !",
        account: signedUpAcc,
      });
    } catch (error) {
      console.error(`Failed when creating a new account!\n----> ${error}`);
      res.status(500).json({ message: "Failed to create a new account" });
    }
  }
}

export default UserController;
