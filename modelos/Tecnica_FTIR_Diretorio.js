const Sequelize = require("sequelize");
const connection = require("../database/database");
const Tecnica_FTIR = require("./Tecnica_FTIR");

const Tecnica_FTIR_Diretorio = connection.define('Tecnica_FTIR_Diretorio', {
    id_tecnica_ftir_diretorio: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    diretorio_arquivo: {
        type: Sequelize.STRING(200),
        allowNull: true
    }

});

Tecnica_FTIR.hasMany(Tecnica_FTIR_Diretorio, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Tecnica_FTIR_Diretorio.belongsTo(Tecnica_FTIR);

//Tecnica_FTIR_Diretorio.sync({force: true});

module.exports = Tecnica_FTIR_Diretorio;
