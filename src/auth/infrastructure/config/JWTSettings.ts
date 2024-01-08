import { config } from "dotenv";

config();
const SECRET_KEY = `${process.env.SECRET_ACCESS_KEY}`;
const EXPIRES_IN = `${process.env.JWT_EXPIRES_IN}`;
export default { SECRET_KEY, EXPIRES_IN };
