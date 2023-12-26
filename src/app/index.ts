import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "../auth/infrastructure/routes/auth";
import profileRoutes from "../profile/infrastructure/routes/profile";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRoutes);
app.use(profileRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
