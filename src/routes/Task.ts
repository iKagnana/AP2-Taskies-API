import express from "express";
const router = express.Router();

import { taskController } from "../controllers/Task";

//#region GET
router.get("/assignee/:assignee", taskController.getTasksByAssignee);
router.get("/pole/:pole", taskController.getTasksByPole);
//#region POST
router.post("/", taskController.addTask);
//#region PUT
router.put("/:id", taskController.updateTaskById);
router.put("/status/:id", taskController.changeStatusTaskById)
//#region DELETE
router.delete("/:id", taskController.deleteTaskById);

export const taskRoute = router;
