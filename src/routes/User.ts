import express from "express";
const router = express.Router();

import { userController } from "../controllers/User";
import {verifyAuth} from "~/middleware/verifyAuth";
import {isAdmin} from "~/middleware/verifyRole";

//#region GET
router.get("/", [verifyAuth], userController.getUsers);
router.get("/pole/:pole", [verifyAuth], userController.getUsersByPole);
router.get("/:id", [verifyAuth], userController.getUserById);
//#region POST
router.post("/addUser/:userId", [verifyAuth, isAdmin], userController.addUser);
router.post("/login", userController.login);
router.post("/reset/password", userController.getCodeEmail)
router.post("/password/", userController.changePassword);
//#region PUT
router.put("/:userId/:id", [verifyAuth, isAdmin], userController.updateUserById)
//#region DELETE
router.delete("/:userId/:id", [verifyAuth, isAdmin], userController.deleteUserById)
export const userRoute = router;