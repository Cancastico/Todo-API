import { Router } from "express";
import taskRouter from "./Routes/task";

const router = Router();

router.use("/task", taskRouter);

export { router };
