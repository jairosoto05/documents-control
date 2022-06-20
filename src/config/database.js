const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME || "boveda", process.env.DB_USER || "postgres", process.env.DB_PASS || "postgres", {
    host: process.env.DB_HOST || "localhost",
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
