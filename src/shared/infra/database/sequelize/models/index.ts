import config from '../config/config';
import * as Sequelize from 'sequelize';
import initTaskModel from './Task';

const sequelize = config.connection;

const models: any = {};
let modelsLoaded = false;

const createModels = () => {
  if (modelsLoaded) return models;

  const Task = initTaskModel(sequelize);

  models['task'] = Task;
  models['sequelize'] = sequelize;
  models['Sequelize'] = Sequelize;

  modelsLoaded = true;

  return models;
};

export default createModels();

export { createModels };
