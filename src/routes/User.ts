import express from "express";
const router = express.Router();

import { userController } from "../controllers/User";

//#region GET
router.get("/", userController.getUsers);
router.get("/:pole", userController.getUsersByPole);
router.get("/:id", userController.getUserById);
//#region POST
router.post("/", userController.addUser);
router.post("/login", userController.login);
router.post("/reset/password", userController.getCodeEmail)
router.post("/password/", userController.changePassword);
//#region PUT
router.put("/:id", userController.updateUserById)
//#region DELETE
router.delete("/:id", userController.deleteUserById)
export const userRoute = router;