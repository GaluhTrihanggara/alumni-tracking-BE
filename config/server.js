require("dotenv").config();

const connectionInfo = {
    username: 'root',
    database: 'alumni',
    password: '',
    host: '127.0.0.1',
    port: '3306',
    dialect: "mysql"
};

const {Sequelize} = require("sequelize");
const sequelize = new Sequelize(
    connectionInfo.database,
    connectionInfo.username,
    connectionInfo.password,
    {
        dialect: 'mysql',
        dialectOptions: {
            host: connectionInfo.host,
            port: connectionInfo.port
        }
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