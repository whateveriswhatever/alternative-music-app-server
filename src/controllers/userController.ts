import { Request, Response } from "express";
import {
  addDoc,
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  query,
  where,
  QuerySnapshot,
} from "firebase/firestore";
import { musicUserAccountDatabase } from "../lib/firebase";

type UserType = {
  email: string;
  password: string;
};

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
      const signedUpAcc: UserType = req.body;
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

  public async findUserByEmail(req: Request, res: Response): Promise<void> {
    const userAcc: UserType = req.body;

    if (!userAcc["email"] || userAcc["email"].length === 0) {
      res.status(400).json({
        success: true,
        message: "Email is required",
      });
    }
    try {
      // Get user document from Firestore
      const userCollection = collection(musicUserAccountDatabase, "users");
      const searchingQuery = query(
        userCollection,
        where("email", "==", userAcc["email"])
      );
      const querySnapshot = await getDocs(searchingQuery);

      // const userRef = doc(musicUserAccountDatabase, "users", userAcc["email"]);
      // console.log(`userRef: ${Object.values(userRef)}`);
      // const userDoc = await getDoc(userRef);
      // console.log(
      //   `userDoc: ${Object.keys(userDoc)} --> ${Object.values(userDoc)}`
      // );

      // if (userDoc.exists()) {
      //   // User found, create a User object
      //   const user = userDoc.data();
      //   console.log(userAcc["email"]);
      //   res.status(201).json({
      //     success: true,
      //     message: `Found user ${userDoc.id}!`,
      //     account: user,
      //   });
      // } else {
      //   // User not found
      //   console.log(`User not found !`);
      //   console.log(userAcc["email"]);
      //   res.status(201).json({
      //     success: true,
      //     message: `Cannot find user ${userDoc.id}`,
      //   });
      // }

      if (!querySnapshot["empty"]) {
        const userDoc = querySnapshot.docs[0];
        const user: UserType = userDoc.data() as UserType;
        // console.log(`User data: ${JSON.stringify(user)}`);
        res.status(200).json({
          success: true,
          message: `Found user ${user["email"]}`,
          account: user,
        });
      } else {
        console.log(`User not found!`);
        res.status(404).json({
          success: false,
          message: `User with email ${userAcc["email"]} ain't existed!`,
        });
      }
    } catch (error) {
      console.log(`Failed when seeking user !\n----> ${error}`);
      res.status(500).json({
        success: false,
        message: `Failed when finding matched user!\n----> ${error}`,
      });
    }
  }
}

export default UserController;
