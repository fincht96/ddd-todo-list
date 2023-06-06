import config from '../config/config';

export default (() => {
  const sequelize = config.connection;

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully');
    })
    .catch((err) => {
      console.log(err);
    });
})();
