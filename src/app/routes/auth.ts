import express from "express";
import { AppServiceProvider } from "../AppServiceProvider";

const authRoutes = express.Router();

authRoutes.post("/register", AppServiceProvider.authController().register);
authRoutes.post("/login", AppServiceProvider.authController().login);

export default authRoutes;
