import "dotenv/config";
import express from "express";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";

import { MovieModel } from "./model/Movie";
import { ActorModel } from "./model/Actor";
import { UserModel } from "./model/User";
import { MovieActor } from "./model/MovieActor";


import { actorRouter } from "./router/actor";
import { movieRouter } from "./router/movie";
import { authRouter } from "./router/auth";
import { userRouter } from "./router/users";
import { TokenBlackListModel } from "./model/TokenBlackList";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

export const Movie = MovieModel(sequelize);
export const Actor = ActorModel(sequelize);
export const User = UserModel(sequelize);
export const TokenBlackList = TokenBlackListModel(sequelize);
export const MovieActorModel = MovieActor(sequelize);

Movie.belongsToMany(Actor, { through: MovieActorModel });
Actor.belongsToMany(Movie, { through: MovieActorModel });

// sequelize.sync({ force: true });
sequelize.sync();

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
