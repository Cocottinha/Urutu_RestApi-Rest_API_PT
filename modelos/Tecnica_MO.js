const Sequelize = require("sequelize");
const connection = require("../database/database");
const  Tecnica = require("./Tecnica");


const Tecnica_MO = connection.define('tecnica_mo', {
    id_tecnica_mo: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    aumento: {
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
   
});

Tecnica.hasOne(Tecnica_MO, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Tecnica_MO.belongsTo(Tecnica);

//Tecnica_MO.sync({force: true});
module.exports = Tecnica_MO;