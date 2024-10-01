import { DataTypes, Sequelize } from "sequelize";

export const MovieActor = (sequelize: Sequelize) => {
    return sequelize.define('movie_actor', {
        movieId:  DataTypes.INTEGER,
        actorId: DataTypes.INTEGER,
    });
}
