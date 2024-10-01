import "dotenv/config";
import express from "express";
import cors from "cors";
import { Sequelize } from "sequelize";

import { actorRouter } from "./router/actor";
import { movieRouter } from "./router/movie";
import { authRouter } from "./router/auth";
import { userRouter } from "./router/users";
import { exportModels } from "./model/Model";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

// sequelize.sync({ force: true });
sequelize.sync();

export const { Movie,
  Actor,
  User,
  TokenBlackList,
  MovieActorModel } = exportModels(sequelize);

const app = express();
app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/movies', movieRouter);
apiRouter.use('/actors', actorRouter);
apiRouter.use('/users', userRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});

app.get("/test", (req, res) => {
  res.json({ message: "Hello World!" });
});
