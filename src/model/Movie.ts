import { DataTypes, Sequelize } from "sequelize";

export const MovieModel = (sequelize: Sequelize) => {
    return sequelize.define('movie', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        releaseDate: DataTypes.DATE,
        director: DataTypes.STRING,
    });
}