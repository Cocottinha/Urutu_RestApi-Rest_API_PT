const Sequelize = require("sequelize");
const connection = require("../database/database");
const Tecnica = require("./Tecnica");



const Tecnica_XRF = connection.define('Tecnica_XRF',
    {
        id_tecnica_xrf: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        tempo: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        voltagem:{
            type: Sequelize.INTEGER,
            allowNull: true
        },
        corrente:{
            type: Sequelize.INTEGER,
            allowNull: true
        },
        calibracao:{
            type: Sequelize.INTEGER,
            allowNull: true
        },
        colimador:{
            type: Sequelize.INTEGER,
            allowNull: true 
        },
        data: {
            type: Sequelize.DATE,
            allowNull: true
        }, 
        comentario: {
            type: Sequelize.STRING,
            allowNull: true
        },
        resultado: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tonalidade: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        nome_tecnica: {
            type: Sequelize.STRING(20),
            allowNull: false
        } 
    },  
);

Tecnica.hasOne(Tecnica_XRF, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Tecnica_XRF.belongsTo(Tecnica);

//Tecnica_XRF.sync({force: true});

module.exports = Tecnica_XRF;
