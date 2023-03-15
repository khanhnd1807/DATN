import { Model } from "sequelize";
import UserAttributes from "../../interfaces/user";

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    user_id!: bigint;
    email!: string;
    firstname!: string;
    lastname!: string;
    avatar!: string;
    gender!: boolean;
    birthday!: Date;
    phone_number!: string;
    address!: string;
    password!: string;
    becoming_offcial_employee!: Date;
    join_company!: Date;
    holidays!: number;
    department_id!: bigint;
    role_position!: number;
    status!: number;

    static associate(models: any) {
      // define association here
      User.belongsTo(models.Department, {
        foreignKey: "department_id",
      });
      User.hasMany(models.Request, {
        foreignKey: "user_id",
      });
      User.hasOne(models.Timekeeping, {
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        unique: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      becoming_offcial_employee: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      join_company: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      holidays: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      department_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      role_position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
    }
  );
  return User;
};
