const Sequelize = require("sequelize");
const connection = require("../database/database");
const Tecnica = require("./Tecnica");


const Tecnica_FTIR = connection.define('Tecnica_FTIR', {
    id_tecnica_FTIR: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    tempo:{
        type: Sequelize.STRING(100),
        allowNull: true,
    },
    intervalo:{
        type: Sequelize.STRING(100),
        allowNull: true,
    },
    resolucao:{
        type: Sequelize.STRING(100),
        allowNull: true,
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
});


Tecnica.hasOne(Tecnica_FTIR, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Tecnica_FTIR.belongsTo(Tecnica);

module.exports = Tecnica_FTIR;

//Tecnica_FTIR.sync({force: true});

