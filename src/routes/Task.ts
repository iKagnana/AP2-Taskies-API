import express from "express";
const router = express.Router();

import { taskController } from "../controllers/Task";
import {verifyAuth} from "~/middleware/verifyAuth";

//#region GET
router.get("/", [verifyAuth], taskController.getTasks)
router.get("/assignee/:assignee", [verifyAuth], taskController.getTasksByAssignee);
router.get("/pole/:pole", [verifyAuth], taskController.getTasksByPole);
//#region POST
router.post("/", [verifyAuth], taskController.addTask);
//#region PUT
router.put("/:id", [verifyAuth], taskController.updateTaskById);
router.put("/status/:id", [verifyAuth], taskController.changeStatusTaskById)
//#region DELETE
router.delete("/:id", [verifyAuth], taskController.deleteTaskById);

export const taskRoute = router;
