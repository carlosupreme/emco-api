import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "../auth/infrastructure/routes/auth";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server runnning on port 3000");
});
