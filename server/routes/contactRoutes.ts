import express, { RequestHandler } from "express";
import { sendContactEmail } from "../controllers/contactController";

const router = express.Router();

router.post("/", sendContactEmail as RequestHandler);

export default router;
