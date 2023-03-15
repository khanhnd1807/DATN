import {Model} from "sequelize";
import TimekeepingAttributes from "../../interfaces/timeKeeping"

module.exports = (sequelize: any, DataTypes: any) => {
  class Timekeeping
    extends Model<TimekeepingAttributes>
    implements TimekeepingAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    user_id!: bigint;
    create_at!: Date;
    check_in!: Date;
    check_out!: Date;

    static associate(models: any) {
      // define association here
      Timekeeping.belongsTo(models.User,{
        foreignKey:'user_id'
      })
    }
  }
  Timekeeping.init(
    {
      user_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      create_at: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        primaryKey: true,
      },

      check_in: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      check_out: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Timekeeping",
      timestamps: false
    }
  );
  return Timekeeping;
};
