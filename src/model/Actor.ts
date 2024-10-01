import { DataTypes, Sequelize } from "sequelize";

export const ActorModel  = (sequelize: Sequelize) => {
    return sequelize.define('actor', {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING
    });
}