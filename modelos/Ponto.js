const Sequelize = require("sequelize");
const connection = require("../database/database");
const Projeto = require("./Projeto");



const Ponto = connection.define('Ponto', {
    id_ponto: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nome_ponto: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    posicao_x:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    posicao_y: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

Projeto.hasMany(Ponto, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Ponto.belongsTo(Projeto);

module.exports = Ponto;

//Ponto.sync({force: true});
