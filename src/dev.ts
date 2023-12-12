import express from "express";
import cors from "cors";
import morgan from "morgan";
import graphql from "../api/graphql";
import rateLimit from "express-rate-limit";

import dotenv from "dotenv";

dotenv.config();

const port = process.env.port || 5000;

const app = express();
app.use(express.json({ type: ["application/json"] })); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }),
);

//@ts-ignore
const limiter = new rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// app.use(graphql);
// apolloServer.applyMiddleware({ app, path: "/" });

app.listen(port, () => {
  console.log("app is listening");
});
app.use(morgan("combined"));

// cron.schedule("* 10 * * *", handler.fileSyncCron);

export default app;
