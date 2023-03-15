import { Model } from "sequelize";
import DepartmentAttributes from "../../interfaces/department";

module.exports = (sequelize: any, DataTypes: any) => {
  class Department
    extends Model<DepartmentAttributes>
    implements DepartmentAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    lead!: bigint;
    department_id!: bigint;
    sign!: string;
    name!: string;
    status!: number;

    static associate(models: any) {
      // define association here
      Department.hasMany(models.User, {
        foreignKey: "department_id",
      });
    }
  }
  Department.init(
    {
      department_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      lead: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sign: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "Department",
      timestamps: false,
    }
  );
  return Department;
};
