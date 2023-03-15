import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import RequestAttributes from "../../interfaces/request";

module.exports = (sequelize: any, DataTypes: any) => {
  class Request extends Model<RequestAttributes> implements RequestAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    request_id!: bigint;
    user_id!: bigint;
    created_at!: Date;
    detail!: string;
    time_start!: Date;
    time_end!: Date;
    phone_number!: string;
    email_leader!: string;
    email_user!: string;
    description!: string;
    status!: number;
    notify_status!: number;
    status_exist!: number;

    static associate(models: any) {
      // define association here
      Request.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  Request.init(
    {
      request_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email_leader: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email_user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time_start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      time_end: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      notify_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      status_exist: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "Request",
      timestamps: false,
    }
  );
  return Request;
};
