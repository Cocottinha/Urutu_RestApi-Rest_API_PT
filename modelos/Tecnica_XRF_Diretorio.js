const Sequelize = require("sequelize");
const connection = require("../database/database");
const Tecnica_XRF = require("./Tecnica_XRF");

const Tecnica_XRF_Diretorio = connection.define('Tecnica_XRF_Diretorio', {
    id_tecnica_xrf_diretorio: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    diretorio_arquivo_xrf: {
        type: Sequelize.STRING(200),
        allowNull: true
    }

});

Tecnica_XRF.hasMany(Tecnica_XRF_Diretorio, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Tecnica_XRF_Diretorio.belongsTo(Tecnica_XRF);

//Tecnica_XRF_Diretorio.sync({force: true});

module.exports = Tecnica_XRF_Diretorio;
