import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Option 3: Passing parameters separately (other dialects)
const {
  DB_HOST = "mysql",
  DB_NAME = "wsm",
  DB_USER = "root",
  DB_PASS = "admin",
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST, // co the la localhost hoawc dia chi server cua ta
  dialect: "mysql",
  logging: false, // khoong cho phep in ra cau lenh select
  define: {
    timestamps: false,
  },
});

// kiem tra ket nois toi database
const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connect;
