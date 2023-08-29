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
router.post("/password/:id", userController.changePassword);
export const userRoute = router;