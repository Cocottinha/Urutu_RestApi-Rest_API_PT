const Sequelize = require("sequelize");
const connection = require("../database/database");
const Tecnica_MO = require("./Tecnica_MO");

const Tecnica_MO_Imagem = connection.define('Tecnica_MO_Imagem', {
    id_tecnica_mo_imagem: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    objetiva: {
        type: Sequelize.STRING(10),
    },
    diretorio: {
        type: Sequelize.STRING(200),
    }

});


Tecnica_MO.hasMany(Tecnica_MO_Imagem, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Tecnica_MO_Imagem.belongsTo(Tecnica_MO);

//Tecnica_MO_Imagem.sync({force: true});



module.exports = Tecnica_MO_Imagem;
