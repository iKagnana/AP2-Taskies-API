import express from "express";
const router = express.Router();

import { taskController } from "../controllers/Task";

//#region GET
router.get("/:assignee", taskController.getTasksByAssignee);
router.get("/:pole", taskController.getTasksByPole);
//#region POST
router.post("/", taskController.addTask);
//#region PUT
router.put("/:id", taskController.updateTaskById);
//#region DELETE
router.delete("/:id", taskController.deleteTaskById);

export const taskRoute = router;
