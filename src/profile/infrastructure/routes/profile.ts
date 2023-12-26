import express from "express";

const profileRoutes = express.Router();

profileRoutes.get("/profile");
profileRoutes.get("/profile/:id");
profileRoutes.put("/profile/:id");
profileRoutes.delete("/profile/:id");

export default profileRoutes;
