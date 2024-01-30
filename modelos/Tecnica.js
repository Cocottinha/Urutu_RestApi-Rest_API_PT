const Sequelize = require("sequelize");
const connection = require("../database/database");
const Ponto = require("./Ponto");


const Tecnica = connection.define('Tecnica', {
    id_tecnica: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    }
});



Ponto.hasMany(Tecnica, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Tecnica.belongsTo(Ponto);

//Tecnica.sync({force: true});

module.exports = Tecnica;