const Sequelize = require("sequelize");

const connection = new Sequelize('db_urutu', 'root', 'Semitom',{
    host: 'localhost',
    dialect:'mysql',
    timezone: '-03:00'

});
module.exports = connection;