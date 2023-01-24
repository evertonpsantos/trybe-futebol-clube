import { Model, DataTypes } from 'sequelize';
import sequelize from '.';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});

export default Team;
