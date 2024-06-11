require("dotenv").config();

const connectionInfo = {
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql"
};

const {Sequelize} = require("sequelize");
const sequelize = new Sequelize(
    connectionInfo.database,
    connectionInfo.username,
    {
        host: connectionInfo.host,
        dialect: connectionInfo.dialect,
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established succesfully.");
    } catch (error) {
        console.error("Unable to conect to the database:", error);
    }
};

module.exports = {sequelize, connectDB};