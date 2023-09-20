import express from "express";
const router = express.Router();

import {codeEmailController} from "~/controllers/CodeEmail";

//#region GET
router.get("/:code", codeEmailController.getCodeEmailByCode)
//#region POST
router.post("/:id", codeEmailController.desactivedCode)
//#region DELETE
router.delete("/:id", codeEmailController.deleteCodeById);

export const codeEmailRoute = router;