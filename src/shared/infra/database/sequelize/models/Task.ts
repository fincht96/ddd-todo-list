import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  const Task = sequelize.define(
    'Task',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(800),
        allowNull: false
      },
      is_completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'task'
    }
  );

  return Task;
};
