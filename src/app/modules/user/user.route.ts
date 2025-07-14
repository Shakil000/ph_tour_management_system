import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import z from "zod";

const router = Router();

router.get("/all-user", UserControllers.getAllUsers);

export const UserRoutes = router